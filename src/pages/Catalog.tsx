
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Package } from "lucide-react";

const Catalog = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if we're at the exact /catalog path
    if (location.pathname === "/catalog") {
      const timer = setTimeout(() => {
        navigate("/catalog/products");
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [navigate, location]);

  return (
    <Layout title="Catalog Management">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-8">
          <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Catalog Management Hub</h2>
          <p className="text-muted-foreground">
            Redirecting to Products...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
