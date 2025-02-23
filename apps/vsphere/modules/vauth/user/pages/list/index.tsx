"use client";

import React from "react";
//next

//mantine
import {} from "@mantine/core";
import { ListHandler, useListHandlerContext } from "@vframework/core";
import { ModuleTableLayout } from "@vframework/ui";
import { columns } from "./list.columns";
//mantine

//icons

//styles

//components

export function _List() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <section
        style={{
          padding: "var(--mantine-spacing-md)",
        }}
      >
        <ListHandler
          //enableServerPagination
          //enableServerSearch
          api={async () => {
            return [];
          }}
        >
          <ModuleTableLayout
            //Data
            columns={columns}
          />
        </ListHandler>
      </section>
    </>
  );
}
