/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['192.168.0.220'],
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};



export default nextConfig;
