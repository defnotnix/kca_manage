"use client";

import React, { useEffect, useState } from "react";
//next

//mantine
import {
  Badge,
  Button,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { Plus } from "@phosphor-icons/react";
import { FormHandler } from "@vframework/core";
import { formProps } from "./form/form.config";
//mantine
import { _Form as Form } from "./form/form";

import { getRecords, createRecord } from "./module.api";
import { useQuery } from "@tanstack/react-query";

//icons

//styles

//components

export function InvoicePayments({ active }: any) {
  // * DEFINITIONS

  const [dataActive, setActive] = useState({});

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  useEffect(() => {
    setActive(active);
  }, []);

  // * COMPONENTS

  const queryData = useQuery({
    queryKey: ["invoice", "payments"],
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/billing/payment/",
      });
      return res;
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
                      (Number(active?.paid_amount) /
                        Number(active?.total_amount)) *
                      100,
                    color: "teal",
                  },
                ]}
              />

              <div>
                <Text size="sm">
                  {Math.round(
                    (Number(active?.paid_amount) /
                      Number(active?.total_amount)) *
                      100
                  )}
                  % of the invoice is paid
                </Text>
                <Text opacity={0.5} size="xs">
                  Rs. {active?.paid_amount} / {active?.total_amount}
                </Text>
              </div>
            </Group>
          </Group>
        </Paper>

        <Paper>
          <FormHandler
            formType={"new"}
            {...formProps}
            apiSubmit={(endpoint, body) => {
              return createRecord({
                ...body,
                invoice: active?.id,
              });
            }}
            onSubmitSuccess={() => {}}
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
              <Table.Th>Medium</Table.Th>
              <Table.Th>Amount</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {queryData.data?.map((item: any, index: number) => {
              <Table.Tr key={index}>
                <Table.Td>{item.reciept_date}</Table.Td>
                <Table.Td>{item?.gateway}</Table.Td>
                <Table.Td>Rs. {item?.amount}</Table.Td>
              </Table.Tr>;
            })}
          </Table.Tbody>
        </Table>
      </Stack>
    </>
  );
}
