import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorized Page">
      <h1 className="text-xl">Access Denied</h1>
      {message && <p className="mb-4 text-red-500">{message}</p>}
    </Layout>
  );
}
