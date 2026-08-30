/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Header di sicurezza di base, applicati a tutte le route. Volutamente
        // esclusa una Content-Security-Policy: richiede un audit dedicato di
        // script/stili/font/redirect (Stripe incluso) prima di poter essere
        // introdotta senza rischio di rompere qualcosa in produzione.
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
