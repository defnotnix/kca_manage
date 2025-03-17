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

export function LayouAdmin({ children }: PropsWithChildren) {
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
        essentials={
          <SimpleGrid cols={2} p="md" spacing={4}>
            <Tooltip {...tooltipStyles} label="Take Attendance">
              <Button
                color="brand"
                onClick={() => Router.push("/takeAttendance")}
                leftSection={<UserCheck size={16} />}
              >
                Att.
              </Button>
            </Tooltip>
            <Tooltip {...tooltipStyles} label="Take Perforrmance Measure">
              <Button
                color="brand"
                variant="light"
                c="indigo.3"
                onClick={() => Router.push("/takePerformance")}
                leftSection={<Cricket size={16} />}
              >
                Perf.
              </Button>
            </Tooltip>
            <Tooltip {...tooltipStyles} label="New Routine">
              <Button
                color="brand"
                variant="light"
                c="indigo.3"
                onClick={() => Router.push("/routines/new")}
                leftSection={<Calendar size={16} />}
              >
                Rout.
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
