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
            <ImageUpload
              {...form.getInputProps("image")}
              label="Ground Image"
              onChange={(image: any) => form.setFieldValue("image", image)}
              value={form.getValues()?.image}
            />
            <TextInput
              label="Add-On's Name"
              description="Unique name of the service"
              placeholder="Enter service name"
              required
              {...form.getInputProps("name")}
            />

            <SimpleGrid cols={2} spacing="xs">
              <NumberInput
                hideControls
                label="Price"
                description="Service/Item price"
                placeholder="Enter price"
                required
                leftSection={<Text size="xs">Rs.</Text>}
                {...form.getInputProps("price")}
              />

              <Select
                label="Category"
                description="Select a category for the service"
                placeholder="Choose category"
                data={[]} // Populate dynamically
                {...form.getInputProps("category")}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Add On's Specifications"
              description="Comprehensive contact information for the student or student organization."
              actionButton={
                <Button
                  size="xs"
                  leftSection={<Plus />}
                  onClick={() =>
                    form.insertListItem("specification", {
                      key: "",
                      value: "",
                    })
                  }
                >
                  Add
                </Button>
              }
            />

            {form.getValues()?.specification.length > 0 && (
              <SimpleGrid cols={2} mt="xs">
                <Text size="xs">Title</Text>
                <Text size="xs">Description</Text>
              </SimpleGrid>
            )}

            {form.getValues()?.specification.map((item: any, index: number) => (
              <SimpleGrid cols={2} spacing="xs" key={index}>
                <TextInput
                  placeholder="Specification Key"
                  required
                  {...form.getInputProps(`specification.${index}.key`)}
                />
                <TextInput
                  placeholder="Specification Value"
                  required
                  rightSection={
                    <ActionIcon
                      onClick={() =>
                        form.removeListItem("specification", index)
                      }
                      color="red"
                      variant="light"
                    >
                      <Trash />
                    </ActionIcon>
                  }
                  {...form.getInputProps(`specification.${index}.value`)}
                />
              </SimpleGrid>
            ))}
          </Stack>
        </>
      );
  }
}
