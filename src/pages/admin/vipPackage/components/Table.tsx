import { TableSkeleton } from '@/components/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DATE_PATTERN, VIP_PACKAGE_LEVEL_NUMERIC } from '@/constants';
import { formatDate } from '@/utils';

import Action from './Action';
import { IVipPackage } from '@/interface';

interface TableDataProps {
  data?: IVipPackage[];
  isLoading: boolean;
}

export const TableData = ({ data, isLoading = false }: TableDataProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">ID</TableHead>
          <TableHead className="text-center">Tên</TableHead>
          <TableHead className="text-center">Giá</TableHead>
          <TableHead className="text-center">Thời gian</TableHead>
          <TableHead className="text-center">Cấp độ</TableHead>
          <TableHead className="text-center">Ngày tạo</TableHead>
          <TableHead className="text-center">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeleton cols={7} />
        ) : data && data.length > 0 ? (
          data?.map((i, index) => (
            <TableRow key={i.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
              <TableCell>#{index + 1}</TableCell>
              <TableCell>{i.name}</TableCell>
              <TableCell>{(i.price).toLocaleString('vi-VN')}</TableCell>
              <TableCell>{i.durationDay} ngày</TableCell>
              <TableCell>{VIP_PACKAGE_LEVEL_NUMERIC[i.priority]}</TableCell>
              <TableCell>{formatDate(i.createdAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell className="text-center">
                <Action data={i} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Không tìm thấy dữ liệu
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
