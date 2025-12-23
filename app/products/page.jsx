"use client";

import { Suspense } from "react";
import ProductCatalog from "@/components/DynamicProductCatalog/ProductCatalog";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading products...</div>}>
      <ProductCatalog />
    </Suspense>
  );
}
