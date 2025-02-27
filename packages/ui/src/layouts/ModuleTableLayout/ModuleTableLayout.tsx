"use client";

import React, { useEffect, useState } from "react";
//next

//mantine
import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Divider,
  Group,
  HoverCard,
  Menu,
  Paper,
  Space,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
//mantine

//icons
import {
  ArrowsClockwise,
  CaretDown,
  Check,
  DotsThree,
  DotsThreeVertical,
  Export,
  Eye,
  GearSix,
  House,
  MagnifyingGlass,
  PaintBucket,
  Pen,
  Plus,
  SlidersHorizontal,
  Trash,
} from "@phosphor-icons/react";
//styles

//components

//datatable
import { DataTable, DataTableSortStatus } from "mantine-datatable";
//context
import { useListHandlerContext } from "@vframework/core";
//func
import sortBy from "lodash/sortBy";
//type
import { PropModuleTableLayout } from "./ModuleTableLayout.type";

export function ModuleTableLayout({
  //Data
  idAccessor = "id",
  columns = [],
  //Server
  hasServerSearch = false,
  //styling
  rowColor,
  rowBackgroundColor,
  rowStyle,
  //pagination
  pageSizes = [20, 35, 50],
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
  const [records, setRecords] = useState<any[]>([]);

  const [enableRowStyle, setEnableRowStyle] = useState(false);

  // > SORTING

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<any>>({
    columnAccessor: "name",
    direction: "asc",
  });

  // * FUNCTIONS

  useEffect(() => {
    if (!hasServerSearch) {
      const _data = sortBy(data, sortStatus.columnAccessor);
      setRecords(sortStatus.direction === "desc" ? _data.reverse() : _data);
    } else {
      setRecords(data);
    }
  }, [data, sortStatus]);

  // * COMPONENTS

  const tableActions = [
    {
      accessor: "ax",
      title: "Actions",
      width: 50,
      textAliigh: "right",
      render: (row: any) => (
        <Menu position="bottom-end" shadow="md" withArrow>
          <Menu.Target>
            <ActionIcon variant="subtle">
              <DotsThreeVertical weight="bold" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown w={150}>
            <Menu.Item
              leftSection={<Eye weight="duotone" />}
              onClick={() => {}}
            >
              User Profile
            </Menu.Item>
            <Menu.Item
              color="brand"
              leftSection={<Pen weight="duotone" />}
              onClick={() => {}}
            >
              Edit User
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<Trash weight="duotone" />}
              onClick={() => {}}
            >
              Delete User
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];

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
            vAuth
          </Anchor>
          <Anchor size="xs" c="gray.5" fw={600}>
            User Management
          </Anchor>
          <Anchor size="xs" c="dark.9" fw={600}>
            Users
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

          <Group gap={4}>
            <HoverCard shadow="md" withArrow>
              <HoverCard.Target>
                <ActionIcon
                  size={28}
                  onClick={() => {
                    setEnableRowStyle(!enableRowStyle);
                  }}
                  variant={enableRowStyle ? "filled" : "light"}
                >
                  <PaintBucket />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="xs" ta="center">
                  Row Color :{" "}
                  <b
                    style={{
                      color: enableRowStyle
                        ? "var(--mantine-color-teal-6)"
                        : "var(--mantine-color-orange-6)",
                    }}
                  >
                    {enableRowStyle ? "Enabled" : "Disabled"}
                  </b>
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>

            <TextInput
              rightSection={<MagnifyingGlass />}
              size="xs"
              placeholder="Search"
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
            />

            <Button
              leftSection={<SlidersHorizontal size={12} />}
              variant="light"
              size="xs"
            >
              Filters
            </Button>

            <Button
              leftSection={<GearSix size={12} />}
              variant="light"
              size="xs"
            >
              Customize
            </Button>

            <Menu
              withArrow
              styles={{
                item: {
                  fontSize: "var(--mantine-font-size-xs)",
                },
              }}
            >
              <Menu.Target>
                <Button
                  variant="light"
                  rightSection={<CaretDown />}
                  disabled={isFetching}
                  size="xs"
                >
                  Actions
                </Button>
              </Menu.Target>
              <Menu.Dropdown w={200}>
                <Menu.Label>Bulk Actions</Menu.Label>
                <Menu.Item leftSection={<Pen />}>Bulk Edit</Menu.Item>
                <Menu.Item leftSection={<Trash />}>Bulk Delete</Menu.Item>
                <Menu.Divider />
                <Menu.Label>General</Menu.Label>

                <Menu.Item
                  leftSection={<ArrowsClockwise />}
                  onClick={() => {
                    refetch();
                  }}
                >
                  Reload Table
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Export to CSV</Menu.Label>
                <Menu.Item leftSection={<Export />}>Export All</Menu.Item>
                <Menu.Item leftSection={<Check />}>Export Selected</Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <ButtonGroup>
              <Button variant="filled" size="xs" leftSection={<Plus />}>
                Add User
              </Button>
              <Button variant="filled" size="xs" px="8" ml={1}>
                <CaretDown />
              </Button>
            </ButtonGroup>
          </Group>
        </Group>
      </Paper>

      <Divider />

      <Group
        justify="space-between"
        px="md"
        py="xs"
        bg="linear-gradient(to right, var(--mantine-color-gray-0), var(--mantine-color-brand-0))"
      >
        <Group gap="4px">
          <Button size="xs" variant="filled">
            Active Users
          </Button>
          <Button size="xs" variant="light">
            Inactive Users
          </Button>
          <Button size="xs" variant="light">
            Disabled Users
          </Button>
          <Button size="xs" variant="light">
            Recently Added
          </Button>
        </Group>
      </Group>

      <Divider mb="sm" />

      <Paper radius="md" withBorder h={"calc(100vh - 205px)"} mx="md">
        <DataTable
          //Loading
          fetching={isFetching}
          styles={{
            header: {
              background: "var(--mantine-color-gray-1)",
            },
          }}
          //fonts
          fz="xs"
          fw={500}
          // styling
          highlightOnHover
          // spacing
          verticalSpacing="xs"
          horizontalSpacing="md"
          //Data
          idAccessor={idAccessor}
          records={records}
          columns={[
            {
              accessor: "#",
              title: "#",
              width: 50,
              render: (row, index) => <>{index + 1}</>,
            },
            ...columns,
            ...tableActions,
          ]}
          //Row Styling
          rowColor={rowColor}
          rowBackgroundColor={rowBackgroundColor}
          rowStyle={enableRowStyle ? rowStyle : undefined}
          //Sorting
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          //Pagination
          totalRecords={
            hasServerSearch ? totalPages * pageSize : records.length
          }
          page={page}
          onPageChange={(p) => {
            dispatch({
              type: "SET_PAGE",
              payload: p,
            });
          }}
          // > Pagination Size
          recordsPerPage={pageSize}
          recordsPerPageOptions={pageSizes}
          onRecordsPerPageChange={(e) => {
            dispatch({
              type: "SET_PAGE_DATA",
              payload: {
                pageSize: e,
                page: 1,
              },
            });
          }}
        />
      </Paper>
    </>
  );
}
