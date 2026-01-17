/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDownIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl } from "./ui/form";

interface ComboBoxProps {
  field: ControllerRenderProps<any, any>;
  items: string[];
  isLoading?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  className?: string;
  classNameWidthItemSelected?: string;
}

export function ComboBox({
  field,
  items,
  isLoading = false,
  placeholder = "Selecione...",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhum item encontrado.",
  loadingMessage = "Carregando...",
  className = "w-[200px]",
  classNameWidthItemSelected,
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("justify-between font-normal gap-0", className)}
          >
            {isLoading ? (
              <span className="flex text-[13px] items-center gap-2 text-content font-montserrat">
                <Loader2 className="h-4 w-4 animate-spin" />
                {loadingMessage}
              </span>
            ) : field.value ? (
              <span
                className={cn(
                  "font-montserrat truncate",
                  classNameWidthItemSelected,
                )}
              >
                {field.value}
              </span>
            ) : (
              <span className="text-muted-foreground font-montserrat">
                {placeholder}
              </span>
            )}
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", className)}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {items
                .filter((item) => item.trim() !== "")
                .map((item, index) => (
                  <CommandItem
                    key={index}
                    value={item}
                    onSelect={(currentValue) => {
                      field.onChange(
                        currentValue === field.value ? "" : currentValue,
                      );
                      setOpen(false);
                    }}
                    className="flex justify-between cursor-pointer"
                  >
                    <span className="font-montserrat">{item}</span>
                    <Check
                      className={cn(
                        "h-4 w-4",
                        field.value === item ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
