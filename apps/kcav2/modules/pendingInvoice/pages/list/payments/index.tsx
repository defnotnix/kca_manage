"use client";

import React, { useEffect, useState } from "react";
//next

//mantine
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Paper,
  RingProgress,
  ScrollArea,
  SimpleGrid,
  Space,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { Plus, Trash, Warning } from "@phosphor-icons/react";
import { FormHandler } from "@vframework/core";
import { formProps } from "./form/form.config";
//mantine
import { _Form as Form } from "./form/form";

import { getRecords, createRecord, deleteRecord } from "./module.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { modals } from "@mantine/modals";

//icons

//styles

//components

export function InvoicePayments({ active, queryKey }: any) {
  // * DEFINITIONS

  const [dataActive, setActive] = useState<any>({});

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  const query = useQueryClient();

  useEffect(() => {
    setActive(active);
  }, []);

  // * COMPONENTS

  const queryData = useQuery({
    queryKey: ["invoice", "payments"],
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/billing/payment/",
        params: {
          invoice_id: active?.id,
        },
      });
      return res.reverse();
    },
    initialData: [],
  });

  // * ANIMATIONS

  return (
    <>
      <Stack py="md">
        <Paper withBorder p="sm" mx="md">
          <Group justify="space-between" wrap="nowrap">
            <Group gap="xs">
              <RingProgress
                size={50}
                thickness={8}
                roundCaps
                sections={[
                  {
                    value:
                      (Number(
                        dataActive?.total_amount - dataActive?.remaining_payment
                      ) /
                        Number(dataActive?.total_amount)) *
                      100,
                    color: "teal",
                  },
                ]}
              />

              <div>
                <Text size="sm">
                  {Math.round(
                    ((dataActive?.total_amount -
                      dataActive?.remaining_payment) /
                      Number(dataActive?.total_amount)) *
                      100
                  )}
                  % of the Invoice is Paid.
                </Text>
                <Text opacity={0.5} size="xs">
                  Rs. {dataActive?.total_amount - dataActive?.remaining_payment}{" "}
                  / {dataActive?.total_amount}
                </Text>
              </div>
            </Group>
          </Group>
        </Paper>

        <Paper>
          <FormHandler
            formType={"new"}
            {...formProps}
            initial={{
              ...formProps.initial,
              invoice: dataActive?.id,
            }}
            apiSubmit={(body) => {
              console.log(body);

              return createRecord({
                ...body,
                invoice: dataActive?.id,
              });
            }}
            onSubmitSuccess={(res) => {
              if (!res.err) {
                queryData?.refetch();
                setActive({
                  ...dataActive,
                  remaining_payment:
                    dataActive?.remaining_payment - Number(res?.data?.amount),
                });
              }
            }}
          >
            <Form />
          </FormHandler>
        </Paper>

        <Text size="xs" opacity={0.5} px="md">
          Payment Status
        </Text>

        <Table fs="xs" withTableBorder withRowBorders mx="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Source</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {queryData.data?.map((item: any, index: number) => {
              return (
                <Table.Tr
                  key={index}
                  style={{
                    opacity: item?.status == "Commited" ? 1 : 0.6,
                  }}
                >
                  <Table.Td>
                    <Text size="xs">{item.created_at.substring(0, 10)}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{item.gateway}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">Rs. {item?.amount}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={item?.status == "Commited" ? "brand" : "red"}
                      size="xs"
                    >
                      {item?.status == "Commited" ? "Commited" : "Cancelled"}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <ActionIcon
                      disabled={item?.status == "Rollback"}
                      onClickCapture={() => {
                        modals.openConfirmModal({
                          title: (
                            <Group>
                              <ActionIcon size="sm" color="red" variant="light">
                                <Warning size={12} />
                              </ActionIcon>
                              <Text
                                size="sm"
                                style={{
                                  fontWeight: 600,
                                }}
                              >
                                Please confirm your action
                              </Text>
                            </Group>
                          ),
                          children: (
                            <>
                              <Text size="xs" my="md">
                                This will permanently cancell the payment.
                                <br />
                                <br />
                                <span
                                  style={{
                                    fontWeight: 600,
                                  }}
                                >
                                  Are you sure you want to proceed?
                                </span>
                              </Text>
                              <Space h="6px" />
                            </>
                          ),
                          labels: { confirm: "Confirm", cancel: "Cancel" },
                          confirmProps: {
                            color: "red",
                            size: "xs",
                          },
                          cancelProps: {
                            size: "xs",
                          },
                          onCancel: () => {},
                          onConfirm: () => {
                            deleteRecord(item?.id).then((res) => {
                              if (!res.err) {
                                queryData?.refetch();
                                setActive({
                                  ...dataActive,
                                  remaining_payment:
                                    Number(dataActive?.remaining_payment) +
                                    Number(item?.amount),
                                });
                              }
                            });
                          },
                          styles: {
                            header: {
                              background: "var(--mantine-color-red-1)",
                            },
                          },
                          size: "sm",
                        });
                      }}
                      variant="light"
                      size="sm"
                      color="red"
                      onClick={() => {}}
                    >
                      <Trash size={12} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Stack>
    </>
  );
}
