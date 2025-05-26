import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-1 aria-invalid:ring-danger-500 overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "border !border-primary-800 text-primary-foreground bg-gradient-to-t from-primary-700 to-primary-500 transition-colors duration-300 hover:to-primary-700 hover:from-primary-500",
        danger:
          "border !border-danger-800 bg-danger-500 text-white hover:bg-danger-700",
        outline:
          "border !border-surface-300 bg-surface-100 hover:bg-surface-200 hover:ring-4 hover:ring-surface-300 hover:border-surface-500 text-typography-300 hover:text-typography-50",
        surface:
          "bg-surface-200 border !border-surface-300 hover:bg-surface-300 text-typography-300 hover:text-typography-50",
        ghost:
          "text-typography-50 md:text-typography-500 hover:bg-ghost-500 md:hover:text-typography-50 active:bg-ghost-800",
        link: "text-primary-500 underline-offset-4 hover:underline",
        subtle: "text-primary-foreground hover:bg-primary-800",
      },
      size: {
        sm: "gap-1.5 px-3 py-1.5 has-[>svg]:px-2.5",
        md: "px-4 py-2 has-[>svg]:px-3",
        lg: "py-3 px-6 has-[>svg]:px-4",
        icon: "size-10 justify-center",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "square",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    ButtonVariants & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
});

Button.displayName = "Button";
