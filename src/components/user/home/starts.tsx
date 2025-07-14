import React from 'react';

const Starts = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-100 via-blue-50 to-cyan-50 py-20 transition-colors duration-300 dark:from-gray-800 dark:via-blue-900 dark:to-cyan-900">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-cyan-400/10 mix-blend-multiply blur-xl filter dark:bg-cyan-400/5"></div>
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-400/10 mix-blend-multiply blur-xl filter dark:bg-blue-400/5"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">Tại sao chọn DevJobs?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Nền tảng tuyển dụng IT được tin tưởng nhất</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="group text-center">
            <div className="rounded-2xl border border-gray-200/50 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/70 dark:border-gray-700/50 dark:bg-white/5 dark:group-hover:bg-white/10">
              <div className="mb-4 text-5xl font-bold text-cyan-600 md:text-6xl dark:text-cyan-400">5,000+</div>
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300">Việc làm IT</div>
            </div>
          </div>
          <div className="group text-center">
            <div className="rounded-2xl border border-gray-200/50 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/70 dark:border-gray-700/50 dark:bg-white/5 dark:group-hover:bg-white/10">
              <div className="mb-4 text-5xl font-bold text-cyan-600 md:text-6xl dark:text-cyan-400">1,200+</div>
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300">Công ty Tech</div>
            </div>
          </div>
          <div className="group text-center">
            <div className="rounded-2xl border border-gray-200/50 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/70 dark:border-gray-700/50 dark:bg-white/5 dark:group-hover:bg-white/10">
              <div className="mb-4 text-5xl font-bold text-cyan-600 md:text-6xl dark:text-cyan-400">25,000+</div>
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300">IT Developers</div>
            </div>
          </div>
          <div className="group text-center">
            <div className="rounded-2xl border border-gray-200/50 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/70 dark:border-gray-700/50 dark:bg-white/5 dark:group-hover:bg-white/10">
              <div className="mb-4 text-5xl font-bold text-cyan-600 md:text-6xl dark:text-cyan-400">98%</div>
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300">Tỷ lệ match</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Starts;
