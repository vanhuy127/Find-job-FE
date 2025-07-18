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
