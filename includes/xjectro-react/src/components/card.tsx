import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";
import { Typography, TypographyProps } from "./typography";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-surface-100 text-typography-50 flex flex-col gap-6 rounded-lg border py-4 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

const cardHeaderVariants = cva(
  "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-4",
);

export type CardHeaderVariants = VariantProps<typeof cardHeaderVariants>;

function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div"> & CardHeaderVariants) {
  return (
    <div
      data-slot="card-header"
      className={cardHeaderVariants({ className })}
      {...props}
    />
  );
}

function CardTitle(props: TypographyProps) {
  return <Typography data-slot="card-title" {...props} />;
}

function CardDescription(props: TypographyProps) {
  return (
    <Typography
      data-slot="card-description"
      color="muted"
      size="sm"
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

const cardContentVariants = cva("px-6");

export type CardContentVariants = VariantProps<typeof cardContentVariants>;

function CardContent({
  className,
  ...props
}: React.ComponentProps<"div"> & CardContentVariants) {
  return (
    <div
      data-slot="card-content"
      className={cardContentVariants({ className })}
      {...props}
    />
  );
}

const cardFooterVariants = cva("px-6 [.border-t]:pt-4");

export type CardFooterVariants = VariantProps<typeof cardFooterVariants>;

function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div"> & CardFooterVariants) {
  return (
    <div
      data-slot="card-footer"
      className={cardFooterVariants({ className })}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
