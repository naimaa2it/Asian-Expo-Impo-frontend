"use client";

// pages/SearchResults.jsx
import React, { useState, useEffect, Suspense } from "react";
import { useLocation, useNavigate } from "@/lib/navigation";
import ProductList from "../DynamicProductCatalog/ProductList";
import SearchSuggestion from "./SearchSuggestion.jsx";

const SearchResultsContent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q") || "";
    setSearchQuery(query);
    setInputValue(query);

    if (query) {
      performSearch(query);
    } else {
      setLoading(false);
    }
  }, [location.search]);

  // Fetch categories once for suggestions
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/categories.json");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const performSearch = async (query) => {
    try {
      setLoading(true);
      const response = await fetch("/categories.json");
      const categories = await response.json();

      // Flatten all products from all categories and subcategories
      const allProducts = categories.flatMap((category) =>
        (category.subcategories || []).flatMap((subcategory) =>
          (subcategory.products || []).map((product) => ({
            ...product,
            category: category.name,
            subcategory: subcategory.name,
          }))
        )
      );

      // Simple search algorithm - you can enhance this as needed
      const results = allProducts.filter((product) => {
        const searchTerms = query.toLowerCase().split(" ");
        const productText = `
          ${product.name} 
          ${product.keyAttributes?.["Brand"] || ""} 
          ${product.keyAttributes?.Size || ""} 
          ${product.keyAttributes?.Pattern || ""}
          ${product.description || ""}
        `.toLowerCase();

        return searchTerms.every((term) => productText.includes(term));
      });

      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = (e) => {
    e.preventDefault();
    const newQuery = inputValue.trim();

    if (newQuery) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(newQuery)}`);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);

    if (query.trim() === "") {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Flatten all products from all categories and subcategories
    const allProducts = categories.flatMap((category) =>
      (category.subcategories || []).flatMap((subcategory) =>
        (subcategory.products || []).map((product) => ({
          ...product,
          category: category.name,
          subcategory: subcategory.name,
        }))
      )
    );

    // Filter products based on search query
    const results = allProducts.filter((product) => {
      const searchTerms = query.toLowerCase().split(" ");
      const productText = `
        ${product.name} 
        ${product.keyAttributes?.["Brand"] || ""} 
        ${product.keyAttributes?.Size || ""} 
        ${product.keyAttributes?.Pattern || ""}
        ${product.description || ""}
      `.toLowerCase();

      return searchTerms.every((term) => productText.includes(term));
    });

    setSearchSuggestions(results.slice(0, 5)); // Show top 5 suggestions
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    setInputValue("");
    navigate(`/product/${suggestion.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-teal-800">Searching products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleNewSearch} className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleSearchInputChange}
                onFocus={() => inputValue && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search products, brands, categories..."
                className="w-full px-6 py-4 pr-12 border border-gray-300 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm text-teal-800"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              
              {/* Search Suggestions */}
              <SearchSuggestion
                suggestions={searchSuggestions}
                onSuggestionClick={handleSuggestionClick}
                searchQuery={inputValue}
                isVisible={showSuggestions}
              />
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-teal-800 mb-4">
            Search Results for "{searchQuery}"
          </h1>

          {searchResults.length > 0 ? (
            <>
              <p className="text-gray-600 mb-6">
                Found {searchResults.length} product(s)
              </p>

              {/* Create a mock subcategory object for ProductList */}
              <ProductList
                category={{ name: "Search Results" }}
                subcategory={{
                  name: `Results for "${searchQuery}"`,
                  products: searchResults,
                }}
                selectedBrand={null}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl text-gray-400 mb-4">🔍</div>
              <h3 className="text-xl text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">
                Try different keywords or browse our categories
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchResults = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="loading loading-spinner loading-lg"></div></div>}>
      <SearchResultsContent />
    </Suspense>
  );
};

export default SearchResults;
