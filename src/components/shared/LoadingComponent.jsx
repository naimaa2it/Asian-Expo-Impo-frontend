"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./LoadingComponent.css";

const LoadingComponent = ({
  type = "spinner",
  size = "medium",
  text = "Loading...",
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (type === "progress") {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [type]);

  // Spinner loading animation
  const renderSpinner = () => (
    <div className="loading-spinner">
      <motion.div
        className="spinner-circle"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="spinner-circle-inner"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <div className="spinner-dots">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="spinner-dot"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );

  // Progress bar animation
  const renderProgressBar = () => (
    <div className="progress-container">
      <motion.div
        className="progress-track"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
      <div className="progress-text">{Math.round(progress)}%</div>
    </div>
  );

  // Pulsing dots animation
  const renderPulsingDots = () => (
    <div className="pulsing-dots">
      {["", "", ""].map((_, i) => (
        <motion.div
          key={i}
          className="pulse-dot"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );

  // Skeleton loading animation
  const renderSkeleton = () => (
    <div className="skeleton-loader">
      <motion.div
        className="skeleton-shine"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <div className="skeleton-content">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line long"></div>
      </div>
    </div>
  );

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "loading-small";
      case "large":
        return "loading-large";
      default:
        return "loading-medium";
    }
  };

  return (
    <div className={`loading-component ${getSizeClass()}`}>
      <div className="loading-animation">
        {type === "spinner" && renderSpinner()}
        {type === "progress" && renderProgressBar()}
        {type === "pulse" && renderPulsingDots()}
        {type === "skeleton" && renderSkeleton()}
      </div>
      {text && <div className="loading-text">{text}</div>}
    </div>
  );
};

export default LoadingComponent;
