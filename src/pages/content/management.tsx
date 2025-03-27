
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import ContentManagement from "@/components/content-management/ContentManagement";

const ContentManagementPage = () => {
  return (
    <>
      <Helmet>
        <title>Content Management | Risify</title>
      </Helmet>
      <Layout title="Content Management">
        <ContentManagement />
      </Layout>
    </>
  );
};

export default ContentManagementPage;
