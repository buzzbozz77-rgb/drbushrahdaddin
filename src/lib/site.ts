// Set NEXT_PUBLIC_SITE_URL to the final domain once it's connected; on
// Vercel the production URL is picked up automatically until then.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
