import JobItemSkeleton from '@/components/jobItemSkeleton';
import JobItem from './jobItem'
import { IJob } from '@/interface'

const ListJobs = ({ jobs, isLoading }: { jobs: IJob[]; isLoading: boolean }) => {

    if (isLoading) return (
        <div className="space-y-6 mb-8">
            {Array.from({ length: 7 }).map((_, i) => (
                <JobItemSkeleton key={i} />
            ))}
        </div>
    )

    return (
        <div className="space-y-6 mb-8">
            {jobs.length > 0
                ? (jobs?.map((job) => (
                    <JobItem key={job.id} job={job} />
                )))
                : (<p className="text-gray-500 text-center">Không có công việc nào phù hợp với tiêu chí của bạn</p>)}
        </div>
    )
}

export default ListJobs