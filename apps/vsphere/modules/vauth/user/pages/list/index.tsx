"use client";

import React from "react";
//next

//mantine
import {} from "@mantine/core";
import { ListHandler } from "@vframework/core";
import { ModuleTableLayout } from "@vframework/ui";
import { columns } from "./list.columns";

//mantine

//icons

//styles

//components

//api
import { getRecords } from "../../module.api";

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
      </section>
    </>
  );
}
