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
      {
        protocol: 'https',
        hostname: 'nftstorage.link',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: 'https://bookverse.gitbook.io/bookverse/',
        permanent: false,
        basePath: false
      },
    ]
  },
} || nextConfig
// module.exports = nextConfig
