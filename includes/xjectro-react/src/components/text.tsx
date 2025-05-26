import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const textVariants = cva("", {
  variants: {
    variant: {
      shiny:
        "bg-clip-text text-transparent bg-[length:300%_100%] animate-shine",
    },
    color: {
      foreground: "text-typography-50",
      muted: "text-typography-500",
      primary: "text-primary-500",
    },
    align: {
      start: "text-start",
      center: "text-center",
      end: "text-end",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
    lineClamp: {
      0: "line-clamp-none",
      1: "line-clamp-1",
      2: "line-clamp-2",
      3: "line-clamp-3",
      4: "line-clamp-4",
      5: "line-clamp-5",
      6: "line-clamp-6",
    },
    leading: {
      0: "leading-0",
      snug: "leading-snug",
    },
    weight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    break: {
      all: "break-all",
      keep: "break-keep",
      normal: "break-normal",
      words: "break-words",
    },
    underline: {
      true: "underline",
    },
  },
  defaultVariants: {
    color: "foreground",
    align: "start",
    size: "base",
    weight: "normal",
    break: "normal",
  },
  compoundVariants: [
    {
      variant: "shiny",
      color: "primary",
      className:
        "bg-primary-500 bg-[linear-gradient(120deg,transparent_30%,oklch(var(--primary-800))_45%,transparent_60%)]",
    },
    {
      variant: "shiny",
      color: "foreground",
      className:
        "bg-typography-50 bg-[linear-gradient(120deg,transparent_30%,oklch(var(--typography-100))_45%,transparent_60%)]",
    },
    {
      variant: "shiny",
      color: "muted",
      className:
        "bg-typography-500 bg-[linear-gradient(120deg,transparent_30%,oklch(var(--typography-600))_45%,transparent_60%)]",
    },
  ],
});

export type TextVariants = VariantProps<typeof textVariants>;

export type TextProps = React.ComponentProps<React.ElementType> &
  TextVariants & {
    asChild?: boolean;
    as?: React.ElementType;
    underline?: boolean;
  };

// ForwardRef and memo for performance; accepts custom 'as' element and Radix Slot
export const Text = React.memo(
  React.forwardRef<HTMLElement, TextProps>((props, ref) => {
    const {
      as,
      asChild = false,
      className,
      variant,
      color,
      align,
      leading,
      lineClamp,
      size,
      weight,
      break: textBreak,
      underline,
      ...rest
    } = props;
    const Comp = asChild ? Slot : (as as React.ElementType) || "span";
    return (
      <Comp
        ref={ref}
        className={cn(
          textVariants({
            variant,
            color,
            align,
            leading,
            lineClamp,
            size,
            weight,
            break: textBreak,
            underline,
            className,
          }),
        )}
        {...rest}
      />
    );
  }),
);
Text.displayName = "Text";
