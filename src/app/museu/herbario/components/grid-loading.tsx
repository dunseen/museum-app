import { Skeleton } from "~/components/ui/skeleton";

export const GridLoading = ({ quantity = 4 }: { quantity?: number }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {Array.from({ length: quantity }).map((_, index) => (
      <Skeleton key={index} className="h-64 w-full bg-gray-200" />
    ))}
  </div>
);
