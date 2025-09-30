'use client';


import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useAuthService } from '@/service/auth.service';
import { Form } from '@/components/ui/form';
import FormItemCustom from '@/components/formItem';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants';

const schema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
    const { sendEmailForgotPassword } = useAuthService();
    const navigate = useNavigate();

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
        },
    });

    const mutation = useMutation({
        mutationFn: ({ email }: FormData) => sendEmailForgotPassword(email),
    });

    const onSubmit = async (data: FormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="w-full max-w-md">
            <Card className="w-full border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
                <CardHeader className="space-y-1 pt-3">
                    <div className="pt-4 text-center">
                        <h1 className="text-2xl font-bold text-cyan-800">Forgot Password</h1>
                    </div>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-cyan-600">

                            <FormItemCustom
                                form={form}
                                name="email"
                                label="Email"
                                renderInput={(field) => <Input {...field} className='text-black' placeholder="Nhập email" />}
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
                                        'Send Reset Link'
                                    )}
                                </Button>
                                <Button variant='outline' className="col-span-1 w-full rounded-lg text-center" onClick={() => navigate(ROUTE_PATH.AUTH.LOGIN)}>
                                    Back
                                </Button>
                            </div>


                        </form>
                    </Form>

                </CardContent>
            </Card>
        </div>
    );
}

export default ForgotPassword