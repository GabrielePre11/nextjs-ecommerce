import SearchProductPage from "@/components/Search";
import React, { Suspense } from "react";
import Loader from "../ui/Loader";

export default function SearchPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchProductPage />
    </Suspense>
  );
}
