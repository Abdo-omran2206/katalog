/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tdsaxesjwrjtcxznbnda.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkc2F4ZXNqd3JqdGN4em5ibmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNDg5ODksImV4cCI6MjA3MTYyNDk4OX0.S9e30ScivJa4M56vyvIKWzdyq87K6tnEABb2yKZsCrE',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tdsaxesjwrjtcxznbnda.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
