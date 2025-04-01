import { apiDispatch, moduleApiCall } from "@vframework/core";

const endpoint = "/players/attendance/bulk/";

export const getRecords = moduleApiCall.getRecords;
export const createRecord = (body: any) =>
  moduleApiCall.createRecord(endpoint, body);
