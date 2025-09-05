import Pagination from "@/components/pagination";
import ListCompanies from "@/components/user/listCompanies/listCompanies";
import JobSearchBar from "@/components/user/listJobs/search";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useCompanyService } from "@/service/company.service";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

const Companies = () => {
    const { query, setQuery } = useQueryParams();
    const { getCompaniesForUser } = useCompanyService();

    const {
        page = 1,
        search = '',
        province = '',
        size = 9,
    } = query;

    const [searchInput, setSearchInput] = useState(search);
    const [provinceFilter, setProvinceFilter] = useState<string>(province);

    const debouncedSearch = useDebounce(searchInput);
    useEffect(() => {
        if (
            debouncedSearch !== query.search ||
            provinceFilter !== query.province
        ) {
            setQuery({
                search: debouncedSearch,
                page: 1,
                province: provinceFilter,
            });
        }
    }, [debouncedSearch, provinceFilter]);


    const { data: companies, isLoading } = useQuery({
        queryKey: ['user-companies', page, debouncedSearch, size, provinceFilter],
        queryFn: () =>
            getCompaniesForUser({
                page,
                search: debouncedSearch,
                size,
                province: provinceFilter,
            }),
    });

    const handleSearchChange = useCallback((value: string) => {
        setSearchInput(value);
    }, []);

    const handleLocationChange = useCallback((locations: string) => {

        setProvinceFilter(locations);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-800 dark:to-cyan-800">
            <div className="container mx-auto px-6 py-8">
                {/* Search Form */}
                <JobSearchBar
                    searchTerm={searchInput}
                    onSearchChange={handleSearchChange}
                    location={provinceFilter}
                    onLocationChange={handleLocationChange}
                    className="backdrop-blur-sm"
                />
                <div className="flex flex-col lg:flex-row gap-8">

                    <main className="flex-1">
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                                Tìm thấy <span className="text-rose-500">{companies?.pagination.total}</span> công ty IT
                            </h2>
                        </div>
                        {
                            companies?.data && (<ListCompanies companies={companies.data} isLoading={isLoading} />)
                        }

                        {companies && companies?.pagination.totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2">
                                <Pagination
                                    currentPage={page}
                                    totalPages={companies?.pagination.totalPages || page}
                                    onPageChange={(page) => setQuery({ page: page })}
                                />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Companies;
