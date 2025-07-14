import { Code, Cpu, Database, Globe, Server, Shield, Smartphone, Zap } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

const itCategories = [
  {
    name: 'Frontend Development',
    icon: Globe,
    count: 1250,
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    textColor: 'text-white',
    description: 'React, Vue, Angular',
  },
  {
    name: 'Backend Development',
    icon: Server,
    count: 890,
    color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    textColor: 'text-white',
    description: 'Node.js, Python, Java',
  },
  {
    name: 'Mobile Development',
    icon: Smartphone,
    count: 567,
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    textColor: 'text-white',
    description: 'iOS, Android, React Native',
  },
  {
    name: 'DevOps & Cloud',
    icon: Zap,
    count: 432,
    color: 'bg-gradient-to-br from-orange-500 to-red-500',
    textColor: 'text-white',
    description: 'AWS, Docker, Kubernetes',
  },
  {
    name: 'Data Science & AI',
    icon: Cpu,
    count: 324,
    color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    textColor: 'text-white',
    description: 'Machine Learning, Analytics',
  },
  {
    name: 'Database & Analytics',
    icon: Database,
    count: 298,
    color: 'bg-gradient-to-br from-teal-500 to-green-500',
    textColor: 'text-white',
    description: 'SQL, NoSQL, Big Data',
  },
  {
    name: 'Cybersecurity',
    icon: Shield,
    count: 187,
    color: 'bg-gradient-to-br from-red-500 to-pink-500',
    textColor: 'text-white',
    description: 'Security, Penetration Testing',
  },
  {
    name: 'Full Stack',
    icon: Code,
    count: 654,
    color: 'bg-gradient-to-br from-gray-700 to-gray-900',
    textColor: 'text-white',
    description: 'End-to-end Development',
  },
];
const Category = () => {
  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
            Chuyên ngành IT hot nhất
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Khám phá các lĩnh vực công nghệ đang có nhu cầu tuyển dụng cao nhất
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {itCategories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <Card
                key={index}
                className="group relative cursor-pointer overflow-hidden border-gray-200 bg-gray-50/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:shadow-cyan-400/20"
              >
                <CardContent className="relative p-6 text-center">
                  <div
                    className={`inline-flex rounded-2xl p-4 ${category.color} mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className={`h-6 w-6 ${category.textColor}`} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                    {category.name}
                  </h3>
                  <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                  <p className="font-semibold text-cyan-600 dark:text-cyan-400">
                    {category.count.toLocaleString()} việc làm
                  </p>
                </CardContent>
                <div className="absolute inset-0 overflow-hidden bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
