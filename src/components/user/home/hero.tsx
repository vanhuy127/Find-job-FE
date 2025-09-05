import { Badge } from '@/components/ui/badge';

const Hero = () => {

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
        </div>
      </div>
    </section>
  );
};

export default Hero;
