"use client";

import React from "react";
//next

//mantine
import { AppShell } from "@mantine/core";
//mantine

//icons

//styles
import cx from "clsx";
import classes from "./AdminNavLayout.module.css";
import "mantine-datatable/styles.layer.css";

//components
import { _AdminNavLayoutSidenav } from "./components/Sidenav/AdminNav.Sidenav";
//contexts
import { AdminNavLayoutProvider } from "./AdminNavLayout.context";
//prop
import { PropAdminNavLayout } from "./AdminNavLayout.type";

export function AdminNavLayout({
  // Sidenav
  navModules = [],
  navItems = [],

  //Styles
  classNames = {},
  //content
  children,
}: PropAdminNavLayout) {
  // * DEFINITIONS

  // * PRESTATES

  // * CONTEXTS

  // * STATES

  // * FUNCTIONS

  // * COMPONENTS

  return (
    <AdminNavLayoutProvider>
      <AppShell
        className={cx(classes.root, classNames?.root)}
        navbar={{
          breakpoint: "sm",
          width: 260,
        }}
      >
        <_AdminNavLayoutSidenav navModules={navModules} navItems={navItems} />
        <AppShell.Main
          style={{
            background: "none",
            height: "100vh",
            paddingTop: 4,
            paddingRight: 4,
          }}
          pos="relative"
        >
          {children}
        </AppShell.Main>
      </AppShell>
    </AdminNavLayoutProvider>
  );
}
