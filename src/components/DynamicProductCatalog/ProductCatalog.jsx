"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "@/lib/navigation";
import ProductSubcategory from "./ProductSubcategory";
import ProductList from "./ProductList";
import SearchSuggestion from "../Search/SearchSuggestion.jsx";
import Image from "next/image";
import ProductSlider from "./ProductSlider";
import SearchPage from "../../../app/search/page";

const ProductCatalog = ({ isHomePage = false }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/categories.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load product categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Helper function to convert name to URL slug
  const nameToSlug = (name) => {
    return name.replace(/\s+/g, '-');
  };

  const handleSubcategoryClick = (category, subcategory) => {
    const categorySlug = nameToSlug(category.name);
    const subcategorySlug = nameToSlug(subcategory.name);
    navigate(`/products/c/${categorySlug}/${subcategorySlug}`);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-teal-800">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center p-4 bg-red-50 rounded-lg max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-800 mb-8 text-center">
          Product Catalog
        </h1>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Sidebar - Company Info */}
          <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md sticky top-[76px] max-h-[calc(100vh-100px)] overflow-auto">
              {/* Replace the static image with the slider */}
              <div className="h-full">
                <ProductSlider />
              </div>
              
              <p className="text-gray-600 text-sm p-3 bg-white border-t border-gray-200">
                Browse through our wide range of quality products across multiple categories.
              </p>
            </div>
          </div>

          {/* Right Side - Categories Grid */}
          <div className="lg:w-3/4">
            {categories.map((category, categoryIndex) => (
              <div key={category.id} className="mb-12">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-t-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <span className="mr-3 text-3xl">{category.icon}</span>
                    {category.name}
                  </h2>
                </div>

                {/* Subcategories Grid */}
                <div className="bg-white rounded-b-lg shadow-md p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {category.subcategories?.map((subcategory) => {
                      // Get the first product image as subcategory representative
                      const representativeImage = subcategory.products?.[0]?.image || '/assets/placeholder.png';
                      
                      return (
                        <div
                          key={subcategory.id}
                          onClick={() => handleSubcategoryClick(category, subcategory)}
                          className="group cursor-pointer bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-teal-400"
                        >
                          <div className="aspect-square relative mb-3 overflow-hidden rounded-lg bg-white">
                            <img
                              src={representativeImage}
                              alt={subcategory.name}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <h3 className="text-center font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                            {subcategory.name}
                          </h3>

                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
