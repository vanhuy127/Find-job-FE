import ComboboxFilter from '@/components/admin/comboboxFilter';
import FormItemCustom from '@/components/formItem';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CompanyFormValues, companySchema } from '@/schema/company.schema';
import { useCompanyService } from '@/service/company.service';
import { useProvinceService } from '@/service/province.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FileText } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const index = () => {
  const { getCompanyCurrent, updateCompanyInfoCurrent } = useCompanyService();
  const { getProvinces } = useProvinceService();
  const queryClient = useQueryClient();
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      description: '',
      provinceId: '',
      address: '',
      website: '',
      logo: undefined,
    },
  });

  const { data: provinces } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => getProvinces(),
  });

  const { data: company } = useQuery({
    queryKey: ['company-current'],
    queryFn: () => getCompanyCurrent(),
  });

  useEffect(() => {
    if (company) {
      form.reset({
        description: company.description,
        provinceId: company.province.id,
        address: company.address,
        website: company.website,
      });
      setPreviewLogo(company.logo || null);
    }
  }, [company, form]);

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
    mutationFn: (data: CompanyFormValues) => updateCompanyInfoCurrent(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["company-current"] });
    },
  });

  const onSubmit = (data: CompanyFormValues) => {
    mutation.mutate(data);
  };

  return <div className="space-y-6 dark:text-white">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold">Cập nhật thông tin công ty</h1>
    </div>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormItemCustom
          form={form}
          name="logo"
          label="Logo"
          renderInput={(field) => <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                field.onChange(file);
                setPreviewLogo(URL.createObjectURL(file));
              }
            }}
          />}
        />

        {/* --- Logo hiển thị --- */}
        <div className="space-y-2">
          {previewLogo ? (
            <img
              src={previewLogo}
              alt="Logo công ty"
              className="w-28 h-28 object-cover rounded-md border"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center border rounded-md text-gray-500 text-sm">
              Chưa có logo
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Tên công ty</Label>
          <p className="bg-muted rounded p-2 text-sm">{company?.name}</p>
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <p className="bg-muted rounded p-2 text-sm">{company?.email}</p>
        </div>

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

        <div className="space-y-2">
          <Label>Mã số thuế</Label>
          <p className="bg-muted rounded p-2 text-sm">{company?.taxCode}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span className="font-medium">Giấy phép kinh doanh</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <a href={company?.businessLicensePath} target="_blank" rel="noopener noreferrer">
                  Xem file
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="cursor-pointer bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg hover:from-cyan-700 hover:to-teal-700"
          >
            {mutation.isPending ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
        </div>
      </form>
    </Form>
  </div>;
};

export default index;
