"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_PAGE_SIZE = 10;

export default function TablePagination({ pagination }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = pagination?.page || 1;
  const pageSize = pagination?.page_size || DEFAULT_PAGE_SIZE;
  const totalPages = pagination?.totalPages || 1;
  const total = pagination?.total || 0;

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const prevPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  //   if (count === 0 || totalPages <= 1) return null;

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex items-center justify-between py-3 px-4 border-t text-sm">
      <div className="text-muted-foreground">
        Showing {startRecord} to {endRecord} of {total} results
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground px-2">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
