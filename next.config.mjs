/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        USER_TOKEN: process.env.USER_TOKEN,
    }
};

export default nextConfig;
