import React, { FormEvent, useState } from "react";
import "@pages/options/Options.css";
import useStorage from "@src/shared/hooks/useStorage";
import remoteUrlStorage from "@src/shared/storages/remoteUrlStorage";
import { FALLBACK_URL } from "@src/contants";

const Options: React.FC = () => {
  const remoteUrl = useStorage(remoteUrlStorage);
  const [newRemoteUrl, setNewRemoteUrl] = useState<string>(remoteUrl);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    remoteUrlStorage.set(newRemoteUrl);
  }

  function resetRemoteUrl() {
    remoteUrlStorage.set(FALLBACK_URL);
    setNewRemoteUrl(FALLBACK_URL);
  }

  return (
    <div className="container">
      <h1>Options</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="remote-url">Remote server URL</label>
          <input
            type="text"
            name="remote-url"
            id="remote-url"
            onChange={(event) => setNewRemoteUrl(event.target.value)}
            value={newRemoteUrl}
          />
        </div>
        <button type="submit">update</button>
        <button type="button" onClick={resetRemoteUrl}>
          reset url
        </button>
        <p>current url: {remoteUrl}</p>
        <p>default url: {FALLBACK_URL}</p>
      </form>
    </div>
  );
};

export default Options;
