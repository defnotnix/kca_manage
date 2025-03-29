import { get, post, patch, del } from "../apiDispatch";
//apis

type PropGetRecords = {
  endpoint: string;
  searchValue?: string;
  page?: number;
  pageSize?: number;
  params?: any;
};

async function getRecords({
  endpoint,
  searchValue = "",
  page,
  pageSize,
  params,
  ...props
}: PropGetRecords) {
  const res: any = await get({
    endpoint,
    params: {
      page: page,
      page_size: pageSize,
      query: searchValue,
      ...params,
    },
  });
  return res.err ? [] : res.data;
}

async function getSingleRecord(endpoint: string, id: any): Promise<any> {
  const res: any = await get({
    endpoint: endpoint + id + "/",
  });
  return res.err ? [] : res.data;
}

async function createRecord(endpoint: string, body: any): Promise<any> {
  const isFormData = body instanceof FormData;
  console.log(isFormData);

  return await post({
    endpoint,
    body: body,
    headers: isFormData
      ? {}
      : {
          "Content-Type": "application/json",
        },
  });
}

// async function createJSONRecord(endpoint: string, body: any): Promise<any> {
//   return await post({
// endpoint,
//     body: body,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

async function editRecord(endpoint: string, body: any, id: any): Promise<any> {
  const isFormData = body instanceof FormData;

  return await patch({
    endpoint: endpoint + id + "/",
    body: body,
    headers: isFormData
      ? {}
      : {
          "Content-Type": "application/json",
        },
  });
}

async function deleteRecord(endpoint: string, body: any): Promise<any> {
  return await del({
    endpoint,
    id: body,
  });
}

export const moduleApiCall = {
  getRecords,
  getSingleRecord,
  createRecord,
  editRecord,
  deleteRecord,
  //   createJSONRecord,
};

export type { PropGetRecords };
