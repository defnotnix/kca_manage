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

import { _FormAchievement } from "../../form/achievement/form";
import { useDisclosure } from "@mantine/hooks";
import { formPropsAchievement } from "../../form/achievement/form.config";
import { FormHandler } from "@vframework/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleRecord } from "../../module.api";

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
      return {
        ...res,
        package: String(res?.package),
        sessions: String(res?.sessions),
      };
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
              <Button
                variant="light"
                leftSection={<Plus size={12} />}
                size="xs"
              >
                Generate Invoice
              </Button>

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
                  Member ID
                </Text>
                <Text size="sm">{queryPlayerData?.data?.member_id}</Text>
              </Group>
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
                  {queryPlayerData?.data?.permanent_address}
                </Text>
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
                <Text size="sm">
                  {queryPlayerData?.data?.secondary_contact}
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

              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Enrollment Date
                </Text>
                <Text size="sm">{queryPlayerData?.data?.doe}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Team
                </Text>
                <Text size="sm">{queryPlayerData?.data?.assigned_team}</Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Training Schedule
                </Text>
                <Text size="sm">
                  {queryPlayerData?.data?.training_schedule}
                </Text>
              </Group>
              <Group>
                <Text w={150} opacity={0.5} size="xs">
                  Package
                </Text>
                <Text size="sm">{queryPlayerData?.data?.package}</Text>
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
                      color="dark"
                      bg="white"
                      onClick={() => {
                        handlersFormModalAchievement.open();
                      }}
                    >
                      Add Achievement
                    </Button>
                  </Group>
                </Box>
                {queryPlayerData?.data?.achivements?.map(
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
                      {index !==
                        queryPlayerData?.data?.achivements?.length - 1 && (
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
                      <Text size="md">Tournament Participations</Text>
                      <Text size="xs" opacity={0.5}>
                        Records of student tournament participations
                      </Text>
                    </div>
                  </Group>
                </Box>
                {queryPlayerData?.data?.achivements?.map(
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
                      {index !==
                        queryPlayerData?.data?.achivements?.length - 1 && (
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
                      <Text size="md">Student Attendance Records</Text>
                      <Text size="xs" opacity={0.5}>
                        Attendance History
                      </Text>
                    </div>
                  </Group>
                </Box>
                {queryPlayerData?.data?.achivements?.map(
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
                      {index !==
                        queryPlayerData?.data?.achivements?.length - 1 && (
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
                  </Group>
                </Box>
                {queryPlayerData?.data?.achivements?.map(
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
                      {index !==
                        queryPlayerData?.data?.achivements?.length - 1 && (
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

      <FormHandler
        formType={"new"}
        {...formPropsAchievement}
        apiSubmit={() => {}}
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
      </FormHandler>
    </>
  );
}
