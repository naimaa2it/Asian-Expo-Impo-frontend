#!/bin/bash
# Script to add "use client" directive to components that need it

echo "🔄 Adding 'use client' directive to interactive components..."

# List of files that need "use client" directive
CLIENT_COMPONENTS=(
  "src/components/Navbar/Navbar.jsx"
  "src/components/DynamicProductCatalog/ProductCatalog.jsx"
  "src/components/DynamicProductCatalog/ProductDetails.jsx"
  "src/components/DynamicProductCatalog/ProductList.jsx"
  "src/components/DynamicProductCatalog/ProductCategory.jsx"
  "src/components/DynamicProductCatalog/ProductSubcategory.jsx"
  "src/components/Search/SearchResults.jsx"
  "src/components/Search/SearchSuggestion.jsx.jsx"
  "src/components/shared/Modal/ContactModal.jsx"
  "src/components/shared/Modal/ContactForm.jsx"
  "src/components/Home/Banner.jsx"
  "src/components/Home/CompanyStats.jsx"
  "src/components/Home/ServicesSection.jsx"
  "src/components/Home/WhyChooseUs.jsx"
  "src/Pages/ContactPage.jsx"
  "src/Pages/ShippingAndDelivery.jsx"
  "src/Pages/AboutUs.jsx"
  "src/Pages/PrivacyPolicy.jsx"
)

for file in "${CLIENT_COMPONENTS[@]}"; do
  if [ -f "$file" ]; then
    # Check if file already has "use client"
    if ! grep -q "\"use client\"" "$file"; then
      # Create backup
      cp "$file" "$file.bak"
      
      # Add "use client" at the top of the file
      echo -e "\"use client\";\n\n$(cat $file)" > "$file"
      
      echo "✅ Added 'use client' to: $file"
    else
      echo "⏭️  Already has 'use client': $file"
    fi
  else
    echo "⚠️  File not found: $file"
  fi
done

echo ""
echo "✅ 'use client' directive update complete!"
echo "📝 Backup files created with .bak extension"
echo ""
echo "Next: Review changes and test your application"
