"use client";

import React, { PropsWithChildren } from "react";
//next

//mantine
import { ActionIcon, Button, SimpleGrid, Tooltip } from "@mantine/core";
import { AdminNavLayout } from "@vframework/ui";
import { navItems, navModules } from "@/config/nav";
import { Invoice, UserCheck, UserPlus } from "@phosphor-icons/react";
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
        essentials={
          <SimpleGrid cols={3} p="md" spacing={4}>
            <Tooltip {...tooltipStyles} label="Take Attendance">
              <Button variant="light" bg="rgba(255,255,255,.15)" c="gray.0">
                <UserCheck size={16} />
              </Button>
            </Tooltip>
            <Tooltip {...tooltipStyles} label="Take Perforrmance Measure">
              <Button variant="light" bg="rgba(255,255,255,.15)" c="gray.0">
                <UserPlus size={16} />
              </Button>
            </Tooltip>
            <Tooltip {...tooltipStyles} label="New Invoice">
              <Button variant="light" bg="rgba(255,255,255,.15)" c="gray.0">
                <Invoice size={16} />
              </Button>
            </Tooltip>
          </SimpleGrid>
        }
      >
        {children}
      </AdminNavLayout>
    </>
  );
}
