"use client";

import React from "react";
import {
  Truck,
  Shield,
  Clock,
  HeadphonesIcon,
  Database,
  MapPin,
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Truck,
      title: "Reliable Delivery",
      description:
        "Fast and secure shipping across NC, SC, TN, and VA with real-time tracking.",
      features: [
        "Same-day processing",
        "Real-time tracking",
        "Insured shipments",
      ],
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "All products undergo strict quality control before shipment to ensure excellence.",
      features: [
        "Quality inspections",
        "Product certification",
        "Return guarantee",
      ],
    },
    {
      icon: Database,
      title: "Strong Inventory",
      description:
        "Maintain extensive stock levels to ensure product availability when you need it.",
      features: ["Large inventory", "Quick restocking", "Bulk availability"],
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer service to handle your inquiries and support needs.",
      features: [
        "24/7 availability",
        "Expert assistance",
        "Multiple contact options",
      ],
    },
    {
      icon: HeadphonesIcon,
      title: "Custom Solutions",
      description:
        "Tailored import/export solutions designed to meet your specific business needs.",
      features: ["Custom packaging", "Special requests", "Flexible terms"],
    },
    {
      icon: MapPin,
      title: "Regional Expertise",
      description:
        "Deep knowledge of regional markets and regulations for smooth operations.",
      features: ["Local knowledge", "Regulatory compliance", "Market insights"],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive import and export solutions designed to streamline
            your business operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white border rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                <service.icon className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
