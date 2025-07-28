import { memo, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, Eye, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ConfirmDialog } from '@/components/confirmDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

import { ROUTE_PATH } from '@/constants';
import { IJob } from '@/interface';
import { useJobService } from '@/service/job.service';

const Action = ({ data }: { data: IJob }) => {
  const navigate = useNavigate();
  const { deleteJob } = useJobService();
  const queryClient = useQueryClient();
  const [openConfirm, setOpenConfirm] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteJob(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-jobs'] });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
    setOpenConfirm(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-28 border text-cyan-800 dark:bg-gray-800 dark:text-cyan-600">
            Hành động
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem onClick={() => navigate(ROUTE_PATH.COMPANY.JOBS.DETAILS.LINK(data.id))}>
            <Eye className="mr-2 h-4 w-4" /> Xem
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(ROUTE_PATH.COMPANY.JOBS.EDIT.LINK(data.id))}>
            <Edit className="mr-2 h-4 w-4" /> Sửa
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem
            className="text-destructive flex cursor-pointer items-center px-2 py-[6px]"
            onClick={() => setOpenConfirm(true)}
          >
            <Trash className="text-destructive mr-2 h-4 w-4" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Dialog xác nhận xóa */}
      <ConfirmDialog
        open={openConfirm}
        title="Xóa kỹ năng"
        description={
          <>
            Bạn có chắc muốn xóa công việc này không?
            <br />
            <span className="font-semibold text-red-500">Hành động này không thể hoàn tác.</span>
          </>
        }
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </>
  );
};

export default memo(Action);
