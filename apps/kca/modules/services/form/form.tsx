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
            <FormElement.SectionTitle
              isTopElement
              title="Service Details"
              description="Comprehensive service information & details"
            />

            <ImageUpload
              {...form.getInputProps("image")}
              label="Service Image"
              onChange={(image: any) => form.setFieldValue("image", image)}
              value={form.getValues()?.image}
            />

            <TextInput
              label="Service Name"
              description="Full name of the service."
              placeholder="Enter service name"
              required
              {...form.getInputProps("name")}
            />

            <Textarea
              rows={5}
              label="Description"
              description="Brief details about the service."
              placeholder="Enter service description"
              required
              {...form.getInputProps("description")}
            />

            <SimpleGrid cols={2} spacing="xs">
              <NumberInput
                label="Base Price / Hour"
                description="Cost of service per hour."
                placeholder="Enter hourly rate"
                required
                {...form.getInputProps("basePrice")}
              />

              <NumberInput
                label="Price / Day"
                description="Cost of service per day."
                placeholder="Enter daily rate"
                required
                {...form.getInputProps("pricePerDay")}
              />
            </SimpleGrid>

            <MultiSelect
              label="Available Add-Ons"
              description="Select additional services available."
              placeholder="Choose add-ons"
              data={[]}
              {...form.getInputProps("addOns")}
            />
          </Stack>
        </>
      );
  }
}
