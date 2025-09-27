import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthService } from "@/service/auth.service";
import FormItemCustom from "@/components/formItem";
import { Form } from "@/components/ui/form";
import { passwordSchema } from "@/schema/auth.schema";
const schema = z
    .object({
        password: passwordSchema,
        newPassword: passwordSchema,
        confirmNewPassword: passwordSchema,
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        path: ["confirmNewPassword"],
        message: "Passwords do not match",
    });
type FormData = z.infer<typeof schema>;

const ChangePassword = () => {

    const { changePassword, logout } = useAuthService();

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const mutation = useMutation({
        mutationFn: ({ password, newPassword }: FormData) => changePassword(password, newPassword),
        onSuccess: () => logout(),

    });

    const onSubmit = async (data: FormData) => {
        mutation.mutate(data);
    };

    return (
        <>
            <CardHeader>
                <CardTitle>Đổi mật khẩu</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormItemCustom
                            form={form}
                            name="password"
                            label="Mật khẩu cũ"
                            renderInput={(field) => <Input {...field} placeholder="Nhập mật khẩu cũ" />}
                        />

                        <FormItemCustom
                            form={form}
                            name="newPassword"
                            label="Mật khẩu mới"
                            renderInput={(field) => <Input {...field} placeholder="Nhập mật khẩu mới" />}
                        />

                        <FormItemCustom
                            form={form}
                            name="confirmNewPassword"
                            label="Xác nhận mật khẩu mới"
                            renderInput={(field) => <Input {...field} placeholder="Nhập lại mật khẩu mới" />}
                        />

                        <div className="flex items-center gap-2">
                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                                className="cursor-pointer bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg hover:from-cyan-700 hover:to-teal-700"
                            >
                                {mutation.isPending ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                            </Button>

                        </div>
                    </form>
                </Form>
            </CardContent>
        </>
    )
}

export default ChangePassword