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
                  {queryPlayerData?.data?.name}
                </Text>

                <Group gap="xs">
                  <Badge size="xs" color="teal" variant="dot">
                    Active
                  </Badge>
                  <Text size="xs" opacity={0.5}>
                    {queryPlayerData?.data?.member_id}
                  </Text>
                </Group>
              </div>
            </Group>

            <Group gap={4}>
              <Divider orientation="vertical" />

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
                  Gender
                </Text>
                <Text size="sm">{queryPlayerData?.data?.gender}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Permanent Address
                </Text>
                <Text size="sm">{queryPlayerData?.data?.perm_address}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Temporary Address
                </Text>
                <Text size="sm">{queryPlayerData?.data?.temp_address}</Text>
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

              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Parent's Name
                </Text>
                <Text size="sm">{queryPlayerData?.data?.parent_name}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Relation
                </Text>
                <Text size="sm">{queryPlayerData?.data?.relation}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Primary Contact
                </Text>
                <Text size="sm">{queryPlayerData?.data?.primary_contact}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Secondary Contact
                </Text>
                <Text size="sm">{queryPlayerData?.data?.guardian_contact}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Emergency Contact
                </Text>
                <Text size="sm">
                  {queryPlayerData?.data?.emergency_contact}
                </Text>
              </Group>

              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Enrollment Date
                </Text>
                <Text size="sm">
                  {queryPlayerData?.data?.date_of_enrollment}
                </Text>
              </Group>

              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Package
                </Text>
                <Text size="sm">{queryPlayerData?.data?.package?.name}</Text>
              </Group>

              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Sessions
                </Text>
                <Text size="sm">
                  {queryPlayerData?.data?.sessions?.name || "N/A"}
                </Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Decided Rate/Month
                </Text>
                <Text size="sm">{queryPlayerData?.data?.decided_rate}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Decided Date
                </Text>
                <Text size="sm">{queryPlayerData?.data?.decided_date}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Decided By
                </Text>
                <Text size="sm">{queryPlayerData?.data?.decided_by}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Reason
                </Text>
                <Text size="sm">{queryPlayerData?.data?.reason}</Text>
              </Group>
            </SimpleGrid>

            <Divider />

            <Text size="sm" mt="md">
              Additional Details
            </Text>

            <SimpleGrid spacing="xs" cols={2} my="xl">
              {/* Favorite Player */}
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
                <Text size="sm">{queryPlayerData?.data?.jersey || "N/A"}</Text>
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
            </SimpleGrid>
          </Spoiler>
        </Container>
      </Paper>
      <Divider />

      <Tabs
        defaultValue="achieve"
        keepMounted={false}
        styles={{
          tab: {
            fontWeight: 600,
          },
        }}
      >
        <Paper radius={0}>
          <Container size="lg">
            <Tabs.List>
              <Tabs.Tab value="achieve" leftSection={<Trophy size={12} />}>
                <Text size="xs">Awards & Achievements</Text>
              </Tabs.Tab>
              <Tabs.Tab value="tournament" leftSection={<Cricket size={12} />}>
                <Text size="xs">Tournaments</Text>
              </Tabs.Tab>
              <Tabs.Tab value="attendance" leftSection={<Calendar size={12} />}>
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
          </Container>
        </Paper>

        <Container size="lg" pb="xl">
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
        </Container>

        {/* 
        <FormHandler
          formType={"new"}
          {...formPropsAchievement}
          apiSubmit={createAchievement}
          onSubmitSuccess={() => {
            handlersFormModalAchievement.close();
          }}
        >
          <Modal
            size={"lg"}
            opened={openFormModalAchievement}
            onClose={() => {
              handlersFormModalAchievement.close();
            }}
            title={
              <Text tt="uppercase" size="xs" fw={700}>
                Add a new Achievement
              </Text>
            }
          >
            <_FormAchievement />
          </Modal>
        </FormHandler> */}
      </Tabs>
    </>
  );
}
