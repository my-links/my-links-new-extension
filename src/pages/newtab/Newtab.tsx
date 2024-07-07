import "@pages/newtab/Newtab.scss";
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary";
import withSuspense from "@src/shared/hoc/withSuspense";
import useStorage from "@src/shared/hooks/useStorage";
import remoteUrlStorage from "@src/shared/storages/remoteUrlStorage";

function Newtab() {
  const remoteUrl = useStorage(remoteUrlStorage);
  return (
    <iframe
      src={`${remoteUrl}?rndstr=${Date.now()}`}
      title="MyLins app"
      style={{ height: "100%", width: "100%" }}
    />
  );
}

export default withErrorBoundary(
  withSuspense(Newtab, <div> Loading ... </div>),
  <div> Error Occur </div>,
);
