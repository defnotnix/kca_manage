import { apiDispatch, moduleApiCall } from "@vframework/core";

export const getStats = () =>
  moduleApiCall.getRecords({
    endpoint: "/schedule/dashboard/",
  });
