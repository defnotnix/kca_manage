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
import {
  ModuleTableLayout,
  PropModuleConfig,
  triggerNotification,
} from "@vframework/ui";
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

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Booking Management",
    },
    {
      label: "Booking Requests",
    },
  ],
  moduleKey: "vauth.booking.requests".split("."),
  endpoint: "/services/pending/booking/",
  //
  moduleTerm: "Booking Request",
  moduleTermPlural: "Booking Requests",
  moduleName: "Booking Request",
  moduleDescription:
    "A centralized portal for managing all player-related data and activities.",
};

export function _Req() {
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
        disableAdd
        {...moduleConfig}
        //Data
        columns={columns}
        extraActions={({ row }: { row: any }) => (
          <>
            <Menu.Item
              leftSection={<Check />}
              onClick={async () => {
                triggerNotification.form.isLoading({});
                await updateRecord(
                  {
                    id: row.id,
                    status: "1",
                  },
                  row.id
                )
                  .then((res) => {
                    console.log("ERRORMESSAGE", res);
                    if (res.err) {
                      triggerNotification.form.isError({
                        message:
                          "Time frame overlaps with Session. Pleases confirm with coach for shifting & verify",
                      });
                    } else {
                      triggerNotification.form.isSuccess({});
                      refetch();
                    }
                  })
                  .catch((err) => {
                    console.log("ERRORMESSAGE", err);
                  });
              }}
            >
              Accept Booking
            </Menu.Item>
            <Menu.Item
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
