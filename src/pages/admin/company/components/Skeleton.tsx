import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CompanyDetailSkeleton = () => {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start space-x-4">
        <Skeleton className="h-20 w-20 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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

      {/* Main Content */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-5 w-1/4" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Reject reason */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>

          {/* Legal Document */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Time info */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailSkeleton;
