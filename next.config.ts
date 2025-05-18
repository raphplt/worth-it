import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	transpilePackages: ["@auth/prisma-adapter"],
	experimental: {
		serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
	},
};

export default nextConfig;
