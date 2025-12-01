import React from 'react';
import { ImageIcon } from 'lucide-react';
import { type FileTypeApiResponse } from '~/app/museu/herbario/types/file.types';
import { type FilesDiff } from '../../../types/change-request-detail.types';

type FilesDiffSectionProps = {
  files?: FileTypeApiResponse[] | null;
  filesDiff?: FilesDiff;
};

/**
 * Shared renderer for file additions, removals, or unchanged files.
 */
export function FilesDiffSection({
  files,
  filesDiff,
}: FilesDiffSectionProps): React.JSX.Element {
  const addedFiles = filesDiff?.added ?? [];
  const removedFiles = filesDiff?.removed ?? [];

  const hasAdded = addedFiles.length > 0;
  const hasRemoved = removedFiles.length > 0;
  const hasFiles = Array.isArray(files) && files.length > 0;

  if (!hasAdded && !hasRemoved && !hasFiles) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Nenhum arquivo anexado
      </p>
    );
  }

  const renderFileLink = (file: { id: string; url: string; path?: string }) => (
    <a
      key={file.id}
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded border border-green-200 bg-green-50 p-2 transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:hover:bg-green-900/30"
    >
      <ImageIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
      <span className="truncate text-xs text-green-800 dark:text-green-300">
        {getFileName(file)}
      </span>
    </a>
  );

  const renderRemovedFile = (file: {
    id: string;
    url: string;
    path?: string;
  }) => (
    <div
      key={file.id}
      className="flex items-center gap-2 rounded border border-red-200 bg-red-50 p-2 line-through dark:border-red-800 dark:bg-red-900/20"
    >
      <ImageIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
      <span className="truncate text-xs text-red-800 dark:text-red-300">
        {getFileName(file)}
      </span>
    </div>
  );

  const renderCurrentFile = (file: FileTypeApiResponse) => (
    <a
      key={file.id}
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded border p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <ImageIcon className="h-4 w-4" />
      <span className="truncate text-xs">{getFileName(file)}</span>
    </a>
  );

  const currentFiles = hasFiles ? (files ?? []) : [];

  return (
    <div className="space-y-4">
      {hasAdded && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-green-700 dark:text-green-400">
            Arquivos Adicionados ({addedFiles.length})
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {addedFiles.map((file) => renderFileLink(file))}
          </div>
        </div>
      )}

      {hasRemoved && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-red-700 dark:text-red-400">
            Arquivos Removidos ({removedFiles.length})
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {removedFiles.map((file) => renderRemovedFile(file))}
          </div>
        </div>
      )}

      {!hasAdded && !hasRemoved && hasFiles && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Arquivos ({currentFiles.length})
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {currentFiles.map((file) => renderCurrentFile(file))}
          </div>
        </div>
      )}
    </div>
  );
}

function getFileName(file: { path?: string; url: string }): string {
  const source = file.path ?? file.url ?? '';
  const segments = source.split('/');
  const name = segments[segments.length - 1] ?? '';
  if (name.length > 0) {
    return name;
  }
  return source;
}
