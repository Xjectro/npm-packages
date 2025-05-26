"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";
import { ScrollArea, ScrollAreaProps } from "./scroll-area";

const containerVariants = cva("", {
  variants: {
    layout: {
      main: "max-w-[var(--xjectro-container-width)] px-[var(--xjectro-container-padding)]",
    },
    direction: {
      horizontal: "flex flex-row",
      vertical: "flex flex-col",
      wrap: "flex flex-wrap",
      nowrap: "flex flex-nowrap",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    spacing: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      normal: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
      loose: "gap-16",
    },
  },
});

type ContainerVariants = VariantProps<typeof containerVariants>;

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ContainerVariants,
    Pick<ScrollAreaProps, "orientation"> {
  as?: React.ElementType;
}

/**
 * A flexible layout container component with configurable direction, alignment,
 * justification, spacing, and optional layout constraints.
 *
 * @param {ContainerProps} props - The props for the Container component.
 * @param {'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'} [props.justify] - Controls `justify-content` alignment.
 * @param {'start' | 'center' | 'end' | 'stretch' | 'baseline'} [props.align] - Controls `align-items` alignment.
 * @param {'none' | 'xs' | 'sm' | 'md' | 'normal' | 'lg' | 'xl' | 'loose'} [props.spacing='normal'] - Defines the gap between children.
 * @param {'horizontal' | 'vertical' | 'wrap' | 'nowrap'} [props.direction='vertical'] - Defines flex direction and wrapping behavior.
 * @param {'main'} [props.layout] - Applies layout constraints like max-width and padding.
 * @param {React.ElementType} [props.as='div'] - Allows rendering a different element instead of a `div`.
 * @param {string} [props.className] - Additional custom class names.
 * @param {React.ReactNode} [props.children] - The content to be rendered inside the container.
 * @param {React.HTMLAttributes<HTMLDivElement>} [props] - Additional HTML div props.
 * @param {'horizontal' | 'vertical'} [props.orientation] - Defines the scroll orientation for the container.
 *
 * @returns {JSX.Element} The rendered Container component.
 */
export const Container = React.memo(function Container({
  justify,
  align,
  spacing = "normal",
  direction = "vertical",
  className,
  as: Component = "div",
  layout,
  orientation,
  children,
  ...props
}: ContainerProps) {
  const content = orientation ? (
    <ScrollArea orientation={orientation}>{children}</ScrollArea>
  ) : (
    children
  );

  return (
    <Component
      className={cn(
        containerVariants({
          justify,
          align,
          direction,
          spacing,
          layout,
        }),
        className,
      )}
      {...props}
    >
      {content}
    </Component>
  );
});
