"use client";

import React from "react";
//next

//mantine
import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Button,
  Divider,
  Group,
  Paper,
  Space,
  Text,
} from "@mantine/core";
import { ListHandler } from "@vframework/core";
import { ModuleTableLayout } from "@vframework/ui";

//mantine

//icons

//styles

//components

//api
import { getRecords } from "../../module.api";
import {
  ArrowLeft,
  Atom,
  CaretRight,
  DotsThreeVertical,
  House,
  PlugsConnected,
  Plus,
  Star,
} from "@phosphor-icons/react";
import { moduleConfig } from "../../module.config";

const bread = [
  {
    label: "KCA Admin",
  },
  {
    label: "Booking Management",
  },
  {
    label: "Calendar View",
  },
];

export function _Calendar() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <ListHandler
        endpoint={moduleConfig.endpoint}
        moduleKey={moduleConfig.moduleKey}
        //enableServerPagination
        //enableServerSearch
        getRecords={getRecords}
        dataKey="users"
      >
        <Paper
          px="md"
          pt="md"
          pb="lg"
          bg="linear-gradient(to right, var(--mantine-color-gray-0), var(--mantine-color-brand-0))"
        >
          <Breadcrumbs
            separatorMargin={4}
            separator={
              <Text size="xs" c="gray.5">
                /
              </Text>
            }
          >
            <House
              weight="duotone"
              size={12}
              color="var(--mantine-color-brand-5)"
            />
            {bread.map((breadinfo: any, index: number) => (
              <Anchor
                size="xs"
                c={index == bread.length - 1 ? "dark.9" : "gray.5"}
                fw={600}
                key={index}
              >
                {breadinfo.label}
              </Anchor>
            ))}
          </Breadcrumbs>

          <Space h="md" />
          <Group justify="space-between" align="flex-end">
            <Group gap="sm">
              <div>
                <Text size="xl" fw={600}>
                  Booking View
                </Text>
                <Text size="sm" opacity={0.5}>
                  Review bookings for the current month
                </Text>
              </div>
            </Group>
          </Group>
        </Paper>
      </ListHandler>
    </>
  );
}
