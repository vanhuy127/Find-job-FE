import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { Textarea } from './ui/textarea';
import { Form } from './ui/form';
import FormItemCustom from './formItem';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ConfirmDialogWithTextProps {
  open: boolean;
  title?: string;
  type?: 'confirm' | 'warning';
  description?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (data: { reasonReject: string }) => void;
  onCancel: () => void;
}
const schema = z.object({
  reasonReject: z.string().min(1, "Vui lòng nhập nội dung."),
});

export const ConfirmDialogWithText = ({
  open,
  title = 'Xác nhận',
  type = 'warning',
  description = 'Bạn có chắc muốn thực hiện hành động này?',
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  onConfirm,
  onCancel,
}: ConfirmDialogWithTextProps) => {

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { reasonReject: "" },
  });

  const submitHandler = (data: { reasonReject: string }) => {
    onConfirm(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <DialogHeader className='mb-4'>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {/* Textarea nhập lý do */}
            <FormItemCustom
              form={form}
              name="reasonReject"
              label="Lý do"
              renderInput={(field) => <Textarea {...field} className="rounded-lg border-gray-300" />}
            />

            <DialogFooter className="gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  form.reset();
                  onCancel();
                }}
              >
                {cancelText}
              </Button>
              <Button
                type="submit"
                className={`cursor-pointer ${type === "confirm" ? "bg-teal-500" : "bg-red-500"
                  }`}
              >
                {confirmText}
              </Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
};
