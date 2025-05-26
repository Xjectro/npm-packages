"use client";

import {
  MediaPlayer,
  MediaProvider,
  Poster,
  type MediaPlayerProps,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useState } from "react";
import { PlayerSkeleton } from "./skeleton";

export function VideoPlayer({
  poster,
  title,
  ...props
}: Omit<MediaPlayerProps, "children">) {
  return (
    <>
      <style>{`
      .vds-audio-layout,
.vds-video-layout {
  /* Shared. */
  --media-brand: oklch(var(--primary-500));
  --media-controls-color: #f5f5f5;
  --media-font-family: var(--font-kanit);

  /* Buffering. */{}
  --media-buffering-animation: vds-buffering-spin 1s linear infinite;
  --media-buffering-size: 96px;
  --media-buffering-track-color: #f5f5f5;
  --media-buffering-track-fill-color: var(--media-brand);
  --media-buffering-track-fill-offset: 50;
  --media-buffering-track-fill-opacity: 0.75;
  --media-buffering-track-fill-width: 9;
  --media-buffering-track-opacity: 0.25;
  --media-buffering-track-width: 8;
  --media-buffering-transition: opacity 200ms ease;

  /* Buttons. */
  --media-button-border-radius: var(--radius);
  --media-button-color: white;
  --media-button-hover-bg: rgb(255 255 255 / 0.2);
  --media-button-hover-transform: scale(0.9);
  --media-button-hover-transition: transform 0.2s ease-in;
  --media-button-icon-size: 80%;
  --media-button-padding: 0px;
  --media-button-size: 40px;
  --media-button-touch-hover-bg: rgb(255 255 255 / 0.2);
  --media-button-touch-hover-border-radius: 100%;
  --media-sm-fullscreen-button-size: 32px;
  --media-fullscreen-button-size: 50px;

  /* Tooltips. */
  --media-tooltip-bg-color: black;
  --media-tooltip-border-radius: 4px;
  --media-tooltip-border: 1px primary rgb(255 255 255 / 0.1);
  --media-tooltip-color: hsl(0, 0%, 80%);
  --media-tooltip-font-size: 13px;
  --media-tooltip-font-weight: 500;
  --media-tooltip-padding: 2px 8px;
  --media-tooltip-enter-animation: vds-tooltip-enter 0.2s ease-in;
  --media-tooltip-exit-animation: vds-tooltip-exit 0.2s ease-out;

  /* Live Indicator. */
  --media-live-button-bg: #8a8a8a;
  --media-live-button-border-radius: 2px;
  --media-live-button-color: #161616;
  --media-live-button-edge-bg: #dc2626;
  --media-live-button-edge-color: #f5f5f5;
  --media-live-button-font-size: 12px;
  --media-live-button-font-weight: 600;
  --media-live-button-height: 40px;
  --media-live-button-letter-spacing: 1.5px;
  --media-live-button-padding: 1px 4px;
  --media-live-button-width: 40px;

  /* Captions. */
  --media-captions-padding: 1%;
  --media-cue-backdrop: blur(8px);
  --media-cue-bg: rgba(0, 0, 0, 0.7);
  --media-cue-border-radius: 2px;
  --media-cue-border: unset;
  --media-cue-box-shadow: var(--cue-box-shadow);
  --media-cue-color: white;
  --media-cue-display-bg: unset;
  --media-cue-display-border-radius: unset;
  --media-cue-display-padding: unset;
  --media-cue-font-size: calc(var(--overlay-height) / 100 * 4.5);
  --media-cue-line-height: calc(var(--cue-font-size) * 1.2);
  --media-cue-padding-x: calc(var(--cue-font-size) * 0.4);
  --media-cue-padding-x: calc(var(--cue-font-size) * 0.6);

  /* Chapter Title. */
  --media-chapter-title-color: rgba(255 255 255 / 0.64);
  --media-chapter-title-font-size: 14px;
  --media-chapter-title-font-weight: 400;
  --media-chapter-title-separator-color: var(--color);
  --media-chapter-title-separator-gap: 6px;
  --media-chapter-title-separator: "\x8222";

  /* Controls. */
  --media-controls-padding: 0px;
  --media-controls-in-transition: opacity 0.2s ease-in;
  --media-controls-out-transition: opacity 0.2s ease-out;

  /* Thumbnails. */
  --media-thumbnail-bg: black;
  --media-thumbnail-border: 1px primary white;
  --media-thumbnail-aspect-ratio: 16 / 9;
  --media-thumbnail-min-width: 120px;
  --media-thumbnail-min-height: calc(
    var(--media-thumbnail-min-width) / var(--aspect-ratio)
  );
  --media-thumbnail-max-width: 180px;
  --media-thumbnail-max-height: calc(
    var(--media-thumbnail-max-width) / var(--aspect-ratio)
  );

  /* Time. */
  --media-time-bg: unset;
  --media-time-border-radius: unset;
  --media-time-border: unset;
  --media-time-color: #f5f5f5;
  --media-time-divider-color: #e0e0e0;
  --media-time-divider-gap: 2.5px;
  --media-time-font-size: 14px;
  --media-time-font-weight: 400;
  --media-time-letter-spacing: 0.025em;

  /* Sliders. */
  --media-slider-width: 100%;
  --media-slider-height: 48px;

  /* Slider Thumb. */
  --media-slider-thumb-bg: oklch(var(--primary-500));
  --media-slider-thumb-border-radius: 9999px;
  --media-slider-thumb-border: 1px primary oklch(var(--primary-800));
  --media-slider-thumb-size: 15px;
  --media-slider-thumb-transition: opacity 0.2s ease-in, box-shadow 0.2s ease;

  /* Slider Tracks. */
  --media-slider-track-width: 100%;
  --media-slider-track-bg: rgb(255 255 255 / 0.3);
  --media-slider-track-border-radius: 1px;
  --media-slider-track-fill-bg: var(--media-brand);
  --media-slider-track-fill-live-bg: #dc2626;
  --media-slider-track-height: 5px;
  --media-slider-track-progress-bg: rgb(255 255 255 / 0.5);
  --media-slider-focused-thumb-shadow: 0 0 0 4px hsla(0, 0%, 100%, 0.4);
  --media-slider-focused-thumb-size: calc(var(--thumb-size) * 1.1);
  --media-slider-focused-track-height: calc(var(--track-height) * 1.25);
  --media-slider-focused-track-height: var(--track-height);
  --media-slider-focused-track-width: calc(var(--track-width) * 1.25);
  --media-slider-focused-track-width: var(--track-width);

  /* Slider Steps. */
  --media-slider-step-width: 2.5px;
  --media-slider-step-color: oklch(var(--typography-500));

  /* Slider Chapter. */
  --media-slider-chapter-hover-transform: scaleY(2);
  --media-slider-chapter-hover-transition: transform 0.1s
    cubic-bezier(0.4, 0, 1, 1);

  /* Slider Preview. */
  --media-slider-preview-bg: unset;
  --media-slider-preview-border-radius: 2px;

  /* Slider Chapter Title. */
  --media-slider-chapter-title-bg: unset;
  --media-slider-chapter-title-color: #f5f5f5;
  --media-slider-chapter-title-font-size: 12px;
  --media-slider-chapter-title-gap: 6px;

  /* Slider Value. */
  --media-slider-value-bg: black;
  --media-slider-value-border-radius: 2px;
  --media-slider-value-border: unset;
  --media-slider-value-color: white;
  --media-slider-value-gap: 0px;
  --media-slider-value-padding: 1px 10px;

  /* Menu Text. */
  --media-menu-text-color: oklch(var(--typography-50));
  --media-menu-text-secondary-color: oklch(var(--typography-50));

  /* Menu. */
  --media-menu-bg: oklch(var(--color-surface-50));
  --media-menu-border-radius: var(--radius);
  --media-menu-border: 1px primary oklch(var(--color-surface-300));
  --media-menu-box-shadow: 1px 1px 1px rgb(10 10 10 / 0.5);
  --media-menu-divider: 1px primary oklch(var(--color-surface-500));
  --media-menu-font-size: 14px;
  --media-menu-font-weight: 500;
  --media-menu-max-height: 250px;
  --media-menu-min-width: 220px;
  --media-menu-padding: 12px;
  --media-menu-top-bar-bg: rgb(10 10 10 / 0.6);
  --media-menu-arrow-icon-size: 18px;
  --media-menu-icon-rotate-deg: 90deg;

  --media-menu-enter-animation: vds-menu-enter 0.3s ease-out;
  --media-menu-exit-animation: vds-menu-exit 0.2s ease-out;

  --media-menu-scrollbar-track-bg: transparent;
  --media-menu-scrollbar-thumb-bg: oklch(var(--typography-50));

  --media-sm-menu-landscape-max-height: min(70vh, 400px);
  --media-sm-menu-portrait-max-height: 40vh;

  /* Menu Section. */
  --media-menu-section-bg: oklch(var(--color-surface-100));
  --media-menu-section-border: unset;
  --media-menu-section-divider: oklch(var(--color-surface-500));
  --media-menu-section-header-font-size: 12px;
  --media-menu-section-header-font-weight: 100;
  --media-menu-section-gap: 8px;
  --media-menu-section-border-radius: 2px;

  /* Menu Item. */
  --media-menu-item-bg: transparent;
  --media-menu-item-border-radius: var(--radius);
  --media-menu-item-border: 0;
  --media-menu-item-height: 40px;
  --media-menu-item-hover-bg: oklch(var(--color-surface-400));
  --media-menu-item-icon-size: 18px;
  --media-menu-item-icon-spacing: 6px;
  --media-menu-item-padding: 10px;

  /* Menu Radio. */
  --media-menu-radio-icon-color: oklch(var(--typography-50));

  /* Menu Checkbox. */
  --media-menu-checkbox-width: 40px;
  --media-menu-checkbox-height: 18px;
  --media-menu-checkbox-bg-active: oklch(var(--primary-500));
  --media-menu-checkbox-bg: oklch(var(--color-surface-500));
  --media-menu-checkbox-handle-bg: oklch(var(--primary-foreground));
  --media-menu-checkbox-handle-border: unset;
  --media-menu-checkbox-handle-diameter: calc(var(--checkbox-height) - 2px);

  /* Menu Slider. */
  --media-menu-slider-height: 32px;
  --media-menu-slider-track-bg: oklch(var(--color-surface-800));
  --media-menu-slider-track-fill-bg: oklch(var(--primary-500));

  /* Menu Hint. */
  --media-menu-hint-color: oklch(var(--typography-50));
  --media-menu-hint-font-size: 13px;
  --media-menu-hint-font-weight: 400;

  /* Chapters Menu. */
  --media-chapters-divider: oklch(var(--color-surface-500));
  --media-chapters-duration-bg: unset;
  --media-chapters-duration-border-radius: var(--radius);
  --media-chapters-focus-padding: 4px;
  --media-chapters-item-active-bg: oklch(var(--primary-500));
  --media-chapters-item-active-border-left: unset;
  --media-chapters-min-width: var(--media-menu-min-width, 220px);
  --media-chapters-padding: 0;
  --media-chapters-progress-bg: oklch(var(--typography-50));
  --media-chapters-progress-border-radius: 0;
  --media-chapters-progress-height: 4px;
  --media-chapters-start-time-border-radius: var(--radius);
  --media-chapters-start-time-letter-spacing: 0.4px;
  --media-chapters-start-time-padding: 1px 4px;
  --media-chapters-thumbnail-border: 0;
  --media-chapters-thumbnail-gap: 12px;
  --media-chapters-thumbnail-max-height: 68px;
  --media-chapters-thumbnail-max-width: 120px;
  --media-chapters-thumbnail-min-height: 56px;
  --media-chapters-thumbnail-min-width: 100px;
  --media-chapters-time-font-size: 12px;
  --media-chapters-time-font-weight: 500;
  --media-chapters-time-gap: 6px;
  --media-chapters-with-thumbnails-min-width: 300px;
}`}</style>
      <MediaPlayer title={title} {...props}>
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
        <Poster
          className="absolute inset-0 block h-full w-full rounded-md bg-black opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          src={poster}
          alt={title}
        />
      </MediaPlayer>
    </>
  );
}

export function CloudPlayer({ src }: { src: string }) {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayerSkeleton />
        </div>
      )}

      <iframe
        src={src}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        style={{ border: "none", width: "100%", height: "100%" }}
        className="rounded-lg"
        onLoad={handleLoad}
      />
    </div>
  );
}
