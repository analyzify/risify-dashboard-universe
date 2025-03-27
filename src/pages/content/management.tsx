
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import ContentManagement from "@/components/content-management/ContentManagement";

const ContentManagementPage = () => {
  return (
    <>
      <Helmet>
        <title>CMS | Risify</title>
      </Helmet>
      <Layout title="CMS">
        <ContentManagement />
      </Layout>
    </>
  );
};

export default ContentManagementPage;
