"use client";

import React, { PropsWithChildren } from "react";
//next

//mantine
import {} from "@mantine/core";
import { AdminNavLayout } from "@vframework/ui";
import { navItemsVAuth, navModules } from "@/config/nav";
//mantine

//icons

//styles

//components

export function LayoutVAuth({ children }: PropsWithChildren) {
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
        navItems={navItemsVAuth}
      >
        {children}
      </AdminNavLayout>
    </>
  );
}
