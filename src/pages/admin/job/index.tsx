'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Pagination from '@/components/pagination';

import { TableData } from './components/Table';
import SearchInput from '@/components/admin/searchInput';
import { useQueryParams } from '@/hooks/useQueryParams';
import { MAX_PAGE_SHOW } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import ComboboxFilter from '@/components/admin/comboboxFilter';
import { useProvinceService } from '@/service/province.service';
import { useJobService } from '@/service/job.service';
import StatusFilter from '@/components/admin/statusFilter';

const index = () => {
    const { query, setQuery } = useQueryParams();
    const { getJobs } = useJobService();
    const { getProvinces } = useProvinceService();
    const { page = 1, search = '', province = '', jobType = '', level = '', size = MAX_PAGE_SHOW } = query;
    const [searchInput, setSearchInput] = useState(search);
    const [provinceFilter, setProvinceFilter] = useState(province);
    const [jobTypeFilter, setJobTypeFilter] = useState(jobType);
    const [levelFilter, setLevelFilter] = useState(level);
    const debouncedSearch = useDebounce(searchInput);

    useEffect(() => {
        if (debouncedSearch !== query.search || provinceFilter !== query.province || jobTypeFilter !== query.jobType || levelFilter !== query.level) {
            setQuery({ search: debouncedSearch, page: 1, province: provinceFilter, jobType: jobTypeFilter, level: levelFilter });
        }
    }, [debouncedSearch, provinceFilter, jobTypeFilter, levelFilter]);

    const { data, isLoading } = useQuery({
        queryKey: ['admin-jobs', page, debouncedSearch, size, provinceFilter, jobTypeFilter, levelFilter],
        queryFn: () =>
            getJobs({
                page,
                search: debouncedSearch,
                size,
                province: provinceFilter,
                jobType: jobTypeFilter,
                level: levelFilter,
            }),
    });

    const { data: provinces } = useQuery({
        queryKey: ['provinces'],
        queryFn: () => getProvinces(),
    });

    const provinceOptions = useMemo(() => {
        const filteredProvinces = [{
            label: 'Tất cả tỉnh thành',
            value: '',
        }, ...(provinces?.data?.map((province) => ({
            label: province.name,
            value: province.name,
        })) || [])]

        return filteredProvinces;
    }, [provinces]);

    const jobTypeOptions = useMemo(() => [
        { label: 'Full time', value: "FULL_TIME" },
        { label: 'Part time', value: "PART_TIME" },
        { label: 'Internship', value: "INTERNSHIP" },
        { label: 'Freelance', value: "FREELANCE" },
        { label: 'Remote', value: "REMOTE" },
    ], []);

    const levelOptions = useMemo(() => [
        { label: 'Intern', value: "INTERN" },
        { label: 'Fresher', value: "FRESHER" },
        { label: 'Junior', value: "JUNIOR" },
        { label: 'Mid', value: "MID" },
        { label: 'Senior', value: "SENIOR" },
        { label: 'Lead', value: "LEAD" },
    ], []);

    const handleProvinceChange = useCallback((value: string) => {
        setProvinceFilter(value);
    }, []);

    const handleSearchChange = useCallback((value: string) => {
        setSearchInput(value);
    }, []);

    const handleJobTypeChange = useCallback((value: string) => {
        setJobTypeFilter(value);
    }, []);

    const handleLevelChange = useCallback((value: string) => {
        setLevelFilter(value);
    }, []);

    return (
        <div className="space-y-6 dark:bg-black dark:text-white">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold">Danh sách việc làm</h1>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                {/* search */}
                <div className='flex-3'>
                    <SearchInput
                        placeholder="Tìm kiếm việc làm"
                        searchTerm={searchInput}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className='flex-1'>
                    <StatusFilter
                        placeholder="Loại công việc"
                        statusFilter={jobTypeFilter}
                        setStatusFilter={handleJobTypeChange}
                        options={jobTypeOptions}
                    />
                </div>
                <div className='flex-1'>
                    <StatusFilter
                        placeholder="Mức độ"
                        statusFilter={levelFilter}
                        setStatusFilter={handleLevelChange}
                        options={levelOptions}
                    />
                </div>
                <div className='flex-1'>
                    <ComboboxFilter
                        options={provinceOptions}
                        placeholder="Chọn tỉnh thành"
                        value={provinceFilter}
                        onChange={handleProvinceChange}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setSearchInput('');
                            setProvinceFilter('');
                            setJobTypeFilter('');
                            setLevelFilter('');
                            setQuery({
                                search: '',
                                page: 1,
                                province: '',
                                jobType: '',
                                level: '',
                            });
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded hover:bg-red-800 dark:bg-rose-900 dark:hover:bg-red-800"
                    >
                        Xóa bộ lọc
                    </button>
                </div>
            </div>

            {/* table */}
            <TableData data={data?.data} isLoading={isLoading} />
            {/* pagination */}
            <Pagination currentPage={page} totalPages={data?.pagination.totalPages || page} onPageChange={(page) => setQuery({ page: page })} />
        </div>
    );
};
export default index;
