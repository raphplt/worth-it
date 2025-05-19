import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	transpilePackages: ["@auth/prisma-adapter"],
};

export default nextConfig;
