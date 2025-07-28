import { Badge } from '@/components/ui/badge';

export const getUserStatusBadge = (status: boolean) => {
  switch (status) {
    case false:
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Hoạt động</Badge>;
    case true:
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Đã khóa</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
    case 'APPROVED':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
    case 'REJECTED':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700';
  }
};
