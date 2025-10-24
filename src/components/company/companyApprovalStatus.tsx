import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { ICompany } from "@/interface"

export default function CompanyApprovalStatus({ company }: { company: ICompany }) {
    const getStatusConfig = (status: number) => {
        switch (status) {
            case -1:
                return {
                    label: "Đang chờ duyệt",
                    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
                    icon: <Clock className="w-4 h-4 mr-1" />,
                    progress: 33,
                }
            case 0:
                return {
                    label: "Bị từ chối",
                    color: "bg-red-100 text-red-800 border-red-200",
                    icon: <XCircle className="w-4 h-4 mr-1" />,
                    progress: 100,
                }
            case 1:
                return {
                    label: "Đã duyệt",
                    color: "bg-green-100 text-green-800 border-green-200",
                    icon: <CheckCircle className="w-4 h-4 mr-1" />,
                    progress: 100,
                }
            default:
                return {
                    label: "Không xác định",
                    color: "bg-gray-100 text-gray-800 border-gray-200",
                    icon: <Clock className="w-4 h-4 mr-1" />,
                    progress: 0,
                }
        }
    }

    const status = getStatusConfig(company.status)

    return (
        <Card className="w-full max-w-2xl shadow-lg border-t-4 border-cyan-600">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <img
                        src={company.logo}
                        alt="Company logo"
                        className="w-16 h-16 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                        <CardTitle className="text-xl text-cyan-800">{company.name}</CardTitle>
                        <CardDescription>{company.email}</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <Separator className="my-2" />

            <CardContent className="space-y-4">
                <div>
                    <Badge variant="outline" className={`flex items-center ${status.color}`}>
                        {status.icon}
                        {status.label}
                    </Badge>
                    <Progress value={status.progress} className="mt-3 h-2 bg-gray-200 [&>div]:bg-cyan-500" />
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Địa chỉ:</strong> {company.address}</p>
                    <p><strong>Tỉnh thành:</strong> {company.province.name}</p>
                    {company.website && <p><strong>Website:</strong> <a href={company.website} className="text-cyan-700 hover:underline">{company.website}</a></p>}
                    <p><strong>Mã số thuế:</strong> {company.taxCode}</p>
                    <p><strong>Giấy phép kinh doanh:</strong> <Link to={company.businessLicensePath} target="_blank" className="text-cyan-700 hover:underline">Xem file</Link></p>
                </div>

                {company.description && (
                    <div>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{company.description}</p>
                    </div>
                )}

                {company.status === -1 && (
                    <p className="text-yellow-700 mt-2">Hồ sơ đang được xem xét. Vui lòng chờ phản hồi từ quản trị viên.</p>
                )}
                {company.status === 0 && (
                    <div className="text-red-700 mt-2">
                        <p><strong>Lý do từ chối:</strong></p>
                        <p className="italic">{company.reasonReject || "Không có lý do cụ thể."}</p>
                    </div>
                )}
                {company.status === 1 && (
                    <p className="text-green-700 mt-2">Hồ sơ của bạn đã được phê duyệt. Bạn có thể đăng tin tuyển dụng ngay bây giờ 🎉</p>
                )}
            </CardContent>
        </Card>
    )
}
