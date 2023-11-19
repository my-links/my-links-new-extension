import React from "react";
import "@pages/popup/Popup.css";
import useStorage from "@src/shared/hooks/useStorage";
import remoteUrlStorage from "@src/shared/storages/remoteUrlStorage";
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary";
import withSuspense from "@src/shared/hoc/withSuspense";

const Popup = () => {
  const remoteUrl = useStorage(remoteUrlStorage);
  return <iframe src={remoteUrl} title="MyLins app" />;
};

export default withErrorBoundary(
  withSuspense(Popup, <div> Loading ... </div>),
  <div> Error Occur </div>,
);
