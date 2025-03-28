"use client";

import React from "react";
//next

//mantine
import {
  Accordion,
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  SimpleGrid,
  Space,
  Spoiler,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import {
  ArrowCircleUpLeft,
  ArrowLeft,
  Calendar,
  CaretDown,
  Cricket,
  DotsThree,
  Envelope,
  Graph,
  House,
  Invoice,
  Pen,
  Phone,
  Plus,
  Trash,
  Trophy,
} from "@phosphor-icons/react";
//mantine
import { RadarChart } from "@mantine/charts";

import { _FormAchievement } from "../../form/achievement/form";
import { useDisclosure } from "@mantine/hooks";
import { formPropsAchievement } from "../../form/achievement/form.config";
import { FormHandler } from "@vframework/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleRecord } from "../../module.api";

import { createRecord as createAchievement } from "../../form/achievement/form.api";
import { ModuleAchievement } from "./achievement";
import { ModuleAttendance } from "./attendance";
import { ModuleTournament } from "./tournament";
import { ModulePerformance } from "./performance";
import { ModulePerformanceLog } from "./performanceHistory";
import { ModuleStudentInvoice } from "./invoice";
import { ProfileContext } from "./context";

// bread

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

export function _Profile() {
  // * DEFINITIONS

  const Params = useParams();

  const [openFormModalAchievement, handlersFormModalAchievement] =
    useDisclosure(false);

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  const queryPlayerData = useQuery({
    queryKey: ["player", "playerData"],
    queryFn: async () => {
      const res = await getSingleRecord(Params.id);
      console.log(res);
      return res;
    },
  });

  // * COMPONENTS

  return (
    <>
      <Grid p="md" gutter="xs">
        <Grid.Col span={12}>
          <Group gap="xs">
            <ActionIcon size="sm" variant="light">
              <ArrowLeft size={12} />
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
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="xs">
            <Paper withBorder pb="xl">
              <Stack gap={"xs"}>
                <Paper radius={0} h={120} bg="brand.1" />
                <Center>
                  <Paper withBorder p={4} radius={9999} mt={-64}>
                    <Avatar
                      size={100}
                      src="https://www.dakshana.org/wp-content/uploads/2019/12/21413063273-Jyoti-Rani.jpg"
                    />
                  </Paper>
                </Center>

                <Stack gap={4}>
                  <Text ta="center" size="xs">
                    Member ID : M - 1241212
                  </Text>

                  <Text fw={600} ta="center" size="1.5rem">
                    {queryPlayerData?.data?.name}{" "}
                  </Text>

                  <Text ta="center" size="xs">
                    {queryPlayerData?.data?.gender} | Enrolled on{" "}
                    {queryPlayerData?.data?.date_of_enrollment}
                  </Text>
                </Stack>
              </Stack>
            </Paper>

            <Paper withBorder>
              <Accordion multiple defaultValue={["details"]}>
                <Accordion.Item value="details">
                  <Accordion.Control>
                    <Text size="sm" fw={600}>
                      General Details
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack gap="xs">
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Gender
                        </Text>
                        <Text size="sm">{queryPlayerData?.data?.gender}</Text>
                      </Group>
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Permanent Address
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.perm_address}
                        </Text>
                      </Group>
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Temporary Address
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.temp_address}
                        </Text>
                      </Group>
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Primary Contact
                        </Text>
                        <Text size="sm">{queryPlayerData?.data?.contact}</Text>
                      </Group>
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Email
                        </Text>
                        <Text size="sm">{queryPlayerData?.data?.email}</Text>
                      </Group>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="guardian">
                  <Accordion.Control>
                    <Text size="sm" fw={600}>
                      Guardian Details
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack gap="xs">
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Parent's Name
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.parent_name}
                        </Text>
                      </Group>
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Relation
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.guardian_contact}
                        </Text>
                      </Group>
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Primary Contact
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.parent_contact}
                        </Text>
                      </Group>

                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Emergency Contact
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.emergency_contact}
                        </Text>
                      </Group>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="pricing">
                  <Accordion.Control>
                    <Text size="sm" fw={600}>
                      Pricing Details
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack gap="xs">
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Decided Rate/Month
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.decided_rate}
                        </Text>
                      </Group>
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Decided Date
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.decided_date}
                        </Text>
                      </Group>
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Decided By
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.decided_by}
                        </Text>
                      </Group>
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Reason
                        </Text>
                        <Text size="sm">{queryPlayerData?.data?.reason}</Text>
                      </Group>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="additional">
                  <Accordion.Control>
                    <Text size="sm" fw={600}>
                      Additional Details
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack gap="xs">
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Favorite Player
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.fav_player || "N/A"}
                        </Text>
                      </Group>

                      {/* Favorite Team */}
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Favorite Team
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.fav_team || "N/A"}
                        </Text>
                      </Group>

                      {/* Package */}
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Package
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.package?.name || "N/A"}
                        </Text>
                      </Group>

                      {/* Sessions */}

                      {/* Equipment Required */}
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Equipment Required
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.equipment_required || "N/A"}
                        </Text>
                      </Group>

                      {/* Jersey Size */}
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Jersey Size
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.jersey || "N/A"}
                        </Text>
                      </Group>

                      {/* Experience Level */}
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Experience Level
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.level_exp || "N/A"}
                        </Text>
                      </Group>

                      {/* Training Time */}
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Preferred Training Time
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.time_for_training || "N/A"}
                        </Text>
                      </Group>

                      {/* Membership Type */}
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Membership Type
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.membership || "N/A"}
                        </Text>
                      </Group>

                      {/* Previous Academy */}
                      <Group>
                        <Text w={150} opacity={0.5} size="xs">
                          Previous Academy
                        </Text>
                        <Text size="sm">
                          {queryPlayerData?.data?.previous_academy || "N/A"}
                        </Text>
                      </Group>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Paper>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Paper withBorder>
            <Tabs
              defaultValue="achieve"
              keepMounted={false}
              styles={{
                tab: {
                  fontWeight: 600,
                },
              }}
            >
              <Tabs.List>
                <Tabs.Tab value="achieve" leftSection={<Trophy size={12} />}>
                  <Text size="xs">Awards & Achievements</Text>
                </Tabs.Tab>
                <Tabs.Tab
                  value="tournament"
                  leftSection={<Cricket size={12} />}
                >
                  <Text size="xs">Tournaments</Text>
                </Tabs.Tab>
                <Tabs.Tab
                  value="attendance"
                  leftSection={<Calendar size={12} />}
                >
                  <Text size="xs">Attendance</Text>
                </Tabs.Tab>
                <Tabs.Tab value="performance" leftSection={<Graph size={12} />}>
                  <Text size="xs">Performance </Text>
                </Tabs.Tab>
                <Tabs.Tab
                  value="performanceLog"
                  leftSection={<Graph size={12} />}
                >
                  <Text size="xs"> Performance History </Text>
                </Tabs.Tab>
                <Tabs.Tab value="invoice" leftSection={<Invoice size={12} />}>
                  <Text size="xs"> Invoice </Text>
                </Tabs.Tab>
              </Tabs.List>

              <ProfileContext.Provider
                value={{ playerData: queryPlayerData.data }}
              >
                <>
                  <Tabs.Panel value="achieve">
                    <ModuleAchievement.List />
                  </Tabs.Panel>
                  <Tabs.Panel value="attendance">
                    <ModuleAttendance.List />
                  </Tabs.Panel>
                  <Tabs.Panel value="tournament">
                    <ModuleTournament.List />
                  </Tabs.Panel>
                  <Tabs.Panel value="attendance">
                    <ModuleTournament.List />
                  </Tabs.Panel>
                  <Tabs.Panel value="performance">
                    <ModulePerformance.List />
                  </Tabs.Panel>
                  <Tabs.Panel value="performanceLog">
                    <ModulePerformanceLog.List />
                  </Tabs.Panel>
                  <Tabs.Panel value="invoice">
                    <ModuleStudentInvoice.List />
                  </Tabs.Panel>
                </>
              </ProfileContext.Provider>
            </Tabs>
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
}
