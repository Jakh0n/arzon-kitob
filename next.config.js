/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		HYGRAPH_ENDPOINT: process.env.HYGRAPH_ENDPOINT,
	},
}

module.exports = nextConfig
