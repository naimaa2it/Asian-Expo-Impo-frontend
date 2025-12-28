"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Slider data - images and text content
  const slides = [
    {
      image: "/1.png",
    },
    {
      image: "/2.png",
    },
    {
      image: "/3.png",
    },
    {
      image: "/4.png",
    },
    {
      image: "/5.png",
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="relative w-full h-full min-h-[500px] rounded-t-md overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Full Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slides[currentSlide].image})`,
              }}
            />
            
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Section - Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-10">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Auto-Play Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden">
        <motion.div
          key={currentSlide}
          initial={{ width: 0 }}
          animate={{ 
            width: "100%",
            transition: { 
              duration: 5, 
              ease: "linear" 
            }
          }}
          className="h-full bg-teal-400"
        />
      </div>
    </div>
  );
};

export default ProductSlider;