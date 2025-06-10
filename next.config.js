/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "storage.theaceundip.id",
			},
		],
	},
};

module.exports = nextConfig;
