'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { CalendarIcon } from 'lucide-react';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';

type DatePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  isDisabled?: boolean;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  isDisabled,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  function formatDate(date: Date) {
    return format(date, 'dd LLL, y', {
      locale: ptBR,
    });
  }

  function onSelect(date: Date | undefined) {
    onChange(date);
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild disabled={isDisabled}>
        <Button
          variant={'outline'}
          className={cn(
            'min-w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon />
          {value ? (
            formatDate(value)
          ) : (
            <span className="ml-1">Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          locale={ptBR}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
