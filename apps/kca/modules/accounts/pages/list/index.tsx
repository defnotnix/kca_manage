"use client";

import { ModuleTableLayout } from "@vframework/ui";
import { useRouter } from "next/navigation";
import { ListHandler } from "@vframework/core";
import {
  createRecord,
  deleteRecord,
  updateRecord,
  getRecords,
} from "../../module.api";
import { columns } from "./list.columns";
import { ActionIcon, Space } from "@mantine/core";
import { Invoice } from "@phosphor-icons/react";
import { moduleConfig } from "../../module.config";

import { _Form as Form } from "../../form/form";
import { formProps } from "../../form/form.config";

export function _List() {
  const router = useRouter();

  return (
    <>
      <ListHandler
        endpoint={moduleConfig.endpoint}
        moduleKey={moduleConfig.moduleKey}
        getRecords={getRecords}
        dataKey="users"
      >
        <ModuleTableLayout
          {...moduleConfig}
          idAccessor="id"
          apiEdit={updateRecord}
          apiCreate={createRecord}
          apiDelete={deleteRecord}
          columns={columns}
          // * TABS
          tabs={[
            { label: "All Records", count: 3344 },
            { label: "Active", count: 2233 },
            { label: "Inactive" },
          ]}
          // * TABLE PROPS
          //tableprops={{ height: "calc(100vh - 200px)" }}
          // * ROW COLORS
          rowStyle={({ gender }: any) => ({
            background:
              gender === "male" ? "var(--mantine-color-indigo-0)" : "",
          })}
          // * EXTRA ACTIONS

          // * MODAL CONFIG
          hasModalForms
          modalFormProps={{ width: "xl", formProps }}
          modalForm={<Form />}
        />
      </ListHandler>
    </>
  );
}
