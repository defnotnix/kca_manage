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
import { getRecords as getPackages } from "@/modules/packages/module.api";

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
              <DateInput
                label="Invoice Date"
                description="Select the date of the invoice"
                placeholder="Select date"
                disabled
                {...form.getInputProps("invoice_date")}
              />
              <TextInput
                label="Invoice Number"
                description="Unique number assigned to the invoice"
                placeholder="Enter invoice number"
                {...form.getInputProps("invoice_number")}
                disabled
              />
              <TextInput
                label="Bill Number"
                description="If an actual bill is printed, enter its number"
                placeholder="Enter bill number"
                {...form.getInputProps("bill_id")}
              />
              <NumberInput
                label="Tax Percentage"
                description="Percentage of tax applied to the invoice"
                placeholder="Enter tax percentage"
                {...form.getInputProps("taxable_percent")}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Billed To"
              description="Person this bill is assigned to"
              actionButton={
                <Group gap="xs">
                  {form.getValues().is_student && (
                    <Paper
                      style={{
                        cursor: "pointer",
                      }}
                      p="xs"
                      withBorder
                      bg={form.getValues().bill_student ? "brand.0" : ""}
                      onClick={() => {
                        form.setFieldValue(
                          "is_student",
                          !form.getValues().bill_student
                        );
                      }}
                    >
                      <Checkbox
                        label="Bill to student"
                        checked={form.getValues().bill_student}
                        onChange={(e) => {
                          console.log(e);
                          form.setFieldValue("bill_student", e.target?.checked);
                        }}
                      />
                    </Paper>
                  )}

                  <Paper
                    style={{
                      cursor: "pointer",
                    }}
                    p="xs"
                    withBorder
                    bg={form.getValues().is_student ? "brand.0" : ""}
                    onClick={() => {
                      form.setFieldValue(
                        "is_student",
                        !form.getValues().is_student
                      );
                    }}
                  >
                    <Checkbox
                      label="Student Invoice"
                      checked={form.getValues().is_student}
                      onChange={(e) => {
                        console.log(e);
                        form.setFieldValue("is_student", e.target?.checked);
                        if (!e.target?.checked) {
                          form.setFieldValue("bill_student", false);
                        }
                      }}
                    />
                  </Paper>
                </Group>
              }
            />

            {form.getValues().is_student ? (
              <SimpleGrid cols={2} spacing="xs">
                <Select
                  data={queryStudent?.data?.map((sinfo: any) => {
                    return {
                      value: String(sinfo.id),
                      label: `${sinfo.name} (${sinfo.member_id})}`,
                    };
                  })}
                  label="Select Student"
                  description="Bill number of the invoice"
                  placeholder="Enter bill number"
                  {...form.getInputProps("student")}
                  onChange={(e) => {
                    form.setFieldValue("student_id", e);

                    const selected = queryStudent?.data?.find(
                      (sinfo: any) => sinfo.id == e
                    );

                    if (selected) {
                      if (form.getValues().bill_student) {
                        form.setFieldValue("customer_name", selected.name);
                        form.setFieldValue(
                          "customer_contact",
                          selected.contact
                        );
                        form.setFieldValue(
                          "customer_address",
                          selected.temp_address || selected.permanent_address
                        );
                        form.setFieldValue(
                          "invoice_details",
                          selected.package?.specification?.map((item: any) => {
                            return {
                              description: item.name,
                              quantity: 1,
                              price: item.price,
                            };
                          })
                        );
                      } else {
                        form.setFieldValue(
                          "customer_name",
                          selected.parent_name
                        );
                        form.setFieldValue(
                          "customer_contact",
                          selected.primary_contact
                        );
                        form.setFieldValue(
                          "customer_address",
                          selected.temp_address || selected.permanent_address
                        );
                        form.setFieldValue(
                          "invoice_details",
                          selected.package?.specification?.map((item: any) => {
                            return {
                              description: item.name,
                              quantity: 1,
                              price: item.price,
                            };
                          })
                        );
                      }
                    }
                  }}
                />
                <TextInput
                  label="PAN/VAT Number"
                  description="Enter PAN/VAT number if applicable, leave empty if not"
                  placeholder="Enter PAN/VAT number"
                  {...form.getInputProps("customer_pan")}
                />
              </SimpleGrid>
            ) : (
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
            )}

            {form.getValues().is_student && (
              <Alert
                icon={<Info />}
                title={
                  !form.getValues()?.bill_student
                    ? "Billed to details is set to Student's Guardian Details"
                    : "Billed to details is set to Student's Details"
                }
              />
            )}

            <FormElement.SectionTitle
              title="Particulars"
              description="Comprehensive batting details for the player."
              actionButton={
                <Button
                  onClick={() => {
                    form.insertListItem("invoice_details", { id: randomId() });
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
                  ?.invoice_details?.map((iteminfo: any, index: number) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Text size="xs">{index + 1}</Text>
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          variant="filled"
                          placeholder="Item Description"
                          {...form.getInputProps(
                            `invoice_details.${index}.description`
                          )}
                        />
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          variant="filled"
                          placeholder="Item Rate"
                          {...form.getInputProps(
                            `invoice_details.${index}.price`
                          )}
                        />
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          variant="filled"
                          placeholder="Amount"
                          {...form.getInputProps(
                            `invoice_details.${index}.quantity`
                          )}
                        />
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon
                          variant="light"
                          color="red"
                          size="sm"
                          onClick={() => {
                            form.removeListItem(`invoice_details`, index);
                          }}
                        >
                          <Trash />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
              </Table.Tbody>
            </Table>

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
