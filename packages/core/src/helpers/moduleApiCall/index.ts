import { get, post, patch, del } from "../apiDispatch";
//apis

async function getRecords({
  endpoint,
  searchValue = "",
  page,
  pageSize,
  params,
  ...props
}: {
  endpoint: string;
  searchValue?: string;
  page?: number;
  pageSize?: number;
  params?: any;
}) {
  const res: any = await get({
    url: endpoint,
    params: {
      page_size: pageSize,
      ...params,
    },
  });
  return res.err ? [] : res.data;
}

async function getSingleRecord(endpoint: string, id: any): Promise<any> {
  const res: any = await get({
    url: endpoint + id + "/",
  });
  return res.err ? [] : res.data;
}

async function createRecord(endpoint: string, body: any): Promise<any> {
  const isFormData = body instanceof FormData;
  console.log(isFormData);

  return await post({
    url: endpoint,
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
//     url: endpoint,
//     body: body,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

async function editRecord(endpoint: string, body: any, id: any): Promise<any> {
  const isFormData = body instanceof FormData;

  return await patch({
    url: endpoint + id + "/",
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
    url: endpoint,
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
