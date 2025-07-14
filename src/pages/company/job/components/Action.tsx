import { Edit, Eye, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { memo } from 'react';
import { IJob } from '@/interface';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants';
import { Separator } from '@/components/ui/separator';
const Action = ({ data }: { data: IJob }) => {
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-cyan-800 w-28 border dark:bg-gray-800 dark:text-cyan-600">
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
                <DropdownMenuItem className='cursor-pointer flex items-center py-[6px] px-2 text-destructive'>
                    <Trash className="mr-2 h-4 w-4 text-destructive" /> Xóa
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default memo(Action)