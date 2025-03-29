import { apiDispatch, moduleApiCall } from "@vframework/core";
import { moduleConfig } from "./module.config";

const endpoint = moduleConfig.endpoint || "";

export const getRecords = moduleApiCall.getRecords;
export const getSingleRecord = (id: any) =>
  moduleApiCall.getSingleRecord(endpoint, id);
export const createRecord = (body: any) =>
  moduleApiCall.createRecord(endpoint, body);
export const updateRecord = (body: any, id: any) =>
  moduleApiCall.editRecord(endpoint, body, id);
export const deleteRecord = (id: any) =>
  moduleApiCall.deleteRecord(endpoint, id);

export const createInvoice = (body: any) =>
  moduleApiCall.createRecord("/billing/create/custom/invoice/", body);

export const checkInvoice = (id: any) =>
  moduleApiCall.getRecords({
    endpoint: "/billing/check/booking/invoice/",
    params: {
      booking_id: id,
    },
  });
