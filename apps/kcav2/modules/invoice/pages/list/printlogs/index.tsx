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

//icons

//styles

//components

export function InvoicePrintings({ active }: any) {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <Stack py="md">
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
