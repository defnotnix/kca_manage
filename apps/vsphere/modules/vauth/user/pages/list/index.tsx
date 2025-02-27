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
  Paper,
  Space,
  Text,
} from "@mantine/core";
import { ListHandler } from "@vframework/core";
import { ModuleTableLayout } from "@vframework/ui";
import { columns } from "./list.columns";

//mantine

//icons

//styles

//components

//api
import { getRecords } from "../../module.api";
import {
  ArrowLeft,
  Atom,
  CaretRight,
  DotsThreeVertical,
  House,
  PlugsConnected,
  Plus,
  Star,
} from "@phosphor-icons/react";

export function _List() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <ListHandler
        moduleKey={["vauth", "users"]}
        //enableServerPagination
        //enableServerSearch
        getRecords={getRecords}
        dataKey="users"
      >
        <ModuleTableLayout
          //Data
          columns={columns}
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
      </ListHandler>
    </>
  );
}
