"use client";

import React from "react";
import { motion } from "framer-motion";

const Highlight = ({ children }) => (
  <span className="relative whitespace-nowrap">
    <span className="absolute inset-0 -skew-x-6 bg-gradient-to-r from-teal-500/30 via-teal-600/30 to-amber-500/30 blur-sm" />
    <span className="relative font-semibold text-white drop-shadow">
      {children}
    </span>
  </span>
);

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full bg-teal-950 text-teal-100 py-16">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        {/* Hero Section */}
        <section className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold md:text-6xl mb-4"
          >
            <Highlight>Privacy</Highlight> & Policy
          </motion.h1>
        </section>

        {/* Comments Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-100">Comments</h2>
          <p className="text-teal-200">
            When visitors leave comments on the site we collect the data shown
            in the comments form, and also the visitor’s IP address and browser
            user agent string to help spam detection.
          </p>
          <p className="text-teal-200">
            An anonymized string created from your email address (also called a
            hash) may be provided to the Gravatar service to see if you are
            using it. The Gravatar service privacy policy is available{" "}
            <a
              href="https://automattic.com/privacy/"
              className="text-amber-400 underline hover:text-amber-300"
            >
              here
            </a>
            . After approval of your comment, your profile picture is visible to
            the public in the context of your comment.
          </p>
        </section>

        {/* Media Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-100">Media</h2>
          <p className="text-teal-200">
            If you upload images to the website, you should avoid uploading
            images with embedded location data (EXIF GPS) included. Visitors to
            the website can download and extract any location data from images
            on the website.
          </p>
        </section>

        {/* Cookies Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-100">Cookies</h2>
          <p className="text-teal-200">
            If you leave a comment on our site you may opt-in to saving your
            name, email address and website in cookies. These are for your
            convenience so that you do not have to fill in your details again
            when you leave another comment. These cookies will last for one
            year.
          </p>
          <p className="text-teal-200">
            If you visit our login page, we will set a temporary cookie to
            determine if your browser accepts cookies. This cookie contains no
            personal data and is discarded when you close your browser.
          </p>
          <p className="text-teal-200">
            When you log in, we will also set up several cookies to save your
            login information and your screen display choices. Login cookies
            last for two days, and screen options cookies last for a year. If
            you select “Remember Me”, your login will persist for two weeks. If
            you log out of your account, the login cookies will be removed.
          </p>
          <p className="text-teal-200">
            If you edit or publish an article, an additional cookie will be
            saved in your browser. This cookie includes no personal data and
            simply indicates the post ID of the article you just edited. It
            expires after 1 day.
          </p>
        </section>

        {/* Embedded Content Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-100">
            Embedded content from other websites
          </h2>
          <p className="text-teal-200">
            Articles on this site may include embedded content (e.g. videos,
            images, articles, etc.). Embedded content from other websites
            behaves in the exact same way as if the visitor has visited the
            other website.
          </p>
          <p className="text-teal-200">
            These websites may collect data about you, use cookies, embed
            additional third-party tracking, and monitor your interaction with
            that embedded content, including tracking your interaction with the
            embedded content if you have an account and are logged in to that
            website.
          </p>
        </section>

        {/* Data Sharing Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-100">
            Who we share your data with
          </h2>
          <p className="text-teal-200">
            If you request a password reset, your IP address will be included in
            the reset email.
          </p>
        </section>

        {/* Data Retention Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-100">
            How long we retain your data
          </h2>
          <p className="text-teal-200">
            If you leave a comment, the comment and its metadata are retained
            indefinitely. This is so we can recognize and approve any follow-up
            comments automatically instead of holding them in a moderation
            queue.
          </p>
          <p className="text-teal-200">
            For users that register on our website (if any), we also store the
            personal information they provide in their user profile. All users
            can see, edit, or delete their personal information at any time
            (except they cannot change their username). Website administrators
            can also see and edit that information.
          </p>
        </section>

        {/* User Rights Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-100">
            What rights you have over your data
          </h2>
          <p className="text-teal-200">
            If you have an account on this site, or have left comments, you can
            request to receive an exported file of the personal data we hold
            about you, including any data you have provided to us. You can also
            request that we erase any personal data we hold about you. This does
            not include any data we are obliged to keep for administrative,
            legal, or security purposes.
          </p>
        </section>

        {/* Data Destination Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-100">
            Where your data is sent
          </h2>
          <p className="text-teal-200">
            Visitor comments may be checked through an automated spam detection
            service.
          </p>
        </section>
      </div>
    </div>
  );
}
