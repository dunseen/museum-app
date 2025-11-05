import React from "react";
import { InputMask, format } from "@react-input/mask";
import { Input, type InputProps } from "./input";

interface DMSInputProps extends InputProps {
  isLat: boolean;
}

export const DMSInput = React.forwardRef<HTMLInputElement, DMSInputProps>(
  ({ isLat, defaultValue, ...props }, ref) => {
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
        defaultValue={
          defaultValue &&
          format(String(defaultValue), {
            mask,
            replacement,
          })
        }
        ref={ref}
        {...props}
      />
    );
  },
);
DMSInput.displayName = "DMSInput";
