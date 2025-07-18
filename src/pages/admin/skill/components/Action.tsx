import { memo, useState } from 'react';

import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ConfirmDialog } from '@/components/confirmDialog';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

import { ROUTE_PATH } from '@/constants';
import { ISkill } from '@/interface';
import { useSkillService } from '@/service/skill.service';

const Action = ({ data }: { data: ISkill }) => {
  const navigate = useNavigate();
  const { deleteSkill } = useSkillService();
  const queryClient = useQueryClient();
  const [openConfirm, setOpenConfirm] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteSkill(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
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
          <DropdownMenuItem
            onClick={() => navigate(ROUTE_PATH.ADMIN.SKILLS.EDIT.LINK(data.id))}
            className="flex cursor-pointer items-center px-2 py-[6px]"
          >
            <Edit className="mr-2 h-4 w-4" /> Sửa
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem
            className="text-destructive flex cursor-pointer items-center px-2 py-[6px]"
            onClick={() => setOpenConfirm(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog xác nhận xóa */}
      <ConfirmDialog
        open={openConfirm}
        title="Xóa kỹ năng"
        description={
          <>
            Bạn có chắc muốn xóa kỹ năng này không?
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
