"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

function Searchbar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchFilter = searchParams.get("search") || ""; // Get 'search' param from URL

  const handleSearch = (event) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value); // Update URL query param
    } else {
      params.delete("search"); // Remove if empty
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Input
        placeholder="Search..."
        value={searchFilter}
        onChange={handleSearch}
        className="max-w-sm"
      />
      <Button className="h-10 w-10 rounded-lg" type="button">
        <Search className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
}

export default Searchbar;
