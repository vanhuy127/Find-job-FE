import { memo } from 'react';

import { Edit, Eye, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const Action = ({ data }: { data: IJob }) => {
  const navigate = useNavigate();

  return (
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
        <DropdownMenuItem className="text-destructive flex cursor-pointer items-center px-2 py-[6px]">
          <Trash className="text-destructive mr-2 h-4 w-4" /> Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(Action);
