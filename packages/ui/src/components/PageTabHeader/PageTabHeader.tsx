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
  Text,
  ThemeIcon,
} from "@mantine/core";
//mantine

//icons
import {
  ArrowLeft,
  Atom,
  CaretRight,
  DotsThreeVertical,
  Eraser,
  House,
  PlugsConnected,
  Plus,
  Star,
  Tabs,
  X,
} from "@phosphor-icons/react";

//styles

//components

export function PageTabHeader() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <Paper px={2}>
        <Group gap={"sm"} justify="space-between">
          <Group gap={2}>
            <ThemeIcon size={35} color="dark" variant="subtle">
              <Tabs />
            </ThemeIcon>

            <Button
              variant="white"
              rightSection={<X />}
              style={{
                borderEndStartRadius: 0,
                borderBottomRightRadius: 0,
                fontSize: "var(--mantine-font-size-xs)",
              }}
            >
              Manage Product Type
            </Button>

            <ActionIcon size={34} variant="subtle">
              <Plus />
            </ActionIcon>
          </Group>

          <Group gap={2}>
            <Text size="xs" mr="xs">
              {String(new Date()).substring(0, 15)}
            </Text>

            <Divider orientation="vertical" />

            <ActionIcon color="dark" size={35} variant="subtle">
              <House weight="duotone" />
            </ActionIcon>
          </Group>
        </Group>
      </Paper>
      <Divider />
    </>
  );
}
