import { apiDispatch, moduleApiCall, PropGetApiProps } from "@vframework/core";

const endpoint = "/attendance";

export const createRecord = (body: any) =>
  moduleApiCall.createRecord(endpoint, body);
