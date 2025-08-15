import { memo } from 'react';

import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ROUTE_PATH } from '@/constants';
import { ICompany } from '@/interface';

const Action = ({ data }: { data: ICompany }) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-28 border text-cyan-800 dark:bg-gray-800 dark:text-cyan-600">
          Hành động
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={() => navigate(ROUTE_PATH.ADMIN.COMPANIES.DETAILS_PENDING.LINK(data.id))}>
          <Eye className="mr-2 h-4 w-4" /> Xem
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(Action);
