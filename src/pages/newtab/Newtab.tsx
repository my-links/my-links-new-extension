import React from "react";
import "@pages/newtab/Newtab.scss";
import withSuspense from "@src/shared/hoc/withSuspense";
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary";
import useStorage from "@src/shared/hooks/useStorage";
import remoteUrlStorage from "@src/shared/storages/remoteUrlStorage";

const Newtab = () => {
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
  withSuspense(Newtab, <div> Loading ... </div>),
  <div> Error Occur </div>,
);
