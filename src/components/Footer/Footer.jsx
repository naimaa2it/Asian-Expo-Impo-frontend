"use client";

import React from "react";
import { Link } from "@/lib/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaPinterestP,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const infoLinks = [
    { label: "Contact", to: "/contact" },
    { label: "About Us", to: "/aboutUs" },
    { label: "Shipping & Delivery", to: "/shipping" },
    { label: "Privacy Policy", to: "/privacy" },
  ];

  const productCategories = [
    "Vehicle Parts & Accessories",
    "Metals & Metal Products",
    "Dry Food",
    "Agriculture",
    "Frozen Fish",
    "Wood Products",
  ];

  const contactInfo = [
    {
      icon: <FaPhone className="text-amber-400" />,
      text: "+14379003996",
      link: "tel:",
    },
    {
      icon: <FaEnvelope className="text-amber-400" />,
      text: " info@asianimportexport.com",
      link: "mailto: info@asianimportexport.com",
    },
    {
      icon: <FaMapMarkerAlt className="text-amber-400" />,
      text: "63/16 Soi Chumchon Talat Tha Ruea Khlong Toei Khwaeng Khlong Toei, Khet Khlong Toei Krung Thep Maha Nakhon 10110, Thailand",
      link: "#",
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      to: "#",
      color: "hover:text-blue-500",
    },
    {
      icon: <FaInstagram />,
      to: "#",
      color: "hover:text-pink-500",
    },
    {
      icon: <FaTwitter />,
      to: "#",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaYoutube />,
      to: "#",
      color: "hover:text-red-500",
    },
    {
      icon: <FaGlobe />,
      to: "asianimportexport.com",
      color: "hover:text-teal-400",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-teal-900 to-teal-800 text-gray-200 pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Information */}
        <div className="lg:col-span-2">
          <div className="flex items-center mb-4">
            <img
              src="/assets/website_big_logo.png"
              alt="Asian Import and Export"
              className="h-12 w-auto mr-3"
            />
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">
            We are one of the registered leading Import & export/supply of all
            kinds of Food, Raw Jute, Finished Jute Goods and Agro based products
            on international Marketplace as an exporter since 2017.
          </p>

          {/* Contact Information */}
          <div className="space-y-3">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-3 text-lg">{item.icon}</span>
                <a
                  href={item.link}
                  className="hover:text-amber-300 transition-colors"
                >
                  {item.text}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-5 pb-2 border-b border-teal-700">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {infoLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="hover:text-amber-300 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Categories */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-5 pb-2 border-b border-teal-700">
            Our Products
          </h4>
          <ul className="space-y-3">
            {productCategories.map((category) => (
              <li key={category}>
                <Link
                  to="#"
                  className="hover:text-amber-300 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social Links & Copyright */}
      <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-teal-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-5 mb-4 md:mb-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.to}
                className={`text-2xl text-gray-300 transition-colors ${social.color}`}
                aria-label="Social media link"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Asian Import & Export Co., LTD. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
