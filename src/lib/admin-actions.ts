"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, sha256Hex } from "@/lib/admin-auth";

export async function login(formData: FormData) {
  const password = formData.get("password");
  if (typeof password !== "string" || password.length === 0 || password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=Password errata");
  }

  const hash = await sha256Hex(password);
  (await cookies()).set(ADMIN_SESSION_COOKIE, hash, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 ore
  });

  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

const productSchema = z.object({
  name: z.string().trim().min(1, "Nome obbligatorio"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug obbligatorio")
    .regex(/^[a-z0-9-]+$/, "Slug: solo minuscole, numeri e trattini"),
  description: z.string().trim().min(1, "Descrizione obbligatoria"),
  category: z.string().trim().min(1, "Categoria obbligatoria"),
  images: z.string().refine(
    (value) =>
      value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .every((line) => {
          // Percorso locale relativo (es. /demo/foto.jpg): servito dallo stesso
          // dominio, non un URL assoluto da validare come http/https.
          if (line.startsWith("/")) return true;
          try {
            return ["http:", "https:"].includes(new URL(line).protocol);
          } catch {
            return false;
          }
        }),
    "Immagini: ogni riga deve essere un percorso locale (es. /demo/foto.jpg) o un URL http:// o https:// valido"
  ),
  active: z.boolean(),
});

function parseImages(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readProductForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    category: formData.get("category"),
    images: formData.get("images") ?? "",
    active: formData.get("active") === "on",
  });
}

export async function createProduct(formData: FormData) {
  const parsed = readProductForm(formData);
  if (!parsed.success) {
    redirect(`/admin/prodotti/nuovo?error=${encodeURIComponent(parsed.error.issues[0].message)}`);
  }

  let productId: string;
  try {
    const product = await prisma.product.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
        category: parsed.data.category,
        images: parseImages(parsed.data.images),
        active: parsed.data.active,
      },
    });
    productId = product.id;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      redirect(`/admin/prodotti/nuovo?error=${encodeURIComponent("Slug già in uso")}`);
    }
    throw error;
  }

  revalidatePath("/admin");
  redirect(`/admin/prodotti/${productId}`);
}

export async function updateProduct(productId: string, formData: FormData) {
  const parsed = readProductForm(formData);
  if (!parsed.success) {
    redirect(`/admin/prodotti/${productId}?error=${encodeURIComponent(parsed.error.issues[0].message)}`);
  }

  try {
    await prisma.product.update({
      where: { id: productId },
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
        category: parsed.data.category,
        images: parseImages(parsed.data.images),
        active: parsed.data.active,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      redirect(`/admin/prodotti/${productId}?error=${encodeURIComponent("Slug già in uso")}`);
    }
    throw error;
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/prodotti/${productId}`);
  redirect(`/admin/prodotti/${productId}`);
}

const variantSchema = z.object({
  size: z.string().trim().min(1, "Taglia obbligatoria"),
  color: z.string().trim(),
  sku: z.string().trim().min(1, "SKU obbligatorio"),
  priceEuro: z.string().trim().min(1, "Prezzo obbligatorio"),
  stock: z.string().trim().min(1, "Stock obbligatorio"),
});

function euroToCents(value: string): number | null {
  const parsed = Number.parseFloat(value.replace(",", "."));
  if (Number.isNaN(parsed)) return null;
  return Math.round(parsed * 100);
}

export async function upsertVariant(productId: string, variantId: string | null, formData: FormData) {
  const parsed = variantSchema.safeParse({
    size: formData.get("size"),
    color: formData.get("color") ?? "",
    sku: formData.get("sku"),
    priceEuro: formData.get("priceEuro"),
    stock: formData.get("stock"),
  });

  if (!parsed.success) {
    redirect(`/admin/prodotti/${productId}?error=${encodeURIComponent(parsed.error.issues[0].message)}`);
  }

  const priceCents = euroToCents(parsed.data.priceEuro);
  const stock = Number.parseInt(parsed.data.stock, 10);

  if (priceCents === null || priceCents < 0 || Number.isNaN(stock) || stock < 0) {
    redirect(`/admin/prodotti/${productId}?error=${encodeURIComponent("Prezzo o stock non validi")}`);
  }

  const data = {
    productId,
    size: parsed.data.size,
    color: parsed.data.color || null,
    sku: parsed.data.sku,
    priceCents: priceCents as number,
    stock,
  };

  try {
    if (variantId) {
      await prisma.variant.update({ where: { id: variantId }, data });
    } else {
      await prisma.variant.create({ data });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      redirect(`/admin/prodotti/${productId}?error=${encodeURIComponent("SKU già in uso")}`);
    }
    throw error;
  }

  revalidatePath(`/admin/prodotti/${productId}`);
  redirect(`/admin/prodotti/${productId}`);
}

export async function deleteVariant(productId: string, variantId: string, _formData: FormData) {
  await prisma.variant.delete({ where: { id: variantId } });
  revalidatePath(`/admin/prodotti/${productId}`);
  redirect(`/admin/prodotti/${productId}`);
}
