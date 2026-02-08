import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try again",
  fullScreen = false,
}) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="bg-destructive/10 rounded-full p-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="gap-2 mt-2 bg-transparent"
        >
          <RotateCcw className="h-4 w-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        {content}
      </div>
    );
  }

  return (
    <Card className="border-destructive/20 bg-destructive/5">
      <CardContent className="pt-6">{content}</CardContent>
    </Card>
  );
}
