import React from "react";
import "@pages/panel/Panel.css";
import useStorage from "@src/shared/hooks/useStorage";
import remoteUrlStorage from "@src/shared/storages/remoteUrlStorage";

const Panel: React.FC = () => {
  const remoteUrl = useStorage(remoteUrlStorage);
  return (
    <iframe
      src={remoteUrl}
      title="MyLins app"
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default Panel;
