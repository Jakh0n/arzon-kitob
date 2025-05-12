/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		HYGRAPH_ENDPOINT: process.env.HYGRAPH_ENDPOINT,
		HYGRAPH_WEBHOOK_SECRET: process.env.HYGRAPH_WEBHOOK_SECRET,
	},
	images: {
		remotePatterns: [
			{
				hostname: 'us-west-2.graphassets.com',
			},
		],
	},
}

module.exports = nextConfig
