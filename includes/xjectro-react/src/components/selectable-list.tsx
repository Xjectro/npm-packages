"use client";

import * as React from "react";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { PlusIcon, XIcon } from "lucide-react";
import { Badge } from "./badge";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";
import { Separator } from "./separator";

export interface SelectableListProps<T> {
  items: T[];
  placeholder?: string;
  emtyText?: string;
  onChange?: (items: T[], action: "add" | "remove") => void;
  onAdd?: (item: T) => void;
  onRemove?: (item: T) => void;
  getItemLabel?: (item: T) => React.ReactNode;
  getItemValue?: (item: T) => string;
  initialSelectedItems?: T[];
}

/**
 * A reusable SelectableList component for managing item selection from a list.
 *
 * @template T - The data type of each item in the list.
 *
 * @param {Object} props - Component props
 * @param {T[]} props.items - The full list of selectable items.
 * @param {T[]} [props.initialSelectedItems] - Items that should be initially selected when the component mounts.
 * @param {(selectedItems: T[], action: "add" | "remove") => void} [props.onChange] - Callback triggered when the selection changes.
 * @param {(item: T) => void} [props.onAdd] - Called when an item is added to the selection.
 * @param {(item: T) => void} [props.onRemove] - Called when an item is removed from the selection.
 * @param {(item: T) => React.ReactNode} [props.getItemLabel] - Function to return the display label for an item.
 * @param {(item: T) => string} [props.getItemValue] - Function to return a unique identifier for an item (used for tracking).
 * @param {string} [props.placeholder] - Placeholder text shown when no items are selected.
 * @param {string} [props.emtyText] - Text to show when the search yields no results.
 */
export function SelectableList<T>({
  placeholder,
  items,
  onChange,
  onAdd,
  onRemove,
  getItemLabel = (item: T) => String(item),
  getItemValue = (item: T) => String(item),
  emtyText,
  initialSelectedItems = [],
}: SelectableListProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] =
    React.useState<T[]>(initialSelectedItems);

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-2">
        {selectedItems.map((item) => (
          <Badge key={getItemValue(item)} color="surface">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={() => {
                    const next = selectedItems.filter(
                      (selected) =>
                        getItemValue(selected) !== getItemValue(item),
                    );
                    setSelectedItems(next);
                    onChange?.(next, "remove");
                    onRemove?.(item);
                  }}
                >
                  <XIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" />
            {getItemLabel(item)}
          </Badge>
        ))}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge color="surface" className="cursor-pointer">
                  <PlusIcon />
                  {selectedItems.length == 0 &&
                    (placeholder || "Select an item")}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>{placeholder}</TooltipContent>
            </Tooltip>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="center">
            <Command>
              <CommandInput
                placeholder={(placeholder || "Select an item") + "..."}
              />
              <CommandList>
                <CommandEmpty>{emtyText || "No results found."}</CommandEmpty>
                <CommandGroup>
                  {items
                    .filter(
                      (item) =>
                        !selectedItems.some(
                          (selected) =>
                            getItemValue(selected) === getItemValue(item),
                        ),
                    )
                    .map((item) => (
                      <CommandItem
                        key={getItemValue(item)}
                        value={getItemValue(item)}
                        onSelect={(value) => {
                          const found = items.find(
                            (i) => getItemValue(i) === value,
                          );
                          if (!found) return;
                          setSelectedItems((prev) => {
                            const next = [...prev, found];
                            onChange?.(next, "add");
                            onAdd?.(found);
                            return next;
                          });
                          setOpen(false);
                        }}
                      >
                        {getItemLabel(item)}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </TooltipProvider>
  );
}
