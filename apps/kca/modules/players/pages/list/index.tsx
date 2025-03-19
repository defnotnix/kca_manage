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
  Menu,
  Paper,
  SimpleGrid,
  Space,
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
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export function _List() {
  // * DEFINITIONS

  const Router = useRouter();

  // * CONTEXT

  // * STATE

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

  return (
    <>
      <ListHandler
        endpoint={moduleConfig.endpoint}
        moduleKey={moduleConfig.moduleKey}
        //enableServerPagination
        //enableServerSearch
        getRecords={getRecords}
      >
        <ModuleTableLayout
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
          contentPreTable={
            <SimpleGrid cols={{ base: 2, lg: 4 }} px="md" mb="md" spacing="xs">
              <StatCard
                title="Total Players"
                icon={Star}
                value="54"
                description="Total number of players"
              />
              <StatCard
                title="Active Players"
                icon={Star}
                value="32"
                shortValue="23% of Total"
                description="Players currently active"
              />
              <StatCard
                title="Due Payment"
                icon={Star}
                value="5"
                description="Total number of players"
              />
              <StatCard
                title="Payment Overdue"
                icon={Star}
                value="10"
                description="Total number of players"
              />
            </SimpleGrid>
          }
        />
      </ListHandler>
    </>
  );
}
