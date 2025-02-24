import { apiDispatch, PropGetApiProps } from "@vframework/core";

const endpoint = "/users";

export const getRecords = async ({
  searchValue,
  page,
  pageSize,
  params,
}: PropGetApiProps) =>
  apiDispatch.get({
    endpoint,
    params: {},
  });
