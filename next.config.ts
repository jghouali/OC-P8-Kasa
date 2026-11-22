import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: false,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      new URL("https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/**"),
    ],
  },
};

export default nextConfig;
