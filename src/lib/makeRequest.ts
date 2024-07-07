import remoteUrlStorage from "@src/shared/storages/remoteUrlStorage";

export async function makeRequest<T>({
  method = "GET",
  path = "",
  body,
}: {
  method?: RequestInit["method"];
  path: string;
  body?: object | never[];
}): Promise<T> {
  const newPath = path.startsWith("/") ? path.substring(1) : path;
  const remoteUrl = await remoteUrlStorage.get();
  const { origin } = new URL(remoteUrl);

  if (method === "GET" && !!body) {
    console.warn("GET request should not contain body");
  }

  const request = await fetch(
    origin + (!newPath.startsWith("/") ? `/${newPath}` : newPath),
    {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await request.json();
  return request.ok
    ? data
    : Promise.reject(data?.error || "Something went wrong");
}
