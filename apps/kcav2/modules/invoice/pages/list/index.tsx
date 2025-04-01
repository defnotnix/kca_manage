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
import { Clock, FilePdf, Invoice, Money } from "@phosphor-icons/react";
import { moduleConfig } from "../../module.config";

import { _Form as Form } from "../../form/form";
import { formProps } from "../../form/form.config";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { InvoicePayments } from "./payments";
import { InvoicePrintings } from "./printlogs";
import { useQueryClient } from "@tanstack/react-query";

export function _List() {
  const Router = useRouter();

  const [openPayments, handlerPayments] = useDisclosure(false);
  const [openPrintings, handlersPrintings] = useDisclosure(false);

  const query = useQueryClient();

  const [active, setActive] = useState(null);

  return (
    <>
      <ListHandler
        endpoint={moduleConfig.endpoint}
        moduleKey={moduleConfig.moduleKey}
        getRecords={getRecords}
        enableServerSearch
        enableServerPagination
      >
        <ModuleTableLayout
          hasServerSearch
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
                  Router.push(`/invoices/${row.id}`);
                }}
                leftSection={<FilePdf />}
              >
                Show Document
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  handlerPayments.open();
                  setActive(row);
                }}
                leftSection={<Money />}
              >
                Payments
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  handlersPrintings.open();
                  setActive(row);
                }}
                leftSection={<Clock />}
              >
                Print Logs
              </Menu.Item>
            </>
          )}
          // * MODAL CONFIG
          hasModalForms
          modalFormProps={{ width: "xl", formProps }}
          modalForm={<Form />}
        />
      </ListHandler>

      <Modal
        size={"lg"}
        opened={openPayments}
        onClose={() => {
          setActive(null);
          //@ts-ignore
          query.invalidateQueries(moduleConfig?.moduleKey);
          handlerPayments.close();
        }}
        title={
          <Text tt="uppercase" size="xs" fw={700}>
            Manage Session Players
          </Text>
        }
      >
        <InvoicePayments active={active} />
      </Modal>

      <Modal
        size={"lg"}
        opened={openPrintings}
        onClose={() => {
          setActive(null);
          handlersPrintings.close();
        }}
        title={
          <Text tt="uppercase" size="xs" fw={700}>
            Manage Session Players
          </Text>
        }
      >
        <InvoicePrintings active={active} />
      </Modal>
    </>
  );
}
