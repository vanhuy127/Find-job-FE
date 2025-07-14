import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const techCompanies = [
  {
    id: 1,
    name: 'FPT Software',
    logo: '/placeholder.svg?height=80&width=80',
    industry: 'Software Development',
    employees: '30,000+',
    openJobs: 145,
    rating: 4.5,
    description: 'Leading software development company in Vietnam with global presence',
    techStack: ['Java', 'React', 'AWS', 'Microservices'],
    benefits: ['Remote work', 'Tech allowance', 'Training budget', 'Stock options'],
    isHiring: true,
  },
  {
    id: 2,
    name: 'VNG Corporation',
    logo: '/placeholder.svg?height=80&width=80',
    industry: 'Gaming & Technology',
    employees: '3,000+',
    openJobs: 89,
    rating: 4.6,
    description: "Vietnam's leading technology company behind Zalo and popular games",
    techStack: ['Go', 'React Native', 'Kubernetes', 'AI/ML'],
    benefits: ['Flexible hours', 'Game development', 'Innovation time', 'Health insurance'],
    isHiring: true,
  },
  {
    id: 3,
    name: 'Tiki',
    logo: '/placeholder.svg?height=80&width=80',
    industry: 'E-commerce Technology',
    employees: '2,000+',
    openJobs: 67,
    rating: 4.4,
    description: "Vietnam's leading e-commerce platform with cutting-edge technology",
    techStack: ['Python', 'React', 'Docker', 'Elasticsearch'],
    benefits: ['Tech conferences', 'Learning budget', 'Modern office', 'Performance bonus'],
    isHiring: true,
  },
  {
    id: 4,
    name: 'Grab Vietnam',
    logo: '/placeholder.svg?height=80&width=80',
    industry: 'Super App Technology',
    employees: '1,500+',
    openJobs: 78,
    rating: 4.7,
    description: "Southeast Asia's leading super app with advanced technology solutions",
    techStack: ['Go', 'React', 'AWS', 'Machine Learning'],
    benefits: ['International exposure', 'Stock options', 'Remote work', 'Tech talks'],
    isHiring: true,
  },
  {
    id: 5,
    name: 'Shopee Vietnam',
    logo: '/placeholder.svg?height=80&width=80',
    industry: 'E-commerce Platform',
    employees: '2,500+',
    openJobs: 92,
    rating: 4.5,
    description: 'Leading e-commerce platform with innovative technology solutions',
    techStack: ['Java', 'Vue.js', 'Kubernetes', 'Big Data'],
    benefits: ['Career growth', 'Tech allowance', 'Flexible work', 'Team building'],
    isHiring: true,
  },
  {
    id: 6,
    name: 'Zalo (VNG)',
    logo: '/placeholder.svg?height=80&width=80',
    industry: 'Social & Communication',
    employees: '1,000+',
    openJobs: 45,
    rating: 4.6,
    description: "Vietnam's top messaging app with millions of users",
    techStack: ['C++', 'React', 'Redis', 'Microservices'],
    benefits: ['Innovation projects', 'Tech conferences', 'Startup culture', 'Competitive salary'],
    isHiring: true,
  },
];

const TopCompanies = () => {
  return (
    <section className="bg-gray-50 py-20 transition-colors duration-300 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
            Công ty công nghệ hàng đầu
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Làm việc cùng những công ty công nghệ tiên phong và sáng tạo nhất Việt Nam
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {techCompanies.map((company) => (
            <Card
              key={company.id}
              className="group cursor-pointer border-gray-200 bg-white backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 dark:border-gray-700 dark:bg-gray-800/80 dark:hover:shadow-cyan-400/20"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200 transition-transform duration-300 group-hover:scale-105 dark:border-gray-600 dark:from-gray-700 dark:to-gray-800">
                      <img
                        src={company.logo || '/placeholder.svg'}
                        alt={company.name}
                        className="h-12 w-12 rounded-xl"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                        {company.name}
                      </h3>
                      <p className="font-medium text-gray-600 dark:text-gray-400">{company.industry}</p>
                    </div>
                  </div>
                  {company.isHiring && (
                    <Badge className="border-green-200 bg-green-100 text-green-700 dark:border-green-500/30 dark:bg-green-500/20 dark:text-green-400">
                      Đang tuyển
                    </Badge>
                  )}
                </div>

                <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{company.description}</p>

                <div className="mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Nhân viên:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{company.employees}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Đang tuyển:</span>
                    <Badge className="border-cyan-200 bg-cyan-100 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/20 dark:text-cyan-400">
                      {company.openJobs} vị trí
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <div className="flex text-yellow-400">{'★'.repeat(Math.floor(company.rating))}</div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{company.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Tech Stack:</p>
                  <div className="flex flex-wrap gap-1">
                    {company.techStack.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-gray-300 bg-gray-100 text-xs text-gray-600 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Phúc lợi:</p>
                  <div className="flex flex-wrap gap-1">
                    {company.benefits.slice(0, 3).map((benefit, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-cyan-200 bg-cyan-50 text-xs text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-400"
                      >
                        {benefit}
                      </Badge>
                    ))}
                    {company.benefits.length > 3 && (
                      <Badge
                        variant="outline"
                        className="border-gray-300 text-xs text-gray-500 dark:border-gray-600 dark:text-gray-400"
                      >
                        +{company.benefits.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <Button className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 font-semibold text-white transition-all duration-300 hover:from-cyan-600 hover:to-blue-600">
                  Xem việc làm
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-2 border-cyan-500 px-8 py-4 font-semibold text-cyan-600 transition-all duration-300 hover:bg-cyan-500 hover:text-white dark:text-cyan-400"
          >
            Xem tất cả công ty tech
          </Button>
        </div>
      </div>
    </section>
  );
};
export default TopCompanies;
