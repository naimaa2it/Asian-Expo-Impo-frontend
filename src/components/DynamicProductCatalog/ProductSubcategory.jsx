import React from "react";

const ProductSubcategory = ({ subcategory, isSelected, onSelect }) => {
  return (
    <div
      className={`p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? "bg-teal-100 border-l-4 border-teal-500"
          : "hover:bg-gray-100"
      }`}
      onClick={() => onSelect(subcategory)}
    >
      <div className="flex items-center">
        <span
          className={`font-medium ${
            isSelected ? "text-teal-800" : "text-gray-700"
          }`}
        >
          {subcategory.name}
        </span>
      </div>

      {subcategory.products && (
        <p className="text-xs text-gray-500 mt-1">
          {subcategory.products.length} products
        </p>
      )}
    </div>
  );
};

export default ProductSubcategory;
