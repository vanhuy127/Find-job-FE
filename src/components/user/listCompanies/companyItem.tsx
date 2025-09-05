import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ICompany } from '@/interface'

export const CompanyItem = ({ company }: { company: ICompany }) => {
    return (
        <Card
            key={company.id}
            className="group cursor-pointer border-gray-200 bg-white backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 dark:border-gray-700 dark:bg-gray-800/80 dark:hover:shadow-cyan-400/20"
        >
            <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200 transition-transform duration-300 group-hover:scale-105 dark:border-gray-600 dark:from-gray-700 dark:to-gray-800">
                            <img
                                src={company.logo || '/placeholder.svg'}
                                alt={company.name}
                                className="h-14 w-14 rounded-xl"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                                {company.name}
                            </h3>
                            <p className="font-medium text-gray-600 dark:text-gray-400 overflow-hidden text-ellipsis line-clamp-1">{company.address}</p>
                        </div>
                    </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{company.description}</p>

                <div className="mb-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Đang tuyển:</span>
                        <Badge className="border-cyan-200 bg-cyan-100 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/20 dark:text-cyan-400">
                            {company.jobCount} vị trí
                        </Badge>
                    </div>
                </div>

                <Button className="mt-8 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 font-semibold text-white transition-all duration-300 hover:from-cyan-600 hover:to-blue-600">
                    Xem việc làm
                </Button>
            </CardContent>
        </Card>
    )
}
