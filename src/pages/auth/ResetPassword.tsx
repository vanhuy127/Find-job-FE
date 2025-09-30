'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useAuthService } from '@/service/auth.service';
import { Form } from '@/components/ui/form';
import FormItemCustom from '@/components/formItem';
import { useNavigate, useParams } from 'react-router-dom';
import { passwordSchema } from '@/schema/auth.schema';
import { ROUTE_PATH } from '@/constants';

const schema = z.object({
    newPassword: passwordSchema,
});

type FormData = z.infer<typeof schema>;

const ResetPassword = () => {
    const { checkAvailableToken, resetPassword } = useAuthService();
    const navigate = useNavigate();

    const { token } = useParams<{ token: string }>();
    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            newPassword: '',
        },
    });

    const { data: isTokenValid } = useQuery({
        queryKey: ['check-available-token', token],
        queryFn: () => checkAvailableToken(token!),
    });

    const mutation = useMutation({
        mutationFn: ({ newPassword }: FormData) => resetPassword(token!, newPassword),
        onSuccess: () => {
            form.reset();
            navigate(ROUTE_PATH.AUTH.LOGIN);
        }
    });

    const onSubmit = async (data: FormData) => {
        mutation.mutate(data);
    };

    if (!isTokenValid)
        return (<div className="w-full max-w-md">
            <Card className="w-full border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
                <CardHeader className="space-y-1 pt-3">
                    <div className="text-center">
                        <h1 className="text-base font-bold text-cyan-800">Invalid or expired token.</h1>
                    </div>
                    <Button
                        onClick={() => navigate(ROUTE_PATH.AUTH.FORGOT_PASSWORD)}
                        type="submit"
                        className="w-full transform rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-cyan-700 hover:to-teal-700 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Go back
                    </Button>
                </CardHeader>
            </Card>
        </div>);

    return (
        <div className="w-full max-w-md">
            <Card className="w-full border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
                <CardHeader className="space-y-1 pt-3">
                    <div className="pt-4 text-center">
                        <h1 className="text-2xl font-bold text-cyan-800">Reset Password</h1>
                    </div>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-cyan-600">

                            <FormItemCustom
                                form={form}
                                name="newPassword"
                                label="New Password"
                                renderInput={(field) => <Input {...field} className='text-black' placeholder="Nhập mật khẩu mới" />}
                            />

                            <Button
                                type="submit"
                                className="w-full transform rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-cyan-700 hover:to-teal-700 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Processing...
                                    </div>
                                ) : (
                                    'Reset Password'
                                )}
                            </Button>
                        </form>
                    </Form>

                </CardContent>
            </Card>
        </div>
    );
}

export default ResetPassword;