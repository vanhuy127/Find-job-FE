import { Label } from '@radix-ui/react-dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Target,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import DetailSkeleton from '@/components/detailsSkeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { JOB_LEVEL_SHOWS, JOB_TYPE_SHOWS } from '@/constants';
import { useJobService } from '@/service/job.service';
import { formatDate, formatSalary, isDateExpired } from '@/utils';

const Details = () => {
  const { getJobById } = useJobService();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-jobs', id],
    queryFn: () => getJobById(id!),
  });

  if (isLoading) return <DetailSkeleton />;

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
            <p className="text-muted-foreground text-sm">Mức lương</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {/* Trạng thái */}
        <Card className="col-span-1 border-green-200 bg-green-50 md:col-span-1">
          <CardContent className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Trạng thái</p>
                <p className="text-lg font-bold text-green-800">
                  {isDateExpired(typeof data?.endDate === 'string' ? data.endDate : '')
                    ? 'Đã kết thúc'
                    : 'Đang tuyển dụng'}
                </p>
              </div>
              {isDateExpired(typeof data?.endDate === 'string' ? data.endDate : '') ? (
                <XCircle className="h-8 w-8 text-red-600" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-600" />
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-muted-foreground text-sm">Số lượng ứng viên</p>
                <p className="text-2xl font-bold">
                  {data?.numApplicationsApproved}/{data?.numApplications || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-muted-foreground text-sm">Mức lương tối thiểu</p>
                <p className="text-2xl font-bold">{((data?.salaryMin || 0) / 1000000).toFixed(2)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-muted-foreground text-sm">Mức lương tối đa</p>
                <p className="text-2xl font-bold">{((data?.salaryMax || 0) / 1000000).toFixed(2)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-muted-foreground text-sm">Số ngày còn lại</p>
                <p className="text-2xl font-bold">
                  {Math.max(
                    0,
                    Math.ceil((new Date(data?.endDate || '').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
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
            <Briefcase className="h-5 w-5" />
            <span>Thông tin công việc</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold">Thông tin cơ bản</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Tiêu đề công việc</span>
                </Label>
                <p className="bg-muted rounded p-3 text-sm">{data?.title}</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Địa chỉ</span>
                </Label>
                <p className="bg-muted rounded p-3 text-sm">{data?.address}</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Tỉnh thành</span>
                </Label>
                <p className="bg-muted rounded p-3 text-sm">{data?.province.name}</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Loại công việc</span>
                </Label>
                <div className="bg-muted rounded p-3">{data?.jobType ? JOB_TYPE_SHOWS[data.jobType] : ''}</div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Mức độ</span>
                </Label>
                <div className="bg-muted rounded p-3">{data?.level ? JOB_LEVEL_SHOWS[data.level] : ''}</div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Mức lương</span>
                </Label>
                <p className="bg-muted rounded p-3 text-sm font-medium text-green-600">
                  {formatSalary(data?.salaryMin || 0, data?.salaryMax || 0)}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Hạn nộp đơn</span>
                </Label>
                <p
                  className={`bg-muted rounded p-3 text-sm ${isDateExpired(typeof data?.endDate === 'string' ? data.endDate : '') ? 'font-medium text-red-600' : ''}`}
                >
                  {formatDate(data?.endDate || '')}
                  {isDateExpired(typeof data?.endDate === 'string' ? data.endDate : '') && ' (Expired)'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mô tả công việc</Label>
              <div className="bg-muted rounded p-4 text-sm leading-relaxed whitespace-pre-wrap">
                {data?.description || 'No description available'}
              </div>
            </div>

            {data && data?.skills?.length > 0 && (
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Kỹ năng yêu cầu</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
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
            <h3 className="border-b pb-2 text-lg font-semibold">Thời gian</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <span className="font-medium">Ngày tạo:</span>
                  <p className="text-muted-foreground text-sm">{formatDate(data?.createdAt || '')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <span className="font-medium">Cập nhật lần cuối:</span>
                  <p className="text-muted-foreground text-sm">{formatDate(data?.updatedAt || '')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <span className="font-medium">Hạn nộp đơn:</span>
                  <p className="text-muted-foreground text-sm">{formatDate(data?.endDate || '')}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
