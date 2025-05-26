"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-ghost-500 data-[state=on]:text-ghost-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none transition-colors whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-transparent hover:bg-ghost-300 hover:text-ghost-foreground",
        outline:
          "border border-surface-300 bg-transparent shadow-xs hover:bg-ghost-300 hover:text-ghost-foreground",
      },
      size: {
        primary: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "primary",
    },
  },
);

export type ToggleVariants = VariantProps<typeof toggleVariants>;

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & ToggleVariants) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
