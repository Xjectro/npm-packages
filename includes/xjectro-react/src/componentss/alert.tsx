import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        ghost: "",
        solid: "",
      },
      color: {
        default: "!border-surface-300",
        primary: "!border-primary-500/30",
        danger: "!border-danger-500/30",
      },
    },
    compoundVariants: [
      {
        variant: "ghost",
        color: "default",
        className:
          "text-typography-50 [&>svg]:text-current *:data-[slot=alert-description]:text-typography-500",
      },
      {
        variant: "ghost",
        color: "primary",
        className:
          "text-primary-500 [&>svg]:text-current *:data-[slot=alert-description]:text-primary-500/90",
      },
      {
        variant: "ghost",
        color: "danger",
        className:
          "text-danger-500 [&>svg]:text-current *:data-[slot=alert-description]:text-danger-500/90",
      },
      {
        variant: "solid",
        color: "default",
        className:
          "bg-surface-100 text-typography-50 [&>svg]:text-current *:data-[slot=alert-description]:text-typography-500",
      },
      {
        variant: "solid",
        color: "primary",
        className:
          "bg-primary-500/20 text-primary-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-primary-500/90",
      },
      {
        variant: "solid",
        color: "danger",
        className:
          "bg-danger-500/20 text-danger-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-danger-500/90",
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "solid",
    },
  },
);

export type AlertVariants = VariantProps<typeof alertVariants>;

function Alert({
  className,
  color,
  variant,
  ...props
}: React.ComponentProps<"div"> & AlertVariants) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={alertVariants({ color, variant, className })}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-typography-500 col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
