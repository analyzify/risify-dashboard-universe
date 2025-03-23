
import React from "react";
import Layout from "@/components/Layout";

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <Layout title={title}>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">{title} Page</h2>
          <p className="text-muted-foreground">This is a placeholder for the {title} page.</p>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceholderPage;
