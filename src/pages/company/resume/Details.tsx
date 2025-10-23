'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Briefcase,
  Building,
  Calendar,
  Clock,
  Code,
  DollarSign,
  ExternalLink,
  Eye,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import DetailSkeleton from '@/components/detailsSkeleton';
import FormItemCustom from '@/components/formItem';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { DATE_PATTERN, RESUME_STATUS, RESUME_STATUS_SHOWS, ROUTE_PATH } from '@/constants';
import { ResumeStatusFormValues, resumeStatusSchema } from '@/schema/resume.scheme';
import { useResumeService } from '@/service/resume.service';
import { formatDate, formatSalary, getStatusColor } from '@/utils';

const Details = () => {
  const navigate = useNavigate();
  const { getResumeById, changeStatus } = useResumeService();
  const { id } = useParams<{ id: string }>();
  const { data: resume, isLoading } = useQuery({
    queryKey: ['company-resumes', id],
    queryFn: () => getResumeById(id!),
  });
  const queryClient = useQueryClient();

  const form = useForm<ResumeStatusFormValues>({
    resolver: zodResolver(resumeStatusSchema),
    defaultValues: {
      status: '',
    },
  });

  useEffect(() => {
    if (resume) {
      form.reset({
        status: resume.status,
      });
    }
  }, [resume, form]);

  const mutation = useMutation({
    mutationFn: (data: ResumeStatusFormValues) => changeStatus(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-resumes', id] });
    },
  });

  const onSubmit = (data: ResumeStatusFormValues) => {
    if (data.status === resume?.status) {
      return;
    }
    mutation.mutate(data);
  };

  const listStatusShow = {
    [RESUME_STATUS.PENDING]: [RESUME_STATUS.PENDING, RESUME_STATUS.APPROVED, RESUME_STATUS.REJECTED],
    [RESUME_STATUS.APPROVED]: [RESUME_STATUS.APPROVED],
    [RESUME_STATUS.REJECTED]: [RESUME_STATUS.REJECTED],
  };

  if (isLoading) return <DetailSkeleton />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Chi tiết đơn ứng tuyển</h1>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
                onClick={() => {
                  navigate(ROUTE_PATH.COMPANY.JOBS.DETAILS.LINK(resume?.jobId || ''));
                }}
              >
                <Eye className="h-4 w-4" />
                Xem chi tiết công việc
                <ExternalLink className="h-3 w-3" />
              </Button>
              <Badge className={getStatusColor(resume?.status ?? '')}>{resume?.status}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Applicant Information */}
            <Card className="border dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <User className="h-5 w-5" />
                  Thông tin ứng viên
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{resume?.user.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{resume?.user.email}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{resume?.user.phone}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{resume?.user.address}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Sinh năm: {formatDate(resume?.user.dob || '', DATE_PATTERN.DATE)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Information */}
            <Card className="border dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Briefcase className="h-5 w-5" />
                  Thông tin công việc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{resume?.job.title}</h3>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary">{resume?.job.jobType}</Badge>
                    <Badge variant="outline">{resume?.job.level}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formatSalary(resume?.job.salaryMin || 0, resume?.job.salaryMax || 0)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{resume?.job.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Hạn nộp: {formatDate(resume?.job.endDate || '', DATE_PATTERN.DATE)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {resume?.job.numApplications} ứng viên đã nộp
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Required Skills Section */}
          <Card className="border dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Code className="h-5 w-5" />
                Kỹ năng yêu cầu
              </CardTitle>
            </CardHeader>
            <CardContent>
              {resume?.job.skills && resume.job.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {resume.job.skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="outline"
                      className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic dark:text-gray-400">Không có kỹ năng cụ thể được yêu cầu</p>
              )}
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card className="border dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Mô tả công việc</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300">
                {resume?.job.description}
              </p>
            </CardContent>
          </Card>

          {/* Cover Letter */}
          <Card className="border dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <FileText className="h-5 w-5" />
                Thư xin việc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">{resume?.coverLetter}</p>
            </CardContent>
          </Card>

          {/* Resume Section */}
          <Card className="border dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <FileText className="h-5 w-5" />
                CV đính kèm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">CV - {resume?.user.fullName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{resume?.resumePath}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Eye className="h-4 w-4" />
                  Xem
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Application Details */}
          <Card className="border dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Thông tin đơn ứng tuyển</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ngày nộp đơn</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{formatDate(resume?.createdAt || '')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Trạng thái</p>
                  <Badge className={getStatusColor(resume?.status || '')}>{resume?.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <FormItemCustom
            form={form}
            name="status"
            label="Trạng thái"
            renderInput={({ value, onChange }) => (
              <Select key={form.watch('status')} value={String(value)} onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {resume?.status && listStatusShow[resume?.status].map((item) => (
                    <SelectItem key={item} value={item}>
                      {RESUME_STATUS_SHOWS[item]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="cursor-pointer bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg hover:from-cyan-700 hover:to-teal-700"
            >
              {mutation.isPending ? 'Đang cập nhật...' : 'Cập nhật'}
            </Button>

            <Button
              type="button"
              className="cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={() => navigate(ROUTE_PATH.COMPANY.RESUMES.LIST)}
            >
              Quay lại
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Details;
