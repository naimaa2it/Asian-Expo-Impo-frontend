"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  DollarSign,
  Users,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/lib/navigation";

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("why-choose-us");
    if (element) observer.observe(element);

    // Auto-rotate active card
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4);
    }, 3000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const reasons = [
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description:
        "We offer the most competitive rates in the market without compromising on quality.",
      highlight: "Up to 25% savings",
      color: "from-green-400 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      icon: CheckCircle,
      title: "Quality Products",
      description:
        "Every product meets international quality standards and comes with certifications.",
      highlight: "ISO certified",
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description:
        "Quick order processing and same-day shipping for in-stock items.",
      highlight: "Same-day shipping",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our experienced team provides personalized service and industry expertise.",
      highlight: "8+ years experience",
      color: "from-purple-400 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="py-20 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-600/20 to-transparent animate-pulse"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-float delay-1000"></div>

        {/* Floating Stars */}
        {[...Array(15)].map((_, i) => (
          <Star
            key={i}
            size={Math.random() * 20 + 10}
            className="absolute text-white/10 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-10 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-teal-100 to-orange-200 bg-clip-text text-transparent animate-gradient">
            Why Choose Asian Import & Export?
          </h2>
          <p className="text-teal-100 max-w-3xl mx-auto text-sm leading-relaxed">
            We've built our reputation on trust, quality, and exceptional
            service delivery
          </p>
          <div className="flex justify-center mt-2">
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-700 hover:scale-105 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } ${activeCard === index ? "scale-105" : ""}`}
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveCard(index)}
            >
              {/* Card Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${reason.bgColor} opacity-0 group-hover:opacity-20 rounded-2xl transition-all duration-500`}
              ></div>

              {/* Main Card */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 h-full">
                {/* Icon Container */}
                <div
                  className={`relative w-20 h-20 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}
                >
                  <reason.icon size={36} className="text-white" />

                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${reason.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
                  ></div>
                </div>

                {/* Highlight Badge */}
                <div className="text-center mb-4">
                  <span
                    className={`inline-block bg-gradient-to-r ${reason.color} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse`}
                  >
                    {reason.highlight}
                  </span>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-orange-200 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-teal-100 leading-relaxed text-sm">
                    {reason.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight size={20} className="text-orange-400" />
                </div>

                {/* Active Indicator */}
                {activeCard === index && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center transform transition-all duration-1000 delay-800 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who trust us for their import
              and export needs
            </p>
            <Link to="/contact" className="inline-block">
              <button className="group bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <span className="flex items-center justify-center">
                  Get Started Today
                  <ArrowRight
                    size={20}
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
