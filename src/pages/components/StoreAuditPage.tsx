
import React from "react";
import Layout from "@/components/Layout";
import StoreAuditDashboard from "@/components/store-audit/StoreAuditDashboard";
import { ComponentActivationProvider } from "@/hooks/useComponentActivation";

const StoreAuditPage = () => {
  return (
    <ComponentActivationProvider>
      <Layout title="Store Audit">
        <StoreAuditDashboard />
      </Layout>
    </ComponentActivationProvider>
  );
};

export default StoreAuditPage;
