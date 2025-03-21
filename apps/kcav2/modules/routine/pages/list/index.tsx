"use client";

import React, { useState } from "react";
//next

//mantine
import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Button,
  Center,
  Divider,
  Group,
  Menu,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { ListHandler } from "@vframework/core";
import { ModuleTableLayout } from "@vframework/ui";
import { columns } from "./list.columns";

//mantine

//icons

//styles

//components

//api
import { deleteRecord, getRecords } from "../../module.api";
import {
  ArrowLeft,
  Atom,
  CaretRight,
  DotsThreeVertical,
  House,
  IdentificationBadge,
  PlugsConnected,
  Plus,
  Star,
} from "@phosphor-icons/react";
import { moduleConfig } from "../../module.config";
import { StatCard } from "@/components/StatCard";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { DateInput, DatePickerInput } from "@mantine/dates";

import { _Form as Form } from "../../components/quickform/form";
import { formProps } from "../../components/quickform/form.config";

export function _List() {
  // * DEFINITIONS

  const Router = useRouter();
  const Params = useParams();

  // * CONTEXT

  // * STATE

  const [dateRange, setDateRange] = useState<any[]>([]);

  const queryPlayerData = useQuery({
    queryKey: ["player", "playerData"],
    queryFn: async () => {
      return {};
    },
    initialData: {},
  });

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  if (dateRange.length !== 2) {
    return (
      <Center h={400}>
        <Paper p="md" withBorder>
          <Stack>
            <Group wrap="nowrap">
              <ActionIcon
                variant="light"
                onClick={() => {
                  Router.back();
                }}
              >
                <ArrowLeft />
              </ActionIcon>
              <Stack gap="0">
                <Text size="md">Select Date Range</Text>
                <Text size="xs" opacity={0.5}>
                  Select date range to display routines
                </Text>
              </Stack>
            </Group>

            <DatePickerInput
              w={300}
              type="range"
              placeholder="Pick dates range"
              onChange={(e: any) => {
                if (e[0] !== null && e[1] !== null) {
                  setDateRange([e[0], e[1]]);
                }
              }}
            />

            <Button
              onClick={() => {
                setDateRange(["2025-01-01", "2100-01-01"]);
              }}
            >
              Show All Logs
            </Button>
          </Stack>
        </Paper>
      </Center>
    );
  }

  return (
    <>
      <ListHandler
        endpoint={moduleConfig.endpoint}
        moduleKey={moduleConfig.moduleKey}
        //enableServerPagination
        //enableServerSearch
        getRecords={(props: any) => {
          if (dateRange.length == 2) {
            return getRecords(props);
          } else {
            return [];
          }
        }}
        getParams={{
          session_id: Params.id,
          start_date: dateRange[0],
          end_date: dateRange[1],
        }}
      >
        <ModuleTableLayout
          withBackButton
          {...moduleConfig}
          apiDelete={deleteRecord}
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
          // * EXTRA ACTIONS
          extraActions={({ row }: { row: any }) => (
            <>
              <Menu.Item
                onClick={() => {
                  Router.push(`/players/${row.id}`);
                }}
                leftSection={<IdentificationBadge />}
              >
                Player Profile
              </Menu.Item>
            </>
          )}
          onEditTrigger={(row) => {
            return {
              time: String(row.time?.id),
              ground: String(row.ground?.id),
            };
          }}
          // * MODAL CONFIG
          hasModalForms
          modalFormProps={{ width: "lg", formProps }}
          modalForm={<Form />}
        />
      </ListHandler>
    </>
  );
}
