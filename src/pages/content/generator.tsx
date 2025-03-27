
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import ContentGenerator from "@/components/content-generator/ContentGenerator";

const ContentGeneratorPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Content Generator | Risify</title>
      </Helmet>
      <Layout title="AI Content Generator">
        <ContentGenerator />
      </Layout>
    </>
  );
};

export default ContentGeneratorPage;
