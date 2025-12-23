import { Inbox } from "lucide-react";

export function EmptyState({
  title = "No items yet",
  description = "Get started by creating your first item.",
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 p-12">
      <div className="rounded-full bg-muted p-4">
        <Inbox className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
      </div>
    </div>
  );
}
