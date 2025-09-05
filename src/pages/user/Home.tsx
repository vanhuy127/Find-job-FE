import Category from "@/components/user/home/category";
import Hero from "@/components/user/home/hero";
import Starts from "@/components/user/home/starts";
import TopCompanies from "@/components/user/home/topCompanies";
import TopJobs from "@/components/user/home/topJobs";

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
