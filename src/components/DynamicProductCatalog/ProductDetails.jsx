"use client";

import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "@/lib/navigation";
import { useParams } from "next/navigation";
import {
  FaArrowLeft,
  FaPlus,
  FaMinus,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import ContactModal from "../shared/Modal/ContactModal";

// Helper functions for recommended products
const parsePrice = (priceStr) => {
  if (!priceStr) return null;
  const cleaned = (priceStr + "").replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
};

const scoreAndRecommend = (allProducts, current, limit = 6) => {
  // Determine product type
  const isCurrentTyre =
    current.keyAttributes?.["Tire Type"] !== undefined ||
    current.keyAttributes?.["Pattern"] !== undefined ||
    current.name?.toLowerCase().includes("tire") ||
    current.name?.toLowerCase().includes("tyre");

  // Filter products by type (only show same category)
  const sameTypeProducts = allProducts.filter((product) => {
    const isProductTyre =
      product.keyAttributes?.["Tire Type"] !== undefined ||
      product.keyAttributes?.["Pattern"] !== undefined ||
      product.name?.toLowerCase().includes("tire") ||
      product.name?.toLowerCase().includes("tyre");

    return isProductTyre === isCurrentTyre;
  });

  const curPrice = parsePrice(current.price);
  return sameTypeProducts
    .filter((t) => t.id !== current.id)
    .map((t) => {
      let score = 0;

      // Brand matching
      const currentBrand = current.keyAttributes?.["Brand"] || "";
      const productBrand = t.keyAttributes?.["Brand"] || "";
      if (productBrand.toLowerCase() === currentBrand.toLowerCase())
        score += 50;

      // Category matching (if available)
      if (t.category && current.category && t.category === current.category)
        score += 40;

      // Size matching for tyres
      if (
        isCurrentTyre &&
        t.keyAttributes?.Size &&
        current.keyAttributes?.Size
      ) {
        if (
          t.keyAttributes.Size.toLowerCase() ===
          current.keyAttributes.Size.toLowerCase()
        )
          score += 60;
      }

      // Pattern matching for tyres
      if (
        isCurrentTyre &&
        t.keyAttributes?.Pattern &&
        current.keyAttributes?.Pattern
      ) {
        if (
          t.keyAttributes.Pattern.toLowerCase() ===
          current.keyAttributes.Pattern.toLowerCase()
        )
          score += 40;
      }

      // For food products, match similar categories
      if (!isCurrentTyre && t.subcategory && current.subcategory) {
        if (t.subcategory === current.subcategory) score += 50;
      }

      // Rating consideration
      score += (t.rating || 0) * 4;

      // Price similarity
      const p = parsePrice(t.price);
      if (curPrice && p) {
        const diff = Math.abs(curPrice - p) / curPrice;
        if (diff < 0.1) score += 40;
        else if (diff < 0.25) score += 20;
      }

      // Small random factor to shuffle ties
      score += Math.random() * 2;

      return { product: t, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.product);
};

// Recommended Products Component
const RecommendedProducts = ({ recs = [], ratings, isTyre = false }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = recs.length;

  const intervalRef = useRef(null);
  const CARD_WIDTH = 240; // width of each card including margin
  const VISIBLE_CARDS = 4;

  // Auto slide every 5 seconds
  useEffect(() => {
    if (total > VISIBLE_CARDS) startAutoSlide();
    return () => stopAutoSlide();
  }, [total]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const prevSlide = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    startAutoSlide();
  };

  const nextSlide = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev + 1) % total);
    startAutoSlide();
  };

  if (total === 0) {
    return (
      <div className="mt-20 text-center text-gray-400">
        No recommended products available.
      </div>
    );
  }

  const translateX = -currentIndex * CARD_WIDTH;

  return (
    <div className="mt-12 relative max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold text-center text-teal-800 mb-6 border-b-2 border-amber-400 pb-2">
        Recommended {isTyre ? "Tyres" : "Products"}
      </h3>

      {/* Navigation arrows - only show if we have more products than visible */}
      {total > VISIBLE_CARDS && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-teal-600 text-white rounded-full p-2 shadow hover:bg-teal-700 z-10"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-teal-600 text-white rounded-full p-2 shadow hover:bg-teal-700 z-10"
            aria-label="Next"
          >
            &#8594;
          </button>
        </>
      )}

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {recs.map((product, idx) => (
            <div
              key={product.id || idx}
              className="min-w-[220px] mr-5 bg-white p-4 rounded-lg flex-shrink-0 cursor-pointer hover:shadow-lg transition border border-gray-200"
            >
              <img
                src={product.image || ""}
                alt={product.name || "Product Image"}
                className="h-28 w-full object-contain mb-4"
                onClick={() => {
                  navigate(`/product/${product.id}`, { state: { product } });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
              <div className="text-teal-800 font-bold text-sm truncate">
                {product.name || "Product Name"}
              </div>
              <div className="text-xs text-gray-400 mb-1">
                {product.keyAttributes?.Brand || "Brand"}
              </div>
              <div className="text-xs text-gray-400 mb-1">
                {ratings ? ratings(product.rating || 0) : null}
              </div>

              {/* Show tyre-specific attributes if it's a tyre */}
              {isTyre && product.keyAttributes?.Size && (
                <div className="text-xs text-gray-500 mb-1">
                  Size: {product.keyAttributes.Size}
                </div>
              )}

              {/* Price Section */}
              <div className="mb-2">
                {product.offerPrice ? (
                  <>
                    <div className="text-xs text-gray-400 line-through">
                      {product.price || "Regular Price N/A"}
                    </div>
                    <div className="text-amber-600 font-semibold">
                      {product.offerPrice}
                    </div>
                  </>
                ) : (
                  <div className="text-teal-800 font-semibold">
                    {product.price || "Price N/A"}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  navigate(`/product/${product.id}`, { state: { product } });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full border border-teal-600 hover:bg-teal-600 text-teal-600 hover:text-white text-sm font-medium py-1 px-1 rounded transition-all duration-300 text-center mt-2"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main ProductDetails Component
const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const productFromState = location.state?.product;

  const [product, setProduct] = useState(productFromState || null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showZoomControls, setShowZoomControls] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isTyre, setIsTyre] = useState(false);

  useEffect(() => {
    // Load product data
    if (!productFromState) {
      fetch("/categories.json")
        .then((res) => res.json())
        .then((data) => {
          const allProducts = data.flatMap(
            (cat) =>
              cat.subcategories?.flatMap((sub) => sub.products || []) || []
          );
          const foundProduct = allProducts.find(
            (p) => String(p.id) === String(id)
          );
          setProduct(foundProduct || null);
          setSelectedImage(foundProduct?.image || null);

          // Check if product is a tyre
          const tyreCheck =
            foundProduct?.keyAttributes?.["Tire Type"] !== undefined ||
            foundProduct?.keyAttributes?.["Pattern"] !== undefined ||
            foundProduct?.name?.toLowerCase().includes("tire") ||
            foundProduct?.name?.toLowerCase().includes("tyre");
          setIsTyre(tyreCheck);

          // Store all products for recommendations
          setAllProducts(allProducts);
        })
        .catch((err) => console.error("Error loading categories.json:", err));
    } else {
      setSelectedImage(productFromState.image || null);

      // Check if product is a tyre
      const tyreCheck =
        productFromState?.keyAttributes?.["Tire Type"] !== undefined ||
        productFromState?.keyAttributes?.["Pattern"] !== undefined ||
        productFromState?.name?.toLowerCase().includes("tire") ||
        productFromState?.name?.toLowerCase().includes("tyre");
      setIsTyre(tyreCheck);

      // If we have the product from state, we still need to load all products for recommendations
      fetch("/categories.json")
        .then((res) => res.json())
        .then((data) => {
          const allProducts = data.flatMap(
            (cat) =>
              cat.subcategories?.flatMap((sub) => sub.products || []) || []
          );
          setAllProducts(allProducts);
        })
        .catch((err) => console.error("Error loading categories.json:", err));
    }
  }, [id, productFromState]);

  // Generate recommendations when product data is available
  useEffect(() => {
    if (product && allProducts.length > 0) {
      const recommendations = scoreAndRecommend(allProducts, product, 6);
      setRecommendedProducts(recommendations);
    }
  }, [product, allProducts]);

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i)
        stars.push(<FaStar key={i} className="text-amber-400 inline-block" />);
      else if (rating >= i - 0.5)
        stars.push(
          <FaStarHalfAlt key={i} className="text-amber-400 inline-block" />
        );
      else
        stars.push(
          <FaRegStar key={i} className="text-amber-400 inline-block" />
        );
    }
    return stars;
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-800">
        <p className="text-lg">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 px-4 lg:px-0">
      <div className="max-w-7xl mx-auto p-6 text-gray-800 rounded-lg">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center text-teal-700 hover:text-teal-800 mb-6 transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        <h2 className="text-3xl font-bold mb-12 text-center text-teal-800 hover:text-teal-900 transition-colors duration-300 border-b-2 border-amber-400 pb-2">
          {product.keyAttributes?.["Brand"] || "Product Details"}
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image Gallery */}
          <div className="flex flex-col items-center lg:w-2/5 relative">
            <div className="relative overflow-hidden group w-full max-w-lg">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-auto max-h-80 object-contain mb-4 transition-transform duration-300 border border-gray-200 rounded-lg"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                  cursor: "zoom-in",
                }}
                onMouseEnter={() => setShowZoomControls(true)}
                onMouseLeave={() => setShowZoomControls(false)}
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setShowZoomControls(!showZoomControls)}
                  className="bg-teal-700 text-white p-2 rounded-full hover:bg-teal-800"
                >
                  <FaPlus />
                </button>
              </div>
              {showZoomControls && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 bg-teal-700/90 p-2 rounded">
                  <button
                    onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.5))}
                    className="text-white p-1 hover:bg-teal-600 rounded"
                    disabled={zoomLevel <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className="text-white px-2">{zoomLevel}x</span>
                  <button
                    onClick={() => setZoomLevel(Math.min(5, zoomLevel + 0.5))}
                    className="text-white p-1 hover:bg-teal-600 rounded"
                    disabled={zoomLevel >= 5}
                  >
                    <FaPlus />
                  </button>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {[product.image, ...(product.additionalImages || [])].map(
                (img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => {
                      setSelectedImage(img);
                      setZoomLevel(1);
                    }}
                    className={`h-12 border-2 rounded ${
                      selectedImage === img
                        ? "border-amber-400"
                        : "border-gray-300 opacity-50"
                    } cursor-pointer`}
                  />
                )
              )}
            </div>
          </div>

          {/* Center: Product Details */}
          <div className="lg:w-1/2 space-y-2">
            <h1 className="text-2xl font-bold text-teal-800">{product.name}</h1>
            <p className="text-sm text-gray-600 mb-2">
              {product.keyAttributes?.Size || "N/A"}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mt-4">
              {product.keyAttributes?.["Load Range"] && (
                <p>
                  Load Range:{" "}
                  <span className="text-teal-800 font-medium">
                    {product.keyAttributes["Load Range"]}
                  </span>
                </p>
              )}
              {product.keyAttributes?.["Speed Symbol"] && (
                <p>
                  Speed Symbol:{" "}
                  <span className="text-teal-800 font-medium">
                    {product.keyAttributes["Speed Symbol"]}
                  </span>
                </p>
              )}
              {product.keyAttributes?.["Tread Depth"] && (
                <p>
                  Tread Depth:{" "}
                  <span className="text-teal-800 font-medium">
                    {product.keyAttributes["Tread Depth"]}
                  </span>
                </p>
              )}
              {product.keyAttributes?.["Tire Type"] && (
                <p>
                  Tire Type:{" "}
                  <span className="text-teal-800 font-medium">
                    {product.keyAttributes["Tire Type"]}
                  </span>
                </p>
              )}
              {product.keyAttributes?.["Fuel Efficiency"] && (
                <p>
                  Fuel Efficiency:{" "}
                  <span className="text-teal-800 font-medium">
                    {product.keyAttributes["Fuel Efficiency"]}
                  </span>
                </p>
              )}
              {product.keyAttributes?.["Wet Grip"] && (
                <p>
                  Wet Grip:{" "}
                  <span className="text-teal-800 font-medium">
                    {product.keyAttributes["Wet Grip"]}
                  </span>
                </p>
              )}
              {product.keyAttributes?.["Noise Level"] && (
                <p>
                  Noise Level:{" "}
                  <span className="text-teal-800 font-medium">
                    {product.keyAttributes["Noise Level"]}
                  </span>
                </p>
              )}
            </div>

            {/* Customer Reviews (if available) */}
            {product.rating && (
              <div className="text-sm mt-2 flex items-center gap-2">
                <span>Customer Reviews:</span>
                <span className="flex items-center">
                  {renderStars(product.rating)}
                </span>
                <span className="text-gray-600">
                  ({product.reviewCount || 0} reviews)
                </span>
              </div>
            )}

            {/* Product Description */}
            {product.description && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-teal-800">
                  Description
                </h3>
                <p className="text-gray-700 text-sm">{product.description}</p>

                {/* Conditional Shipping Text */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    {isTyre
                      ? "🚚 No shipping cost inside USA for tyres"
                      : "📦 Shipping cost will be calculated based on your area"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Purchase Box */}
          <div className="lg:w-1/4 bg-white text-gray-800 p-4 rounded-lg shadow-lg border border-gray-200">
            <div className="mb-4">
              {/* Updated Price Display */}
              {product.price && product.offerPrice ? (
                <>
                  <p className="text-gray-900 text-lg">Price Range:</p>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-2xl text-amber-600">
                      {product.offerPrice}
                    </p>

                    <span className="text-gray-7700">-</span>

                    <p className="font-bold text-2xl line-through text-gray-500">
                      {product.price}
                    </p>
                  </div>
                </>
              ) : product.price ? (
                <>
                  <p className="text-gray-600 text-sm">Price:</p>
                  <p className="font-bold text-2xl text-teal-800">
                    {product.price}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">Price: N/A</p>
              )}
            </div>

            {product.pricingTiers && product.pricingTiers.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-2">Volume Pricing:</p>
                {product.pricingTiers.map((tier, index) => (
                  <p key={index} className="text-gray-700 text-xs">
                    {tier.minQuantity}
                    {tier.maxQuantity
                      ? `-${tier.maxQuantity}`
                      : "+"} tires: {tier.pricePerTire}
                  </p>
                ))}
              </div>
            )}

            {product.keyAttributes?.MOQ && (
              <p className="text-gray-600 text-sm mb-4">
                MOQ: {product.keyAttributes.MOQ}
              </p>
            )}

            <button
              onClick={() => setShowContactModal(true)}
              className="block w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Contact Supplier
            </button>
          </div>
        </div>

        {/* Additional Product Specifications */}
        {product.keyAttributes && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-teal-800 mb-6 border-b-2 border-amber-400 pb-2">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(product.keyAttributes).map(([key, value]) => {
                if (typeof value === "string" || typeof value === "number") {
                  return (
                    <div
                      key={key}
                      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                    >
                      <p className="text-gray-600 text-sm">{key}</p>
                      <p className="text-teal-800 font-medium">{value}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* Supplier Information */}
        <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-teal-800 border-b-2 border-amber-400 pb-2">
            Supplier Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Brand Name:</p>
              <p className="text-teal-800 font-medium">
                {product.keyAttributes?.["Brand"] || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Manufacturer:</p>
              <p className="text-teal-800 font-medium">
                {product.keyAttributes?.Manufacturer || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Origin:</p>
              <p className="text-teal-800 font-medium">
                {product.keyAttributes?.Origin || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Packaging:</p>
              <p className="text-teal-800 font-medium">
                {product.keyAttributes?.Packaging || "N/A"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowContactModal(true)}
            className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Contact Supplier Directly
          </button>
        </div>

        {/* Customization Options */}
        {product.customizationOptions &&
          product.customizationOptions.length > 0 && (
            <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-teal-800 border-b-2 border-amber-400 pb-2">
                Customization Options
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.customizationOptions.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
          )}

        {/* Shipping Information */}
        {product.shipping && (
          <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-teal-800 border-b-2 border-amber-400 pb-2">
              Shipping & Delivery
            </h3>
            <p className="text-gray-700">{product.shipping}</p>
            {product.packagingAndDelivery && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Selling Units:</p>
                  <p className="text-teal-800 font-medium">
                    {product.packagingAndDelivery.sellingUnits}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Delivery Time:</p>
                  <p className="text-teal-800 font-medium">
                    {product.packagingAndDelivery.deliveryTime}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recommended Products Section */}
        {recommendedProducts.length > 0 && (
          <RecommendedProducts
            recs={recommendedProducts}
            ratings={renderStars}
            isTyre={isTyre}
          />
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          tyreModel={product.name}
          moq={product.keyAttributes?.MOQ}
        />
      )}
    </div>
  );
};

export default ProductDetails;
