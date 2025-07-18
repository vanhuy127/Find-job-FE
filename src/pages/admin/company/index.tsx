'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import ComboboxFilter from '@/components/admin/comboboxFilter';
import SearchInput from '@/components/admin/searchInput';
import StatusFilter from '@/components/admin/statusFilter';
import Pagination from '@/components/pagination';

import { MAX_PAGE_SHOW } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useCompanyService } from '@/service/company.service';
import { useProvinceService } from '@/service/province.service';

import { TableData } from './components/Table';

const index = () => {
  const { query, setQuery } = useQueryParams();
  const { getCompanies } = useCompanyService();
  const { getProvinces } = useProvinceService();
  const { page = 1, search = '', province = '', status = '-1', size = MAX_PAGE_SHOW } = query;
  const [searchInput, setSearchInput] = useState(search);
  const [provinceFilter, setProvinceFilter] = useState(province);
  const [statusFilter, setStatusFilter] = useState(status.toString());
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== query.search || statusFilter !== query.status || provinceFilter !== query.province) {
      setQuery({ search: debouncedSearch, page: 1, status: statusFilter, province: provinceFilter });
    }
  }, [debouncedSearch, statusFilter, provinceFilter]);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-companies', page, debouncedSearch, size, statusFilter, provinceFilter],
    queryFn: () =>
      getCompanies({
        page,
        search: debouncedSearch,
        size,
        status: Number(statusFilter),
        province: provinceFilter,
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

  const statusOptions = useMemo(
    () => [
      { label: 'Tất cả trạng thái', value: '-1' },
      { label: 'Hoạt động', value: '1' },
      { label: 'Không hoạt động', value: '0' },
    ],
    [],
  );

  const handleProvinceChange = useCallback((value: string) => {
    setProvinceFilter(value);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  return (
    <div className="space-y-6 dark:bg-black dark:text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Danh sách công ty</h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* search */}
        <div className="flex-3">
          <SearchInput placeholder="Tìm kiếm công ty" searchTerm={searchInput} onChange={handleSearchChange} />
        </div>
        <div className="flex-1">
          <StatusFilter
            placeholder="Lọc"
            statusFilter={statusFilter}
            setStatusFilter={handleStatusChange}
            options={statusOptions}
          />
        </div>
        <div className="flex-1">
          <ComboboxFilter
            options={provinceOptions}
            placeholder="Chọn tỉnh thành"
            value={provinceFilter}
            onChange={handleProvinceChange}
          />
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
