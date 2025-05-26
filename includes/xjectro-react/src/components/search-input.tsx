"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";
import { buttonVariants } from "./button";

export const searchInputVariants = cva(
  "transition-all flex items-center w-full gap-3 rounded-lg bg-surface-200 hover:bg-surface-300 focus-visible:border-primary-500 border border-surface-300",
  {
    variants: {
      size: {
        sm: "h-[46px] pl-3 text-sm",
        md: "h-[56px] pl-3 text-sm",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export type SearchInputVariants = VariantProps<typeof searchInputVariants>;

export function SearchInput({
  className,
  size,
  onSearch,
  ...props
}: React.ComponentProps<"input"> &
  SearchInputVariants & { onSearch: (query: string) => void }) {
  const [value, setValue] = React.useState<string>("");

  const handleSearch = () => {
    if (value.length === 0) {
      if (onSearch) {
        onSearch("");
      }
      return;
    }
    if (value.length < 2) {
      return;
    }
    if (onSearch) {
      onSearch(encodeURIComponent(value));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <span className={searchInputVariants({ size, className })}>
      <input
        type="text"
        className="placeholder:text-typography-500 w-full cursor-pointer border-none bg-transparent outline-none focus:cursor-text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        {...props}
      />
      <button
        className={buttonVariants({ className: "h-full px-4" })}
        onClick={handleSearch}
      >
        <Search className="size-5" />
      </button>
    </span>
  );
}
