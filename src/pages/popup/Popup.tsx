import React, {useEffect, useState} from "react";
import "@pages/popup/Popup.css";
import useStorage from "@src/shared/hooks/useStorage";
import remoteUrlStorage from "@src/shared/storages/remoteUrlStorage";
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary";
import withSuspense from "@src/shared/hoc/withSuspense";

const Popup = () => {
  const remoteUrl = useStorage(remoteUrlStorage);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!remoteUrl) return;
    fetch(`${remoteUrl}api/auth/session`)
      .then((res) => res.json())
      .then((session) => setSession(session))
      .catch(console.error);
  }, [remoteUrl]);

  return <div className="App">
    <ul>
      <li>URL: <a href={remoteUrl} target="_blank" title="Remote server URL">{remoteUrl}</a></li>
      {session &&
        <li><img src={session.user.image} height={24} width={24} alt="User's avatar"/> Logged
          as {session.user.name} ({session.user.email})
        </li>}
    </ul>
  </div>;
};

export default withErrorBoundary(
  withSuspense(Popup, <div> Loading ... </div>),
  <div> Error Occur </div>,
);
