import { TableSkeleton } from '@/components/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DATE_PATTERN } from '@/constants';
import { ICompany } from '@/interface';
import { formatDate } from '@/utils';

import Action from './Action';

interface TableDataProps {
  data?: ICompany[];
  isLoading: boolean;
}

export const TableData = ({ data, isLoading = false }: TableDataProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">ID</TableHead>
          <TableHead className="text-center">Tên công ty</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Tỉnh thành</TableHead>
          <TableHead className="text-center">Ngày tạo</TableHead>
          <TableHead className="text-center">Cập nhật cuối</TableHead>
          <TableHead className="text-center">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeleton cols={8} />
        ) : data && data.length > 0 ? (
          data?.map((company, index) => (
            <TableRow key={company.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
              <TableCell>#{index + 1}</TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.email}</TableCell>
              <TableCell>{company.province.name}</TableCell>
              <TableCell>{formatDate(company.createdAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell>{formatDate(company.updatedAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell className="text-center">
                <Action data={company} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={10} className="text-center">
              Không tìm thấy dữ liệu
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
