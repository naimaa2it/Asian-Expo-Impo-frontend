// components/SearchSuggestion.jsx
import React from "react";

const SearchSuggestion = ({
  suggestions,
  onSuggestionClick,
  searchQuery,
  isVisible,
}) => {
  if (!isVisible || !searchQuery || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg z-50 mt-1 border border-gray-200 max-h-80 overflow-y-auto">
      <div className="p-2">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-3 hover:bg-teal-50 cursor-pointer rounded-md transition-colors"
            onClick={() => onSuggestionClick(suggestion)}
          >
            <div className="flex items-center">
              {suggestion.image && (
                <img
                  src={suggestion.image}
                  alt={suggestion.name}
                  className="h-10 w-10 object-contain mr-3"
                />
              )}
              <div>
                <p className="font-medium text-teal-800">{suggestion.name}</p>
                <p className="text-sm text-gray-600">
                  {suggestion.keyAttributes?.["Brand"]} •{" "}
                  {suggestion.keyAttributes?.Size}
                </p>
                <p className="text-xs text-gray-500">
                  {suggestion.category} › {suggestion.subcategory}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestion;
