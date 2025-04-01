"use client";

import React from "react";
//next

//mantine
import { AppShell, ScrollArea } from "@mantine/core";
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
  softwareInfo,
  // Sidenav
  navModules,
  navItems = [],
  //Styles
  classNames = {},
  //essentials
  essentials,
  onLogout,
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
        <_AdminNavLayoutSidenav
          softwareInfo={softwareInfo}
          navModules={navModules}
          navItems={navItems}
          essentials={essentials}
          onLogout={onLogout}
        />
        <AppShell.Main
          mt={{ base: 60, lg: 0 }}
          style={{
            background: "none",
            height: "100vh",
            paddingTop: 4,
            paddingRight: 4,
          }}
          pos="relative"
        >
          <ScrollArea
            style={{
              height: "calc(100vh - 8px)",
              background: "var(--mantine-color-gray-0)",
              borderRadius: "var(--mantine-radius-md)",
              overflowX: "hidden",
            }}
          >
            {children}
          </ScrollArea>
        </AppShell.Main>
      </AppShell>
    </AdminNavLayoutProvider>
  );
}
