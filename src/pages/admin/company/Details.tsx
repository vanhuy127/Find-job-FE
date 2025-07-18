import { Label } from '@radix-ui/react-dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle,
  Crown,
  FileText,
  Globe,
  Mail,
  MapPin,
  Users,
  XCircle,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useCompanyService } from '@/service/company.service';
import { formatDate } from '@/utils';

import CompanyDetailSkeleton from './components/Skeleton';

const Details = () => {
  const { getCompanyById } = useCompanyService();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-companies', id],
    queryFn: () => getCompanyById(id!),
  });
  const getStatusBadge = () => {
    if (data?.status === 1) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="mr-1 h-3 w-3" />
          Đã phê duyệt
        </Badge>
      );
    } else if (data?.status === 0) {
      return (
        <Badge variant="destructive">
          <XCircle className="mr-1 h-3 w-3" />
          Đã từ chối
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary">
          <AlertCircle className="mr-1 h-3 w-3" />
          Chờ phê duyệt
        </Badge>
      );
    }
  };

  if (isLoading) return <CompanyDetailSkeleton />;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start space-x-4">
        <img
          src={data?.logo || '/placeholder.svg'}
          alt={`${data?.name} logo`}
          width={80}
          height={80}
          className="rounded-lg border"
        />
        <div>
          <h1 className="text-3xl font-bold">{data?.name}</h1>
          <p className="text-muted-foreground mt-1">ID: {data?.id}</p>
          <div className="mt-2 flex items-center space-x-2">{getStatusBadge()}</div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="px-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-muted-foreground text-sm">Việc làm</p>
                <p className="text-2xl font-bold">30</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-4">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-muted-foreground text-sm">Gói VIP</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Combined Information */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin chi tiết công ty</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold">Thông tin cơ bản</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Tên công ty</span>
                </Label>
                <p className="bg-muted rounded p-2 text-sm">{data?.name}</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Label>
                <p className="bg-muted rounded p-2 text-sm">{data?.email}</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Địa chỉ</span>
                </Label>
                <p className="bg-muted rounded p-2 text-sm">{data?.address}</p>
              </div>

              <div className="space-y-2">
                <Label>Tỉnh/Thành phố</Label>
                <p className="bg-muted rounded p-2 text-sm">{data?.province.name}</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </Label>
                <p className="bg-muted rounded p-2 text-sm">
                  {data?.website ? (
                    <a
                      href={data.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {data.website}
                    </a>
                  ) : (
                    'Chưa cập nhật'
                  )}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Mã số thuế</Label>
                <p className="bg-muted rounded p-2 text-sm">{data?.taxCode}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mô tả công ty</Label>
              <p className="bg-muted rounded p-3 text-sm leading-relaxed">{data?.description || 'Chưa có mô tả'}</p>
            </div>

            {data?.reasonReject && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-red-800">
                    <XCircle className="h-5 w-5" />
                    <span>Lý do từ chối</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-red-700">{data.reasonReject}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <Separator />

          {/* Legal Documents Section */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold">Giấy tờ pháp lý</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Giấy phép kinh doanh</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={data?.businessLicensePath} target="_blank" rel="noopener noreferrer">
                      Xem file
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* History Section */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold">Thông tin thời gian</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data?.createdAt && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Ngày tạo:</span>
                  <span>{formatDate(data.createdAt)}</span>
                </div>
              )}

              {data?.updatedAt && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Cập nhật lần cuối:</span>
                  <span>{formatDate(data.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
