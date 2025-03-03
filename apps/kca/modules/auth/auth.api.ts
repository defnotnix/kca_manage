import { apiDispatch } from "@vframework/core";

const endpoint = "/authenticate/login/";

export async function apiLogin(body: { username: string; password: string }) {
  return await apiDispatch.post({
    endpoint: endpoint,
    body,
  });
}
