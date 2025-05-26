import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./button";

interface AutoPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function AutoPagination({
  totalPages,
  currentPage,
  onPageChange,
}: AutoPaginationProps) {
  const handlePageChange = React.useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      onPageChange(page);
    },
    [currentPage, onPageChange, totalPages],
  );

  const getPageNumbers = React.useMemo(() => {
    const siblingCount = 1;
    const range = (start: number, end: number) => {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const totalPageNumbers = siblingCount * 2 + 3;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * siblingCount;
      return [...range(1, leftItemCount), "rightEllipsis", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * siblingCount;
      return [
        firstPageIndex,
        "leftEllipsis",
        ...range(totalPages - rightItemCount + 1, totalPages),
      ];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      return [
        firstPageIndex,
        "leftEllipsis",
        ...range(leftSiblingIndex, rightSiblingIndex),
        "rightEllipsis",
        lastPageIndex,
      ];
    }

    return [];
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {getPageNumbers.map((pageNumber, index) => (
          <PaginationItem key={index}>
            {pageNumber === "leftEllipsis" || pageNumber === "rightEllipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNumber as number);
                }}
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li {...props} />;
}

interface PaginationLinkProps
  extends React.ComponentProps<typeof Button>,
    React.PropsWithChildren {
  isActive?: boolean;
}

function PaginationLink({ isActive = false, ...props }: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      variant={isActive ? "primary" : "ghost"}
      className={cn(
        "pointer-events-auto font-medium aria-[current=page]:pointer-events-none aria-[current=page]:font-bold",
      )}
      size="icon"
      {...props}
    />
  );
}

function PaginationPrevious(
  props: React.ComponentProps<typeof PaginationLink>,
) {
  return (
    <PaginationLink aria-label="Go to previous page" {...props}>
      <ChevronLeftIcon />
    </PaginationLink>
  );
}

function PaginationNext(props: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to next page" {...props}>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={buttonVariants({ variant: "ghost", size: "icon", className })}
      {...props}
    >
      <MoreHorizontalIcon />
    </span>
  );
}
