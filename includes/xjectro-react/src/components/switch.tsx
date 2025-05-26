"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "../lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-surface-100 peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "data-[state=unchecked]:bg-surface-800 data-[state=checked]:bg-primary-foreground pointer-events-none block size-5 rounded-full ring-0 transition-all data-[state=checked]:translate-x-[calc(100%+10px)] data-[state=unchecked]:translate-x-1",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
