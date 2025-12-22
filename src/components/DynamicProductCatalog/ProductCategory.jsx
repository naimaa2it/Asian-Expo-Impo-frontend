import React from "react";

const ProductCategory = ({ category, isSelected, onSelect }) => {
  return (
    <div
      className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all border-2 min-w-[120px] ${
        isSelected
          ? "bg-teal-100 border-teal-500 shadow-md"
          : "bg-white border-gray-200 hover:border-teal-300 hover:shadow-md"
      }`}
      onClick={() => onSelect(category)}
    >
      <div className="text-3xl mb-2">{category.icon}</div>

      <h3
        className={`text-sm font-semibold text-center ${
          isSelected ? "text-teal-800" : "text-gray-700"
        }`}
      >
        {category.name}
      </h3>
    </div>
  );
};

export default ProductCategory;
