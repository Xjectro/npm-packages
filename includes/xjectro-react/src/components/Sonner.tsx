"use client";

import { Toaster as Sonner } from "sonner";

type SonnerToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = (props: SonnerToasterProps) => {
  return (
    <Sonner
      className="toaster group cursor-grab"
      style={
        {
          "--normal-bg": "var(oklch(--surface-100))",
          "--normal-text": "var(oklch(--typography-50))",
          "--normal-border": "var(oklch(--surface-500))",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
export type { SonnerToasterProps as ToasterProps };
