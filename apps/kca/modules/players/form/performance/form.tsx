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

// Assuming you have these defined elsewhere

export function _FormAchievement() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  const [category, setCategory] = useState<any[]>([]);

  // * PRELOADING

  // * FUNCTIONS

  // * COMPONENTS

  switch (current) {
    case 0:
      return (
        <>
          <Paper px="lg" py="md" withBorder>
            <Stack gap="xs">
              <FormElement.SectionTitle
                isTopElement
                title="Achievement Details"
                description="Comprehensive student information & details"
              />

              <TextInput
                label="Achievement Title"
                description="Enter the title of the achievement"
                placeholder="Enter achievement title"
                {...form.getInputProps("title")}
              />

              <DateInput
                label="Achievement Date"
                description="Enter the description of the achievement"
                placeholder="Enter achievement description"
                {...form.getInputProps("date")}
              />
            </Stack>
          </Paper>
        </>
      );
  }
}
