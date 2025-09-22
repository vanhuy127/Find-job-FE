import { Card, CardContent } from "@/components/ui/card"
import Banner from "@/components/user/detailsJob/banner"
import ListCurrentJobs from "@/components/user/detailsJob/listCurrentJobs"
import { ROUTE_PATH } from "@/constants"
import { useCompanyService } from "@/service/company.service"
import { useQuery } from "@tanstack/react-query"
import {
    Building,
    TrendingUp,
} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

const CompanyDetails = () => {
    const { getCompanyByIdForUser, getCompaniesForUser } = useCompanyService();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: company } = useQuery({
        queryKey: ['user-companies', id],
        queryFn: () => getCompanyByIdForUser(id!),
    });

    const { data: companies } = useQuery({
        queryKey: ['user-companies', company?.province.name],
        queryFn: () =>
            getCompaniesForUser({
                page: 1,
                size: "6",
                province: company?.province.name || '',
            }),
        enabled: !!company?.province.name,
    });

    if (!company) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-800 dark:to-cyan-800">
                <div className="text-gray-500 dark:text-gray-400">Đang tải ...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-800 dark:to-cyan-800">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {/* Company Banner */}
                <Banner company={company} />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                    {/* list current jobs */}
                    <ListCurrentJobs company={company} />

                    <div className="space-y-6">
                        {/* Company Stats */}
                        <Card className="border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800/80">
                            <CardContent className="p-6">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3 dark:text-white">
                                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    Thống kê
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-gray-100/30 hover:bg-gray-100/50 transition-colors dark:bg-gray-700/30 dark:hover:bg-gray-700/50">
                                        <span className="text-gray-600 text-sm sm:text-base dark:text-gray-400">Vị trí đang tuyển</span>
                                        <span className="font-semibold text-cyan-600 text-lg dark:text-cyan-400">{company.jobCount}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Similar Companies */}
                        <Card className="border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800/80">
                            <CardContent className="p-6">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3 dark:text-white">
                                    <Building className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                    Công ty tương tự
                                </h3>
                                <div className="space-y-3 sm:space-y-4">
                                    {companies?.data && companies.data.filter((company) => company.id !== id).length > 0 ? (
                                        companies.data
                                            .filter((company) => company.id !== id)
                                            .map((company, index) => (
                                                <div
                                                    onClick={() =>
                                                        navigate(ROUTE_PATH.USER.COMPANIES.DETAILS.LINK(company.id))
                                                    }
                                                    key={index}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100/50 transition-all cursor-pointer group hover:shadow-md dark:hover:bg-gray-700/50"
                                                >
                                                    <img
                                                        src={company.logo || "/placeholder.svg"}
                                                        alt={company.name}
                                                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors text-sm sm:text-base dark:text-white dark:group-hover:text-cyan-400">
                                                            {company.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <p className="text-sm text-gray-500 italic dark:text-gray-400 text-center">
                                            Không có công ty tương tự
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CompanyDetails