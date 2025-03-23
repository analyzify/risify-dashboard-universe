
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Layers } from "lucide-react";

const Components = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/components/gallery");
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout title="Storefront Components">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-8">
          <Layers className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Storefront Components Hub</h2>
          <p className="text-muted-foreground">
            Redirecting to Component Gallery...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Components;
