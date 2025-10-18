import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import DetailSkeleton from '@/components/detailsSkeleton';
import { useResumeService } from "@/service/resume.service";
import { formatDate, formatSalary } from "@/utils";
import { DATE_PATTERN } from "@/constants";
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, DollarSign, FileText, MapPin } from "lucide-react";

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getResumesByIdForUser } = useResumeService();
    const { data: resume, isLoading } = useQuery({
        queryKey: ["user-resumes", id],
        queryFn: () => getResumesByIdForUser(id!),
    });

    if (isLoading) return <DetailSkeleton />;
    if (!resume) return <div>Không tìm thấy đơn ứng tuyển</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {/* Nút quay lại */}
                <div className="mb-6">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="flex items-center gap-2 border-cyan-600 text-cyan-700 dark:border-cyan-400 dark:text-cyan-300 hover:bg-cyan-50 hover:text-cyan-900 dark:hover:bg-gray-800"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Quay lại
                    </Button>
                </div>
                {/* Header */}
                <Card className="mb-8 border-0 shadow-lg overflow-hidden rounded-2xl bg-white dark:bg-gray-900 dark:border-gray-800">
                    <CardContent className="pt-8">
                        <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                            {/* Company Logo */}
                            <div className="flex-shrink-0">
                                <img
                                    src={resume.job.company.logo || "/placeholder.svg"}
                                    alt={resume.job.company.name}
                                    className="w-24 h-24 rounded-xl border-4 border-white dark:border-gray-800 shadow-md object-cover"
                                />
                            </div>

                            {/* Job Info */}
                            <div className="flex-1 pt-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                                    {resume.job.title}
                                </h1>
                                <p className="text-lg font-semibold text-cyan-700 dark:text-cyan-400 mb-3">
                                    {resume.job.company.name}
                                </p>

                                {/* Job Tags */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge className="bg-cyan-600 text-white shadow-sm">{resume.job.jobType}</Badge>
                                    <Badge className="bg-blue-600 text-white shadow-sm">{resume.job.level}</Badge>
                                    <Badge
                                        variant="outline"
                                        className="flex items-center gap-1 border-cyan-600 text-cyan-700 dark:border-cyan-400 dark:text-cyan-300"
                                    >
                                        <CheckCircle2 className="w-3 h-3" />
                                        {resume.status}
                                    </Badge>
                                </div>

                                {/* Company Website */}
                                <a
                                    href={resume.job.company.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:text-cyan-600 dark:text-blue-400 dark:hover:text-cyan-400 transition-colors text-sm font-medium"
                                >
                                    {resume.job.company.website} →
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Job Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* Salary */}
                    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800">
                        <CardContent>
                            <div className="flex items-start gap-3">
                                <DollarSign className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Mức lương</p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                                        {formatSalary(resume.job.salaryMin, resume.job.salaryMax)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Apply Date */}
                    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800">
                        <CardContent>
                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ngày ứng tuyển</p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                                        {formatDate(resume.createdAt, DATE_PATTERN.DATE_TIME)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Address */}
                    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800">
                        <CardContent>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Địa điểm</p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                                        {resume.job.company.address}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Job Description */}
                <Card className="mb-8 border-0 shadow-md rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-cyan-600" />
                            <CardTitle className="text-gray-900 dark:text-gray-100 font-semibold">
                                Mô tả công việc
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line text-base">
                            {resume.job.description}
                        </p>
                    </CardContent>
                </Card>

                {/* Cover Letter + CV */}
                <Card className="border-0 shadow-md rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <CardTitle className="text-gray-900 dark:text-gray-100 font-semibold">
                                Đơn ứng tuyển của bạn
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">

                        {/* Cover Letter */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Thư xin việc</h3>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                                    {resume.coverLetter}
                                </p>
                            </div>
                        </div>

                        {/* View CV Button */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                onClick={() =>
                                    window.open(resume.resumePath, "_blank")
                                }
                                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold gap-2 rounded-lg"
                            >
                                <FileText className="w-4 h-4" />
                                Xem CV
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Details