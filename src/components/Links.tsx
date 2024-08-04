import React from "react";
import { Link } from "react-router-dom";

interface LinkProps {
  href: string;
  label: string;
}

const Links: React.FC<LinkProps> = ({ href, label }) => {
  console.log("HREF ",href);

  return (
    <Link to={href} className="px-4 py-2 bg-primary text-white rounded-md">
      {label}
    </Link>
  );
};

export default Links;
