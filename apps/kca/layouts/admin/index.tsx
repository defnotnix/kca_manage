"use client";

import React, { PropsWithChildren } from "react";
//next

//mantine
import {} from "@mantine/core";
import { AdminNavLayout } from "@vframework/ui";
import { navItems, navModules } from "@/config/nav";
//mantine

//icons

//styles

//components

export function LayouAdmin({ children }: PropsWithChildren) {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <AdminNavLayout
        softwareInfo={{
          org: "KCA Admin",
          module: "KCA Management",
          moduleDescription: "Management Portal designed for KCA",
        }}
        //navitems
        navItems={navItems}
      >
        {children}
      </AdminNavLayout>
    </>
  );
}
