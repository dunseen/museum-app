"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

type RejectActivityDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onReject: (reason: string) => void;
};
export default function RejectActivityDialog({
  isOpen,
  onClose,
  onReject,
}: RejectActivityDialogProps) {
  const [reason, setReason] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Rejeitar atividade</DialogHeader>
        <Label htmlFor="reason">Motivo da rejeição</Label>
        <Textarea
          id={"reason"}
          title="Motivo da rejeição"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Descreva o motivo da rejeição"
        />
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onReject(reason)}>Rejeitar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
