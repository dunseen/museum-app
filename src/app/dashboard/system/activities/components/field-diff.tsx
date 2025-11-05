import React from "react";
import { cn } from "~/lib/utils";

type FieldDiffProps = {
  label: string;
  oldValue: unknown;
  newValue: unknown;
  className?: string;
  formatValue?: (value: unknown) => string;
};

/**
 * Component to display a field diff with compact inline old value above new value
 */
export function FieldDiff({
  label,
  oldValue,
  newValue,
  className,
  formatValue = (val) => (val == null ? "-" : String(val)),
}: FieldDiffProps) {
  const hasChange = oldValue !== newValue;

  return (
    <div className={cn("space-y-1", className)}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="space-y-0.5">
        {hasChange && (
          <div className="text-xs text-red-600 line-through dark:text-red-400">
            {formatValue(oldValue)}
          </div>
        )}
        <div
          className={cn(
            "rounded border px-3 py-2 text-sm",
            hasChange
              ? "border-green-300 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950/20 dark:text-green-100"
              : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
          )}
        >
          {formatValue(newValue)}
        </div>
      </div>
    </div>
  );
}
