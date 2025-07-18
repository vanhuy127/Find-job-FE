import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const JobDetailSkeleton = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Title */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      {/* Salary */}
      <div className="text-right">
        <Skeleton className="ml-auto h-6 w-1/4" />
        <Skeleton className="mt-1 ml-auto h-4 w-1/6" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-1/3" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
          </div>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>

      {/* Applications & Timeline */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/3" />
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};
export default JobDetailSkeleton;
