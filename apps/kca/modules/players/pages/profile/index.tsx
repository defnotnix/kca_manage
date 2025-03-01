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
  Group,
  Image,
  Paper,
  SimpleGrid,
  Space,
  Spoiler,
  Stack,
  Text,
} from "@mantine/core";
import {
  ArrowCircleUpLeft,
  ArrowLeft,
  CaretDown,
  DotsThree,
  Envelope,
  House,
  Pen,
  Phone,
  Plus,
  Trash,
} from "@phosphor-icons/react";
//mantine
import { RadarChart } from "@mantine/charts";

//icons

//styles

//components

const bread = [
  {
    label: "KCA Admin",
  },
  {
    label: "Players Management",
  },
  { label: "Players" },
  {
    label: "Profile",
  },
];

const studentData = {
  image: "https://example.com/images/member123.jpg",
  name: "Rajan Shrestha",
  member_id: "CA2025001",
  gender: "Male",
  permanent_address: "Baneshwor, Kathmandu",
  temp_address: "Lalitpur, Nepal",
  contact: "9841234567",
  email: "rajan.shrestha@example.com",
  parent_name: "Suresh Shrestha",
  relation: "Father",
  primary_contact: "9847654321",
  secondary_contact: "9812345678",
  emergency_contact: "9801122334",
  doe: "2025-02-28",
  assigned_team: "U-19 Academy Squad",
  training_schedule: "Mon, Wed, Fri (7 AM - 9 AM)",
  package: "Advanced Training",
  decided_rate: "Rs. 5000/month",
  decided_date: "2025-02-20",
  decided_by: "Coach Binod",
  reason: "Potential talent for professional cricket",
  remarks: "Fast bowler with good line and length",
  fav_player: "Virat Kohli",
  fav_team: "Nepal National Team",
  equipment_required: "Cricket Bat, Pads, Gloves",
  jersey: "Medium",
  preferred_package: "Professional Cricket Training",
  experience: "Played in school tournaments and local leagues",
  attendances: [
    {
      date: "2025-02-20",
      time: "10:00 AM",
      status: "Present",
    },
    {
      date: "2025-02-20",
      time: "10:00 AM",
      status: "Present",
    },
    {
      date: "2025-02-21",
      time: "11:00 AM",
      status: "Absent",
    },
  ],

  achivements: [
    {
      title: "Achievement 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: "2025-02-20",
    },
    {
      title: "Achievement 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: "2025-02-20",
    },
    {
      title: "Achievement 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: "2025-02-20",
    },
  ],
};

