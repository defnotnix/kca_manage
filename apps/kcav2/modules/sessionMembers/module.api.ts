import {apiDispatch, moduleApiCall} from "@vframework/core";
import {moduleConfig} from "./module.config";

const endpoint = moduleConfig.endpoint || "";

export const getRecords = (props: any) => moduleApiCall.getRecords({
    ...props,
    endpoint: props.endpoint + props?.params?.session_id
});
export const getSingleRecord = moduleApiCall.getSingleRecord;
export const createRecord = (body: any) =>
    moduleApiCall.createRecord(endpoint, body);
export const updateRecord = (body: any, id: any) => {
    console.log(body)
    moduleApiCall.editRecord(endpoint, body, id);
}
export const deleteRecord = (id: any) =>
    moduleApiCall.deleteRecord(endpoint, id);
