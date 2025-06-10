/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "storage.theaceundip.id",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
