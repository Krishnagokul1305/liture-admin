import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar({
  paramKey = "search",
  placeholder = "Search Courses...",
  debounce = 400,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = searchParams.get(paramKey) || "";
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (value.trim()) {
        params.set(paramKey, value.trim());
      } else {
        params.delete(paramKey);
      }

      setSearchParams(params, { replace: true });
    }, debounce);

    return () => clearTimeout(handler);
  }, [value]);

  return (
    <div className="flex gap-2 w-full">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-lg border w-full"
      />

      <Button className="h-10 w-10 rounded-lg" type="button">
        <Search className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
}
