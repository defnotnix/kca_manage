"use client";

import React, { useEffect, useState } from "react";
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
              <Select
                data={[
                  {
                    value: "1",
                    label: "Cash",
                  },
                  {
                    value: "2",
                    label: "Cheque",
                  },
                  {
                    value: "3",
                    label: "E-Sewa",
                  },
                  {
                    value: "4",
                    label: "FonePay",
                  },
                  {
                    value: "5",
                    label: "Khalti",
                  },
                  {
                    value: "6",
                    label: "Others",
                  },
                ]}
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
