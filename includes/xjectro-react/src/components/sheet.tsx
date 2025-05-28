"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "../lib/utils";
import { injectPropsToChildren } from "../utils/inject-props-to-children";
import { buttonVariants } from "./button";
import { typographyVariants } from "./typography";
import { cva, type VariantProps } from "class-variance-authority";

export const sheetContentVariants = cva(
  "data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      color: {
        surface: "bg-surface-50 !border-surface-300",
        primary: "bg-primary-500 !border-primary-800",
      },
      side: {
        right:
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 rounded-l-xl border-l sm:max-w-md",
        left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 rounded-r-xl border-r sm:max-w-md",
        top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 rounded-b-xl h-auto border-b",
        bottom:
          "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom pb-10 inset-x-0 bottom-0 rounded-t-xl h-auto border-t",
      },
    },
    defaultVariants: {
      color: "surface",
    },
  },
);

export type SheetContentVariants = VariantProps<typeof sheetContentVariants>;

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/20 backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  color = "surface",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & SheetContentVariants) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={sheetContentVariants({ side, color, className })}
        {...props}
      >
        {injectPropsToChildren(children, {
          components: [SheetItem],
          props: { "data-color": color },
        })}
        <SheetPrimitive.Close
          className={cn(
            buttonVariants({ variant: color, size: "icon" }),
            "absolute top-0 right-0 m-5",
          )}
        >
          <XIcon className="size-5" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 px-5 pt-5 pb-2", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 px-5 py-3", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={typographyVariants({
        color: "foreground",
        size: "lg",
        weight: "bold",
        className,
      })}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={typographyVariants({ color: "muted", size: "sm", className })}
      {...props}
    />
  );
}

function SheetItem({
  className,
  ...props
}: React.ComponentProps<"button"> & { className?: string }) {
  return (
    <button
      data-slot="sheet-item"
      className={cn(
        "data-[color=surface]:text-ghost-foreground data-[color=primary]:text-primary-foreground data-[color=surface]:hover:bg-ghost-500 data-[color=primary]:hover:bg-primary-800 flex w-full cursor-pointer items-center gap-2 rounded-md bg-transparent px-4 py-3 text-base transition-all",
        className,
      )}
      {...props}
    />
  );
}

function SheetSection({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-section"
      className={cn(
        "!border-surface-300 w-full mx-auto px-5 [.border-b]:pb-4 [.border-t]:pt-4",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetItem,
  SheetSection,
  SheetDescription,
};
