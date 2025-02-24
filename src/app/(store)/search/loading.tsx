"use client";

import { Skeleton } from "@/components/skeleton";
import { Suspense } from "react";

function SearchLoadingContent() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">Carregando resultados...</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    </div>
  );
}

export default function SearchLoading() {
  return (
    <Suspense fallback={null}>
      <SearchLoadingContent />
    </Suspense>
  );
}
