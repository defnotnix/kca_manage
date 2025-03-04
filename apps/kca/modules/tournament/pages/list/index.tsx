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
import { ActionIcon, Menu, Modal, Space, Text } from "@mantine/core";
import { Invoice, Users } from "@phosphor-icons/react";
import { moduleConfig } from "../../module.config";

import { _Form as Form } from "../../form/form";
import { formProps } from "../../form/form.config";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { _FormPlayer } from "../../form/players/form";

export function _List() {
  const router = useRouter();

  const [openFormModalPlayer, handlersFormModalPlayer] = useDisclosure(false);
  const [active, setActive] = useState(null);

  return (
    <>
      <ListHandler
        endpoint={moduleConfig.endpoint}
        moduleKey={moduleConfig.moduleKey}
        getRecords={getRecords}
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
          extraActions={({ row }: { row: any }) => (
            <>
              <Menu.Item
                onClick={() => {
                  setActive(row);
                  handlersFormModalPlayer.open();
                }}
                leftSection={<Users />}
              >
                Manage Players
              </Menu.Item>
            </>
          )}
          // * MODAL CONFIG
          hasModalForms
          modalFormProps={{ width: "lg", formProps }}
          modalForm={<Form />}
          // tableprops
        />
      </ListHandler>

      <Modal
        size={"lg"}
        opened={openFormModalPlayer}
        onClose={() => {
          setActive(null);
          handlersFormModalPlayer.close();
        }}
        title={
          <Text tt="uppercase" size="xs" fw={700}>
            Manage Session Players
          </Text>
        }
      >
        <_FormPlayer active={active} />
      </Modal>
    </>
  );
}
