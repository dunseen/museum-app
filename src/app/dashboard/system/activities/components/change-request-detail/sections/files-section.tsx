import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { FileIcon } from 'lucide-react';
import { FilesDiffSection } from '../files-diff-section';
import { type ChangeRequestDiff } from '../../../../types/change-request-detail.types';
import { type FileTypeApiResponse } from '~/app/museu/herbario/types/file.types';

type FilesSectionProps = {
  files: FileTypeApiResponse[];
  filesDiff: ChangeRequestDiff['files'];
};

export function FilesSection({
  files,
  filesDiff,
}: FilesSectionProps): React.JSX.Element {
  return (
    <AccordionItem value="files">
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <FileIcon className="h-4 w-4" />
          Arquivos
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <FilesDiffSection files={files} filesDiff={filesDiff} />
      </AccordionContent>
    </AccordionItem>
  );
}
