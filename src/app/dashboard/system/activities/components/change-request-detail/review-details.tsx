import React from 'react';
import { type PersonName } from '../../../types/change-request-detail.types';
import { formatFullName } from './utils';

type ReviewDetailsProps = {
  reviewedBy: PersonName;
  decidedAt?: string | null;
  reviewerNote?: string | null;
};

/**
 * Section that summarizes reviewer decisions.
 */
export function ReviewDetails({
  reviewedBy,
  decidedAt,
  reviewerNote,
}: ReviewDetailsProps): React.JSX.Element {
  return (
    <div className="mt-6 space-y-3 rounded border border-gray-200 p-4 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Revisão
      </h3>
      <div className="space-y-2">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Revisor
          </label>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatFullName(reviewedBy)}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Data da Decisão
          </label>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {decidedAt ? new Date(decidedAt).toLocaleString('pt-BR') : '-'}
          </p>
        </div>
        {reviewerNote && (
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Comentário
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {reviewerNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
