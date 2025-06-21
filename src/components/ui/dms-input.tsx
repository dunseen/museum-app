import React from "react";
import InputMask from "react-input-mask";
import { Input, type InputProps } from "./input";

interface DMSInputProps extends InputProps {
  isLat: boolean;
}

export const DMSInput = React.forwardRef<HTMLInputElement, DMSInputProps>(
  ({ isLat, ...props }, ref) => {
    const mask = isLat ? "99°99'99.99\"a" : "999°99'99.99\"a";
    const formatChars = { a: isLat ? "[NSns]" : "[EWew]" } as const;

    return (
      <InputMask
        mask={mask}
        maskChar=""
        formatChars={formatChars}
        inputRef={ref}
        {...props}
      >
        {(inputProps: InputProps) => <Input {...inputProps} />}
      </InputMask>
    );
  },
);
DMSInput.displayName = "DMSInput";

