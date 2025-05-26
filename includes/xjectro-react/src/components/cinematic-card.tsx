import React, { memo } from "react";
import { cn } from "../lib/utils";

export interface CinematicCardProps extends React.ComponentProps<"span"> {
  image: {
    background: string;
    foreground: string;
    logo: string;
  };
}

/**
 * A component that displays a cinematic card with a background image, a foreground image, and a logo.
 * The card has a shadow effect and transitions on hover.
 *
 * @param {CinematicCardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const CinematicCard: React.FC<CinematicCardProps> = memo(
  function CinematicCard({ image, className = "", ...props }) {
    return (
      <span
        className={cn(
          "shadow-primary-500/20 aspect relative flex h-[var(--card-height)] w-[--card-width] flex-col items-center justify-center rounded-xl shadow-2xl transition-all hover:shadow-none",
          "hover:*:data-[slot=card-background]:rotate-x-24 hover:*:data-[slot=card-background]:brightness-50 hover:*:data-[slot=card-background]:grayscale-50",
          "*:data-[slot=card-logo]:bottom-5 hover:*:data-[slot=card-logo]:bottom-10",
          "*:data-[slot=card-foreground]:bottom-0 *:data-[slot=card-foreground]:opacity-0 hover:*:data-[slot=card-foreground]:bottom-10 hover:*:data-[slot=card-foreground]:opacity-100",
          className,
        )}
        {...props}
      >
        <img
          src={image.background}
          alt="background"
          className="absolute inset-0 h-full w-full rounded-xl object-cover transition-all"
          data-slot="card-background"
          loading="lazy"
          decoding="async"
        />

        <div
          data-slot="card-foreground"
          className="pointer-events-none absolute flex w-full items-center justify-center transition-all"
        >
          <img
            src={image.foreground}
            alt="foreground"
            className="w-full rounded-xl object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div
          data-slot="card-logo"
          className="pointer-events-none absolute flex aspect-[3/1] w-full items-center justify-center transition-all"
        >
          <img
            src={image.logo}
            alt="logo"
            className="object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </span>
    );
  },
);
