import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

interface LoadingErrorWrapperProps {
  loading?: boolean;
  error?: boolean;
  children: React.ReactNode;
}

const LoadingErrorWrapper: React.FC<LoadingErrorWrapperProps> = ({
  loading,
  error,
  children,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-full bg-gray-200" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">Ocorreu um erro ao carregar os dados.</div>
    );
  }

  return <>{children}</>;
};

export default LoadingErrorWrapper;
