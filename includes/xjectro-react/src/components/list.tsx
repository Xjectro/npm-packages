"use client";

import React, { useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { getResponsiveClasses } from "../utils/tailwind";
import type { ResponsiveValue } from "../types/responsive";

const listVariants = cva("", {
  variants: {
    layout: {
      auto: "flex flex-wrap",
      grid: "grid",
    },
    direction: {
      horizontal: "flex",
      vertical: "flex flex-col",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
    spacing: {
      none: "gap-0",
      tight: "gap-3",
      normal: "gap-5",
      loose: "gap-10",
    },
  },
  defaultVariants: {},
});

type ListVariants = VariantProps<typeof listVariants>;

export interface ListProps<T>
  extends React.HTMLAttributes<HTMLDivElement>,
    ListVariants {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columns?: ResponsiveValue<number>;
  keyExtractor?: (item: T, index: number) => string | number;
  as?: React.ElementType;
}

export function List<T>({
  items,
  renderItem,
  layout,
  justify,
  align,
  spacing,
  direction,
  columns,
  className,
  keyExtractor,
  as: Component = "div",
  ...props
}: ListProps<T>) {
  const effectiveLayout = columns ? "grid" : layout;

  const columnsClasses = useMemo(
    () => (columns ? getResponsiveClasses(columns, "grid-cols") : ""),
    [columns],
  );

  const combinedClassName = useMemo(
    () =>
      cn(
        listVariants({
          layout: effectiveLayout,
          justify,
          align,
          direction,
          spacing,
          className,
        }),
        columnsClasses,
      ),
    [
      effectiveLayout,
      justify,
      align,
      direction,
      spacing,
      columnsClasses,
      className,
    ],
  );

  const renderedItems = useMemo(
    () =>
      items.map((item, index) => (
        <React.Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
          {renderItem(item, index)}
        </React.Fragment>
      )),
    [items, renderItem, keyExtractor],
  );

  return combinedClassName.length > 0 ? (
    <Component className={combinedClassName} {...props}>
      {renderedItems}
    </Component>
  ) : (
    renderedItems
  );
}
