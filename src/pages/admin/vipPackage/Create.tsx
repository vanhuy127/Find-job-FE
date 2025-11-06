import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FormItemCustom from '@/components/formItem';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { ROUTE_PATH, VIP_PACKAGE_LEVEL_ARRAY, VIP_PACKAGE_LEVEL_SHOWS } from '@/constants';
import { VipPackageFormValues, vipPackageSchema } from '@/schema/vipPackage.schema';
import { Textarea } from '@/components/ui/textarea';
import InputCurrency from '@/components/inputCurrency';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVipPackageService } from '@/service/vip.service';

const Create = () => {
  const navigate = useNavigate();
  const { createVipPackage } = useVipPackageService();
  const form = useForm<VipPackageFormValues>({
    resolver: zodResolver(vipPackageSchema),
    defaultValues: {
      name: '',
      description: '',
      numPost: 0,
      price: 0,
      durationDay: 0,
      priority: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: VipPackageFormValues) => createVipPackage(data),
    onSuccess: () => {
      form.reset();
      navigate(ROUTE_PATH.ADMIN.VIP_PACKAGES.LIST);
    },
  });

  const onSubmit = (data: VipPackageFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="space-y-6 dark:bg-black dark:text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Thêm mới gói VIP</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormItemCustom
            form={form}
            name="name"
            label="Tên gói VIP"
            renderInput={(field) => <Input {...field} placeholder="Nhập tên gói VIP..." className="rounded-lg border-gray-300" />}
          />

          <FormItemCustom
            form={form}
            name="description"
            label="Mô tả"
            renderInput={(field) => <Textarea {...field} placeholder="Nhập mô tả chi tiết..." />}
          />

          <FormItemCustom
            form={form}
            name="price"
            label="Giá tiền"
            renderInput={({ value, onChange }) => <InputCurrency value={Number(value)} onChange={onChange} />}
          />

          <FormItemCustom
            form={form}
            name="numPost"
            label="Số lượng bài viết"
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

          <FormItemCustom
            form={form}
            name="durationDay"
            label="Số ngày hiệu lực"
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

          <FormItemCustom
            form={form}
            name="priority"
            label="Loại gói VIP"
            renderInput={({ value, onChange }) => (
              <Select value={String(value)} onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại gói VIP" />
                </SelectTrigger>
                <SelectContent>
                  {VIP_PACKAGE_LEVEL_ARRAY.map((item) => (
                    <SelectItem key={item} value={item}>
                      {VIP_PACKAGE_LEVEL_SHOWS[item]}
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
              {mutation.isPending ? 'Đang tạo mới...' : 'Tạo mới'}
            </Button>

            <Button
              type="button"
              className="cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={() => navigate(ROUTE_PATH.ADMIN.VIP_PACKAGES.LIST)}
            >
              Quay lại
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Create;
