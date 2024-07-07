import {
  BaseStorage,
  createStorage,
  StorageType,
} from "@src/shared/storages/base";
import { FALLBACK_URL } from "@root/src/constants";

type RemoteUrlStorage = BaseStorage<string> & {
  set: (remoteUrl: string) => void;
};

const storage = createStorage<string>("remote-url-key", FALLBACK_URL, {
  storageType: StorageType.Local,
});

const remoteUrlStorage: RemoteUrlStorage = {
  ...storage,
  set: (remoteUrl: string) =>
    storage.set(remoteUrl.endsWith("/") ? remoteUrl : remoteUrl + "/"),
};

export default remoteUrlStorage;
