"use client";

import React, { useState } from "react";
import { useNavigate } from "@/lib/navigation";

const ProductList = ({ category, subcategory, selectedBrand }) => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const navigate = useNavigate();

  // Filter products by selected brand
  const filteredProducts = selectedBrand
    ? (subcategory.products || []).filter(
        (product) => product.keyAttributes?.["Brand"] === selectedBrand
      )
    : subcategory.products || [];

  // Determine how many products to show initially
  const initialProductsCount = 3;
  const displayedProducts = showAllProducts
    ? filteredProducts
    : filteredProducts.slice(0, initialProductsCount);

  const handleSeeAllClick = () => {
    setShowAllProducts(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {displayedProducts && displayedProducts.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Product Image */}
                <div className="h-48 w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain h-full w-full p-2"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">
                      No image available
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 h-14">
                  {product.name || "Unnamed Product"}
                </h3>

                {/* Only show brand and size for cart view */}
                <div className="mb-3 space-y-1">
                  {product.keyAttributes?.["Brand"] && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Brand:</span>{" "}
                      {product.keyAttributes["Brand"]}
                    </p>
                  )}
                  {product.keyAttributes?.Size && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Size:</span>{" "}
                      {product.keyAttributes.Size}
                    </p>
                  )}
                </div>

                {/* Pricing Information */}
                <div className="mt-auto">
                  {product.offerPrice && product.price ? (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-teal-600">
                        {product.offerPrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.price}
                      </span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        {Math.round(
                          ((parseFloat(product.price.replace(/[^0-9.]/g, "")) -
                            parseFloat(
                              product.offerPrice.replace(/[^0-9.]/g, "")
                            )) /
                            parseFloat(product.price.replace(/[^0-9.]/g, ""))) *
                            100
                        )}
                        % OFF
                      </span>
                    </div>
                  ) : product.price ? (
                    <p className="text-lg font-bold text-teal-600 mb-3">
                      {product.price}
                    </p>
                  ) : null}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {/* See Details Button */}
                    <button
                      onClick={() =>
                        navigate(`/product/${product.id}`, {
                          state: { product },
                        })
                      }
                      className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      See Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show "See All" button if there are more products to show */}
          {!showAllProducts &&
            filteredProducts.length > initialProductsCount && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleSeeAllClick}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  See All {filteredProducts.length} Products
                </button>
              </div>
            )}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-4xl text-gray-400 mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No products available
          </h3>
          <p className="text-gray-500">
            {selectedBrand
              ? `There are no ${selectedBrand} products in this category.`
              : "There are currently no products in this category."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
