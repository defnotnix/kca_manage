"use client";

import React, { PropsWithChildren } from "react";
//next

//mantine
import {
  ActionIcon,
  Button,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { AdminNavLayout, triggerNotification } from "@vframework/ui";
import { navItems, navModules } from "@/config/nav";
import {
  Calendar,
  CaretRight,
  Cricket,
  UserCheck,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { moduleApiCall } from "@vframework/core";
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
        onLogout={() => {
          triggerNotification.form.isLoading({
            message: "Signin Out",
          });
          moduleApiCall
            .createRecord("/authenticate/logout/", {})
            .then((res) => {
              triggerNotification.form.isSuccess({
                message: "You have signed out successfully!",
              });
              if (!res.err) {
                sessionStorage.clear();
                Router.push("/");
              }
            });
        }}
        softwareInfo={{
          org: "KCA Admin",
          module: "KCA Management",
          moduleDescription: "Management Portal designed for KCA",
        }}
        //navitems
        navItems={navItems}
        //essentials
        essentials={
          <>
            <Stack gap={2} p="md">
              <Button
                px="xs"
                justify="space-between"
                bg="indigo.9"
                rightSection={<CaretRight />}
                onClick={() => Router.push("/takeAttendance")}
              >
                <UserCheck />{" "}
                <span
                  style={{
                    marginLeft: 8,
                  }}
                >
                  Take Attendance
                </span>
              </Button>
              <Button
                px="xs"
                justify="space-between"
                bg="teal.9"
                rightSection={<CaretRight />}
                onClick={() => Router.push("/takePerformance")}
              >
                <Cricket />{" "}
                <span
                  style={{
                    marginLeft: 8,
                  }}
                >
                  Take Performance Metric
                </span>
              </Button>
              <Button
                px="xs"
                justify="space-between"
                bg="orange.9"
                rightSection={<CaretRight />}
                onClick={() => Router.push("/bookings/new")}
              >
                <Calendar />{" "}
                <span
                  style={{
                    marginLeft: 8,
                  }}
                >
                  New Booking
                </span>
              </Button>
            </Stack>
          </>
        }
      >
        {children}
      </AdminNavLayout>
    </>
  );
}
