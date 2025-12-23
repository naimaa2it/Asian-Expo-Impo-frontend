"use client";

import { Suspense } from "react";
import SearchResultsContent from "@/components/Search/SearchResults";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
