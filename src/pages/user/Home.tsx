import { lazy } from 'react';

const Hero = lazy(() => import('@/components/user/home/hero'));
const Category = lazy(() => import('@/components/user/home/category'));
const TopCompanies = lazy(() => import('@/components/user/home/topCompanies'));
const TopJobs = lazy(() => import('@/components/user/home/topJobs'));
const Starts = lazy(() => import('@/components/user/home/starts'));

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
      {/* Hero Section */}
      <Hero />
      {/* IT Categories */}
      <Category />
      {/* Featured Tech Companies */}
      <TopCompanies />
      {/* Featured IT Jobs */}
      <TopJobs />
      {/* Stats Section */}
      <Starts />
    </div>
  );
}
