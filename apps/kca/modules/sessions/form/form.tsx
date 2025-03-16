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
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
//framework
import { FormHandler } from "@vframework/core";
import { FormElement, ImageUpload } from "@vframework/ui";
import { DateInput, TimeInput, YearPickerInput } from "@mantine/dates";

import { useQuery } from "@tanstack/react-query";

import classes from "./form.module.css";
import { Plus, Trash } from "@phosphor-icons/react";

import { getRecords as getAccounts } from "@/modules/accounts/module.api";

// Assuming you have these defined elsewhere

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  // * PRELOADING

  const queryData = useQuery({
    queryKey: ["sessions", "accounts"],
    queryFn: async () => {
      const res = await getAccounts({
        endpoint: "/authenticate/users/",
      });

      return res.filter((item: any) => {
        return item.is_coach;
      });
    },
    initialData: [],
  });

  // * FUNCTIONS

  // * COMPONENTS

  switch (current) {
    case 0:
      return (
        <>
          <Stack gap="xs" p="md">
            <TextInput
              label="Session Name"
              description="Enter the name of the training session."
              placeholder="Enter session name"
              required
              {...form.getInputProps("name")}
            />

            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xs">
              <TimeInput
                label="Session Start Time"
                description="Specify the time or schedule for this session."
                placeholder="e.g. Monday 10 AM - 12 PM"
                required
                {...form.getInputProps("start_time")}
              />
              <TimeInput
                label="Session End Time"
                description="Specify the time or schedule for this session."
                placeholder="e.g. Monday 10 AM - 12 PM"
                required
                {...form.getInputProps("end_time")}
              />
            </SimpleGrid>

            <Select
              data={queryData?.data?.map((item: any, index: number) => {
                return {
                  value: String(item.id),
                  label: item.name,
                };
              })}
              label="Session Coach"
              description="Select the coach responsible for this session."
              placeholder="Enter coach name"
              required
              {...form.getInputProps("coach_id")}
            />
          </Stack>
        </>
      );
  }
}
