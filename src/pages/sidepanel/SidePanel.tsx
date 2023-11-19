import React from "react";
import "@pages/sidepanel/SidePanel.css";
import useStorage from "@src/shared/hooks/useStorage";
import withSuspense from "@src/shared/hoc/withSuspense";
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary";
import remoteUrlStorage from "@src/shared/storages/remoteUrlStorage";

const SidePanel = () => {
  const remoteUrl = useStorage(remoteUrlStorage);

  return (
    <iframe
      src={remoteUrl}
      title="MyLins app"
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default withErrorBoundary(
  withSuspense(SidePanel, <div> Loading ... </div>),
  <div> Error Occur </div>,
);
