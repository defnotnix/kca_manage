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
import { DateInput, YearPickerInput } from "@mantine/dates";

import { useQuery } from "@tanstack/react-query";

import classes from "./form.module.css";
import { Plus, Trash } from "@phosphor-icons/react";

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
        <>
          <Stack gap="xs" p="md">
            <SimpleGrid cols={2} spacing="xs">
              <TextInput
                label="Start Time"
                description="Start Time in 24 hour format"
                disabled
                required
                {...form.getInputProps("start_time")}
              />

              <TextInput
                label="End Time"
                description="End Time in 24 hour format"
                disabled
                required
                {...form.getInputProps("end_time")}
              />
            </SimpleGrid>

            <Select
              label="Time Frame Status"
              data={[
                {
                  label: "Enable",
                  value: "1",
                },
                {
                  label: "Disable",
                  value: "0",
                },
              ]}
              {...form.getInputProps("status")}
            />
          </Stack>
        </>
      );
  }
}
