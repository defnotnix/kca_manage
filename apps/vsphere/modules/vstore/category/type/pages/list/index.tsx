"use client";

import React from "react";
//next

//mantine
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Menu,
  Paper,
  SimpleGrid,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { PageTabHeader } from "@vframework/ui";
import {
  DotsThreeVertical,
  Eye,
  GridFour,
  House,
  MagnifyingGlass,
  Pen,
  Plus,
  Table,
  Trash,
} from "@phosphor-icons/react";
import { ListHandler } from "@vframework/core";
import { configModule } from "../../module.config";
import { getRecords } from "../../module.api";
//mantine

//icons

//styles

//components

export function _List() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  const RenderData = () => {
    return (
      <>
        <Divider />

        <Paper
          px="md"
          py="xs"
          bg="linear-gradient(to right, var(--mantine-color-gray-0), var(--mantine-color-brand-0))"
        >
          <Grid gutter={0}>
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <TextInput
                leftSection={<MagnifyingGlass />}
                placeholder="Search"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Group justify="flex-end" gap={4}>
                <Button variant="light" leftSection={<GridFour />}>
                  Block View
                </Button>
                <Button variant="light" leftSection={<Table />}>
                  List View
                </Button>
                <Divider orientation="vertical" />
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>

        <Divider />

        <SimpleGrid cols={{ base: 2, lg: 5 }} px="md" py="xs" spacing="xs">
          <Paper withBorder>
            <Group justify="space-between" wrap="nowrap" p="md">
              <Group gap="xs" wrap="nowrap">
                <Avatar
                  p={4}
                  bg="gray.0"
                  src="https://down-my.img.susercontent.com/file/my-11134208-7r98v-lyyuutk4lkrkeb"
                />
                <Text size="sm">Laptops</Text>
              </Group>
              <Menu withArrow>
                <Menu.Target>
                  <ActionIcon variant="light">
                    <DotsThreeVertical weight="bold" />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<Pen />}>Edit</Menu.Item>
                  <Menu.Item leftSection={<Trash />}>Delete</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Paper>
        </SimpleGrid>
      </>
    );
  };

  // * ANIMATIONS

  return (
    <>
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
          <Anchor size="xs" c="gray.5" fw={600}>
            vStore
          </Anchor>
          <Anchor size="xs" c="gray.5" fw={600}>
            Categorization
          </Anchor>
          <Anchor size="xs" c="dark.9" fw={600}>
            Product Type
          </Anchor>
        </Breadcrumbs>

        <Space h="md" />
        <Group justify="space-between" align="flex-end">
          <div>
            <Text size="xl" fw={600}>
              Manage - Product Types
            </Text>
            <Text size="sm" opacity={0.5}>
              Manage product types and their attributes and properties.
            </Text>
          </div>

          <Group>
            <Button leftSection={<Plus />}>New Product Type</Button>
          </Group>
        </Group>
      </Paper>

      <ListHandler moduleKey={configModule.moduleKey} getRecords={getRecords}>
        <RenderData />
      </ListHandler>
    </>
  );
}
