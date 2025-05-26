"use client";

import React, { useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { useWindowScroll } from "react-use";

export const DEFAULT_NAVBAR_HEIGHT = 66;
export const FLOATING_MARGIN = 8;

const navbarVariants = cva(
  "flex items-center gap-5 backdrop-blur-xl will-change-transform",
  {
    variants: {
      position: {
        default: "fixed top-0 z-50",
        static: "z-10",
        sticky: "sticky top-0 z-50",
      },
      layout: {
        default: "w-full",
        floating: "w-[var(--xjectro-container-width)] mx-auto px-5",
        centered: "max-w-screen-xl mx-auto",
      },
      shape: {
        soft: "rounded-lg",
        pill: "rounded-full",
        square: "rounded-none",
      },
      border: {
        default: "border",
        bottom: "border-b",
        top: "border-t",
        x: "border-x",
        y: "border-y",
        none: "border-none",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
    },
    defaultVariants: {
      position: "default",
      layout: "default",
      shadow: "none",
    },
  },
);

export type NavbarVariants = VariantProps<typeof navbarVariants>;

interface NavbarProps extends NavbarVariants, React.ComponentProps<"nav"> {
  shouldHideOnScroll?: boolean;
  isBackground?: boolean;
}

/**
 * Responsive and configurable navigation bar.
 *
 * @param position - Navbar positioning: fixed, static, or sticky.
 * @param layout - Navbar width/layout mode: full-width, floating, or centered.
 * @param shape - Corner shape: soft, pill, or square.
 * @param border - Border placement: default, top, bottom, x, y, or none.
 * @param shadow - Shadow intensity: none, sm, md, or lg.
 * @param shouldHideOnScroll - Hides navbar on scroll when true.
 * @param isBackground - Applies semi-transparent background on scroll.
 * @param className - Additional custom classes.
 */
export function Navbar({
  position = "default",
  layout = "default",
  shape,
  border,
  shadow = "none",
  shouldHideOnScroll = false,
  isBackground = false,
  className,
  children,
  ...props
}: NavbarProps) {
  const navbarRef = useRef<HTMLElement | null>(null);
  const { y: scrollY } = useWindowScroll();
  const [beforeScrollY, setBeforeScrollY] = React.useState(scrollY);
  const [yPosition, setYPosition] = React.useState(0);

  const NAVBAR_HEIGHT =
    navbarRef?.current?.offsetHeight || DEFAULT_NAVBAR_HEIGHT;

  const maxOffset =
    layout === "floating" ? NAVBAR_HEIGHT + FLOATING_MARGIN : NAVBAR_HEIGHT;

  React.useEffect(() => {
    if (!shouldHideOnScroll || position === "static") return;

    const delta = scrollY - beforeScrollY;
    const newYPosition = Math.min(Math.max(0, yPosition + delta), maxOffset);

    setBeforeScrollY(scrollY);
    setYPosition(newYPosition);
  }, [
    shouldHideOnScroll,
    position,
    scrollY,
    maxOffset,
    beforeScrollY,
    yPosition,
  ]);

  const content =
    layout === "default" ? (
      <div
        className={cn(
          "mx-auto flex h-full w-[var(--xjectro-container-width)] items-center gap-5 px-5",
          className,
        )}
      >
        {children}
      </div>
    ) : (
      children
    );

  const opacity = isBackground ? 1 - yPosition / maxOffset : 1;

  return (
    <nav
      ref={navbarRef}
      style={{
        backgroundColor: isBackground
          ? `oklch(var(--surface-100) / ${opacity})`
          : "transparent",
        borderColor: isBackground
          ? `oklch(var(--surface-300) / ${opacity})`
          : "transparent",
        transform: `translateY(-${yPosition}px)`,
        minHeight: DEFAULT_NAVBAR_HEIGHT,
        marginTop: layout === "floating" ? `${FLOATING_MARGIN}px` : "0px",
      }}
      className={cn(
        navbarVariants({ position, layout, shape, border, shadow }),
        className,
      )}
      {...props}
    >
      {content}
    </nav>
  );
}

interface NavbarContentProps extends React.ComponentProps<"ul"> {
  justify?: "start" | "center" | "end";
}

/**
 * Container for Navbar items with flexible justification.
 *
 * @param justify - Content alignment: start, center, or end.
 */
export function NavbarContent({
  justify = "start",
  className,
  ...props
}: NavbarContentProps) {
  return (
    <ul
      data-justify={justify}
      className={cn(
        "flex h-full w-full flex-row items-center gap-5 data-[justify=center]:justify-center data-[justify=end]:justify-end data-[justify=start]:justify-start",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Individual navbar item wrapper.
 */
export function NavbarItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return <li className={cn("flex items-center gap-2", className)} {...props} />;
}
