"use client";

import { StatCard } from "@/components/StatCard";
import {
  Anchor,
  Box,
  Breadcrumbs,
  Center,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { House, Star } from "@phosphor-icons/react";
import React from "react";
//next

import classesCalendar from "./calendar.module.css";

const bread = [
  {
    label: "KCA Admin",
  },
  {
    label: "Dashboard",
  },
];

export function ModuleDashboard() {
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
              value="100"
              description="Total number of players"
            />
            <StatCard
              title="Active Players"
              icon={Star}
              value="100"
              description="Players currently active"
            />
            <StatCard
              title="Booking Requests"
              icon={Star}
              value="100"
              description="Total number of players"
            />
            <StatCard
              title="Bookings today"
              icon={Star}
              value="100"
              description="Total number of players"
            />
            <StatCard
              title="Total Players"
              icon={Star}
              value="100"
              description="Total number of players"
            />
            <StatCard
              title="Active Players"
              icon={Star}
              value="100"
              description="Players currently active"
            />
          </SimpleGrid>
          <Grid gutter="xs">
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Paper pos="relative" withBorder p="sm">
                <Calendar size="sm" classNames={classesCalendar} />
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
                <Box p="sm">
                  
                </Box>
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
}
