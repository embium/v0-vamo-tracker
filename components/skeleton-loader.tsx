import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section skeleton */}
        <div className="text-center mb-12 space-y-6">
          <div className="h-8 w-48 bg-muted animate-pulse rounded-full mx-auto mb-4" />
          <div className="h-24 w-96 bg-muted animate-pulse rounded-lg mx-auto mb-4" />
          <div className="h-8 w-full max-w-2xl bg-muted animate-pulse rounded-lg mx-auto" />
        </div>

        {/* Cards skeleton */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[1, 2].map((i) => (
            <Card
              key={i}
              className="shadow-lg border-2"
            >
              <CardHeader>
                <div className="h-6 w-48 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-muted animate-pulse rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Heatmap skeleton */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-2" />
          <div className="h-4 w-96 bg-muted animate-pulse rounded mb-6" />

          {/* Grid skeleton */}
          <div className="w-full overflow-x-auto">
            <div className="inline-grid grid-cols-20 gap-1.5 min-w-max">
              {Array.from({ length: 100 }, (_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Legend skeleton */}
          <div className="flex items-center gap-4 mt-6">
            <div className="h-3 w-8 bg-muted animate-pulse rounded" />
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-muted animate-pulse rounded-sm"
                />
              ))}
            </div>
            <div className="h-3 w-8 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LeadsSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-12 w-64 bg-muted animate-pulse rounded-lg mb-3" />
          <div className="h-6 w-96 bg-muted animate-pulse rounded-lg" />
        </div>

        {/* Stats cards skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="text-center"
            >
              <CardHeader className="pb-3">
                <div className="h-4 w-20 bg-muted animate-pulse rounded mx-auto mb-2" />
                <div className="h-8 w-16 bg-muted animate-pulse rounded mx-auto" />
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Progress card skeleton */}
        <Card className="mb-8">
          <CardHeader>
            <div className="h-6 w-48 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-6">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add button skeleton */}
        <div className="mb-6">
          <div className="h-10 w-40 bg-muted animate-pulse rounded-lg" />
        </div>

        {/* Table skeleton */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/50 border-b">
            <div className="col-span-2 h-4 bg-muted animate-pulse rounded" />
            <div className="col-span-2 h-4 bg-muted animate-pulse rounded" />
            <div className="col-span-4 h-4 bg-muted animate-pulse rounded" />
            <div className="col-span-3 h-4 bg-muted animate-pulse rounded" />
            <div className="col-span-1 h-4 bg-muted animate-pulse rounded" />
          </div>
          <div className="divide-y">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center"
              >
                <div className="col-span-2 h-5 bg-muted animate-pulse rounded" />
                <div className="col-span-2 h-4 bg-muted animate-pulse rounded" />
                <div className="col-span-4 h-4 bg-muted animate-pulse rounded" />
                <div className="col-span-3 h-9 bg-muted animate-pulse rounded" />
                <div className="col-span-1 h-4 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FindCustomersSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="h-12 w-72 bg-muted animate-pulse rounded-lg mb-3" />
          <div className="h-6 w-96 bg-muted animate-pulse rounded-lg mb-4" />
          <div className="h-8 w-48 bg-muted animate-pulse rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card
              key={i}
              className="p-6"
            >
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                <div className="h-10 w-full bg-muted animate-pulse rounded-lg mt-4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LibrarySkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="h-12 w-80 bg-muted animate-pulse rounded-lg mb-3" />
          <div className="h-6 w-96 bg-muted animate-pulse rounded-lg" />
        </div>

        {/* Filters skeleton */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-8 w-24 bg-muted animate-pulse rounded"
            />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card
              key={i}
              className="overflow-hidden"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 bg-muted animate-pulse rounded-lg" />
                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                </div>
                <div className="w-full h-48 bg-muted animate-pulse rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DiarySkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="h-12 w-64 bg-muted animate-pulse rounded-lg mb-3" />
          <div className="h-6 w-96 bg-muted animate-pulse rounded-lg" />
        </div>

        <Card className="shadow-lg border-2">
          <CardHeader>
            <div className="h-6 w-48 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 w-full max-w-md bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-24 bg-muted animate-pulse rounded-xl"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="h-32 bg-muted animate-pulse rounded-lg" />
              </div>
              <div className="h-10 w-full bg-muted animate-pulse rounded-lg" />
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border">
          <div className="h-5 w-48 bg-muted animate-pulse rounded mb-2" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-12 w-80 bg-muted animate-pulse rounded-lg mb-3" />
          <div className="h-6 w-96 bg-muted animate-pulse rounded-lg" />
        </div>

        {/* Card skeleton */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <div className="h-6 w-32 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 w-full max-w-md bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Avatar skeleton */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-muted animate-pulse" />
                <div className="h-4 w-64 bg-muted animate-pulse rounded" />
              </div>

              {/* Name field skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                <div className="h-10 w-full bg-muted animate-pulse rounded-lg" />
              </div>

              {/* Email field skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                <div className="h-10 w-full bg-muted animate-pulse rounded-lg" />
                <div className="h-3 w-40 bg-muted animate-pulse rounded" />
              </div>

              {/* Button skeleton */}
              <div className="h-12 w-full bg-muted animate-pulse rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function AssistantSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="mb-6">
          <div className="h-12 w-64 bg-muted animate-pulse rounded-lg mb-3" />
          <div className="h-6 w-96 bg-muted animate-pulse rounded-lg" />
        </div>

        {/* Chat container skeleton */}
        <div className="flex flex-col h-[calc(100vh-14rem)] bg-card border border-border rounded-2xl overflow-hidden">
          {/* Chat messages skeleton */}
          <div className="flex-1 p-4 space-y-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="space-y-2"
              >
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                <div className="h-16 w-full max-w-md bg-muted animate-pulse rounded-lg" />
              </div>
            ))}
          </div>

          {/* Input area skeleton */}
          <div className="border-t border-border p-4">
            <div className="h-12 w-full bg-muted animate-pulse rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
