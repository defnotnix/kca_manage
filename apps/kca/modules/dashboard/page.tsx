"use client";

import React from "react";
//next

//mantine
import {
  Anchor,
  Box,
  Breadcrumbs,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { StatCard } from "@/components/StatCard";
import { House, Star } from "@phosphor-icons/react";
//mantine

//icons

//styles

//components

const bread = [
  {
    label: "KCA Admin",
  },
  {
    label: "Booking Management",
  },
  {
    label: "Calendar View",
  },
];

export function ModuleDashboard() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

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

        <Space h="md" />

        <Group justify="space-between" align="flex-end">
          <Group gap="sm">
            <div>
              <Text size="xl" fw={600}>
                Dashboard
              </Text>
              <Text size="sm" opacity={0.5}>
                Review bookings for the current month
              </Text>
            </div>
          </Group>
        </Group>

        <Stack gap="xs" my="md">
          <SimpleGrid spacing="xs" cols={{ base: 2, lg: 4 }}>
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
              shortValue="23% of Total"
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
          </SimpleGrid>
          <SimpleGrid spacing="xs" cols={{ base: 1, lg: 3 }}>
            <Box>
              <Paper withBorder p="md" bg="brand.0">
                <Text size="sm">Current Sessions</Text>
              </Paper>
              <Paper withBorder p="md">
                adsf
              </Paper>
            </Box>
            <Box>
              <Paper withBorder p="md" bg="brand.0">
                <Text size="sm">Current Sessions</Text>
              </Paper>
              <Paper withBorder p="md">
                adsf
              </Paper>
            </Box>{" "}
            <Box>
              <Paper withBorder p="md" bg="brand.0">
                <Text size="sm">Current Sessions</Text>
              </Paper>
              <Paper withBorder p="md">
                adsf
              </Paper>
            </Box>
          </SimpleGrid>
        </Stack>
      </Paper>
    </>
  );
}
