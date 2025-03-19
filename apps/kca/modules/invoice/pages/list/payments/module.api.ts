import { apiDispatch, moduleApiCall } from "@vframework/core";

const endpoint = "/billing/payment/";

export const getRecords = moduleApiCall.getRecords;
export const getSingleRecord = moduleApiCall.getSingleRecord;
export const createRecord = (body: any) =>
  moduleApiCall.createRecord(endpoint, body);
export const updateRecord = (body: any, id: any) =>
  moduleApiCall.editRecord(endpoint, body, id);
export const deleteRecord = (id: any) =>
  moduleApiCall.deleteRecord(endpoint, id);
