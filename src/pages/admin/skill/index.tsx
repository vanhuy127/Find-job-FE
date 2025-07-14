'use client';
import { useEffect, useState } from 'react';
import Pagination from '@/components/pagination';

import { TableData } from './components/Table';
import SearchInput from '@/components/admin/searchInput';
import { useQueryParams } from '@/hooks/useQueryParams';
import { MAX_PAGE_SHOW, ROUTE_PATH } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import { useSkillService } from '@/service/skill.service';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const index = () => {
    const { query, setQuery } = useQueryParams();
    const { getSkills } = useSkillService();
    const navigate = useNavigate();
    const { page = 1, search = '', size = MAX_PAGE_SHOW } = query;
    const [searchInput, setSearchInput] = useState(search);
    const debouncedSearch = useDebounce(searchInput);

    useEffect(() => {
        if (debouncedSearch !== query.search) {
            setQuery({ search: debouncedSearch, page: 1 });
        }
    }, [debouncedSearch]);

    const { data, isLoading } = useQuery({
        queryKey: ['admin-skills', page, debouncedSearch, size],
        queryFn: () =>
            getSkills({
                page,
                search: debouncedSearch,
                size,
            }),
    });

    return (
        <div className="space-y-6 dark:bg-black dark:text-white">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold">Danh sách kỹ năng</h1>
                <Button onClick={() => navigate(ROUTE_PATH.ADMIN.SKILLS.CREATE)} className="cursor-pointer bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg hover:from-cyan-700 hover:to-teal-700">
                    <Plus className="mr-2 h-4 w-4" /> Thêm
                </Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                {/* search */}
                <div className='flex-3'>
                    <SearchInput
                        placeholder="Tìm kiếm kỹ năng"
                        searchTerm={searchInput}
                        onChange={setSearchInput}
                    />
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
