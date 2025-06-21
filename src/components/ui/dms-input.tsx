import React from "react";
import { InputMask } from "@react-input/mask";
import { Input, type InputProps } from "./input";

interface DMSInputProps extends InputProps {
  isLat: boolean;
}

export const DMSInput = React.forwardRef<HTMLInputElement, DMSInputProps>(
  ({ isLat, ...props }, ref) => {
    const mask = isLat ? "dd°dd'dd.dda" : "ddd°dd'dd.dda";
    const replacement = {
      d: /\d/,
      a: isLat ? /[NSns]/ : /[EWew]/,
    } as const;

    return (
      <InputMask
        mask={mask}
        replacement={replacement}
        component={Input}
        ref={ref}
        {...props}
      />
    );
  },
);
DMSInput.displayName = "DMSInput";
