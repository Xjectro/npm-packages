"use client";

import * as React from "react";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex cursor-pointer focus:cursor-text w-full border-none bg-surface-200 rounded-lg px-3 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-typography-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-300 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none transition duration-400",
  {
    variants: {
      size: {
        sm: "h-[46px] text-sm",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;

function Input({
  className,
  type,
  ref,
  size,
  ...props
}: React.ComponentProps<"input"> & InputVariants) {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: {
    currentTarget: HTMLElement;
    clientX: number;
    clientY: number;
  }) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          oklch(var(--primary-500)),
          transparent 80%
        )
      `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input w-full rounded-lg p-[2px] transition duration-300"
    >
      <input
        type={type}
        className={inputVariants({ size, className })}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
}

export { Input, inputVariants };
