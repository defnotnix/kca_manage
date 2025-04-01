import { apiDispatch, moduleApiCall } from "@vframework/core";
import { moduleConfig } from "./module.config";

const endpoint = moduleConfig.endpoint || "";

export const getRecords = (props: any) =>
  moduleApiCall.getRecords({
    ...props,
    endpoint: "/billing/pending/invoice/",
  });
export const getStudentInvoices = (props: any) =>
  moduleApiCall.getRecords({
    ...props,
    endpoint: "/billing/player/invoice/",
  });

export const getPaymentLogs = (props: any) =>
  moduleApiCall.getRecords({
    ...props,
    endpoint: "/billing/invoice/print/",
  });

export const getSingleRecord = moduleApiCall.getSingleRecord;
export const createRecord = (body: any) =>
  moduleApiCall.createRecord("/billing/create/custom/invoice/", body);

export const createPrint = (body: any) =>
  moduleApiCall.createRecord("/billing/invoice/print/", body);

export const updateRecord = (body: any, id: any) =>
  moduleApiCall.editRecord(endpoint, body, id);
export const deleteRecord = (id: any) =>
  moduleApiCall.editRecord("/billing/cancel/invoice/", {}, id);
