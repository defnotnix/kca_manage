"use client";

import React from "react";
//next

//mantine
import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Button,
  Divider,
  Group,
  Menu,
  Paper,
  Space,
  Text,
} from "@mantine/core";
import { ListHandler, useListHandlerContext } from "@vframework/core";
import { ModuleTableLayout, triggerNotification } from "@vframework/ui";
import { columns } from "./list.columns";

//mantine

//icons

//styles

//components

//api
import { getRecords, updateRecord } from "../../module.api";
import {
  ArrowLeft,
  Atom,
  CaretRight,
  Check,
  DotsThreeVertical,
  House,
  PlugsConnected,
  Plus,
  Star,
  Trash,
} from "@phosphor-icons/react";
import { moduleConfig } from "../../module.config";

export function _List() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  const RenderTable = () => {
    const { refetch } = useListHandlerContext();
    return (
      <ModuleTableLayout
        {...moduleConfig}
        //Data
        columns={columns}
        extraActions={({ row }: { row: any }) => (
          <>
            <Menu.Item
              disabled={row.status == "1"}
              leftSection={<Check />}
              onClick={async () => {
                triggerNotification.form.isLoading({});
                const res = await updateRecord(
                  {
                    id: row.id,
                    status: "1",
                  },
                  row.id
                ).then((res) => {
                  if (res.err) {
                    triggerNotification.form.isError({
                      message:
                        "Time frame overlaps with Session. Pleases confirm with coach for shifting & verify",
                    });
                  } else {
                    triggerNotification.form.isSuccess({});
                    refetch();
                  }
                });
              }}
            >
              Accept Booking
            </Menu.Item>
            <Menu.Item
              disabled={row.status == "3"}
              leftSection={<Check />}
              onClick={async () => {
                triggerNotification.form.isLoading({});
                await updateRecord(
                  {
                    id: row.id,
                    status: "3",
                  },
                  row.id
                ).then((res) => {
                  if (res.err) {
                    triggerNotification.form.isError({});
                  } else {
                    triggerNotification.form.isSuccess({});
                    refetch();
                  }
                });
              }}
            >
              Set to Pending
            </Menu.Item>
            <Menu.Item
              disabled={row.status == "2"}
              leftSection={<Trash />}
              onClick={() => {
                triggerNotification.form.isLoading({});
                updateRecord(
                  {
                    id: row.id,
                    status: "2",
                  },
                  row.id
                ).then((res) => {
                  if (res.err) {
                    triggerNotification.form.isError({});
                  } else {
                    triggerNotification.form.isSuccess({});
                    refetch();
                  }
                });
              }}
            >
              Reject Booking
            </Menu.Item>
          </>
        )}
        //styles
        rowStyle={({ gender }: any) => {
          switch (gender) {
            case "male":
              return {
                background: "var(--mantine-color-indigo-0)",
              };

            default:
              return {};
          }
        }}
      />
    );
  };

  return (
    <>
      <ListHandler
        endpoint={moduleConfig.endpoint}
        moduleKey={moduleConfig.moduleKey}
        //enableServerPagination
        //enableServerSearch
        getRecords={getRecords}
      >
        <RenderTable />
      </ListHandler>
    </>
  );
}
