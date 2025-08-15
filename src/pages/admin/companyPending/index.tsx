'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import ComboboxFilter from '@/components/admin/comboboxFilter';
import SearchInput from '@/components/admin/searchInput';
import Pagination from '@/components/pagination';

import { MAX_PAGE_SHOW } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useCompanyService } from '@/service/company.service';
import { useProvinceService } from '@/service/province.service';

import { TableData } from './components/Table';
import StatusFilter from '@/components/admin/statusFilter';

const index = () => {
  const { query, setQuery } = useQueryParams();
  const { getCompaniesPending } = useCompanyService();
  const { getProvinces } = useProvinceService();
  const { page = 1, search = '', province = '', status = 'all', size = MAX_PAGE_SHOW } = query;
  const [searchInput, setSearchInput] = useState(search);
  const [provinceFilter, setProvinceFilter] = useState(province);
  const [statusFilter, setStatusFilter] = useState(status.toString());
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== query.search || provinceFilter !== query.province || statusFilter !== query.status) {
      setQuery({ search: debouncedSearch, page: 1, province: provinceFilter, status: statusFilter });
    }
  }, [debouncedSearch, provinceFilter, statusFilter]);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-companies-pending', page, debouncedSearch, size, provinceFilter, statusFilter],
    queryFn: () =>
      getCompaniesPending({
        page,
        search: debouncedSearch,
        size,
        province: provinceFilter,
        status: statusFilter,
      }),
  });

  const { data: provinces } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => getProvinces(),
  });

  const provinceOptions = useMemo(() => {
    const filteredProvinces = [
      {
        label: 'Tất cả tỉnh thành',
        value: '',
      },
      ...(provinces?.data?.map((province) => ({
        label: province.name,
        value: province.name,
      })) || []),
    ];

    return filteredProvinces;
  }, [provinces]);

  const handleProvinceChange = useCallback((value: string) => {
    setProvinceFilter(value);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value);
  }, []);

  return (
    <div className="space-y-6 dark:bg-black dark:text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Danh sách công ty chờ duyệt</h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* search */}
        <div className="flex-3">
          <SearchInput placeholder="Tìm kiếm công ty" searchTerm={searchInput} onChange={handleSearchChange} />
        </div>
        <div className="flex-1">
          <ComboboxFilter
            options={provinceOptions}
            placeholder="Chọn tỉnh thành"
            value={provinceFilter}
            onChange={handleProvinceChange}
          />
        </div>
        <div className="flex-1">
          <StatusFilter
            placeholder="Lọc"
            statusFilter={statusFilter}
            setStatusFilter={handleStatusChange}
            options={[
              { label: 'Tất cả', value: 'all' },
              { label: 'Chờ duyệt', value: 'pending' },
              { label: 'Đã từ chối', value: 'rejected' },
            ]}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSearchInput('');
              setProvinceFilter('');
              setQuery({
                search: '',
                page: 1,
                province: '',
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
