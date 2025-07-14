import { useQuery } from '@tanstack/react-query';
import {
    Building2,
    MapPin,
    Calendar,
    Users,
    DollarSign,
    TrendingUp,
    Clock,
    Briefcase,
    Target,
    XCircle,
    CheckCircle,
} from "lucide-react"
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/utils';
import { useJobService } from '@/service/job.service';
import { JOB_LEVEL_SHOWS, JOB_TYPE_SHOWS } from '@/constants';
import JobDetailSkeleton from './components/Skeleton';

const Details = () => {
    const { getJobById } = useJobService();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useQuery({
        queryKey: ['admin-jobs', id],
        queryFn: () => getJobById(id!),
    });

    const formatSalary = (min: number, max: number) => {
        const formatNumber = (num: number) => {
            if (num >= 1000000) {
                return `${(num / 1000000).toFixed(1)}M`
            }

            return `${(num / 1000).toFixed(0)}K`
        }

        return `${formatNumber(min)} - ${formatNumber(max)} VND`
    }

    const isJobExpired = (endDate: string) => {
        return new Date(endDate) < new Date()
    }

    if (isLoading) return <JobDetailSkeleton />;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{data?.title}</h1>
                        <p className="text-muted-foreground">Mã công việc: {data?.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                            {formatSalary(data?.salaryMin || 0, data?.salaryMax || 0)}
                        </p>
                        <p className="text-sm text-muted-foreground">Mức lương</p>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Trạng thái */}
                <Card className="border-green-200 bg-green-50 col-span-1 md:col-span-1">
                    <CardContent className="px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-600">Trạng thái</p>
                                <p className="text-lg font-bold text-green-800">
                                    {isJobExpired(typeof data?.endDate === "string" ? data.endDate : "") ? "Đã kết thúc" : "Đang tuyển dụng"}
                                </p>
                            </div>
                            {isJobExpired(typeof data?.endDate === "string" ? data.endDate : "") ? (
                                <XCircle className="w-8 h-8 text-red-600" />
                            ) : (
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="px-4">
                        <div className="flex items-center space-x-3">
                            <Users className="w-8 h-8 text-blue-600" />
                            <div>
                                <p className="text-sm text-muted-foreground">Số lượng ứng viên</p>
                                <p className="text-2xl font-bold">{data?.numApplications || 0}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="px-4">
                        <div className="flex items-center space-x-3">
                            <DollarSign className="w-8 h-8 text-green-600" />
                            <div>
                                <p className="text-sm text-muted-foreground">Mức lương tối thiểu</p>
                                <p className="text-2xl font-bold">{(data?.salaryMin || 0) / 1000000}M</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="px-4">
                        <div className="flex items-center space-x-3">
                            <TrendingUp className="w-8 h-8 text-purple-600" />
                            <div>
                                <p className="text-sm text-muted-foreground">Mức lương tối đa</p>
                                <p className="text-2xl font-bold">{(data?.salaryMax || 0) / 1000000}M</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="px-4">
                        <div className="flex items-center space-x-3">
                            <Clock className="w-8 h-8 text-orange-600" />
                            <div>
                                <p className="text-sm text-muted-foreground">Số ngày còn lại</p>
                                <p className="text-2xl font-bold">
                                    {Math.max(
                                        0,
                                        Math.ceil((new Date(data?.endDate || "").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Briefcase className="w-5 h-5" />
                        <span>Thông tin công việc</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Basic Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Thông tin cơ bản</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="flex items-center space-x-2">
                                    <Briefcase className="w-4 h-4" />
                                    <span>Tiêu đề công việc</span>
                                </Label>
                                <p className="text-sm bg-muted p-3 rounded">{data?.title}</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Địa chỉ</span>
                                </Label>
                                <p className="text-sm bg-muted p-3 rounded">{data?.address}</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Tỉnh thành</span>
                                </Label>
                                <p className="text-sm bg-muted p-3 rounded">{data?.province.name}</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center space-x-2">
                                    <Building2 className="w-4 h-4" />
                                    <span>Loại công việc</span>
                                </Label>
                                <div className="bg-muted p-3 rounded">{data?.jobType ? JOB_TYPE_SHOWS[data.jobType] : ""}</div>
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center space-x-2">
                                    <Target className="w-4 h-4" />
                                    <span>Mức độ</span>
                                </Label>
                                <div className="bg-muted p-3 rounded">{data?.level ? JOB_LEVEL_SHOWS[data.level] : ""}</div>
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center space-x-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span>Mức lương</span>
                                </Label>
                                <p className="text-sm bg-muted p-3 rounded font-medium text-green-600">
                                    {formatSalary(data?.salaryMin || 0, data?.salaryMax || 0)}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Hạn nộp đơn</span>
                                </Label>
                                <p
                                    className={`text-sm bg-muted p-3 rounded ${isJobExpired(typeof data?.endDate === "string" ? data.endDate : "") ? "text-red-600 font-medium" : ""}`}
                                >
                                    {formatDate(data?.endDate || "")}
                                    {isJobExpired(typeof data?.endDate === "string" ? data.endDate : "") && " (Expired)"}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Mô tả công việc</Label>
                            <div className="text-sm bg-muted p-4 rounded leading-relaxed whitespace-pre-wrap">
                                {data?.description || "No description available"}
                            </div>
                        </div>

                        {data && data?.skills?.length > 0 && (
                            <div className="space-y-2">
                                <Label className="flex items-center space-x-2">
                                    <Target className="w-4 h-4" />
                                    <span>Kỹ năng yêu cầu</span>
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill) => (
                                        <span
                                            key={skill.id}
                                            className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 font-medium"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    <Separator />
                    {/* Timeline Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Thời gian</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <div>
                                    <span className="font-medium">Ngày tạo:</span>
                                    <p className="text-sm text-muted-foreground">{formatDate(data?.createdAt || "")}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Calendar className="w-5 h-5 text-green-600" />
                                <div>
                                    <span className="font-medium">Cập nhật lần cuối:</span>
                                    <p className="text-sm text-muted-foreground">{formatDate(data?.updatedAt || "")}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Clock className="w-5 h-5 text-orange-600" />
                                <div>
                                    <span className="font-medium">Hạn nộp đơn:</span>
                                    <p className="text-sm text-muted-foreground">{formatDate(data?.endDate || "")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Details