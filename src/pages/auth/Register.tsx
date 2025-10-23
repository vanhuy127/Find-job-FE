
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { Form } from '@/components/ui/form';
import FormItemCustom from '@/components/formItem';
import { DATE_PATTERN, GENDER_ARRAY, GENDER_SHOWS, ROUTE_PATH } from '@/constants';
import { useAuthService } from '@/service/auth.service';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormValues, registerSchema } from '@/schema/auth.schema';
import { useMutation } from '@tanstack/react-query';
import { formatDate, parseDateFromString } from '@/utils';
import { DatePicker } from '@/components/datePicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Register = () => {
  const { register } = useAuthService();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      address: '',
      dob: formatDate(new Date(), DATE_PATTERN.DATE),
      gender: '',
      phone: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: RegisterFormValues) => register(data),
    onSuccess: () => {
      navigate(ROUTE_PATH.AUTH.LOGIN);
      form.reset()
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    mutation.mutate(data);
  };

  return <div className="w-full max-w-md">
    <Card className="w-full border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <div className="pt-4 text-center">
          <h1 className="text-2xl font-bold text-cyan-800">Register account</h1>
        </div>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-cyan-600">

            <FormItemCustom
              form={form}
              name="fullName"
              label="Họ và tên"
              renderInput={(field) => <Input {...field} className='text-black' placeholder="Nhập họ và tên" />}
            />

            <FormItemCustom
              form={form}
              name="email"
              label="Email"
              renderInput={(field) => <Input {...field} className='text-black' placeholder="Nhập email" />}
            />

            <FormItemCustom
              form={form}
              name="password"
              label="Password"
              renderInput={(field) => <Input {...field} type='password' className='text-black' placeholder="Nhập mật khẩu" />}
            />

            <FormItemCustom
              form={form}
              name="address"
              label="Địa chỉ"
              renderInput={(field) => <Input {...field} className='text-black' placeholder="Nhập địa chỉ" />}
            />

            <FormItemCustom
              form={form}
              name="gender"
              label="Giới tính"
              renderInput={({ value, onChange }) => (
                <Select value={String(value)} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDER_ARRAY.map((item) => (
                      <SelectItem key={item} value={item}>
                        {GENDER_SHOWS[item]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <FormItemCustom
              form={form}
              name="dob"
              label="Ngày sinh"
              renderInput={({ value, onChange }) => (
                <DatePicker
                  value={parseDateFromString(String(value)) ?? new Date()}
                  onChange={(date) => date && onChange(formatDate(date, DATE_PATTERN.DATE))}
                  className="w-full"
                />
              )}
            />

            <FormItemCustom
              form={form}
              name="phone"
              label="Số điện thoại"
              renderInput={(field) => <Input {...field} className='text-black' placeholder="Nhập số điện thoại" />}
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
export default Register;
