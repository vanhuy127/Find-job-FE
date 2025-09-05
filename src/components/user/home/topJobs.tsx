import { Building, Clock, DollarSign, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useJobService } from '@/service/job.service';
import { useQuery } from '@tanstack/react-query';
import { JOB_LEVEL_SHOWS, JOB_TYPE_SHOWS, ROUTE_PATH } from '@/constants';
import { formatSalary, numDateSince } from '@/utils';
import { useNavigate } from 'react-router-dom';

const TopJobs = () => {
  const { getJobsForUser } = useJobService();
  const navigate = useNavigate();

  const { data: jobs } = useQuery({
    queryKey: ['user-jobs'],
    queryFn: () =>
      getJobsForUser({
        page: 1,
        size: '6',
      }),
  });

  return (
    <section className="theme-transition bg-white py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">Việc làm IT hot nhất</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Những cơ hội việc làm IT tốt nhất với mức lương hấp dẫn và công nghệ hiện đại
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs?.data.map((job) => (
            <Card
              key={job.id}
              className="theme-transition cursor-pointer gap-4 overflow-hidden border-gray-200 bg-white transition-shadow hover:shadow-2xl hover:shadow-cyan-500/20 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-cyan-400/20"
            >
              <CardHeader className="theme-transition">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-500 dark:bg-gray-600">
                      <img src={job?.company.logo || '/placeholder.svg'} alt={job.company.name} className="h-14 w-14 rounded-lg shrink-0" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-900 dark:text-white overflow-hidden text-ellipsis line-clamp-1">{job.title}</CardTitle>
                      <CardDescription className="flex items-center font-medium text-gray-600 dark:text-gray-400">
                        <Building className="mr-2 h-4 w-4" />
                        {job.company.name}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className="bg-blue-100 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {job?.level ? JOB_LEVEL_SHOWS[job.level] : ''}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-full theme-transition bg-white p-6 dark:bg-gray-800">
                <div className="space-y-4 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="mr-3 h-5 w-5 text-cyan-500" />
                      <span className="font-medium">{job.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <DollarSign className="mr-3 h-5 w-5 text-green-500" />
                      <span className="font-medium text-green-600 dark:text-green-400">{formatSalary(job?.salaryMin || 0, job?.salaryMax || 0)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="mr-3 h-5 w-5 text-purple-500" />
                      <span>
                        {job?.jobType ? JOB_TYPE_SHOWS[job.jobType] : ''} • {numDateSince(job.createdAt)}
                      </span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-cyan-200 bg-cyan-50 px-3 py-1 text-cyan-700 dark:border-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="mt-5 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-600">
                    Ứng tuyển ngay
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-2 border-cyan-500 px-8 py-4 font-semibold text-cyan-600 hover:bg-cyan-500 hover:text-white dark:text-cyan-400"
            onClick={() => navigate(ROUTE_PATH.USER.LIST_JOBS)}
          >
            Xem tất cả việc làm IT
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopJobs;
