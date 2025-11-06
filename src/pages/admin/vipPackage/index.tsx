'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import SearchInput from '@/components/admin/searchInput';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';

import { MAX_PAGE_SHOW, ROUTE_PATH } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';

import { TableData } from './components/Table';
import { useVipPackageService } from '@/service/vip.service';
import StatusFilter from '@/components/admin/statusFilter';

const index = () => {
  const { query, setQuery } = useQueryParams();
  const { getVipPackages } = useVipPackageService();
  const navigate = useNavigate();
  const { page = 1, search = '', size = MAX_PAGE_SHOW, priority = '' } = query;
  const [searchInput, setSearchInput] = useState(search);
  const [priorityFilter, setPriorityFilter] = useState(priority);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== query.search || priorityFilter !== query.priority) {
      setQuery({ search: debouncedSearch, page: 1, priority: priorityFilter });
    }
  }, [debouncedSearch, priorityFilter]);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-vip-packages', page, debouncedSearch, size, priorityFilter],
    queryFn: () =>
      getVipPackages({
        page,
        search: debouncedSearch,
        size,
        priority: priorityFilter,
      }),
  });

  const priorityOptions = useMemo(
    () => [
      { label: 'BASIC', value: 'BASIC' },
      { label: 'SILVER', value: 'SILVER' },
      { label: 'GOLD', value: 'GOLD' },
      { label: 'PLATINUM', value: 'PLATINUM' },
      { label: 'DIAMOND', value: 'DIAMOND' },
    ],
    [],
  );

  const handlePriorityChange = useCallback((value: string) => {
    setPriorityFilter(value);
  }, []);

  return (
    <div className="space-y-6 dark:bg-black dark:text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Danh sách gói VIP</h1>
        <Button
          onClick={() => navigate(ROUTE_PATH.ADMIN.VIP_PACKAGES.CREATE)}
          className="cursor-pointer bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg hover:from-cyan-700 hover:to-teal-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* search */}
        <div className="flex-3">
          <SearchInput placeholder="Tìm kiếm gói vip" searchTerm={searchInput} onChange={setSearchInput} />
        </div>
        <div className="flex-1">
          <StatusFilter
            placeholder="loại gói VIP"
            statusFilter={priorityFilter}
            setStatusFilter={handlePriorityChange}
            options={priorityOptions}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSearchInput('');
              setPriorityFilter('');
              setQuery({
                search: '',
                page: 1,
                priority: '',
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
