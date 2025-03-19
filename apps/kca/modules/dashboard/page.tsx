"use client";

import React from "react";
//next

//mantine
import {
  Anchor,
  Badge,
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

const sessions = [
  {
    name: "Beginner Cricket Training",
    status: "Active",
    time: "6:00 AM - 7:00 AM",
  },
  {
    name: "Advanced Batting Practice",
    status: "Active",
    time: "7:30 AM - 9:00 AM",
  },
  {
    name: "Bowling Masterclass",
    status: "Inactive",
    time: "10:00 AM - 11:30 AM",
  },
  {
    name: "Fielding & Reflex Drills",
    status: "Active",
    time: "1:00 PM - 2:30 PM",
  },
  {
    name: "Tactical Game Simulation",
    status: "Active",
    time: "4:00 PM - 6:00 PM",
  },
  {
    name: "Evening Fitness & Conditioning",
    status: "Active",
    time: "7:00 PM - 8:30 PM",
  },
];

const packages = [
  {
    name: "Basic Cricket Training",
    admissionFee: "Rs. 5,000",
    serviceFee: "Rs. 2,000",
  },
  {
    name: "Advanced Coaching",
    admissionFee: "Rs. 10,000",
    serviceFee: "Rs. 3,500",
  },
  {
    name: "Pro League Preparation",
    admissionFee: "Rs. 15,000",
    serviceFee: "Rs. 5,000",
  },
  {
    name: "Youth Development Program",
    admissionFee: "Rs. 7,500",
    serviceFee: "Rs. 2,500",
  },
];

const expiringPlayers = [
  {
    name: "Ramesh Shrestha",
    dueAmount: "Rs. 2,000",
    expiringDate: "March 20, 2025",
  },
  { name: "Sita Lama", dueAmount: "Rs. 3,500", expiringDate: "March 25, 2025" },
  {
    name: "Arjun Basnet",
    dueAmount: "Rs. 1,500",
    expiringDate: "April 5, 2025",
  },
  {
    name: "Bikash Gurung",
    dueAmount: "Rs. 4,000",
    expiringDate: "April 10, 2025",
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
              <Paper withBorder h={600}>
                <Stack gap={0}>
                  {sessions.map((session, index) => (
                    <Paper p="md" key={index}>
                      <Group justify="space-between">
                        <Text size="xs">{session.name}</Text>
                        <Group>
                          <Badge
                            color={
                              session.status === "Active" ? "teal" : "gray"
                            }
                            variant="dot"
                          >
                            {session.status}
                          </Badge>
                          <Badge>{session.time}</Badge>
                        </Group>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            </Box>
            <Box>
              <Paper withBorder p="md" bg="brand.0">
                <Text size="sm">Current Sessions</Text>
              </Paper>
              <Paper withBorder h={600}>
                <Stack gap={0}>
                  {packages.map((pkg, index) => (
                    <Paper p="md" key={index}>
                      <Group justify="space-between">
                        <Text size="xs">{pkg.name}</Text>
                        <Group>
                          <Badge color="blue">Ad.: {pkg.admissionFee}</Badge>
                          <Badge color="green">S.F : {pkg.serviceFee}</Badge>
                        </Group>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            </Box>{" "}
            <Box>
              <Paper withBorder p="md" bg="brand.0">
                <Text size="sm">Current Sessions</Text>
              </Paper>
              <Paper withBorder h={600}>
                <Stack gap={0}>
                  {expiringPlayers.map((player, index) => (
                    <Paper p="md" key={index}>
                      <Group justify="space-between">
                        <Text size="xs">{player.name}</Text>
                        <Group>
                          <Badge color="red">Due: {player.dueAmount}</Badge>
                          <Badge color="orange">
                            EX.: {player.expiringDate}
                          </Badge>
                        </Group>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            </Box>
          </SimpleGrid>
        </Stack>
      </Paper>
    </>
  );
}
