"use client";

import React, { useEffect } from "react";
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

//icons

//styles

//components

export function InvoicePayments({ active }: any) {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  useEffect(() => {
    console.log(active);
  }, []);

  // * COMPONENTS

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
                      (Number(active?.paid_amount) / Number(active?.amount)) *
                      100,
                    color: "teal",
                  },
                ]}
              />

              <div>
                <Text size="sm">
                  {(Number(active?.paid_amount) / Number(active?.amount)) * 100}
                  % of the invoice is paid
                </Text>
                <Text opacity={0.5} size="xs">
                  Rs. {active?.paid_amount} / {active?.amount}
                </Text>
              </div>
            </Group>
          </Group>
        </Paper>

        <Paper>
          <FormHandler
            formType={"new"}
            {...formProps}
            apiSubmit={createRecord}
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
            <Table.Tr>
              <Table.Td>23 May, 2025</Table.Td>
              <Table.Td>Cash</Table.Td>
              <Table.Td>Rs. 2500</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Stack>
    </>
  );
}
