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

  const { handleSubmit, current } = FormHandler.usePropContext();

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
              title="Add Reciept"
              description="Details of the payment receipt"
            />

            <SimpleGrid cols={2} spacing="xs">
              <DateInput
                label="Receipt Date"
                description="Select the date of the receipt"
                placeholder="Select date"
                {...form.getInputProps("receipt_date")}
              />
              <DateInput
                label="Package Renewed Till"
                description="Select the package renew date."
                placeholder="Select date"
                {...form.getInputProps("valid_till")}
              />
              <TextInput
                label="Payment Gateway"
                description="The gateway used for payment"
                placeholder="Enter payment gateway"
                {...form.getInputProps("gateway")}
              />
              <TextInput
                label="Amount"
                description="Total amount paid"
                placeholder="Enter amount"
                {...form.getInputProps("amount")}
              />
            </SimpleGrid>
            <Button
              variant="light"
              onClick={handleSubmit}
              leftSection={<Plus />}
            >
              Add Payment
            </Button>
          </Stack>
        </Paper>
      );
  }
}
