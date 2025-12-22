"use client";

import { useTheme } from "next-themes";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function EmojiPicker() {
  const { resolvedTheme } = useTheme();
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        value={selectedEmoji}
        readOnly
        placeholder="Select an emoji"
        className="w-48"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-none">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            previewPosition="none"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
