import { useCallback, useEffect, useState } from "react"
import FilterSide from "@/components/user/listJobs/filterSide"
import { useQueryParams } from "@/hooks/useQueryParams"
import { useJobService } from "@/service/job.service"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "@/hooks/useDebounce"
import { MAX_PAGE_SHOW } from "@/constants"
import Pagination from "@/components/pagination"
import ListJobs from "@/components/user/listJobs/listJobs"
import JobSearchBar from "@/components/user/listJobs/search"

export default function Jobs() {
  const { query, setQuery } = useQueryParams();
  const { getJobsForUser } = useJobService();

  const {
    page = 1,
    search = '',
    province = '',
    jobType = '',
    level = '',
    minSalary = '',
    maxSalary = '',
    skills = [],
    size = MAX_PAGE_SHOW
  } = query;

  const [jobTypeFilter, setJobTypeFilter] = useState(jobType);
  const [levelFilter, setLevelFilter] = useState(level);
  const [minSalaryFilter, setMinSalaryFilter] = useState(minSalary);
  const [maxSalaryFilter, setMaxSalaryFilter] = useState(maxSalary);
  const [skillFilter, setSkillFilter] = useState((typeof skills === 'string' || skills instanceof String) ? [skills] : skills);
  const [searchInput, setSearchInput] = useState(search);
  const [provinceFilter, setProvinceFilter] = useState<string>(province);

  const debouncedSearch = useDebounce(searchInput);
  useEffect(() => {
    if (
      debouncedSearch !== query.search ||
      provinceFilter !== query.province ||
      jobTypeFilter !== query.jobType ||
      levelFilter !== query.level ||
      minSalaryFilter !== query.minSalary ||
      maxSalaryFilter !== query.maxSalary ||
      skillFilter !== query.skills
    ) {
      setQuery({
        search: debouncedSearch,
        page: 1,
        province: provinceFilter,
        jobType: jobTypeFilter,
        level: levelFilter,
        minSalary: minSalaryFilter,
        maxSalary: maxSalaryFilter,
        skills: skillFilter,
      });
    }
  }, [debouncedSearch, provinceFilter, jobTypeFilter, levelFilter, minSalaryFilter, maxSalaryFilter, skillFilter]);


  const { data: jobs, isLoading } = useQuery({
    queryKey: ['user-jobs', page, debouncedSearch, size, provinceFilter, jobTypeFilter, levelFilter, minSalaryFilter, maxSalaryFilter, skillFilter],
    queryFn: () =>
      getJobsForUser({
        page,
        search: debouncedSearch,
        size,
        province: provinceFilter,
        jobType: jobTypeFilter,
        level: levelFilter,
        minSalary: minSalaryFilter,
        maxSalary: maxSalaryFilter,
        skills: skillFilter,
      }),
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleLocationChange = useCallback((locations: string) => {

    setProvinceFilter(locations);
  }, []);
  const handleJobTypeChange = useCallback((value: string) => {
    setJobTypeFilter(value);
  }, []);

  const handleLevelChange = useCallback((value: string) => {
    setLevelFilter(value);
  }, []);

  const handleMinSalaryChange = useCallback((value: string) => {
    setMinSalaryFilter(value);
  }, []);

  const handleMaxSalaryChange = useCallback((value: string) => {
    setMaxSalaryFilter(value);
  }, []);

  const handleSkillChange = useCallback((skills: string[]) => {
    setSkillFilter(skills);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-800 dark:to-cyan-800">
      <div className="container mx-auto px-6 py-8">
        {/* Search Form */}
        <JobSearchBar
          searchTerm={searchInput}
          onSearchChange={handleSearchChange}
          location={provinceFilter}
          onLocationChange={handleLocationChange}
          className="backdrop-blur-sm"
        />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* filter side */}
          <FilterSide
            skills={skillFilter}
            onSkillChange={handleSkillChange}
            minSalary={minSalaryFilter}
            onMinSalaryChange={handleMinSalaryChange}
            maxSalary={maxSalaryFilter}
            onMaxSalaryChange={handleMaxSalaryChange}
            level={levelFilter}
            onLevelChange={handleLevelChange}
            jobType={jobTypeFilter}
            onJobTypeChange={handleJobTypeChange}
          />

          <main className="flex-1">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Tìm thấy <span className="text-rose-500">{jobs?.pagination.total}</span> công việc IT
              </h2>
              <p className="text-gray-600 text-lg dark:text-gray-400">
                Những cơ hội việc làm IT tốt nhất với mức lương hấp dẫn
              </p>
            </div>
            {
              jobs?.data && (<ListJobs jobs={jobs.data} isLoading={isLoading} />)
            }

            {jobs && jobs?.pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Pagination
                  currentPage={page}
                  totalPages={jobs?.pagination.totalPages || page}
                  onPageChange={(page) => setQuery({ page: page })}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
