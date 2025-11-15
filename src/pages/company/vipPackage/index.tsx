import VipPackageCard from "@/components/company/vipPackageCard"
import { Button } from "@/components/ui/button";
import { ROUTE_PATH } from "@/constants";
import { useVipPackageService } from "@/service/vip.service"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

const index = () => {
    const { getVipPackagesForCompany } = useVipPackageService();
    const navigate = useNavigate();
    const { data: vp } = useQuery({
        queryKey: ['company-vip-packages'],
        queryFn: () =>
            getVipPackagesForCompany(),
    });

    const getPackageColor = (priority: number): string => {
        const colors: Record<number, string> = {
            0: "from-slate-500 to-slate-600",
            1: "from-amber-400 to-amber-500",
            2: "from-yellow-500 to-yellow-600",
            3: "from-blue-400 to-blue-600",
            4: "from-purple-500 to-purple-700",
        }

        return colors[priority] || "from-slate-500 to-slate-600"
    }

    const getBadgeColor = (priority: number): string => {
        const colors: Record<number, string> = {
            0: "bg-slate-200 text-slate-800",
            1: "bg-amber-200 text-amber-900",
            2: "bg-yellow-200 text-yellow-900",
            3: "bg-blue-200 text-blue-900",
            4: "bg-purple-200 text-purple-900",
        }

        return colors[priority] || "bg-slate-200 text-slate-800"
    }

    return (
        <div className="space-y-6 dark:text-white">
            <div className="mx-auto max-w-7xl text-center flex items-center justify-between">
                <h2 className="text-cyan-600 dark:text-cyan-400 text-4xl md:text-5xl font-bold">Gói VIP cho Công Ty</h2>
                <Button
                    onClick={() => navigate(ROUTE_PATH.COMPANY.VIP_PACKAGE.BOUGHT)}
                    className="cursor-pointer bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg hover:from-cyan-700 hover:to-teal-700"
                >
                    Gói VIP của tôi
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
                {vp?.data.map((pkg) => (
                    <div
                        key={pkg.id}
                        className="h-full cursor-pointer transform transition-all duration-500 hover:scale-105"
                    >
                        <VipPackageCard
                            package={pkg}
                            gradientColor={getPackageColor(pkg.priority)}
                            badgeColor={getBadgeColor(pkg.priority)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default index