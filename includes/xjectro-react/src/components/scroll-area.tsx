"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "../lib/utils";

type ScrollBarProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;
type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> &
  Pick<ScrollBarProps, "orientation">;

function ScrollArea({
  className,
  children,
  orientation,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      data-orientation={orientation ?? "default"}
      className={cn(
        "relative data-[orientation=default]:pb-3.5 data-[orientation=default]:pl-3.5 data-[orientation=horizontal]:pb-3.5 data-[orientation=vertical]:pr-3.5",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation={orientation} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "bg-ghost-300 flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5",
        orientation === "horizontal" && "h-2.5 flex-col",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-primary-500 relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
export type { ScrollAreaProps, ScrollBarProps };
