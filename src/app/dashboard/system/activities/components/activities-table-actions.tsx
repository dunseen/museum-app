"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

type ActivitiesTableActionsProps = {
  onApprove: () => void;
  onReject: () => void;
  onGeneratePDF: () => void;
  isPublished?: boolean;
};
export function ActivitiesTableActions({
  onApprove,
  onReject,
  onGeneratePDF,
  isPublished,
}: ActivitiesTableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!isPublished && (
          <>
            <DropdownMenuItem onClick={onApprove}>Aprovar</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onReject}>Rejeitar</DropdownMenuItem>
          </>
        )}

        {isPublished && (
          <DropdownMenuItem onClick={onGeneratePDF}>
            Gerar ficha
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
