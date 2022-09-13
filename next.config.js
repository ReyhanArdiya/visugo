/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        domains: ["picsum.photos", "i.picsum.photos", "https://picsum.photos"],
    },
};

module.exports = nextConfig;
