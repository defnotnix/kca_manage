"use client";

import React, { useEffect, useState } from "react";
//mantine
import {
  ActionIcon,
  Avatar,
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
  Indicator,
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
  ThemeIcon,
} from "@mantine/core";
//framework
import { FormHandler } from "@vframework/core";
import { FormElement, ImageUpload } from "@vframework/ui";
import {
  DateInput,
  DatePicker,
  DatePickerProps,
  TimeInput,
  YearPickerInput,
} from "@mantine/dates";

import { useQuery } from "@tanstack/react-query";

import classes from "./form.module.css";
import { getRecords } from "../module.api";
import { start } from "repl";
import _ from "moment";

// Assuming you have these defined elsewhere

export function _FormTime({ active }: any) {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  // * PRELOADING

  // * FUNCTIONS

  // * COMPONENTS

  useEffect(() => {
    if (active) {
      form.setValues({
        id: active.id,
        start_time: active.start_time,
        end_time: active.end_time,
      });
    }
  }, [active]);

  switch (current) {
    case 0:
      return (
        <>
          <Stack gap="xs" p="md">
            <FormElement.SectionTitle
              isTopElement
              title="Select Start/End Session for this Booking"
              description="Comprehensive service information & details"
            />

            <SimpleGrid cols={2} spacing="xs">
              <TimeInput
                label="Start Time"
                placeholder="Enter start time"
                description="Enter the start time of the session in 24 Hour Format"
                {...form.getInputProps("start_time")}
              />
              <TimeInput
                min={form.getValues().start_time}
                label="End Time"
                placeholder="Enter end time"
                description="Enter the end time of the session in 24 Hour Format"
                {...form.getInputProps("end_time")}
              />
            </SimpleGrid>
          </Stack>
        </>
      );
  }
}