export function _Profile() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <Paper
        p="md"
        bg="linear-gradient(to right, var(--mantine-color-gray-0), var(--mantine-color-brand-0))"
      >
        <Container size="lg">
          <Group>
            <ActionIcon size="xs" variant="light">
              <ArrowLeft />
            </ActionIcon>
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
          </Group>

          <Space h="xl" />

          <Group justify="space-between" align="flex-end">
            <Group>
              <Avatar
                size="lg"
                src="https://www.dakshana.org/wp-content/uploads/2019/12/21413063273-Jyoti-Rani.jpg"
              />
              <div>
                <Text size="xl" fw={600}>
                  {studentData.name}
                </Text>

                <Group gap="xs">
                  <Badge size="xs" color="teal" variant="dot">
                    Active
                  </Badge>
                  <Text size="xs" opacity={0.5}>
                    {studentData.member_id}
                  </Text>
                </Group>
              </div>
            </Group>

            <Group gap={4}>
              <Button
                variant="light"
                leftSection={<Plus size={12} />}
                size="xs"
              >
                Generate Invoice
              </Button>

              <Divider orientation="vertical" />
              <Button
                leftSection={<Trash size={12} />}
                variant="light"
                size="xs"
                color="red"
              >
                Delete Record
              </Button>

              <Button leftSection={<Pen size={12} />} size="xs">
                Edit Details
              </Button>
            </Group>
          </Group>

          <Spoiler
            maxHeight={180}
            showLabel={
              <Badge variant="light" size="xs" rightSection={<CaretDown />}>
                Show Full Details
              </Badge>
            }
            hideLabel=<Badge
              variant="light"
              size="xs"
              rightSection={<CaretDown />}
            >
              Hide Extra Details
            </Badge>
          >
            <SimpleGrid spacing="xs" cols={2} my="xl">
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Member ID
                </Text>
                <Text size="sm">{studentData.member_id}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Gender
                </Text>
                <Text size="sm">{studentData.gender}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Permanent Address
                </Text>
                <Text size="sm">{studentData.permanent_address}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Temporary Address
                </Text>
                <Text size="sm">{studentData.temp_address}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Primary Contact
                </Text>
                <Text size="sm">{studentData.contact}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Email
                </Text>
                <Text size="sm">{studentData.email}</Text>
              </Group>

              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Parent's Name
                </Text>
                <Text size="sm">{studentData.parent_name}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Relation
                </Text>
                <Text size="sm">{studentData.relation}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Primary Contact
                </Text>
                <Text size="sm">{studentData.primary_contact}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Secondary Contact
                </Text>
                <Text size="sm">{studentData.secondary_contact}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Emergency Contact
                </Text>
                <Text size="sm">{studentData.emergency_contact}</Text>
              </Group>

              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Enrollment Date
                </Text>
                <Text size="sm">{studentData.doe}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Team
                </Text>
                <Text size="sm">{studentData.assigned_team}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Training Schedule
                </Text>
                <Text size="sm">{studentData.training_schedule}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Package
                </Text>
                <Text size="sm">{studentData.package}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Decided Rate/Month
                </Text>
                <Text size="sm">{studentData.decided_rate}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Decided Date
                </Text>
                <Text size="sm">{studentData.decided_date}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Decided By
                </Text>
                <Text size="sm">{studentData.decided_by}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Reason
                </Text>
                <Text size="sm">{studentData.reason}</Text>
              </Group>
            </SimpleGrid>
          </Spoiler>
        </Container>
      </Paper>
      <Divider />

      <Container size="lg" py="md">
        <Grid gutter="xs">
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Stack gap="xs">
              <Paper withBorder>
                <Box p="sm" bg="brand.0">
                  <Group justify="space-between">
                    <div>
                      <Text size="md">Awards & Achievements</Text>
                      <Text size="xs" opacity={0.5}>
                        Awards & Achievements earned by this player.
                      </Text>
                    </div>
                    <Button
                      size="xs"
                      leftSection={<Plus />}
                      variant="outline"
                      color="gray"
                      bg="white"
                    >
                      Add Achievement
                    </Button>
                  </Group>
                </Box>
                {studentData.achivements.map(
                  (achivement: any, index: number) => (
                    <div key={index}>
                      <Paper radius={0} px="md" py="xs">
                        <SimpleGrid cols={2}>
                          <Text size="sm" c="dark.9">
                            {achivement.title}
                          </Text>
                          <Group justify="space-between">
                            <Text size="sm">{achivement.date}</Text>
                            <ActionIcon size="sm" variant="light">
                              <DotsThree />
                            </ActionIcon>
                          </Group>
                        </SimpleGrid>
                      </Paper>
                      {index !== studentData?.achivements?.length - 1 && (
                        <Divider />
                      )}
                    </div>
                  )
                )}
              </Paper>

              <Paper withBorder>
                <Box p="sm" bg="brand.0">
                  <Group justify="space-between">
                    <div>
                      <Text size="md">Performance Records</Text>
                      <Text size="xs" opacity={0.5}>
                        Attendance History
                      </Text>
                    </div>
                    <Button
                      size="xs"
                      leftSection={<Plus />}
                      variant="outline"
                      color="gray"
                      bg="white"
                    >
                      Add Achievement
                    </Button>
                  </Group>
                </Box>
                {studentData.achivements.map(
                  (achivement: any, index: number) => (
                    <div key={index}>
                      <Paper radius={0} px="md" py="xs">
                        <SimpleGrid cols={2}>
                          <Text size="sm" c="dark.9">
                            {achivement.title}
                          </Text>
                          <Group justify="space-between">
                            <Text size="xs">{achivement.date}</Text>
                            <ActionIcon size="sm" variant="light">
                              <DotsThree />
                            </ActionIcon>
                          </Group>
                        </SimpleGrid>
                      </Paper>
                      {index !== studentData?.achivements?.length - 1 && (
                        <Divider />
                      )}
                    </div>
                  )
                )}
              </Paper>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap="xs">
              <Paper withBorder p="sm">
                <RadarChart
                  h={300}
                  data={[
                    {
                      product: "Apples",
                      sales: 120,
                    },
                    {
                      product: "Oranges",
                      sales: 98,
                    },
                    {
                      product: "Tomatoes",
                      sales: 86,
                    },
                    {
                      product: "Grapes",
                      sales: 99,
                    },
                    {
                      product: "Bananas",
                      sales: 85,
                    },
                    {
                      product: "Lemons",
                      sales: 65,
                    },
                  ]}
                  dataKey="product"
                  withPolarRadiusAxis
                  series={[{ name: "sales", color: "blue.4", opacity: 0.2 }]}
                />
              </Paper>

              <Paper withBorder>
                <Box p="sm" bg="brand.0">
                  <Group justify="space-between">
                    <div>
                      <Text size="md">Performance Records</Text>
                      <Text size="xs" opacity={0.5}>
                        Performance Logs
                      </Text>
                    </div>
                    <Button
                      size="xs"
                      leftSection={<Plus />}
                      variant="outline"
                      color="gray"
                      bg="white"
                    >
                      New Record
                    </Button>
                  </Group>
                </Box>
                {studentData.achivements.map(
                  (achivement: any, index: number) => (
                    <div key={index}>
                      <Paper radius={0} px="md" py="xs">
                        <Group justify="space-between">
                          <Text size="sm">{achivement.date}</Text>
                          <ActionIcon size="sm" variant="light">
                            <DotsThree />
                          </ActionIcon>
                        </Group>
                      </Paper>
                      {index !== studentData?.achivements?.length - 1 && (
                        <Divider />
                      )}
                    </div>
                  )
                )}
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
