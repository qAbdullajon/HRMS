import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  inputSize?: "default" | "lg" | "sm";
}

function Input({ className, type, inputSize = "default", ...props }: InputProps) {
  const sizeClasses = {
    default: "h-9 text-base px-3 py-2",
    lg: "h-12 text-lg px-4 py-3",
    sm: "h-8 text-sm px-2 py-1",
  };

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-sm border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        sizeClasses[inputSize],
        "focus:border focus:border-primary-color",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
