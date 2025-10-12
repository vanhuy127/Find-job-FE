import {
    MapPin,
    Clock,
    DollarSign,
    Users,
    Bookmark,
    Building,
    Star,
    TrendingUp,
    Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useJobService } from "@/service/job.service"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { formatDate, formatSalary, numDateSince } from "@/utils"
import { DATE_PATTERN, JOB_LEVEL_SHOWS, JOB_TYPE_SHOWS, ROUTE_PATH } from "@/constants"
import { useState } from "react"
import UploadCVDialog from "@/components/user/detailsJob/uploadCVDialog"
import { useCheckLogin } from "@/hooks/useCheckLogin"
const JobDetails = () => {

    const { getJobByIdForUser, getJobsForUser, getCurrentResumesByJobId } = useJobService();
    const [openDialog, setOpenDialog] = useState(false);
    const { checkLogin, isLoggedIn } = useCheckLogin();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: job } = useQuery({
        queryKey: ['user-jobs', id],
        queryFn: () => getJobByIdForUser(id!),
    });

    const { data: similarJobs } = useQuery({
        queryKey: ['user-jobs', job?.province.name],
        queryFn: () =>
            getJobsForUser({
                page: 1,
                size: "6",
                province: job?.province.name || '',
            }),
        enabled: !!job?.province.name,
    });

    const { data: appliedResumes } = useQuery({
        queryKey: ['applied-resumes', id],
        queryFn: () => getCurrentResumesByJobId(id!),
        enabled: !!id && isLoggedIn, // Chỉ gọi khi đã đăng nhập
    });

    const handleApply = () => {
        checkLogin(() => {
            setOpenDialog(true);
        });
    };

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-800 dark:to-cyan-800">
                <div className="text-gray-500 dark:text-gray-400">Đang tải ...</div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50 to-cyan-50 dark:from-gray-900 dark:via-cyan-900 dark:to-cyan-900">
                <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                        {/* Main Content */}
                        <div className="xl:col-span-2 space-y-6">
                            {/* Job Header */}
                            <Card className="border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-6 sm:p-8">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <Avatar className="h-20 w-20 rounded-xl">
                                            <AvatarImage src={job.company.logo || "/placeholder.svg"} alt={job.company.name} />
                                            <AvatarFallback className="rounded-xl text-lg font-semibold bg-cyan-100 text-cyan-600">
                                                {job.company.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h1>
                                                <p className="text-lg text-cyan-600 dark:text-cyan-400 font-semibold">{job.company.name}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                                                    {job.address}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                                                    {formatSalary(job.salaryMin, job.salaryMax)}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                                                    {job?.jobType ? JOB_TYPE_SHOWS[job.jobType] : ''}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                                                    {job?.level ? JOB_LEVEL_SHOWS[job.level] : ''}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {job.skills.map((skill, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="bg-cyan-100 text-cyan-600 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300"
                                                    >
                                                        {skill.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-5 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex gap-3">
                                            {
                                                appliedResumes && appliedResumes.data.length > 0 ? (
                                                    <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white" disabled>Bạn đã ứng tuyển cho vị trí này</Button>
                                                ) : (
                                                    <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white" onClick={handleApply}>Ứng tuyển ngay</Button>
                                                )
                                            }
                                            <Button variant="outline" size="icon" className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent">
                                                <Bookmark className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {appliedResumes && appliedResumes.data.length > 0 && (
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">CV đã nộp</h4>
                                                <ul className="space-y-2">
                                                    {appliedResumes.data.map((app) => (
                                                        <li key={app.id} className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded">
                                                            <span className="text-sm text-gray-900 dark:text-white">{app.resumePath}</span>
                                                            <Button variant="outline" size="icon" className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent">
                                                                {/* TODO: Điều hướng đến trang chi tiết CV */}
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                            {/* Job Description */}
                            <Card className="border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-6 sm:p-8">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                        <Building className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                        Mô tả công việc
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{job.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Job Stats */}
                            <Card className="border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                        <TrendingUp className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                        Thông tin tuyển dụng
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                                            <span className="text-sm text-gray-500 dark:text-gray-300">Ngày đăng</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">{numDateSince(job.createdAt)}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                                            <span className="text-sm text-gray-500 dark:text-gray-300">Hạn ứng tuyển</span>
                                            <span className="font-semibold text-cyan-600 dark:text-cyan-400">{formatDate(job.endDate, DATE_PATTERN.DATE)}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                                            <span className="text-sm text-gray-500 dark:text-gray-300">Số ứng viên</span>
                                            <span className="font-semibold text-cyan-600 dark:text-cyan-400">{job.numApplications}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            {/* Company Info */}
                            <Card className="border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                        <Building className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                        Thông tin công ty
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12 rounded-lg">
                                                <AvatarImage src={job.company.logo || "/placeholder.svg"} alt={job.company.name} />
                                                <AvatarFallback className="rounded-lg bg-cyan-100 text-cyan-600">
                                                    {job.company.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">{job.company.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-300">{job.province.name}</p>
                                            </div>
                                        </div>
                                        <Button onClick={() => navigate(ROUTE_PATH.USER.COMPANIES.DETAILS.LINK(job.company.id))} variant="outline" className="w-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent">
                                            Xem trang công ty
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                            {/* Similar Jobs */}
                            <Card className="border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                        <Star className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                        Việc làm tương tự
                                    </h3>
                                    <div className="space-y-4">
                                        {similarJobs?.data && similarJobs?.data.filter((job) => job.id !== id).length > 0 ? (similarJobs.data.filter((job) => job.id !== id).map((similarJob) => (
                                            <div
                                                key={similarJob.id}
                                                onClick={() => navigate(ROUTE_PATH.USER.JOBS.DETAILS.LINK(similarJob.id))}
                                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer group hover:shadow-md"
                                            >
                                                <Avatar className="h-10 w-10 rounded-lg">
                                                    <AvatarImage src={similarJob.company.logo || "/placeholder.svg"} alt={similarJob.company.logo} />
                                                    <AvatarFallback className="rounded-lg bg-cyan-100 text-cyan-600 text-sm">
                                                        {similarJob.company.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors text-sm leading-tight">
                                                        {similarJob.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-300">
                                                            <Building className="h-3 w-3" />
                                                            {similarJob.company.name}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-300">
                                                            <MapPin className="h-3 w-3" />
                                                            {similarJob.province.name}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-2 text-sm text-cyan-500 dark:text-cyan-300 font-bold">
                                                            <DollarSign className="h-3 w-3" />
                                                            {formatSalary(similarJob.salaryMin, similarJob.salaryMax)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))) : (
                                            <p className="text-sm text-gray-500 italic dark:text-gray-400 text-center">
                                                Không có công việc tương tự
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <UploadCVDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </>
    )
}

export default JobDetails