import { Button, Form, Textbox, ThemeContextProvider } from "@minimalstuff/ui";
import { FALLBACK_URL } from "@root/src/constants";
import useStorage from "@src/shared/hooks/useStorage";
import remoteUrlStorage from "@src/shared/storages/remoteUrlStorage";
import React, { FormEvent, useState } from "react";

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
    <ThemeContextProvider>
      <h1>Options</h1>
      <Form onSubmit={handleSubmit} onReset={resetRemoteUrl}>
        <Textbox
          label="Remote server URL"
          name="remote-url"
          onChange={(_, value) => setNewRemoteUrl(value)}
          value={newRemoteUrl}
        />
        <div style={{ display: "flex", alignItems: "center", gap: ".35em" }}>
          <Button type="reset" onClick={resetRemoteUrl} secondary>
            reset url
          </Button>
          <Button type="submit">update</Button>
        </div>
        <p>current url: {remoteUrl}</p>
        <p>default url: {FALLBACK_URL}</p>
      </Form>
    </ThemeContextProvider>
  );
};

export default Options;
