"use client";

import React from "react";
//next

//mantine
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
//mantine

//icons
import {
  CaretDown,
  GearSix,
  MagnifyingGlass,
  Plus,
  SlidersHorizontal,
} from "@phosphor-icons/react";
//styles

//components

//datatable
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { PropModuleTableLayout } from "./ModuleTableLayout.type";

export function ModuleTableLayout({
  // * Data
  columns = [],
}: PropModuleTableLayout) {
  // * DEFINITIONS

  // * CONTEXT

  const {
    state,
    dispatch,

    //table
    data,
    isLoading,
    isFetching,
    refetch,

    //search
    searchVal,
    setSearchVal,
  } = useListHandlerContext();
  const {
    search,
    filters,
    tabActive,
    selectedRecords,
    page,
    pageSize,
    totalPages,
  } = state;

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <Stack>
        <Box>
          <Group>
            <Text size="1.5rem">User Management</Text>
            <Badge variant="light">119</Badge>
          </Group>
          <Text size="sm" opacity={0.5}>
            Manage your organization's users, roles, and permissions.
          </Text>
        </Box>

        <Group justify="space-between">
          <Group gap="4px">
            <Button size="xs" variant="light">
              Tab 1
            </Button>
            <Button size="xs" variant="light">
              Tab 2
            </Button>
            <Button size="xs" variant="light">
              Tab 3
            </Button>
            <Button size="xs" variant="light">
              Tab 4
            </Button>
          </Group>

          <Group gap={4}>
            <TextInput
              rightSection={<MagnifyingGlass />}
              size="xs"
              placeholder="Search"
            />

            <Button
              leftSection={<SlidersHorizontal size={12} />}
              color="dark"
              variant="light"
              size="xs"
            >
              Filters
            </Button>

            <Button
              leftSection={<GearSix size={12} />}
              variant="light"
              color="dark"
              size="xs"
            >
              Customize
            </Button>

            <Button color="dark" variant="light" size="xs">
              Actions
            </Button>

            <ButtonGroup>
              <Button size="xs" leftSection={<Plus />}>
                Add User
              </Button>
              <Button size="xs" px="10" ml={1}>
                <CaretDown />
              </Button>
            </ButtonGroup>
          </Group>
        </Group>
      </Stack>

      <Divider my="xs" />

      <DataTable
        //Data
        columns={columns}
        records={[]}
      />
    </>
  );
}
