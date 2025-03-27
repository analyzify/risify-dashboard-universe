
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import ContentGenerator from "@/components/content-generator/ContentGenerator";

const ContentGeneratorPage = () => {
  return (
    <>
      <Helmet>
        <title>Create Content | Risify</title>
      </Helmet>
      <Layout title="Create Content">
        <ContentGenerator />
      </Layout>
    </>
  );
};

export default ContentGeneratorPage;
