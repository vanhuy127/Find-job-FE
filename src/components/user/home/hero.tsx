import { useState } from 'react';

import { MapPin, Search } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 py-24 transition-colors duration-300 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-cyan-400/20 mix-blend-multiply blur-xl filter dark:bg-cyan-400/10"></div>
      </div>

      {/* Code pattern background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="p-8 font-mono text-xs leading-relaxed text-cyan-600 dark:text-cyan-400">
          {`function findDreamJob() {
            const skills = ['React', 'Node.js', 'Python'];
            const opportunities = searchJobs(skills);
                return opportunities.filter(job => job.isAwesome);
              }`}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <Badge className="border-cyan-200 bg-cyan-100 px-4 py-2 text-sm text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/20 dark:text-cyan-300">
              🚀 Nền tảng tuyển dụng IT #1 Việt Nam
            </Badge>
          </div>
          <h1 className="mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-7xl dark:text-white">
            Tìm việc{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">IT</span> mơ ước
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300">
            Khám phá hàng nghìn cơ hội việc làm IT từ các công ty công nghệ hàng đầu.
            <span className="font-semibold text-cyan-600 dark:text-cyan-400"> Code your future today!</span>
          </p>

          {/* Search Form */}
          <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute top-4 left-4 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Tìm kiếm: React, Python, DevOps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 rounded-xl border-gray-200 bg-gray-50 pl-12 text-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-400"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute top-4 left-4 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Địa điểm"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-14 rounded-xl border-gray-200 bg-gray-50 pl-12 text-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-400"
                />
              </div>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger className="h-14 rounded-xl border-gray-200 bg-gray-50 text-lg text-gray-900 focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-cyan-400">
                  <SelectValue placeholder="Cấp độ" />
                </SelectTrigger>
                <SelectContent className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <SelectItem value="junior">Junior (0-2 năm)</SelectItem>
                  <SelectItem value="mid">Mid-level (2-5 năm)</SelectItem>
                  <SelectItem value="senior">Senior (5+ năm)</SelectItem>
                  <SelectItem value="lead">Tech Lead</SelectItem>
                </SelectContent>
              </Select>
              <Button className="h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-lg font-semibold shadow-lg transition-all duration-300 hover:from-cyan-600 hover:to-blue-600 hover:shadow-xl">
                <Search className="mr-2 h-5 w-5" />
                Tìm kiếm
              </Button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Trending: <span className="font-medium text-cyan-600 dark:text-cyan-400">React Developer</span>,{' '}
                <span className="font-medium text-cyan-600 dark:text-cyan-400">DevOps Engineer</span>,{' '}
                <span className="font-medium text-cyan-600 dark:text-cyan-400">Data Scientist</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
