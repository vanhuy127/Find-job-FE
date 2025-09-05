import JobItemSkeleton from '@/components/jobItemSkeleton';
import { ICompany } from '@/interface'
import { CompanyItem } from './companyItem';

const ListCompanies = ({ companies, isLoading }: { companies: ICompany[]; isLoading: boolean }) => {

    if (isLoading) return (
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 7 }).map((_, i) => (
                <JobItemSkeleton key={i} />
            ))}
        </div>
    )

    return (
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {companies.length > 0
                ? (companies?.map((company) => (
                    <CompanyItem key={company.id} company={company} />
                )))
                : (<p className="text-gray-500 text-center">Không có công ty nào phù hợp với tiêu chí của bạn</p>)}
        </div>
    )
}

export default ListCompanies