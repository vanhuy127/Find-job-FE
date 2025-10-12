import FormItemCustom from '@/components/formItem';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { uploadResumeFormValues, uploadResumeSchema } from '@/schema/resume.scheme';
import { useResumeService } from '@/service/resume.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface UploadCVDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}

const UploadCVDialog = ({ openDialog, setOpenDialog }: UploadCVDialogProps) => {

    const { uploadCV } = useResumeService();
    const { id } = useParams<{ id: string }>();

    const form = useForm<uploadResumeFormValues>({
        resolver: zodResolver(uploadResumeSchema),
        defaultValues: { file: undefined, coverLetter: "" },
    });

    const mutation = useMutation({
        mutationFn: (data: uploadResumeFormValues) => uploadCV({ jobId: id!, ...data }),
        onSuccess: () => {
            setOpenDialog(false);
            form.reset();
        },
    });

    const submitHandler = (data: uploadResumeFormValues) => {
        mutation.mutate(data);
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)}>

                        <DialogHeader>
                            <DialogTitle>Ứng tuyển công việc</DialogTitle>
                            <DialogDescription>
                                Tải CV và nhập thư giới thiệu để gửi đơn ứng tuyển.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">

                            <FormItemCustom
                                form={form}
                                name="file"
                                label="Tải lên CV"
                                renderInput={(field) => <Input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        field.onChange(file);
                                    }}
                                />}
                            />

                            <FormItemCustom
                                form={form}
                                name="coverLetter"
                                label="Thư giới thiệu (Cover Letter)"
                                renderInput={(field) => (
                                    <Textarea
                                        {...field}
                                        value={typeof field.value === "string" ? field.value : ""}
                                        placeholder="Nhập thư giới thiệu"
                                    />
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenDialog(false);
                                    form.reset();
                                }}
                                disabled={mutation.isPending}
                            >
                                Hủy
                            </Button>
                            <Button
                                disabled={mutation.isPending}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white"
                            >
                                {mutation.isPending ? "Đang gửi..." : "Gửi đơn ứng tuyển"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UploadCVDialog