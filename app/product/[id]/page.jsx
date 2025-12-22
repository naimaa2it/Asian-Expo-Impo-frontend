import ProductDetailsContent from "@/components/DynamicProductCatalog/ProductDetails";
import { Suspense } from "react";
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function generateStaticParams() {
  try {
    // Read categories.json from public folder
    const filePath = join(process.cwd(), 'public', 'categories.json');
    const fileContents = await readFile(filePath, 'utf8');
    const categories = JSON.parse(fileContents);
    
    // Flatten all products
    const products = categories.flatMap(category =>
      (category.subcategories || []).flatMap(subcategory =>
        (subcategory.products || []).map(product => ({
          id: product.id.toString(),
        }))
      )
    );
    
    return products;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="loading loading-spinner loading-lg"></div></div>}>
      <ProductDetailsContent />
    </Suspense>
  );
}
