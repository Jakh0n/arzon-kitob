/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		HYGRAPH_ENDPOINT: process.env.HYGRAPH_ENDPOINT,
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
