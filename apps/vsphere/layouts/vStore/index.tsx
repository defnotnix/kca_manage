"use client";

import React, { PropsWithChildren } from "react";
//next

//mantine
import {} from "@mantine/core";
import { AdminNavLayout } from "@vframework/ui";
import { navItems, navItemsVStore, navModules } from "@/config/nav";
//mantine

//icons

//styles

//components

export function LayoutVStore({ children }: PropsWithChildren) {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <AdminNavLayout
        moduleLabel="v.Store"
        moduleDescription="Management Store & eCommerce."
        //navitems
        navModules={navModules}
        navItems={navItemsVStore}
      >
        {children}
      </AdminNavLayout>
    </>
  );
}
