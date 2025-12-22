"use client";

import React from "react";
import { Link } from "@/lib/navigation";

const WebsiteLogo = () => {
  return (
    <Link to="/">
      <img src="/assets/website_big_logo.png" alt="Website Logo" />
    </Link>
  );
};

export default WebsiteLogo;
