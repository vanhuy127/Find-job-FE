
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { Form } from '@/components/ui/form';
import FormItemCustom from '@/components/formItem';
import { ROUTE_PATH } from '@/constants';
import { useAuthService } from '@/service/auth.service';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterCompanyFormValues, registerCompanySchema } from '@/schema/auth.schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import { useProvinceService } from '@/service/province.service';
import { useMemo } from 'react';
import ComboboxFilter from '@/components/admin/comboboxFilter';

const RegisterCompany = () => {
  const { registerCompany } = useAuthService();
  const navigate = useNavigate();
  const { getProvinces } = useProvinceService();

  const form = useForm<RegisterCompanyFormValues>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      description: '',
      provinceId: '',
      address: '',
      website: '',
      taxCode: '',
      businessLicensePath: undefined,
      logo: undefined,
    },
  });

  const { data: provinces } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => getProvinces(),
  });

  const mutation = useMutation({
    mutationFn: (data: RegisterCompanyFormValues) => registerCompany(data),
    onSuccess: () => {
      navigate(ROUTE_PATH.AUTH.LOGIN);
      form.reset()
    },
  });

  const onSubmit = async (data: RegisterCompanyFormValues) => {
    const provinceFormValue = form.watch('provinceId');
    const provinceFound = provinces?.data.find((i) => i.name == provinceFormValue);
    mutation.mutate({ ...data, provinceId: provinceFound!.id });
  };

  const provinceOptions = useMemo(() => {
    const filteredProvinces = [
      ...(provinces?.data?.map((province) => ({
        label: province.name,
        value: province.name,
      })) || []),
    ];

    return filteredProvinces;
  }, [provinces]);

  return <div className="w-full max-w-md">
    <Card className="w-full border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <div className="pt-4 text-center">
          <h1 className="text-2xl font-bold text-cyan-800">Register account company</h1>
        </div>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-cyan-600">

            <FormItemCustom
              form={form}
              name="email"
              label="Email"
              renderInput={(field) => <Input {...field} value={typeof field.value === "string" ? field.value : ""}
                className='text-black' placeholder="Nhập email" />}
            />

            <FormItemCustom
              form={form}
              name="password"
              label="Password"
              renderInput={(field) => <Input {...field} value={typeof field.value === "string" ? field.value : ""} type='password' className='text-black' placeholder="Nhập mật khẩu" />}
            />

            <FormItemCustom
              form={form}
              name="logo"
              label="Logo"
              renderInput={(field) => <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />}
            />


            <FormItemCustom
              form={form}
              name="name"
              label="Tên công ty"
              renderInput={(field) => <Input {...field} value={typeof field.value === "string" ? field.value : ""}
                className='text-black' placeholder="Nhập tên công ty" />}
            />

            <FormItemCustom
              form={form}
              name="address"
              label="Địa chỉ"
              renderInput={(field) => <Input {...field} value={typeof field.value === "string" ? field.value : ""} className='text-black' placeholder="Nhập địa chỉ" />}
            />

            <FormItemCustom
              form={form}
              name="description"
              label="Mô tả"
              renderInput={(field) => (
                <Textarea
                  {...field}
                  value={typeof field.value === "string" ? field.value : ""}
                  placeholder="Nhập mô tả về công ty"
                />
              )}
            />

            <FormItemCustom
              form={form}
              name="provinceId"
              label="Tỉnh thành"
              renderInput={({ value, onChange }) => (
                <ComboboxFilter
                  options={provinceOptions}
                  placeholder="Chọn tỉnh thành"
                  value={typeof value === "string" ? value : ""}
                  onChange={onChange}
                />
              )}
            />

            <FormItemCustom
              form={form}
              name="website"
              label="Website"
              renderInput={(field) => <Input {...field} value={typeof field.value === "string" ? field.value : ""} className='text-black' placeholder="Nhập địa chỉ website" />}
            />

            <FormItemCustom
              form={form}
              name="taxCode"
              label="Mã số thuế"
              renderInput={(field) => <Input {...field} value={typeof field.value === "string" ? field.value : ""} className='text-black' placeholder="Nhập mã số thuế" />}
            />

            <FormItemCustom
              form={form}
              name="businessLicensePath"
              label="Giấy phép kinh doanh"
              renderInput={(field) => <Input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />}
            />

            <div className='grid grid-cols-4 gap-3'>
              <Button
                type="submit"
                className="col-span-3 w-full transform rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-cyan-700 hover:to-teal-700 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Sending...
                  </div>
                ) : (
                  'Register'
                )}
              </Button>
              <Button variant='outline' className="col-span-1 w-full rounded-lg text-center"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(ROUTE_PATH.AUTH.LOGIN)
                }}>
                Back
              </Button>
            </div>


          </form>
        </Form>

      </CardContent>
    </Card>
  </div>;
};
export default RegisterCompany;
