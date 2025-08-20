import { TableSkeleton } from '@/components/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DATE_PATTERN, JOB_LEVEL_SHOWS, JOB_TYPE_SHOWS } from '@/constants';
import { IJob } from '@/interface';
import { formatDate } from '@/utils';

import Action from './Action';

interface TableDataProps {
  data?: IJob[];
  isLoading: boolean;
}

export const TableData = ({ data, isLoading = false }: TableDataProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">ID</TableHead>
          <TableHead className="text-center">Tên việc làm</TableHead>
          {/* <TableHead className="text-center">Công ty</TableHead> */}
          <TableHead className="text-center">Loại công việc</TableHead>
          <TableHead className="text-center">Mức độ</TableHead>
          <TableHead className="text-center">Địa chỉ</TableHead>
          <TableHead className="text-center">Tỉnh thành</TableHead>
          <TableHead className="text-center">Ngày tạo</TableHead>
          <TableHead className="text-center">Cập nhật cuối</TableHead>
          <TableHead className="text-center">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeleton cols={10} />
        ) : data && data.length > 0 ? (
          data.map((job, index) => (
            <TableRow key={job.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
              <TableCell>#{index + 1}</TableCell>
              <TableCell>{job.title}</TableCell>
              {/* <TableCell>{job.company.name}</TableCell> */}
              <TableCell>{JOB_TYPE_SHOWS[job.jobType]}</TableCell>
              <TableCell>{JOB_LEVEL_SHOWS[job.level]}</TableCell>
              <TableCell>{job.address}</TableCell>
              <TableCell>{job.province.name}</TableCell>
              <TableCell>{formatDate(job.createdAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell>{formatDate(job.updatedAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell className="text-center">
                <Action data={job} />
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
