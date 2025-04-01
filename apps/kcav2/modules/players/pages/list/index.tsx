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
import { getStats } from "@/modules/dashboard/module.api";
import { RBACCheck } from "@/components/RBACCheck";

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

  const queryStats = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const res = await getStats();
      console.log(res);
      return res;
    },
  });

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <RBACCheck showStaff>
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
              <SimpleGrid
                cols={{ base: 2, lg: 4 }}
                px="md"
                mb="md"
                spacing="xs"
              >
                <StatCard
                  key={1}
                  title="Total Players"
                  icon={Star}
                  value={queryStats?.data?.total_players}
                  description="Total number of players"
                />
                <StatCard
                  key={2}
                  title="Active Players"
                  icon={Star}
                  value={queryStats?.data?.active_players_count}
                  shortValue="23% of Total"
                  description="Active Players"
                />
                <StatCard
                  key={3}
                  title="Due Payment"
                  icon={Star}
                  value={queryStats?.data?.soon_expiring_players}
                  description="Players Expiring Soon "
                />
                <StatCard
                  key={4}
                  title="Payment Overdue"
                  icon={Star}
                  value={queryStats?.data?.pending_invoices_count}
                  description="Pending Invoices"
                />
              </SimpleGrid>
            }
          />
        </ListHandler>
      </RBACCheck>
    </>
  );
}
