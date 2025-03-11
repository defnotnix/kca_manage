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
            <TextInput
              label="Service Name"
              description="Unique name of the service"
              placeholder="Enter service name"
              required
              {...form.getInputProps("name")}
            />

            <NumberInput
              hideControls
              label="Days"
              description="Number of days for the service"
              placeholder="Enter number of days"
              required
              {...form.getInputProps("days")}
            />

            <SimpleGrid cols={2}>
              <NumberInput
                hideControls
                label="Admission Fee"
                description="Fee for admission"
                placeholder="Enter fee"
                required
                leftSection={<Text size="xs">Rs.</Text>}
                {...form.getInputProps("admission_fee")}
              />
              <NumberInput
                hideControls
                label="Service Fee"
                description="Fee for the service"
                placeholder="Enter fee"
                required
                leftSection={<Text size="xs">Rs.</Text>}
                {...form.getInputProps("service_fee")}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Package Particulars"
              description="Comprehensive contact information for the student or student organization."
              actionButton={
                <Button
                  size="xs"
                  leftSection={<Plus />}
                  onClick={() =>
                    form.insertListItem("addon", { name: "", price: "" })
                  }
                >
                  Add
                </Button>
              }
            />

            {form.getValues()?.addon.length > 0 && (
              <SimpleGrid cols={2} mt="xs">
                <Text size="xs">Service/Item</Text>
                <Text size="xs">Price</Text>
              </SimpleGrid>
            )}

            {form.getValues()?.addon.map((item: any, index: number) => (
              <SimpleGrid cols={2} spacing="xs" key={index}>
                <TextInput
                  placeholder="Item/Service"
                  required
                  {...form.getInputProps(`addon.${index}.name`)}
                />
                <NumberInput
                  leftSection={<Text size="xs">Rs.</Text>}
                  min={0}
                  placeholder="Price"
                  required
                  rightSection={
                    <ActionIcon
                      onClick={() => form.removeListItem("addon", index)}
                      color="red"
                      variant="light"
                    >
                      <Trash />
                    </ActionIcon>
                  }
                  {...form.getInputProps(`addon.${index}.price`)}
                />
              </SimpleGrid>
            ))}
          </Stack>
        </>
      );
  }
}
