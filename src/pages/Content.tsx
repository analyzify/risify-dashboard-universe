
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { FileText } from "lucide-react";

const Content = () => {
  const navigate = useNavigate();

  // Redirect to the first sub-page (AI Knowledge Base) after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/content/knowledge-base");
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout title="Content & Knowledge">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-8">
          <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Content & Knowledge Hub</h2>
          <p className="text-muted-foreground">
            Redirecting to AI Knowledge Base...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Content;
