"use client";

import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { ShoppingBag } from "lucide-react";
import { Link, useNavigate, useLocation } from "@/lib/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemCount, toggleCart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  // Product categories
  const productCategories = [
    {
      name: "Vehicle Parts & Accessories",
      items: [
        "Truck Tires",
        "Golf Cart",
        "Rim",
        "Electric Bike",
        "Other Parts",
      ],
    },
    {
      name: "Metals & Metal Products",
      items: ["Copper Scrap", "Cathode Copper", "Aluminum Metal"],
    },
    {
      name: "Dry Food",
      items: ["Rice", "Sugar", "Nuts"],
    },
    {
      name: "Wood",
      items: ["Wood Pellets"],
    },
    {
      name: "Agriculture",
      items: ["Fresh Potatoes", "Fresh Onion", "Organic Tea"],
    },
  ];

  // Helper function to convert name to URL slug
  const nameToSlug = (name) => {
    return name.replace(/\s+/g, '-');
  };

  // Mapping for navbar items to filter parameters
  const productCategoryMapping = {
    "Truck Tires": "Truck Tires",
    "Golf Cart": "Golf Cart",
    Rim: "Rim",
    "Electric Bike": "Electric Bike",
    "Other Parts": "Other Parts",
    "Copper Scrap": "Copper Scrap",
    "Cathode Copper": "Cathode Copper",
    "Aluminum Metal": "Aluminum Metal",
    Rice: "Rice",
    Sugar: "Sugar",
    Nuts: "Nuts",
    "Cashew Nuts": "Cashew Nuts",
    "Almond Nuts": "Almond Nuts",
    "Wood Pellets": "Wood Pellets",
    "Fresh Potatoes": "Fresh Potatoes",
    "Fresh Onion": "Fresh Onion",
    "Organic Tea": "Organic Tea",
  };

  const handleProductClick = (productName) => {
    const mappedCategory = productCategoryMapping[productName];
    if (mappedCategory) {
      const slug = nameToSlug(mappedCategory);
      navigate(`/products/c/${slug}`);
    } else {
      navigate(`/products?search=${encodeURIComponent(productName)}`);
    }
    setIsProductsOpen(false);
    setIsMenuOpen(false);
  };

  const handleViewAllProducts = () => {
    navigate("/products");
    setIsProductsOpen(false);
    setIsMenuOpen(false);
  };

  // active link classes
  const getLinkClasses = (path) =>
    `text-white font-medium py-2 border-b-2 transition-colors ${
      location.pathname === path
        ? "text-amber-300 border-amber-300"
        : "hover:text-amber-200 border-transparent hover:border-amber-200"
    }`;

  const getMobileLinkClasses = (path) =>
    `text-white font-medium py-3 px-4 rounded-md transition-colors ${
      location.pathname === path
        ? "bg-teal-700 text-amber-300"
        : "hover:bg-teal-700"
    }`;

  return (
    <nav className="bg-gradient-to-r from-teal-800 to-teal-600 shadow-lg px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <Image
              src="/assets/website_big_logo.png"
              alt="Asian Import and Export"
              width={150}
              height={64}
              className="h-16 w-auto"
            />
          </Link>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-7">
          <Link to="/" className={getLinkClasses("/")}>
            Home
          </Link>

          <div className="relative">
            <button
              onClick={toggleProducts}
              className={`font-medium flex items-center py-2 border-b-2 ${
                location.pathname === "/products"
                  ? "text-amber-300 border-amber-300"
                  : "text-white hover:text-amber-300 border-transparent hover:border-amber-300"
              }`}
            >
              Products
              <FaChevronDown className="ml-1 text-sm" />
            </button>

            {isProductsOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white shadow-2xl rounded-lg p-4 w-[700px] max-w-[90vw] z-20 border border-teal-200">
                <div className="flex gap-3 flex-wrap">
                  {/* Vehicle Parts */}
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-teal-800 pb-1 mb-2 border-b border-teal-200">
                      Vehicle Parts
                    </h3>
                    <div className="space-y-0.5">
                      {productCategories[0].items.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleProductClick(item)}
                          className="block w-full text-left py-1 px-2 hover:bg-teal-50 rounded text-xs text-gray-700"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Metals */}
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-teal-800 pb-1 mb-2 border-b border-teal-200">
                      Metals
                    </h3>
                    <div className="space-y-0.5">
                      {productCategories[1].items.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleProductClick(item)}
                          className="block w-full text-left py-1 px-2 hover:bg-teal-50 rounded text-xs text-gray-700"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dry Food */}
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-teal-800 pb-1 mb-2 border-b border-teal-200">
                      Dry Food
                    </h3>
                    <div className="space-y-0.5">
                      {productCategories[2].items.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleProductClick(item)}
                          className="block w-full text-left py-1 px-2 hover:bg-amber-50 rounded text-xs text-gray-700"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wood */}
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-teal-800 pb-1 mb-2 border-b border-teal-200">
                      Wood
                    </h3>
                    <div className="space-y-0.5">
                      {productCategories[3].items.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleProductClick(item)}
                          className="block w-full text-left py-1 px-2 hover:bg-amber-50 rounded text-xs text-gray-700"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Agriculture */}
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-teal-800 pb-1 mb-2 border-b border-teal-200">
                      Agriculture
                    </h3>
                    <div className="space-y-0.5">
                      {productCategories[4].items.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleProductClick(item)}
                          className="block w-full text-left py-1 px-2 hover:bg-teal-50 rounded text-xs text-gray-700"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View All Products */}
                <div className="mt-4 pt-3 border-t border-teal-200">
                  <button
                    onClick={handleViewAllProducts}
                    className="block w-full py-1.5 px-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium rounded text-xs text-center hover:from-teal-700 hover:to-teal-800"
                  >
                    View All Products
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link to="/aboutUs" className={getLinkClasses("/aboutUs")}>
            About Us
          </Link>
          <Link to="/shipping" className={getLinkClasses("/shipping")}>
            Shipping & Delivery
          </Link>
          <Link to="/privacy" className={getLinkClasses("/privacy")}>
            Privacy Policy
          </Link>
          <Link to="/contact" className={getLinkClasses("/contact")}>
            Contact
          </Link>
          
          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative text-white hover:text-amber-300 transition-colors py-2 border-b-2 border-transparent hover:border-amber-300"
          >
            <div className="flex items-center gap-1">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">Cart</span>
              {getCartItemCount() > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
                  {getCartItemCount()}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Right side text */}
        <div className="hidden lg:flex items-center space-x-2">
          <div className="text-white text-sm border-l border-teal-500 pl-4">
            <div className="font-medium">Import & Export Experts</div>
            <div className="text-teal-200 text-xs">Since 2017</div>
          </div>
        </div>
        

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            className="text-white p-2 rounded-lg hover:bg-teal-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 py-4 border-t border-teal-700 bg-teal-800 rounded-lg">
          <div className="flex flex-col space-y-1 px-4">
            <Link
              to="/"
              className={getMobileLinkClasses("/")}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <div>
              <button
                onClick={toggleProducts}
                className="text-white font-medium flex items-center justify-between w-full py-3 px-4"
              >
                Products
                <FaChevronDown
                  className={`transform transition-transform ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProductsOpen && (
                <div className="pl-2 bg-teal-700 rounded p-1">
                  {productCategories.map((category, index) => (
                    <div key={index}>
                      <p className="text-xs font-semibold text-teal-200 mb-0">
                        {category.name}
                      </p>
                      <div>
                        {category.items.map((item, i) => (
                          <button
                            key={i}
                            onClick={() => handleProductClick(item)}
                            className="block w-full text-left text-white py-0 px-1 hover:bg-teal-600 text-xs"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleCart}
              className="relative text-white hover:text-amber-300 transition-colors py-2 border-b-2 border-transparent hover:border-amber-300 ml-3">
              <div className="flex items-center gap-1">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-medium">Cart</span>
                {getCartItemCount() > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
                    {getCartItemCount()}
                  </span>
                )}
              </div>
            </button>

            <Link
              to="/aboutUs"
              className={getMobileLinkClasses("/aboutUs")}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/shipping"
              className={getMobileLinkClasses("/shipping")}
              onClick={() => setIsMenuOpen(false)}
            >
              Shipping & Delivery
            </Link>
            <Link
              to="/privacy"
              className={getMobileLinkClasses("/privacy")}
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              className={getMobileLinkClasses("/contact")}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
