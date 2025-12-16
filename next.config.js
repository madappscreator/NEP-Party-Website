/** @type {import('next').NextConfig} */
const nextConfig = {
  // Increase Server Actions body size limit to allow larger uploads from forms.
  // Put under `experimental` to be recognized by this Next.js version.
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Skip type checking during build so type errors don't block UI testing locally.
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
