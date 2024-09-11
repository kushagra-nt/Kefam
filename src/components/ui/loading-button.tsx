import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";
import { Button } from "./button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  className: string;
}

export default function LoadingButton({
  loading,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <Button {...props} className={cn('flex gap-2',className)} disabled={disabled || loading}>
      {loading && <Loader className="animate-spin"/> }
      {children}
    </Button>
  );
}
