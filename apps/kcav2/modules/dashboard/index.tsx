"use client";

import { StatCard } from "@/components/StatCard";
import {
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Grid,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { House, Star } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
//next
import _ from "moment";

import classesCalendar from "./calendar.module.css";
import { useQuery } from "@tanstack/react-query";
import { getStats } from "./module.api";
import { getRecords } from "../package/module.api";

const bread = [
  {
    label: "KCA Admin",
  },
  {
    label: "Dashboard",
  },
];

export function Module() {
  const [dateRange, setDateRange] = useState<Date[]>([
    new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of the month
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // End of the month
  ]);

  const [currentDate, setCurrentDate] = useState<any>(
    _(new Date()).format("YYYY-MM-DD")
  );

  const queryStats = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const res = await getStats();
      console.log(res);
      return res;
    },
  });

  const queryGrounds = useQuery({
    queryKey: ["config", "grounds"], // query key
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/services/grounds/",
      });

      return res;
    },
    initialData: [],
  });

  const queryTimeFrames = useQuery({
    queryKey: ["config", "timeframes"], // query key
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/services/time/frames/",
      });

      return res;
    },
    initialData: [],
  });

  const queryBookingLogs = useQuery({
    queryKey: ["config", "bookingLogs"], // query key
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/schedule/sessions/",
        params: {
          start_date: _(dateRange[0]).format("YYYY-MM-DD"),
          end_date: _(dateRange[1]).format("YYYY-MM-DD"),
        },
      });

      return res.map((_: any) => {
        return {
          ..._,
          time: _.time?.id,
          ground: _.ground?.id,
          groundName: _.ground?.name,
        };
      });
    },
    initialData: [],
  });

  useEffect(() => {
    queryBookingLogs.refetch();
  }, [currentDate]);

  const RenderSlots = ({ date }: any) => {
    return (
      <Paper
        withBorder
        radius={0}
        style={{
          borderLeft: 0,
          borderRight: 0,
          borderBottom: 0,
        }}
      >
        <Tabs defaultValue={String(queryGrounds?.data?.[0]?.id)}>
          <Tabs.List>
            {queryGrounds?.data?.map((ground: any, index: number) => (
              <Tabs.Tab key={index} value={String(ground.id)}>
                <Text size="sm" fw={600}>
                  {ground?.name}
                </Text>
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {queryGrounds?.data?.map((ground: any, index: number) => {
            const activebookings = queryBookingLogs?.data
              ?.filter((item: any) => {
                return (
                  item.ground == ground.id &&
                  item.date == date &&
                  item.is_available == false
                );
              })
              .map((item: any, index: number) => {
                const _timeframe = queryTimeFrames?.data?.find(
                  (timeframe: any) => {
                    return timeframe.id == item.time;
                  }
                );

                return {
                  ...item,
                  start_time: _timeframe.start_time,
                  end_time: _timeframe.end_time,
                };
              });

            return (
              <Tabs.Panel value={String(ground.id)} key={ground.id}>
                {activebookings.map((logdata: any, index: number) => {
                  console.log(logdata);

                  return (
                    <Box
                      key={index}
                      p="sm"
                      bg={index % 2 == 0 ? "brand.0" : ""}
                    >
                      <SimpleGrid cols={3}>
                        <Text size="xs" fw={600}>
                          {logdata?.start_time} - {logdata?.end_time}
                        </Text>

                        <Text size="xs" fw={600}>
                          Session Name
                        </Text>
                        <Group justify="flex-end">
                          <Badge color={logdata?.session ? "teal" : "brand"}>
                            {logdata?.session
                              ? "Used for Coaching Session"
                              : "Ground Booked"}
                          </Badge>
                        </Group>
                      </SimpleGrid>
                    </Box>
                  );
                })}
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </Paper>
    );
  };

  return (
    <>
      <Stack gap="xs">
        <Paper p="md" bg="blue.1" radius={0} pb={100}>
          <Stack gap="xl">
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

            <Stack gap="4px">
              <Text size="2rem" fw={600} c="dark.9">
                Hello Suraj, Welcome back!
              </Text>
              <Text fw={400} size="sm" opacity={0.5} c="dark.9">
                We have arranged few things for you!
              </Text>
            </Stack>
          </Stack>
        </Paper>

        <Stack mt={-100} p="md" gap="xs">
          <SimpleGrid spacing="xs" cols={{ base: 2, lg: 6 }}>
            <StatCard
              title="Total Players"
              icon={Star}
              value={queryStats?.data?.total_players}
              description="Total number of players"
            />
            <StatCard
              title="Active Players"
              icon={Star}
              value={queryStats?.data?.active_players_count}
              description="Players currently active"
            />
            <StatCard
              title="Expiring Players"
              icon={Star}
              value={queryStats?.data?.soon_expiring_players}
              description="Players are expiring soon."
            />
            <StatCard
              title="Booking Requests"
              icon={Star}
              value={queryStats?.data?.pending_bookings_count}
              description="Total Bookings Pending"
            />
            <StatCard
              title="Bookings today"
              icon={Star}
              value={queryStats?.data?.active_bookings_count}
              description="Active Bookings"
            />
            <StatCard
              title="Pending Invoices"
              icon={Star}
              value={queryStats?.data?.pending_invoices_count}
              description="Total Invoices Pending"
            />
          </SimpleGrid>
          <Grid gutter="xs">
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Paper pos="relative" withBorder p="sm">
                <Calendar
                  onNextMonth={() => {
                    setDateRange(([start, end]) => [
                      new Date(start.getFullYear(), start.getMonth() + 1, 1), // Next month's start date
                      new Date(end.getFullYear(), end.getMonth() + 2, 0), // Next month's end date
                    ]);
                  }}
                  onPreviousMonth={() => {
                    setDateRange(([start, end]) => [
                      new Date(start.getFullYear(), start.getMonth() - 1, 1), // Previous month's start date
                      new Date(end.getFullYear(), end.getMonth(), 0), // Previous month's end date
                    ]);
                  }}
                  getDayProps={(date) => ({
                    selected: currentDate == date,
                    onClick: () => setCurrentDate(date),
                  })}
                  size="sm"
                  classNames={classesCalendar}
                />
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Paper pos="relative" withBorder>
                <Paper
                  p="sm"
                  bg="brand.0"
                  style={{
                    borderBottom: "1px solid var(--mantine-color-gray-3)",
                  }}
                >
                  <Text fw={600} size="sm" c="dark.9">
                    Day Overview
                  </Text>
                </Paper>
                <Box>
                  <RenderSlots date={currentDate} />
                </Box>
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
}
