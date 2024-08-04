// src/useSubdomain.js
import { useEffect, useState } from "react";

const useSubdomain = () => {
  const [subdomain, setSubdomain] = useState(null);

  useEffect(() => {
    const { hostname } = window.location;
    const subdomain = hostname.split(".")[0];
    const baseUrl = process.env.REACT_APP_BASE_URL || "";

    if (!baseUrl.includes(subdomain) && subdomain !== "") {
      setSubdomain(subdomain);
    } else {
      setSubdomain(null);
    }
  }, []);

  return subdomain;
};

export default useSubdomain;
