import { Eye, Lock, Unlock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { memo } from 'react';
import { ICompany } from '@/interface';
import { useAuthService } from '@/service/auth.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants';
const Action = ({ data }: { data: ICompany }) => {
    const navigate = useNavigate();
    const { lockAccount, unlockAccount } = useAuthService();
    const queryClient = useQueryClient();
    const lockMutation = useMutation({
        mutationFn: () => lockAccount(data.accountId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        },
    });

    const unlockMutation = useMutation({
        mutationFn: () => unlockAccount(data.accountId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        },
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-cyan-800 w-28 border dark:bg-gray-800 dark:text-cyan-600">
                    Hành động
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuItem onClick={() => navigate(ROUTE_PATH.ADMIN.COMPANIES.DETAILS.LINK(data.id))}>
                    <Eye className="mr-2 h-4 w-4" /> Xem
                </DropdownMenuItem>
                {data.account.isLocked ? (
                    <DropdownMenuItem onClick={() => unlockMutation.mutate()} className="text-green-600">
                        <Unlock className="mr-2 h-4 w-4" /> Mở khóa
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={() => lockMutation.mutate()} className="text-red-600">
                        <Lock className="mr-2 h-4 w-4" /> Khóa
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default memo(Action)