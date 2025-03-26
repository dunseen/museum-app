"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

type RejectActivityDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onReject: (reason: string) => void;
  isLoading?: boolean;
};
export default function RejectActivityDialog({
  isOpen,
  onClose,
  onReject,
  isLoading,
}: RejectActivityDialogProps) {
  const [reason, setReason] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Rejeitar atividade</DialogTitle>
        <Label htmlFor="reason">Motivo da rejeição</Label>
        <Textarea
          id={"reason"}
          title="Motivo da rejeição"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Descreva o motivo da rejeição"
        />
        <DialogFooter>
          <Button disabled={isLoading} variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onClick={() => onReject(reason)}
          >
            Rejeitar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
