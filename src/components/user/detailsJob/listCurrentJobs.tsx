import Pagination from '@/components/pagination'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { JOB_TYPE_SHOWS, ROUTE_PATH } from '@/constants'
import { useQueryParams } from '@/hooks/useQueryParams'
import { ICompany } from '@/interface'
import { useCompanyService } from '@/service/company.service'
import { formatSalary, numDateSince } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Briefcase, Building, Clock, DollarSign, MapPin } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

const ListCurrentJobs = ({ company }: { company: ICompany }) => {
    const { query, setQuery } = useQueryParams();
    const { id } = useParams<{ id: string }>();
    const { getJobsForCompany } = useCompanyService();
    const {
        page = 1,
    } = query;
    const navigate = useNavigate();

    const { data: jobs } = useQuery({
        queryKey: ['user-companies-jobs', id],
        queryFn: () => getJobsForCompany(id!),
    });

    return (
        <div className="xl:col-span-2 space-y-6 sm:space-y-8">
            {/* About Company */}
            <Card className="border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800/80">
                <CardContent className="p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3 dark:text-white">
                        <Building className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                        Về công ty
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg text-pretty dark:text-gray-300">
                        {company.description}
                    </p>
                </CardContent>
            </Card>

            {/* Job Listings */}
            <Card className="border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800/80">
                <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3 dark:text-white">
                            <Briefcase className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                            Vị trí đang tuyển ({company.jobCount})
                        </h2>
                    </div>

                    {company.jobCount > 0 ? (
                        <div className="space-y-4 sm:space-y-6">
                            {jobs?.data && jobs.data.map((job) => (
                                <Card
                                    key={job.id}
                                    className="hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 border-gray-200/50 bg-gray-50/30 hover:bg-gray-100/50 hover:scale-[1.01] cursor-pointer group dark:border-gray-700/50 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 dark:hover:shadow-cyan-400/20"
                                >
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors text-balance dark:text-white dark:group-hover:text-cyan-400">
                                                    {job.title}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                                    <span className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-cyan-600 shrink-0 dark:text-cyan-400" />
                                                        {job.province.name}
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <DollarSign className="h-4 w-4 text-blue-600 shrink-0 dark:text-blue-400" />
                                                        <span className="font-medium text-blue-600 dark:text-blue-400">
                                                            {formatSalary(job.salaryMin, job.salaryMax)}
                                                        </span>
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-cyan-500 shrink-0 dark:text-cyan-400" />
                                                        {job?.jobType ? JOB_TYPE_SHOWS[job.jobType] : ''} • {numDateSince(job.createdAt)}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {job.skills.map((skill) => (
                                                        <Badge
                                                            key={skill.id}
                                                            variant="outline"
                                                            className="border-cyan-200 bg-cyan-100/50 text-cyan-700 hover:bg-cyan-100 transition-colors dark:border-cyan-500/30 dark:bg-cyan-500/20 dark:text-cyan-400"
                                                        >
                                                            {skill.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-auto w-full">
                                                <Button onClick={() => navigate(ROUTE_PATH.USER.JOBS.DETAILS.LINK(job.id))}
                                                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl border-0 font-medium transition-all duration-300 hover:shadow-lg">
                                                    Xem chi tiết
                                                </Button>

                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <Pagination currentPage={page}
                                totalPages={jobs?.pagination.totalPages || page}
                                onPageChange={(page) => setQuery({ page: page })} />
                        </div>
                    ) : (
                        <div className="text-center py-12 sm:py-16">
                            <div className="text-gray-400/50 mb-4 dark:text-gray-600/50">
                                <Building className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 opacity-50" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 dark:text-white">
                                Hiện tại chưa có vị trí tuyển dụng
                            </h3>
                            <p className="text-gray-600 text-pretty max-w-md mx-auto dark:text-gray-400">
                                Công ty này hiện chưa đăng tuyển vị trí nào. Hãy theo dõi để cập nhật thông tin mới nhất.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default ListCurrentJobs