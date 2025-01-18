"use client";
import { Button } from "@/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";

export function Pagination({ count }: { count: number }) {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
    })
  );
  const totalPages = Math.ceil(count / 10);

  return (
    <div className="space-x-2">
      <Button
        size="sm"
        variant={"secondary"}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Anterior
      </Button>
      <Button
        size="sm"
        variant={"secondary"}
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Siguiente
      </Button>
    </div>
  );
}
