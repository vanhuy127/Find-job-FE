import { TableSkeleton } from '@/components/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DATE_PATTERN } from '@/constants';
import { ISkill } from '@/interface';
import { formatDate } from '@/utils';

import Action from './Action';

interface TableDataProps {
  data?: ISkill[];
  isLoading: boolean;
}

export const TableData = ({ data, isLoading = false }: TableDataProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">ID</TableHead>
          <TableHead className="text-center">Tên kỹ năng</TableHead>
          <TableHead className="text-center">Ngày tạo</TableHead>
          <TableHead className="text-center">Cập nhật cuối</TableHead>
          <TableHead className="text-center">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeleton cols={5} />
        ) : data && data.length > 0 ? (
          data?.map((skill, index) => (
            <TableRow key={skill.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
              <TableCell>#{index + 1}</TableCell>
              <TableCell>{skill.name}</TableCell>
              <TableCell>{formatDate(skill.createdAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell>{formatDate(skill.updatedAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell className="text-center">
                <Action data={skill} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Không tìm thấy dữ liệu
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
