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

  // * COMPONENTS'

  switch (current) {
    case 0:
      return (
        <>
          <Stack gap="xs" p="md">
            <ImageUpload
              {...form.getInputProps("image")}
              label="Ground Image"
              onChange={(image: any) => form.setFieldValue("image", image)}
              value={form.getValues()?.image}
            />

            <TextInput
              label="Ground Name"
              description="Unique name of the service"
              placeholder="Enter service name"
              required
              {...form.getInputProps("name")}
            />

            <TextInput
              label="Pitch"
              description="Short description of the service"
              placeholder="Enter pitch"
              required
              {...form.getInputProps("pitch")}
            />

            <SimpleGrid cols={2}>
              <NumberInput
                hideControls
                label="Hourly Price"
                description="Price per hour"
                placeholder="Enter price"
                required
                leftSection={<Text size="xs">Rs.</Text>}
                {...form.getInputProps("price_hr")}
              />
              <NumberInput
                hideControls
                label="Daily Price"
                description="Price per day"
                placeholder="Enter price"
                required
                leftSection={<Text size="xs">Rs.</Text>}
                {...form.getInputProps("price_day")}
              />
            </SimpleGrid>

            <SimpleGrid cols={2}>
              <NumberInput
                hideControls
                label="Hourly Booking Price"
                description="Advance booking price per hour"
                placeholder="Enter price"
                required
                leftSection={<Text size="xs">Rs.</Text>}
                {...form.getInputProps("booking_price_hr")}
              />
              <NumberInput
                hideControls
                label="Daily Booking Price"
                description="Advance booking price per day"
                placeholder="Enter price"
                required
                leftSection={<Text size="xs">Rs.</Text>}
                {...form.getInputProps("booking_price_day")}
              />
            </SimpleGrid>
          </Stack>
        </>
      );
  }
}
