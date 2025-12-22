"use client";

import React from "react";
import { motion } from "framer-motion";

const Highlight = ({ children }) => (
  <span className="relative whitespace-nowrap">
    <span className="absolute inset-0 -skew-x-6 bg-gradient-to-r from-teal-500/30 via-teal-600/30 to-amber-500/30 blur-sm" />
    <span className="relative font-semibold text-teal-100 drop-shadow">
      {children}
    </span>
  </span>
);

const StatCard = ({ number, label, suffix = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center p-6"
  >
    <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent mb-2">
      {number}{suffix}
    </div>
    <div className="text-teal-200 font-medium">{label}</div>
  </motion.div>
);

export default function AboutUs() {
  return (
    <div className="min-h-screen w-full bg-teal-950 text-teal-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-20">

        {/* Hero Section */}
        <section className="relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full 
            bg-teal-900 border border-teal-700 shadow-lg shadow-black/30 mb-4">
              <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-amber-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-teal-200">
                ESTABLISHED 2013
              </span>
            </div>

            <h1 className="text-5xl font-extrabold md:text-7xl mb-6 text-teal-100">
              About <Highlight>Us</Highlight>
            </h1>

            <p className="text-xl text-teal-200 max-w-4xl mx-auto leading-relaxed">
              Asian Import and Export Co., LTD supplies high-quality food
              products worldwide — while treating our team like family and
              supporting the communities we serve.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-teal-900/40 rounded-3xl p-8 shadow-xl border border-teal-800"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-teal-800">
            <StatCard number="10+" label="Years Experience" />
            <StatCard number="50+" label="Countries Served" />
            <StatCard number="5000+" label="Products" />
            <StatCard number="99.8" label="Satisfaction Rate" suffix="%" />
          </div>
        </motion.section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-teal-900/40 rounded-3xl p-8 shadow-lg border border-teal-800">
              <h2 className="text-4xl font-bold text-teal-100 mb-6">
                Our Story
              </h2>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/5">
                  <div className="relative group">
                    <img
                      src="/assets/certificate.png"
                      alt="certificate"
                      className="rounded-2xl shadow-lg w-full object-cover transform group-hover:scale-105 transition"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>

                <div className="lg:w-3/5 space-y-6">
                  <p className="text-teal-200 leading-relaxed">
                    Founded in 2013, we grew from a local trading company into
                    a global supplier delivering premium food-grade products.
                  </p>
                  <p className="text-teal-200 leading-relaxed">
                    We distribute across Asia, America, Australia, Europe,
                    South Africa, CIS, and the Middle East.
                  </p>
                  <p className="text-teal-200 leading-relaxed">
                    Our logistics partners ensure top-tier shipping, safety,
                    and temperature-controlled transport globally.
                  </p>
                </div>
              </div>
            </div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-teal-900/30 rounded-3xl p-8 shadow-lg border border-teal-800"
            >
              <h3 className="text-2xl font-bold text-teal-100 mb-6">
                Our Products
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Raw Jute & Jute Goods",
                  "Genuine Leathers",
                  "Agro Commodities",
                  "Terracotta Tiles",
                  "Plastic Scrap/Flakes",
                  "Food Products"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-teal-800/50 rounded-xl">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-teal-200">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Global Reach */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-teal-900/40 rounded-3xl p-8 shadow-lg border border-teal-800"
            >
              <h2 className="text-3xl font-bold text-teal-100 mb-6">
                Global Reach
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {[
                  "Asia","America","Australia","Europe",
                  "South Africa","CIS Countries","Middle East","Eastern Europe"
                ].map((region, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="flex items-center p-4 rounded-xl bg-teal-800/40 border border-teal-700 hover:bg-teal-700/40 transition"
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-amber-400 rounded-full mr-4"></div>
                    <span className="text-teal-200">{region}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-teal-900/40 rounded-3xl p-8 shadow-lg border border-teal-800"
            >
              <h3 className="text-xl font-bold text-teal-100 mb-4">Mission</h3>
              <p className="text-teal-200 leading-relaxed">
                To process, market, and export high-quality commodities while
                maintaining sustainable business practices.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-teal-900/40 rounded-3xl p-8 shadow-lg border border-teal-800"
            >
              <h3 className="text-xl font-bold text-teal-100 mb-4">Vision</h3>
              <p className="text-teal-200 leading-relaxed">
                To be a leading global exporter maintaining international quality
                and safety standards.
              </p>
            </motion.div>

          </div>
        </div>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-teal-100 mb-4">
            Our Values
          </h2>

          <p className="text-xl text-teal-200 mb-12 max-w-2xl mx-auto">
            The principles that define our culture
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Excellence",
                desc: "Highest standards in all products & services",
                icon: "✓",
                color: "from-teal-400 to-green-400"
              },
              {
                title: "Integrity First",
                desc: "We build trust through honesty & transparency",
                icon: "🤝",
                color: "from-blue-400 to-cyan-400"
              },
              {
                title: "Innovation Driven",
                desc: "Improving processes through technology",
                icon: "💡",
                color: "from-amber-400 to-orange-400"
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className="bg-teal-900/40 rounded-3xl p-8 shadow-lg border border-teal-800 hover:bg-teal-800/40 transition"
              >
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${v.color} flex items-center justify-center mb-6 text-2xl text-white`} >
                  {v.icon}
                </div>
                <h3 className="text-2xl font-bold text-teal-100 mb-4">
                  {v.title}
                </h3>
                <p className="text-teal-200">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
