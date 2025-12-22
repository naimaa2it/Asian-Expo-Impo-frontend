import ProductCatalog from "@/components/DynamicProductCatalog/ProductCatalog";
import fs from 'fs';
import path from 'path';

// This function is required for static export
export async function generateStaticParams() {
  try {
    const categoriesPath = path.join(process.cwd(), 'public', 'categories.json');
    const categoriesData = fs.readFileSync(categoriesPath, 'utf8');
    const categories = JSON.parse(categoriesData);
    
    // Helper function to convert name to URL slug
    const nameToSlug = (name) => {
      return name.replace(/\s+/g, '-');
    };
    
    const params = [];
    
    // Generate params for all categories and subcategories
    categories.forEach(category => {
      params.push({
        category: nameToSlug(category.name)
      });
      
      if (category.subcategories) {
        category.subcategories.forEach(subcategory => {
          params.push({
            category: nameToSlug(subcategory.name)
          });
        });
      }
    });
    
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function ProductsCategoryPage() {
  return <ProductCatalog />;
}
