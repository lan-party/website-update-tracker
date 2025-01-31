import type { NextConfig } from "next";

module.exports = {
  reactStrictMode: true,
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  
};

export default nextConfig;
