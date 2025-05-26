"use client";

import * as React from "react";
import { OTPInput as RawOTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "../lib/utils";

function OTPInput({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof RawOTPInput> & {
  containerClassName?: string;
}) {
  return (
    <RawOTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function OTPInputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-4", className)}
      {...props}
    />
  );
}

function OTPInputSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-surface-300 data-[active=true]:aria-invalid:border-danger-500 bg-surface-100 data-[active=true]:ring-surface-100 relative flex h-12 w-12 items-center justify-center rounded-lg border text-sm shadow-xs transition-all outline-none data-[active=true]:z-10 data-[active=true]:scale-[1.1] data-[active=true]:ring-4",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-typography-50 h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function OTPInputSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { OTPInput, OTPInputGroup, OTPInputSlot, OTPInputSeparator };
