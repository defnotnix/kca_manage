"use client";

import React, { PropsWithChildren } from "react";
//next

//mantine
import { ActionIcon, Button, SimpleGrid, Tooltip } from "@mantine/core";
import { AdminNavLayout } from "@vframework/ui";
import { navItems, navModules } from "@/config/nav";
import {
  Calendar,
  Cricket,
  Invoice,
  UserCheck,
  UserPlus,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
//mantine

//icons

//styles

//components

export function LayoutAdmin({ children }: PropsWithChildren) {
  // * DEFINITIONS

  const Router = useRouter();

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  const tooltipStyles = {
    label: {
      fontSize: "var(--mantine-font-size-xs)",
    },
  };

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
        //essentials
        essentials={<></>}
      >
        {children}
      </AdminNavLayout>
    </>
  );
}
