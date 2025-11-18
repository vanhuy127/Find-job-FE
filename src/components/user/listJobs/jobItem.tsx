import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { JOB_LEVEL_SHOWS, JOB_TYPE_SHOWS, ROUTE_PATH, VIP_STYLES } from "@/constants"
import { IJob } from "@/interface"
import { formatSalary, numDateSince } from "@/utils"
import { Building, Clock, DollarSign, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"
const JobItem = ({ job }: { job: IJob }) => {
    const navigate = useNavigate();

    const styteIdx = job.vipPackage?.priority ?? -1;
    const vipStyle = VIP_STYLES[styteIdx];

    let cardClass =
        "relative transition-all duration-500 border rounded-2xl p-6 " +
        "hover:scale-[1.02] group cursor-pointer overflow-hidden ";

    if (styteIdx === -1) {
        cardClass +=
            "border-gray-200 bg-white/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-500/20 " +
            "dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-cyan-400/20";
    } else {
        cardClass += `
            ${vipStyle.border} 
            ${vipStyle.ring} 
            ${vipStyle.shadow}
            ${vipStyle.glow}
            ${vipStyle.bg} 
            ${vipStyle.bgDark}
        `;
    }

    return (
        <Card
            key={job.id}
            className={cardClass}
        >
            <CardContent className="px-6 md:px-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm shrink-0 dark:border-gray-500 dark:bg-gray-600">
                                <img
                                    src={job.company.logo || "/placeholder.svg"}
                                    alt={job.company.name}
                                    className="h-14 w-14 rounded-lg object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 dark:text-white">
                                    {job.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <Building className="h-5 w-5 text-cyan-500" />
                                    <p className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        {job.company.name}
                                    </p>
                                </div>
                            </div>
                            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 self-start">
                                {JOB_LEVEL_SHOWS[job.level]}
                            </Badge>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-600 dark:text-gray-300">
                                <span className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-cyan-500" />
                                    <span className="font-medium">{job.province.name}</span>
                                </span>

                                <span className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-green-500" />
                                    <span className="font-medium text-green-600 dark:text-green-400">
                                        {formatSalary(job.salaryMin, job.salaryMax)}
                                    </span>
                                </span>

                                <span className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-purple-500" />
                                    <span>
                                        {JOB_TYPE_SHOWS[job.jobType]} • {numDateSince(job.createdAt)}
                                    </span>
                                </span>
                            </div>

                            <p className="text-gray-600 leading-relaxed text-sm md:text-base dark:text-gray-400">
                                {job.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill) => (
                                    <Badge
                                        key={skill.id}
                                        variant="outline"
                                        className="border-cyan-200 bg-cyan-50 px-3 py-1 text-cyan-700 cursor-pointer dark:border-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
                                    >
                                        {skill.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:ml-8">
                        <Button
                            onClick={() =>
                                navigate(ROUTE_PATH.USER.JOBS.DETAILS.LINK(job.id))
                            }
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
                        >
                            Ứng tuyển ngay
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default JobItem