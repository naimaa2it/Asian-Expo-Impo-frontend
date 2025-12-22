"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Truck,
  Banknote,
  Clock,
  FileText,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "@/lib/navigation";

// ✅ Replacing shadcn/ui with Tailwind components
const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-2xl transition shadow-md px-4 py-2";
  const styles =
    variant === "secondary"
      ? "bg-teal-100 text-teal-900 hover:bg-teal-200"
      : "bg-gradient-to-r from-teal-700 to-teal-600 text-white hover:opacity-90";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className }) => (
  <div
    className={`rounded-3xl border border-teal-200/20 bg-teal-900/40 backdrop-blur p-4 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="mb-3">{children}</div>;

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-white ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children }) => (
  <div className="text-sm text-teal-200">{children}</div>
);

const Accordion = ({ children }) => (
  <div className="divide-y divide-teal-700/50">{children}</div>
);

const AccordionItem = ({ value, children }) => (
  <div className="py-2">{children}</div>
);

const AccordionTrigger = ({ children }) => (
  <button className="w-full text-left py-2 font-medium text-teal-100 hover:text-amber-300 transition">
    {children}
  </button>
);

const AccordionContent = ({ children }) => (
  <div className="px-2 py-2 text-teal-200 text-sm">{children}</div>
);

const paymentModes = [
  {
    range: "1 to 5 Containers",
    bullets: [
      "50% advance payment by bank-to-bank wire transfer against the invoice",
      "Remaining 50% by bank-to-bank wire transfer upon submission of shipping document copies",
    ],
  },
  {
    range: "6 to 10 Containers",
    bullets: [
      "30% advance payment by bank-to-bank wire transfer against the invoice",
      "30% by bank-to-bank wire transfer upon submission of shipping document copies",
      "Balance 40% upon arrival of goods at the buyer’s port",
    ],
  },
  {
    range: "11 to 19 Containers",
    bullets: [
      "25% advance payment by bank-to-bank wire transfer against the invoice",
      "25% by bank-to-bank wire transfer upon submission of shipping document copies",
      "Remaining 50% by bank-to-bank wire transfer upon arrival of goods at buyer’s port of delivery",
    ],
  },
  {
    range: "20 Containers and above",
    bullets: [
      "25% advance payment by bank-to-bank wire transfer against the invoice",
      "Remaining 75% via Cash Against Documents (CAD) or Letter of Credit (LC)",
    ],
    note: "For orders exceeding 20 containers, payment terms are negotiable.",
  },
];

const steps = [
  {
    title: "Order Confirmation",
    desc: "Place your order and receive an invoice with your proforma details.",
    icon: <FileText className="h-5 w-5 text-teal-400" />,
  },
  {
    title: "Advance Payment",
    desc: "Make the applicable advance via secure bank-to-bank transfer.",
    icon: <Banknote className="h-5 w-5 text-amber-400" />,
  },
  {
    title: "Processing & Scheduling",
    desc: "We allocate stock, schedule inspection and loading windows.",
    icon: <Clock className="h-5 w-5 text-teal-300" />,
  },
  {
    title: "Inspection & Loading",
    desc: "Buyer visitation is welcomed during inspection and loading after advance is confirmed.",
    icon: <ShieldCheck className="h-5 w-5 text-teal-500" />,
  },
  {
    title: "Documents & Shipment",
    desc: "Shipping documents are shared; you complete staged payments as per terms.",
    icon: <Truck className="h-5 w-5 text-amber-300" />,
  },
];

const Highlight = ({ children }) => (
  <span className="relative whitespace-nowrap">
    <span className="absolute inset-0 -skew-x-6 bg-gradient-to-r from-teal-500/30 via-teal-600/30 to-amber-500/30 blur-sm" />
    <span className="relative font-semibold text-white drop-shadow">
      {children}
    </span>
  </span>
);

export default function ShippingAndDelivery() {
  return (
    <div className="min-h-screen w-full bg-teal-950 text-teal-100">
      {/* ✅ Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1974&auto=format&fit=crop')",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/70 via-teal-900/80 to-teal-950" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight md:text-6xl"
          >
            Global <Highlight>Shipping</Highlight> & Delivery
          </motion.h1>
        </div>
      </section>

      {/* ✅ Payment Modes */}
      <section className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {paymentModes.map((mode, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{mode.range}</CardTitle>
              </CardHeader>
              <CardContent>
                {mode.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 text-amber-400" />
                    <p>{b}</p>
                  </div>
                ))}
                {mode.note && (
                  <p className="mt-2 text-xs text-amber-300">{mode.note}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ✅ Timeline */}
      <section className="relative mx-auto max-w-7xl px-6 py-10">
        <div className="space-y-6">
          {steps.map((s, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {s.icon} {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent>{s.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ✅ FAQ */}
      <section className="relative mx-auto max-w-7xl px-6 py-12">
        <Accordion>
          <AccordionItem value="1">
            <AccordionTrigger>
              Can I visit before I make the advance payment?
            </AccordionTrigger>
            <AccordionContent>
              Visitation is only allowed after order confirmation and advance
              payment are verified.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* ✅ Call to Action */}
      <section className="relative mx-auto max-w-7xl px-6 pb-16">
        <Card>
          <h3 className="text-xl font-bold mb-2 text-white">Ready to ship?</h3>
          <p className="mb-4 text-teal-200">
            Share your destination port and container count for an instant lane
            assessment, ETA, and documentation checklist.
          </p>
          <div className="flex gap-3">
            <Link to="/contact">
              <Button variant="secondary">Contact Us</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
