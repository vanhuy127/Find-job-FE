import { Card, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'

const JobItemSkeleton = () => {
    return (
        <Card className="border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
            <CardContent className="p-8">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        {/* --- Logo + Title + Company --- */}
                        <div className="flex items-start gap-4 mb-4">
                            <Skeleton className="h-14 w-14 rounded-lg" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-10" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>

                        {/* --- Info line --- */}
                        <div className="flex items-center gap-6 mb-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-28" />
                        </div>

                        {/* --- Description --- */}
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6 mb-2" />
                        <Skeleton className="h-4 w-2/3" />

                        {/* --- Skills --- */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            <Skeleton className="h-6 w-16 rounded-md" />
                            <Skeleton className="h-6 w-20 rounded-md" />
                            <Skeleton className="h-6 w-14 rounded-md" />
                        </div>
                    </div>

                    {/* --- Buttons --- */}
                    <div className="flex flex-col gap-3 ml-8">
                        <Skeleton className="h-10 w-32 rounded-xl" />
                        <Skeleton className="h-8 w-24 rounded-xl" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default JobItemSkeleton