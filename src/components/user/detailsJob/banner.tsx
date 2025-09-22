import { Card, CardContent } from "@/components/ui/card";
import { ICompany } from "@/interface";
import { ExternalLink, Globe, Mail, MapPin } from "lucide-react";

const Banner = ({ company }: { company: ICompany }) => {
    return <Card className="mb-6 sm:mb-8 overflow-hidden border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80">
        <div className="relative h-32 sm:h-48 bg-gradient-to-r from-indigo-400 to-cyan-400">
            {/* <img
                src={company?.coverImage || "/placeholder.svg"}
                alt="Company cover"
                className="w-full h-full object-cover opacity-20"
            /> */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/80 via-indigo-500/80 to-indigo-600/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <CardContent className="relative -mt-12 sm:-mt-16 p-4 sm:p-8">
            <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6">
                <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-2xl border-4 border-white bg-white shadow-2xl shrink-0 dark:border-gray-800 dark:bg-gray-800">
                    <img
                        src={company.logo || "/placeholder.svg"}
                        alt={company.name}
                        className="h-20 w-20 sm:h-28 sm:w-28 rounded-xl object-cover"
                    />
                </div>

                <div className="flex-1 w-full">
                    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl lg:pt-3 font-bold text-gray-900 mb-2 text-balance dark:text-white">
                                {company.name}
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600 shrink-0 dark:text-cyan-400" />
                                    <span className="truncate">{company.province.name}</span>
                                </div>
                                {company.website ? (
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 shrink-0 dark:text-blue-400" />
                                        <a
                                            href={company.website}
                                            className="hover:text-cyan-600 transition-colors truncate flex items-center gap-1 dark:hover:text-cyan-400"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Website
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 shrink-0 dark:text-gray-400" />
                                        <a
                                            href={`mailto:${company.email}`}
                                            className="hover:text-cyan-600 transition-colors truncate dark:hover:text-cyan-400"
                                        >
                                            {company.email}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>;
};

export default Banner;
