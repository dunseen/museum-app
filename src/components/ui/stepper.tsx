import React from "react";
import { cn } from "~/lib/utils";

import { Check, AlertTriangle } from "lucide-react";

export type StepStatus = "default" | "complete" | "error";

type StepperProps = {
  steps: string[];
  currentStep: number;
  statuses?: StepStatus[];
};

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  statuses,
}) => {
  return (
    <ol className="mb-4 flex w-full items-center justify-between gap-2">
      {steps.map((step, index) => {
        const status = statuses?.[index] ?? "default";
        const isCurrent = index === currentStep;

        return (
          <li key={index} className="flex flex-1 flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-sm",
                isCurrent
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
                status === "complete" &&
                  !isCurrent &&
                  "border-green-500 bg-green-500 text-white",
                status === "error" &&
                  !isCurrent &&
                  "border-destructive text-destructive",
              )}
            >
              {isCurrent ? (
                index + 1
              ) : status === "complete" ? (
                <Check className="h-4 w-4" />
              ) : status === "error" ? (
                <AlertTriangle className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            <span className="mt-1 text-center text-xs sm:text-sm">{step}</span>
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
