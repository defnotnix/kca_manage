"use client";

import React, { useState } from "react";
//next

//mantine
import {
  ActionIcon,
  Anchor,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Divider,
  Group,
  Menu,
  Modal,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import {
  FormHandler,
  ListHandler,
  useListHandlerContext,
} from "@vframework/core";
import { ModuleTableLayout, triggerNotification } from "@vframework/ui";
import { columns } from "./list.columns";

//mantine

//icons

//styles

//components

//api
import {
  checkInvoice,
  createInvoice,
  getRecords,
  updateRecord,
} from "../../module.api";
import {
  ArrowLeft,
  Atom,
  CaretRight,
  Check,
  Clock,
  DotsThreeVertical,
  Eye,
  House,
  Invoice,
  Pause,
  PlugsConnected,
  Plus,
  Star,
  Trash,
  X,
} from "@phosphor-icons/react";
import { moduleConfig } from "../../module.config";
import { useDisclosure } from "@mantine/hooks";
import { FormInvoice } from "../../formInvoice/form";
import { _FormTime } from "../../formTime/form";

import { formProps } from "../../formInvoice/form.config";
import { Cross } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { configModule } from "@/modules/auth";
import { RBACCheck } from "@/components/RBACCheck";

const statusMap: any = {
  "1": "Approved",
  "2": "Rejected",
  "3": "Pending",
};

const statusColorMap: any = {
  "1": "teal",
  "2": "red",
  "3": "blue",
};

export function _List() {
  // * DEFINITIONS

  const [tab, setTab] = useState("pending");

  const [active, setActive] = useState<any>({});
  const [openProfile, handlersProfile] = useDisclosure(false);
  const [openInvoice, handlersInvoice] = useDisclosure(false);
  const [openTime, handlersTime] = useDisclosure(false);

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  const query = useQueryClient();

  // * COMPONENTS

  // * ANIMATIONS

  const RenderTable = () => {
    const { refetch } = useListHandlerContext();
    return (
      <ModuleTableLayout
        {...moduleConfig}
        //Data
        columns={columns}
        extraActions={({ row }: { row: any }) => (
          <>
            <Menu.Label>Details</Menu.Label>
            <Menu.Item
              leftSection={<Eye />}
              onClick={async () => {
                handlersProfile.open();
                setActive(row);
              }}
            >
              Booking Profile
            </Menu.Item>
            <Menu.Item
              leftSection={<Clock />}
              onClick={async () => {
                handlersTime.open();
                setActive(row);
              }}
            >
              Set Booking Time
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Billings</Menu.Label>
            <Menu.Item
              leftSection={<Invoice />}
              disabled={!row?.start_time && !row?.end_time}
              onClick={async () => {
                checkInvoice(row.id)
                  .then((res) => {
                    if (res.err) {
                      triggerNotification.form.isError({
                        newMessage: true,
                        message: "Invoice already exists for this booking",
                      });
                    } else {
                      handlersInvoice.open();
                      setActive(row);
                    }
                  })
                  .catch((err) => {
                    triggerNotification.form.isError({
                      newMessage: true,
                      message: "Invoice already exists for this booking",
                    });
                  });
              }}
            >
              Create Invoice
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Actions</Menu.Label>
            {row.status !== "1" && (
              <Menu.Item
                color="teal.7"
                disabled={row.status == "1"}
                leftSection={<Check />}
                onClick={async () => {
                  triggerNotification.form.isLoading({});
                  const res = await updateRecord(
                    {
                      id: row.id,
                      status: "1",
                    },
                    row.id
                  )
                    .then((res) => {
                      if (res.err) {
                        triggerNotification.form.isError({
                          message:
                            "Time frame overlaps with Session. Pleases confirm with coach for shifting & verify",
                        });
                      } else {
                        triggerNotification.form.isSuccess({});
                        refetch();
                      }
                    })
                    .catch((err) => {
                      triggerNotification.form.isError({
                        message:
                          err.obkect?.message ||
                          "Time frame overlaps with Session. Pleases confirm with coach for shifting & verify",
                      });
                    });
                }}
              >
                Accept Booking
              </Menu.Item>
            )}

            {row.status !== "3" && (
              <Menu.Item
                color="blue.7"
                disabled={row.status == "3"}
                leftSection={<Pause />}
                onClick={async () => {
                  triggerNotification.form.isLoading({});
                  await updateRecord(
                    {
                      id: row.id,
                      status: "3",
                    },
                    row.id
                  ).then((res) => {
                    if (res.err) {
                      triggerNotification.form.isError({});
                    } else {
                      triggerNotification.form.isSuccess({});
                      refetch();
                    }
                  });
                }}
              >
                Set to Pending
              </Menu.Item>
            )}

            {row.status !== "2" && (
              <Menu.Item
                color="orange.7"
                disabled={row.status == "2"}
                leftSection={<X />}
                onClick={() => {
                  triggerNotification.form.isLoading({});
                  updateRecord(
                    {
                      id: row.id,
                      status: "2",
                    },
                    row.id
                  ).then((res) => {
                    if (res.err) {
                      triggerNotification.form.isError({});
                    } else {
                      triggerNotification.form.isSuccess({});
                      refetch();
                    }
                  });
                }}
              >
                Reject Booking
              </Menu.Item>
            )}
          </>
        )}
        contentPreTable={
          <>
            <Tabs.List px="md">
              <Tabs.Tab value="pending">New Requests</Tabs.Tab>
              <Tabs.Tab value="approved">Active Bookings</Tabs.Tab>
              <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
            </Tabs.List>
          </>
        }
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
      />
    );
  };

  const RenderForm = () => {
    const { handleSubmit } = FormHandler.usePropContext();

    return (
      <>
        <FormInvoice active={active} />

        <Group justify="flex-end" gap="xs" p="md">
          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            Create Invoice
          </Button>
        </Group>
      </>
    );
  };

  const RenderFormTime = () => {
    const { handleSubmit } = FormHandler.usePropContext();

    return (
      <>
        <_FormTime active={active} />

        <Group justify="flex-end" gap="xs" p="md">
          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            Set Time
          </Button>
        </Group>
      </>
    );
  };

  return (
    <RBACCheck showStaff>
      <ListHandler
        endpoint={`/services/${tab}/booking/`}
        moduleKey={[...moduleConfig.moduleKey, tab]}
        //enableServerPagination
        //enableServerSearch
        getRecords={getRecords}
      >
        <Tabs value={tab} onChange={(e: any) => setTab(e)}>
          <RenderTable />
        </Tabs>
      </ListHandler>

      <Modal
        title="Create Booking Invoice"
        opened={openInvoice}
        onClose={() => {
          handlersInvoice.close();
        }}
        size="xl"
      >
        <FormHandler
          {...formProps}
          apiSubmit={createInvoice}
          onSubmitSuccess={() => {
            //@ts-ignore
            query.invalidateQueries([...moduleConfig.moduleKey, tab]);
            handlersInvoice.close();
          }}
        >
          <RenderForm />
        </FormHandler>
      </Modal>

      <Modal
        title="Set Booking Time"
        opened={openTime}
        onClose={() => {
          handlersTime.close();
        }}
        size="xl"
      >
        <FormHandler
          {...formProps}
          apiSubmit={updateRecord}
          variant="edit"
          onSubmitSuccess={() => {
            //@ts-ignore
            query.invalidateQueries([...moduleConfig.moduleKey, tab]);
            handlersTime.close();
          }}
        >
          <RenderFormTime />
        </FormHandler>
      </Modal>

      <Modal
        size={"lg"}
        opened={openProfile}
        onClose={() => {
          setActive(null);
          handlersProfile.close();
        }}
        title={
          <Text tt="uppercase" size="xs" fw={700}>
            Booking Details
          </Text>
        }
      >
        <Stack p="md">
          <Text size="xs" opacity={0.5}>
            General Details
          </Text>

          <SimpleGrid cols={2} spacing="xs">
            <Text size="xs">Booking Date</Text>
            <Text size="xs" fw={600}>
              {active?.date}
            </Text>
            <Text size="xs">Booked By</Text>
            <Text size="xs" fw={600}>
              {active?.name}
            </Text>
            <Text size="xs">Phone</Text>
            <Text size="xs" fw={600}>
              {active?.contact}
            </Text>
            <Text size="xs">E-mail</Text>
            <Text size="xs" fw={600}>
              {active?.email}
            </Text>
            <Text size="xs">Status</Text>
            <Badge color={statusColorMap[active?.status]}>
              {statusMap[active?.status]}
            </Badge>{" "}
            {/* <Text size="xs">Invoice Status</Text>
            <Button size="xs" variant="light">
              View Invoice
            </Button> */}
          </SimpleGrid>

          <Divider />

          <Text size="xs" opacity={0.5}>
            Booking Slots
          </Text>

          <Group gap={4}>
            {active?.time?.map((timeinfo: any, index: number) => (
              <Badge key={index}>
                {timeinfo.start_time} - {timeinfo.end_time}
              </Badge>
            ))}
          </Group>

          <Divider />

          <Text size="xs" opacity={0.5}>
            Booking Ground
          </Text>

          <Card p={0} radius="md" withBorder>
            <Group wrap="nowrap" align="flex-start" p="xs">
              <div>
                <Text size="xs" fw={600}>
                  {active?.ground?.name}
                </Text>
                <Text size="xs" opacity={0.5}>
                  {active?.ground?.pitch}
                </Text>
              </div>
            </Group>
            <Paper bg="brand.1" p="xs">
              <Group>
                <Text size="xs" fw={600}>
                  Rs. {active?.ground?.price_hr} / hr
                </Text>
                <Divider orientation="vertical" />
                <Text size="xs" fw={600}>
                  Rs. {active?.ground?.price_day} / day
                </Text>
              </Group>
            </Paper>
          </Card>

          <Divider />

          <Text size="xs" opacity={0.5}>
            Booking Add-on's
          </Text>

          <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xs">
            {active?.addons?.map((item: any, index: number) => (
              <Card withBorder key={index} p={0}>
                <Text size="xs" fw={600} p={"xs"} h={64}>
                  {item?.name}
                </Text>
                <Paper p={"xs"} bg="teal.1">
                  <Text size="xs" fw={600}>
                    Rs. {item?.price} / hr
                  </Text>
                </Paper>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Modal>
    </RBACCheck>
  );
}
