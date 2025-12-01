'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '~/components/ui/dialog';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';

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
  const [reason, setReason] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Rejeitar solicitação</DialogTitle>
        <Label htmlFor="reason">Motivo:</Label>
        <Textarea
          id={'reason'}
          title="Motivo"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Descreva o motivo"
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
