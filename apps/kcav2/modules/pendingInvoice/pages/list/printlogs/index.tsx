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
import { useQuery } from "@tanstack/react-query";
import { getPaymentLogs } from "@/modules/invoice/module.api";

//icons

//styles

//components

export function InvoicePrintings({ active }: any) {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  const queryData = useQuery({
    queryKey: ["invoice", "list", "data"],
    queryFn: active?.id
      ? async () => {
          const res = await getPaymentLogs({
            params: {
              invoice_id: active?.id,
            },
          });
          console.log(res);
          return res;
        }
      : undefined,
  });

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <Stack py="md">
        <Table fs="xs" withTableBorder withRowBorders mx="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>User</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {queryData?.data?.map((item: any, index: number) => (
              <Table.Tr key={index}>
                <Table.Td>{item?.date?.substring(0, 10)}</Table.Td>
                <Table.Td>{item?.user?.name || "User Name"}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </>
  );
}
