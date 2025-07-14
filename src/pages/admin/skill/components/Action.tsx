
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { memo, useState } from 'react';
import { ISkill } from '@/interface';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants';
import { Separator } from '@/components/ui/separator';
import { useSkillService } from '@/service/skill.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConfirmDialog } from '@/components/confirmDialog';
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
    })

    const handleDelete = () => {
        deleteMutation.mutate();
        setOpenConfirm(false)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-cyan-800 w-28 border dark:bg-gray-800 dark:text-cyan-600">
                        Hành động
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                    <DropdownMenuItem onClick={() => navigate(ROUTE_PATH.ADMIN.SKILLS.EDIT.LINK(data.id))} className=' cursor-pointer flex items-center py-[6px] px-2'>
                        <Edit className="mr-2 h-4 w-4" /> Sửa
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem className='cursor-pointer flex items-center py-[6px] px-2 text-destructive' onClick={() => setOpenConfirm(true)}>
                        <Trash className="mr-2 h-4 w-4 " /> Xóa
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog xác nhận xóa */}
            <ConfirmDialog
                open={openConfirm}
                title="Xóa kỹ năng"
                description={<>
                    Bạn có chắc muốn xóa kỹ năng này không?
                    <br />
                    <span className="text-red-500 font-semibold">Hành động này không thể hoàn tác.</span>
                </>}
                confirmText="Xóa"
                cancelText="Hủy"
                onConfirm={handleDelete}
                onCancel={() => setOpenConfirm(false)}
            />
        </>
    )
}

export default memo(Action)