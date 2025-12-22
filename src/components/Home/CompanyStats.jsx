"use client";

import React, { useState, useEffect } from "react";
import { Users, Globe, Package, Award, TrendingUp } from "lucide-react";

const CompanyStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  const stats = [
    {
      icon: Users,
      number: 500,
      suffix: "+",
      label: "Happy Clients",
      description: "Satisfied customers across the region",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Package,
      number: 10000,
      suffix: "+",
      label: "Products Delivered",
      description: "Successfully shipped products",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Globe,
      number: 4,
      suffix: "",
      label: "States Served",
      description: "NC, SC, TN, and VA coverage",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Award,
      number: 8,
      suffix: "+",
      label: "Years Experience",
      description: "Since 2017 in import/export",
      color: "from-orange-500 to-orange-600",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("company-stats");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.number / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          current = stat.number;
          clearInterval(timer);
        }
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, 20);
    });
  };

  return (
    <section
      id="company-stats"
      className="py-20 bg-gradient-to-br from-teal-50 via-white to-teal-50 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-orange-400 to-teal-400 animate-pulse"></div>
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-teal-200/30 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-orange-200/30 rounded-full blur-3xl animate-bounce delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center mb-4">
            <TrendingUp
              className="text-teal-600 mr-3 animate-pulse"
              size={32}
            />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-teal-600 to-gray-800 bg-clip-text text-transparent">
              Our Achievements
            </h2>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Building trust through consistent delivery and quality service since
            our establishment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-all duration-500`}
              ></div>

              {/* Floating Icon Background */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-20 group-hover:scale-150 group-hover:rotate-12 transition-all duration-700"></div>

              <div className="relative z-10">
                <div
                  className={`bg-gradient-to-br ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                >
                  <stat.icon className="text-white" size={32} />
                </div>

                <div className="text-center">
                  <div
                    className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 transition-all duration-300`}
                  >
                    {counters[index]}
                    {stat.suffix}
                  </div>
                  <div className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    {stat.label}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                {/* Hover Effect Lines */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>

              {/* Sparkle Effects */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-200 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transform transition-all duration-1000 delay-800 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-teal-600 to-orange-500 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Join Our Success Story?
              </h3>
              <p className="text-teal-100 mb-6">
                Experience the quality and reliability that has made us a
                trusted partner
              </p>
              <button className="bg-white text-teal-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStats;
