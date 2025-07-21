import { useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import ComboboxFilter from '@/components/admin/comboboxFilter';
import { DatePicker } from '@/components/datePicker';
import FormItemCustom from '@/components/formItem';
import InputCurrency from '@/components/inputCurrency';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import {
  DATE_PATTERN,
  JOB_LEVEL_ARRAY,
  JOB_LEVEL_SHOWS,
  JOB_TYPE_ARRAY,
  JOB_TYPE_SHOWS,
  ROUTE_PATH,
} from '@/constants';
import { JobFormValues, jobSchema } from '@/schema/job.schema';
import { useJobService } from '@/service/job.service';
import { useProvinceService } from '@/service/province.service';
import { formatDate, parseDateFromString } from '@/utils';
import { Label } from '@/components/ui/label';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editJob, getJobById } = useJobService();
  const { getProvinces } = useProvinceService();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      description: '',
      address: '',
      province: '',
      jobType: '',
      level: '',
      numApplications: 0,
      salaryMin: 0,
      salaryMax: 0,
      endDate: formatDate(new Date(), DATE_PATTERN.DATE),
    },
  });

  const { data: job } = useQuery({
    queryKey: ['company-jobs', id],
    queryFn: () => getJobById(id!),
  });

  useEffect(() => {
    if (job) {
      form.reset({
        title: job.title,
        description: job.description,
        address: job.address,
        province: job.province.id,
        jobType: job.jobType,
        level: job.level,
        numApplications: job.numApplications,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        endDate: formatDate(job.endDate, DATE_PATTERN.DATE),
      });
    }
  }, [job, form]);

  const { data: provinces } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => getProvinces(),
  });

  const provinceOptions = useMemo(() => {
    const filteredProvinces = [
      ...(provinces?.data?.map((province) => ({
        label: province.name,
        value: province.id,
      })) || []),
    ];

    return filteredProvinces;
  }, [provinces]);

  const mutation = useMutation({
    mutationFn: (data: JobFormValues) => editJob(id!, data),
    onSuccess: () => {
      navigate(ROUTE_PATH.COMPANY.JOBS.LIST);
      form.reset();
    },
  });

  const onSubmit = (data: JobFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="space-y-6 dark:text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Cập nhật công việc</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormItemCustom
            form={form}
            name="title"
            label="Tiêu đề công việc"
            renderInput={(field) => <Input {...field} placeholder="Nhập tiêu đề..." />}
          />

          <FormItemCustom
            form={form}
            name="description"
            label="Mô tả công việc"
            renderInput={(field) => <Textarea {...field} placeholder="Nhập mô tả chi tiết..." />}
          />

          <FormItemCustom
            form={form}
            name="address"
            label="Địa chỉ"
            renderInput={(field) => <Input {...field} placeholder="Nhập địa chỉ..." />}
          />

          <FormItemCustom
            form={form}
            name="province"
            label="Tỉnh thành"
            renderInput={({ value, onChange }) => (
              <ComboboxFilter
                options={provinceOptions}
                placeholder="Chọn tỉnh thành"
                value={String(value)}
                onChange={onChange}
              />
            )}
          />

          <FormItemCustom
            form={form}
            name="jobType"
            label="Loại công việc"
            renderInput={({ value, onChange }) => (
              <Select key={form.watch("jobType")} value={String(value)} onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại công việc" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPE_ARRAY.map((item) => (
                    <SelectItem key={item} value={item}>
                      {JOB_TYPE_SHOWS[item]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <FormItemCustom
            form={form}
            name="level"
            label="Cấp bậc"
            renderInput={({ value, onChange }) => (
              <Select key={form.watch("level")} value={String(value)} onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn cấp bậc" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_LEVEL_ARRAY.map((item) => (
                    <SelectItem key={item} value={item}>
                      {JOB_LEVEL_SHOWS[item]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <div className='grid grid-cols-2 gap-5'>
            <FormItemCustom
              form={form}
              name="numApplications"
              label="Số lượng ứng tuyển"
              renderInput={(field) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="0"
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              )}
            />
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="numApplicationsApproved" className='text-gray-400'>Đơn ứng tuyển đã nhận</Label>
              <Input type="text" id="numApplicationsApproved" placeholder="" value={job?.numApplicationsApproved} disabled />
            </div>
          </div>

          <FormItemCustom
            form={form}
            name="salaryMin"
            label="Mức lương tối thiểu"
            renderInput={({ value, onChange }) => <InputCurrency value={Number(value)} onChange={onChange} />}
          />
          <FormItemCustom
            form={form}
            name="salaryMax"
            label="Mức lương tối đa"
            renderInput={({ value, onChange }) => <InputCurrency value={Number(value)} onChange={onChange} />}
          />

          <FormItemCustom
            form={form}
            name="endDate"
            label="Ngày kết thúc"
            renderInput={({ value, onChange }) => (
              <DatePicker
                value={parseDateFromString(String(value)) ?? new Date()}
                onChange={(date) => date && onChange(formatDate(date, DATE_PATTERN.DATE))}
                className="w-full"
              />
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
              onClick={() => navigate(ROUTE_PATH.COMPANY.JOBS.LIST)}
            >
              Quay lại
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditJob;
