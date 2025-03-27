
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import SetupWizard from "@/components/knowledge-base/SetupWizard";

const SetupPage = () => {
  return (
    <>
      <Helmet>
        <title>Setup Knowledge Base | Risify</title>
      </Helmet>
      <Layout title="Knowledge Base Setup">
        <SetupWizard />
      </Layout>
    </>
  );
};

export default SetupPage;
