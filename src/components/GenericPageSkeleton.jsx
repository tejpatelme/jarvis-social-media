import React from "react";
import LoadingShimmer from "./LoadingShimmer";

export default function GenericPageSkeleton() {
  console.log("rendered");

  return (
    <div className="p-4 space-y-4">
      <LoadingShimmer height="60px" />
      <LoadingShimmer height="54px" />
      <LoadingShimmer height="140px" />
      <LoadingShimmer height="116px" />
      <LoadingShimmer height="116px" />
    </div>
  );
}
