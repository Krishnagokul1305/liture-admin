import { Command } from "lucide-react";

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <Command className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">Liture</span>
        <span className="truncate text-xs">Edtech</span>
      </div>
    </a>
  );
}

export default Logo;
