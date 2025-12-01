import React from 'react';
import { GridLoading } from '~/app/museu/herbario/components/grid-loading';

interface LoadingErrorWrapperProps {
  loading?: boolean;
  error?: boolean;
  length?: number;
  children: React.ReactNode;
}

const LoadingErrorWrapper: React.FC<LoadingErrorWrapperProps> = ({
  loading,
  error,
  children,
  length,
}) => {
  if (loading) return <GridLoading />;

  if (error) {
    return (
      <p className="w-full text-center text-red-500">
        Não foi possível carregar os dados. Por favor, tente novamente mais
        tarde.
      </p>
    );
  }

  if (!length) {
    return (
      <p className="w-full text-center text-gray-500">
        Nenhum dado disponível para exibir.
      </p>
    );
  }

  return <>{children}</>;
};

export default LoadingErrorWrapper;
