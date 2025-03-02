"use client";

import { ModuleModalFormLayout, ModuleTableLayout } from "@vframework/ui";
import { useParams, useRouter } from "next/navigation";
import { FormHandler, ListHandler } from "@vframework/core";
import {
  createRecord,
  deleteRecord,
  updateRecord,
  getRecords,
} from "../../module.api";

import { columns } from "./list.columns";
import {
  ActionIcon,
  LoadingOverlay,
  Menu,
  Modal,
  Space,
  Text,
} from "@mantine/core";
import { Chair, Check, Invoice, UserPlus, Users } from "@phosphor-icons/react";
import { moduleConfig } from "../../module.config";

import { _Form as Form } from "../../form/form";
import { _FormEdit as FormEdit } from "../../form/form.edit";
import { formProps } from "../../form/form.config";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export function _List() {
  const router = useRouter();
  const Params = useParams();

  // * State

  return (
    <>
      <ListHandler
        endpoint={moduleConfig.endpoint}
        moduleKey={moduleConfig.moduleKey}
        getRecords={getRecords}
        getParams={{
          team_id: Params.id,
        }}
      >
        <ModuleTableLayout
          {...moduleConfig}
          idAccessor="id"
          apiEdit={updateRecord}
          onEditTrigger={(row) => {
            return {
              ...row,
              player: String(row.player?.id),
            };
          }}
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
          modalFormProps={{ width: "lg", formProps }}
          modalForm={<Form />}
          modalEdit={<FormEdit />}
        />
      </ListHandler>
    </>
  );
}
