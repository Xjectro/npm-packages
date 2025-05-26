"use client";

import React from "react";
import { motion } from "framer-motion";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const spinnerVariants = cva("", {
  variants: {
    size: {
      sm: "size-20",
      md: "size-32",
      lg: "size-40",
    },
  },
  defaultVariants: {},
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;

const spinTransition = {
  repeat: Infinity,
  ease: "easeInOut",
  width: ["100%", "50%"],
  duration: 1,
};

export function Spinner({
  size,
  className,
  ...props
}: React.ComponentProps<"div"> & SpinnerVariants) {
  return (
    <div
      className={spinnerVariants({
        size,
        className: cn("relative", className),
      })}
      {...props}
    >
      <motion.span
        className={spinnerVariants({
          size,
          className:
            "!border-t-primary-500 !border-surface-300 absolute top-0 left-0 box-border block rounded-full border-6 border-t-8",
        })}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
}
