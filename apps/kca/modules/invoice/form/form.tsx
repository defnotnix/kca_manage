"use client";

import React, { useState } from "react";
//mantine
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  FileButton,
  FileInput,
  Grid,
  Group,
  Image,
  MultiSelect,
  NumberInput,
  Paper,
  Pill,
  PillsInput,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
//framework
import { FormHandler } from "@vframework/core";
import { FormElement, ImageUpload } from "@vframework/ui";
import { DateInput, YearPickerInput } from "@mantine/dates";

import { useQuery } from "@tanstack/react-query";

import classes from "./form.module.css";
import { Plus, Trash } from "@phosphor-icons/react";
import { randomId } from "@mantine/hooks";

// Assuming you have these defined elsewhere

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  // * PRELOADING

  // * FUNCTIONS

  // * COMPONENTS

  switch (current) {
    case 0:
      return (
        <Paper px="lg" py="md" withBorder>
          <Stack gap="xs">
            <FormElement.SectionTitle
              isTopElement
              title="Invoice Details"
              description="Details of the bill"
            />

            <SimpleGrid cols={2} spacing="xs">
              <TextInput
                label="Invoice Number"
                description="Bill number of the invoice"
                placeholder="Enter bill number"
                {...form.getInputProps("bill_number")}
              />
              <DateInput
                label="Date of Invoice"
                description="Bill number of the invoice"
                placeholder="Select date of invoice generation"
                {...form.getInputProps("date")}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Billed To"
              description="Person this bill is assigned to"
            />

            <SimpleGrid cols={2} spacing="xs">
              <TextInput
                label="Student"
                description="Bill number of the invoice"
                placeholder="Enter bill number"
                {...form.getInputProps("student")}
              />
              <TextInput
                label="Full Name"
                description="Bill number of the invoice"
                placeholder="Enter bill number"
                {...form.getInputProps("billing_name")}
              />
              <TextInput
                label="Invoice Address"
                description="Address of person this bill is assigned to"
                placeholder="e.g. Balkot, Kathmandu, Nepal"
                {...form.getInputProps("billing_address")}
              />
              <TextInput
                label="Billing Contact"
                description="Bill number of the invoice"
                placeholder="Enter bill number"
                {...form.getInputProps("billing_contact")}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Particulars"
              description="Comprehensive batting details for the player."
              actionButton={
                <Button
                  onClick={() => {
                    form.insertListItem("items", { id: randomId() });
                  }}
                  leftSection={<Plus />}
                >
                  Add
                </Button>
              }
            />

            <Table cellSpacing={"xs"} fs="xs">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>#</Table.Th>
                  <Table.Th
                    style={{
                      width: "50%",
                    }}
                  >
                    Particulars
                  </Table.Th>
                  <Table.Th>Rate</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>#</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {form
                  .getValues()
                  ?.items?.map((iteminfo: any, index: number) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Text size="xs">{index + 1}</Text>
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          variant="filled"
                          placeholder="Item Description"
                          {...form.getInputProps(`items.${index}.description`)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          variant="filled"
                          placeholder="Item Rate"
                          {...form.getInputProps(`items.${index}.rate`)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          variant="filled"
                          placeholder="Amount"
                          {...form.getInputProps(`items.${index}.amount`)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon
                          variant="light"
                          color="red"
                          size="sm"
                          onClick={() => {
                            form.removeListItem(`items`, index);
                          }}
                        >
                          <Trash />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
              </Table.Tbody>
            </Table>
          </Stack>
        </Paper>
      );
  }
}
