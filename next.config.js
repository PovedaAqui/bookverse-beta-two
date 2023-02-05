/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bookverse.s3.eu-west-3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
} || nextConfig
// module.exports = nextConfig
