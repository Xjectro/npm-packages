import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-sm border font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none aria-invalid:border-danger-500 transition-[color,box-shadow] focus-visible:scale-[1.1]",
  {
    variants: {
      color: {
        primary:
          "!border-transparent bg-primary-500 text-primary-foreground [a&]:hover:bg-primary-600",
        surface:
          "!border-surface-300 bg-surface-200 text-typography-50 [a&]:hover:bg-surface-300",
      },
      size: {
        sm: "px-1 py-0.5 text-xs [&>svg]:size-3",
        md: "px-2 py-1 text-sm [&>svg]:size-4.5",
        base: "px-2.5 py-1.5 text-sm [&>svg]:size-5",
        lg: "px-3 py-2 text-base [&>svg]:size-6",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

function Badge({
  className,
  color,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & BadgeVariants & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={badgeVariants({ color, size, className })}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
