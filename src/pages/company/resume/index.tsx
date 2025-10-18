'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import SearchInput from '@/components/admin/searchInput';
import StatusFilter from '@/components/admin/statusFilter';
import Pagination from '@/components/pagination';

import { MAX_PAGE_SHOW } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useResumeService } from '@/service/resume.service';

import { TableData } from './components/Table';

const index = () => {
  const { query, setQuery } = useQueryParams();
  const { getResumes } = useResumeService();
  const { page = 1, search = '', status = '', size = MAX_PAGE_SHOW } = query;
  const [searchInput, setSearchInput] = useState(search);
  const [statusFilter, setStatusFilter] = useState(status);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== query.search || statusFilter !== query.status) {
      setQuery({
        search: debouncedSearch,
        page: 1,
        province: statusFilter,
      });
    }
  }, [debouncedSearch, statusFilter]);

  const { data, isLoading } = useQuery({
    queryKey: ['company-resumes', page, debouncedSearch, size, statusFilter],
    queryFn: () =>
      getResumes({
        page,
        search: debouncedSearch,
        size,
        status: statusFilter,
      }),
  });

  const jobTypeOptions = useMemo(
    () => [
      { label: 'PENDING', value: 'PENDING' },
      { label: 'APPROVED', value: 'APPROVED' },
      { label: 'REJECTED', value: 'REJECTED' },
    ],
    [],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value);
  }, []);

  return (
    <div className="space-y-6 dark:bg-black dark:text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Danh sách đơn ứng tuyển</h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* search */}
        <div className="flex-3">
          <SearchInput placeholder="Tìm kiếm đơn ứng tuyển" searchTerm={searchInput} onChange={handleSearchChange} />
        </div>
        <div className="flex-1">
          <StatusFilter
            placeholder="Trạng thái"
            statusFilter={statusFilter}
            setStatusFilter={handleStatusChange}
            options={jobTypeOptions}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSearchInput('');
              setStatusFilter('');
              setQuery({
                search: '',
                page: 1,
                status: '',
              });
            }}
            className="rounded bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 dark:bg-rose-900 dark:hover:bg-red-800"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {/* table */}
      <TableData data={data?.data} isLoading={isLoading} />
      {/* pagination */}
      <Pagination
        currentPage={page}
        totalPages={data?.pagination.totalPages || page}
        onPageChange={(page) => setQuery({ page: page })}
      />
    </div>
  );
};
export default index;
