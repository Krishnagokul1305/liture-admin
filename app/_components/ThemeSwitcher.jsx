"use client";

import { useTheme } from "next-themes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { File, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <RadioGroup
      value={theme}
      onValueChange={setTheme}
      className="inline-flex items-center border justify-center rounded-full  p-1"
    >
      <ThemeOption value="system" Icon={File} currentTheme={theme} />
      <ThemeOption value="light" Icon={Sun} currentTheme={theme} />
      <ThemeOption value="dark" Icon={Moon} currentTheme={theme} />
    </RadioGroup>
  );
}

function ThemeOption({ value, Icon, currentTheme }) {
  const isActive = currentTheme === value;

  return (
    <div className="relative">
      <RadioGroupItem value={value} id={value} className="peer sr-only" />
      <label
        htmlFor={value}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center rounded-full p-2",
          isActive
            ? "text-accent-foreground border rounded-full"
            : "text-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
      </label>
    </div>
  );
}
