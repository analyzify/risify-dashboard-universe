
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import Dashboard from "@/components/knowledge-base/Dashboard";

const KnowledgeBasePage = () => {
  return (
    <>
      <Helmet>
        <title>AI Knowledge Base | Risify</title>
      </Helmet>
      <Layout title="AI Knowledge Base">
        <Dashboard />
      </Layout>
    </>
  );
};

export default KnowledgeBasePage;
