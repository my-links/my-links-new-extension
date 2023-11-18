import {BaseStorage, createStorage, StorageType,} from "@src/shared/storages/base";

type RemoteUrlStorage = BaseStorage<string> & {
  set: (remoteUrl: string) => void;
};

const FALLBACK_URL = 'https://www.mylinks.app/'

const storage = createStorage<string>("remote-url-key", FALLBACK_URL, {
  storageType: StorageType.Local,
});

const remoteUrlStorage: RemoteUrlStorage = {
  ...storage,
  set: (remoteUrl: string) => storage.set(remoteUrl)
};

export default remoteUrlStorage;
