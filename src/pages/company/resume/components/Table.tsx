import { TableSkeleton } from '@/components/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DATE_PATTERN } from '@/constants';
import { IResumeExtend } from '@/interface';
import { formatDate } from '@/utils';

import Action from './Action';

interface TableDataProps {
  data?: IResumeExtend[] | [];
  isLoading: boolean;
}

export const TableData = ({ data, isLoading = false }: TableDataProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">ID</TableHead>
          <TableHead className="text-center">Email ứng viên</TableHead>
          <TableHead className="text-center">Tên công việc</TableHead>
          <TableHead className="text-center">Trạng thái</TableHead>
          <TableHead className="text-center">Ngày ứng tuyển</TableHead>
          <TableHead className="text-center">Cập nhật cuối</TableHead>
          <TableHead className="text-center">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeleton cols={10} />
        ) : data && data.length > 0 ? (
          data.map((resume, index) => (
            <TableRow key={resume.id} className="hover:bg-cyan-50 dark:hover:bg-gray-700">
              <TableCell>#{index + 1}</TableCell>
              <TableCell>{resume.user.email}</TableCell>
              <TableCell>{resume.job.title}</TableCell>
              <TableCell>{resume.status}</TableCell>
              <TableCell>{formatDate(resume.createdAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell>{formatDate(resume.updatedAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell className="text-center">
                <Action data={resume} />
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
