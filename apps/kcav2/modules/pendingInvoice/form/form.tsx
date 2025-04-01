"use client";

import React, { useState } from "react";
//mantine
import {
  ActionIcon,
  Alert,
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
import { Info, Plus, Trash } from "@phosphor-icons/react";
import { randomId } from "@mantine/hooks";

import { getRecords as getPlayers } from "@/modules/players/module.api";

// Assuming you have these defined elsewhere

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  // * PRELOADING

  const queryStudent = useQuery({
    queryKey: ["invoice", "players"],
    queryFn: async () => {
      const res = await getPlayers({
        endpoint: "/players/info/",
      });

      return res;
    },
  });

  // * FUNCTIONS

  // * COMPONENTS

  const RenderOverview = () => {
    const _subtotal = form
      .getValues()
      ?.invoice_items?.reduce(
        (sum: any, item: any) => sum + (item.price || 0) * (item.quantity || 0),
        0
      );

    const _vatamount =
      (Number(form.getValues()?.taxable_percent || 0) / 100) * _subtotal;

    return (
      <>
        <Table.Tr>
          <Table.Td></Table.Td>
          <Table.Td
            style={{
              width: "50%",
            }}
          ></Table.Td>
          <Table.Td></Table.Td>
          <Table.Td fw={800}>Subtotal</Table.Td>
          <Table.Td>{_subtotal}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td></Table.Td>
          <Table.Td
            style={{
              width: "50%",
            }}
          ></Table.Td>
          <Table.Td></Table.Td>
          <Table.Td fw={800}>VAT / TAX</Table.Td>
          <Table.Td>{String(_vatamount)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td></Table.Td>
          <Table.Td
            style={{
              width: "50%",
            }}
          ></Table.Td>
          <Table.Td></Table.Td>
          <Table.Td fw={800}>Discount</Table.Td>
          <Table.Td>{form.getValues()?.discount}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td></Table.Td>
          <Table.Td
            style={{
              width: "50%",
            }}
          ></Table.Td>
          <Table.Td></Table.Td>
          <Table.Td fw={800}>Total </Table.Td>
          <Table.Td>
            {String(
              Number(_subtotal) +
                _vatamount -
                Number(form.getValues()?.discount || 0)
            )}
          </Table.Td>
        </Table.Tr>
      </>
    );
  };

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
                disabled
                label="Bill Date"
                description="If an actual bill is printed, enter its number"
                placeholder="Enter bill number"
                {...form.getInputProps("bill_date")}
              />
              <NumberInput
                label="Tax Percentage"
                description="Percentage of tax applied to the invoice"
                placeholder="Enter tax percentage"
                {...form.getInputProps("taxable_percent")}
              />
              <DateInput
                label="Renew Date"
                description="Date of Package Renewal"
                placeholder="Select Renew Date"
                {...form.getInputProps("renew_date")}
              />
              <DateInput
                label="Expiry Date"
                description="New Date for Package Expiry"
                placeholder="Select Expiry Date"
                {...form.getInputProps("expiry_date")}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Billed To"
              description="Person this bill is assigned to"
            />

            <SimpleGrid cols={2} spacing="xs">
              <TextInput
                label="Full Name / Organization"
                description="Name of the individual or organization being billed"
                placeholder="Enter full name or organization name"
                {...form.getInputProps("customer_name")}
              />
              <TextInput
                label="Invoice Address"
                description="Address of the recipient of this invoice"
                placeholder="e.g. Balkot, Kathmandu, Nepal"
                {...form.getInputProps("customer_address")}
              />
              <TextInput
                label="Billing Contact"
                description="Phone number or email of the billing recipient"
                placeholder="Enter contact number or email"
                {...form.getInputProps("customer_contact")}
              />
              <TextInput
                label="PAN/VAT Number"
                description="Enter PAN/VAT number if applicable, leave empty if not"
                placeholder="Enter PAN/VAT number"
                {...form.getInputProps("customer_pan")}
              />
            </SimpleGrid>
            <FormElement.SectionTitle
              title="Discounts"
              description="Details of the bill"
            />

            <SimpleGrid cols={2} spacing="xs">
              <NumberInput
                min={0}
                label="Discount Amount"
                description="Enter the discount applied to the invoice"
                placeholder="Enter discount amount"
                {...form.getInputProps("discount")}
              />
              <TextInput
                label="Discount Issued By"
                description="Name of the person or department authorizing the discount"
                placeholder="Enter name"
                {...form.getInputProps("discount_issued_by")}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Particulars"
              description="Comprehensive batting details for the player."
              actionButton={
                <Button
                  onClick={() => {
                    form.insertListItem("invoice_items", { id: randomId() });
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
                  ?.invoice_items?.map((iteminfo: any, index: number) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Text size="xs">{index + 1}</Text>
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          variant="filled"
                          placeholder="Item Description"
                          {...form.getInputProps(
                            `invoice_items.${index}.description`
                          )}
                        />
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          variant="filled"
                          placeholder="Item Rate"
                          {...form.getInputProps(
                            `invoice_items.${index}.price`
                          )}
                        />
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          variant="filled"
                          placeholder="Amount"
                          {...form.getInputProps(
                            `invoice_items.${index}.quantity`
                          )}
                        />
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon
                          variant="light"
                          color="red"
                          size="sm"
                          onClick={() => {
                            form.removeListItem(`invoice_items`, index);
                          }}
                        >
                          <Trash />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}

                <RenderOverview />
              </Table.Tbody>
            </Table>

            <FormElement.SectionTitle
              title="Advance Payments / Booking Payments"
              description="Any advance payments or pre-booking details."
            />

            <NumberInput
              min={0}
              label="Advance/Booking Amount"
              description="Enter the advance amount paid for this invoice"
              placeholder="Enter amount"
              {...form.getInputProps("advance")}
            />

            <Textarea
              rows={10}
              label="Remarks"
              description="Bill number of the invoice"
              placeholder="Enter bill number"
              {...form.getInputProps("remarks")}
            />
          </Stack>
        </Paper>
      );
  }
}
