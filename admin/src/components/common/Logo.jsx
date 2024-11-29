import React from "react";
import { SiInstatus } from "react-icons/si";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2">
      <SiInstatus />
      <span className="text-lg font-normal" style={{ fontFamily: "Mukta" }}>
        Statuspage
      </span>
    </Link>
  );
};

export default Logo;
