
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import ContentAnalytics from "@/components/content-analytics/ContentAnalytics";

const ContentAnalyticsPage = () => {
  return (
    <>
      <Helmet>
        <title>Content Analytics | Risify</title>
      </Helmet>
      <Layout title="Content Analytics">
        <ContentAnalytics />
      </Layout>
    </>
  );
};

export default ContentAnalyticsPage;
