/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/dashboard', destination: '/', permanent: true },
      { source: '/Dashboard', destination: '/', permanent: true },
      { source: '/Employees', destination: '/employees', permanent: true },
      { source: '/Attendance', destination: '/attendance', permanent: true },
      { source: '/Shifts', destination: '/shifts', permanent: true },
      { source: '/Leave', destination: '/leave', permanent: true },
      { source: '/Admin', destination: '/admin', permanent: true },
    ];
  },
};

export default nextConfig;
