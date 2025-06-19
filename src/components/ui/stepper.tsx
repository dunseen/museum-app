import React from "react";
import { cn } from "~/lib/utils";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <ol className="mb-4 flex w-full items-center justify-between gap-2">
      {steps.map((step, index) => (
        <li key={index} className="flex flex-1 flex-col items-center">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border text-sm",
              index <= currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          <span className="mt-1 text-center text-xs sm:text-sm">{step}</span>
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
