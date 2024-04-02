/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "i.ibb.co",
      "i.postimg.cc",
      "firebasestorage.googleapis.com",
      'encrypted-tbn0.gstatic.com'
    ],
  },
};

module.exports = nextConfig;
