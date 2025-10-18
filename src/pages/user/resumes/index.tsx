import React, { useEffect, useMemo, useState } from 'react'
import { TableData } from './components/Table';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/admin/searchInput';
import StatusFilter from '@/components/admin/statusFilter';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useResumeService } from '@/service/resume.service';
import { MAX_PAGE_SHOW } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';

const index = () => {
    const { query, setQuery } = useQueryParams();
    const { getResumesForUser } = useResumeService();
    const { page = 1, search = '', status = 'ALL', size = MAX_PAGE_SHOW } = query;
    const [searchInput, setSearchInput] = useState(search);
    const [statusFilter, setStatusFilter] = useState(status.toString());
    const debouncedSearch = useDebounce(searchInput);

    useEffect(() => {
        if (debouncedSearch !== query.search || statusFilter !== query.status) {
            setQuery({ search: debouncedSearch, page: 1, status: statusFilter });
        }
    }, [debouncedSearch, statusFilter]);

    const { data, isLoading } = useQuery({
        queryKey: ['user-resumes', page, debouncedSearch, size, statusFilter],
        queryFn: () =>
            getResumesForUser({
                page,
                search: debouncedSearch,
                size,
                status: statusFilter,
            }),
    });

    const statusOptions = useMemo(
        () => [
            { label: 'Tất cả', value: 'ALL' },
            { label: 'Đang chờ', value: 'PENDING' },
            { label: 'Chấp nhận', value: 'APPROVED' },
            { label: 'Từ chối', value: 'REJECTED' },
        ],
        [],
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 dark:bg-black dark:text-white">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold">Danh sách đơn ứng tuyển đã nộp</h1>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                {/* search */}
                <div className="flex-3">
                    <SearchInput placeholder="Tìm kiếm đơn ứng tuyển" searchTerm={searchInput} onChange={setSearchInput} />
                </div>
                <div className="flex-1">
                    <StatusFilter
                        placeholder="Lọc"
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        options={statusOptions}
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
}

export default index