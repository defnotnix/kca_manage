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
} from "@mantine/core";
import { ListHandler } from "@vframework/core";
import { ModuleTableLayout } from "@vframework/ui";
import { columns } from "./list.columns";

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
  PlugsConnected,
  Star,
} from "@phosphor-icons/react";

export function _List() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <Paper pb={4} px="md" bg="gray.0">
        <Group justify="space-between">
          <Group>
            <ActionIcon size="sm" variant="light">
              <ArrowLeft />
            </ActionIcon>

            <Breadcrumbs
              separatorMargin={6}
              separator={<CaretRight size={12} />}
            >
              <Atom />
              <Anchor size="xs" c="dark.9">
                vAuth
              </Anchor>
              <Anchor size="xs" c="dark.9">
                Users
              </Anchor>
            </Breadcrumbs>
          </Group>

          <Group gap={0}>
            <Button variant="light">Add new tab</Button>
            <ActionIcon size={36} variant="subtle" color="dark">
              <Star weight="duotone" />
            </ActionIcon>
            <ActionIcon size={36} variant="subtle" color="dark">
              <PlugsConnected weight="duotone" />
            </ActionIcon>
            <ActionIcon size={36} variant="subtle" color="dark">
              <DotsThreeVertical weight="bold" />
            </ActionIcon>
          </Group>
        </Group>
      </Paper>

      <Divider />

      <section
        style={{
          padding: "var(--mantine-spacing-md)",
        }}
      >
        <ListHandler
          moduleKey={["vauth", "users"]}
          //enableServerPagination
          //enableServerSearch
          getRecords={getRecords}
          dataKey="users"
        >
          <ModuleTableLayout
            //Data
            columns={columns}
            //styles
            rowStyle={({ gender }: any) => {
              switch (gender) {
                case "male":
                  return {
                    background: "var(--mantine-color-indigo-0)",
                  };

                default:
                  return {};
              }
            }}
          />
        </ListHandler>
      </section>
    </>
  );
}
