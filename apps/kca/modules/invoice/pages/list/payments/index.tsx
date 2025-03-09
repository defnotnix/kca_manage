"use client";

import React from "react";
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

//icons

//styles

//components

export function InvoicePayments({ active }: any) {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

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
                sections={[{ value: 50, color: "teal" }]}
              />

              <div>
                <Text size="sm">75% of the invoice is paid</Text>
                <Text opacity={0.5} size="xs">
                  Rs. 5,000/7,500
                </Text>
              </div>
            </Group>
          </Group>
        </Paper>

        <Paper>
          <FormHandler
            formType={"new"}
            {...formProps}
            apiSubmit={() => {}}
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
