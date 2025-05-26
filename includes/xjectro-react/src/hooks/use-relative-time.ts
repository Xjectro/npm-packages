"use client";

import { useEffect, useState } from "react";

export function useRelativeTime(date: Date) {
  const [relativeTime, setRelativeTime] = useState<string>("");

  const getRelativeTime = (date: Date, locale: string = "en") => {
    if (typeof window === "undefined") {
      return "";
    }

    const diffInSeconds = Math.floor(
      (date.getTime() - new Date().getTime()) / 1000,
    );
    const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    if (Math.abs(diffInSeconds) < 60)
      return formatter.format(diffInSeconds, "seconds");
    if (Math.abs(diffInSeconds) < 3600)
      return formatter.format(Math.floor(diffInSeconds / 60), "minutes");
    if (Math.abs(diffInSeconds) < 86400)
      return formatter.format(Math.floor(diffInSeconds / 3600), "hours");
    return formatter.format(Math.floor(diffInSeconds / 86400), "days");
  };

  useEffect(() => {
    const locale = navigator.language || "en";
    setRelativeTime(getRelativeTime(date, locale));
  }, [date]);

  return relativeTime;
}
