import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import FormItemCustom from '@/components/formItem';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { ROUTE_PATH } from '@/constants';
import { SkillFormValues, skillSchema } from '@/schema/skill.schema';
import { useSkillService } from '@/service/skill.service';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { editSkill, getSkillById } = useSkillService();
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
    },
  });

  const { data: skill } = useQuery({
    queryKey: ['admin-skills', id],
    queryFn: () => getSkillById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (skill) {
      form.reset({ name: skill.name });
    }
  }, [skill, form]);

  const mutation = useMutation({
    mutationFn: (data: SkillFormValues) => editSkill(id!, data),
    onSuccess: () => {
      navigate(ROUTE_PATH.ADMIN.SKILLS.LIST);
      form.reset();
    },
  });

  const onSubmit = (data: SkillFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="space-y-6 dark:bg-black dark:text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Cập nhật kỹ năng</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormItemCustom
            form={form}
            name="name"
            label="Tên kỹ năng"
            renderInput={(field) => <Input {...field} className="rounded-lg border-gray-300" />}
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
              onClick={() => navigate(ROUTE_PATH.ADMIN.SKILLS.LIST)}
            >
              Quay lại
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Edit;
