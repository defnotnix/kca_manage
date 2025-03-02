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
              title="General Details"
              description="Comprehensive student information & details"
            />

            <TextInput
              label="Package Name"
              description="Full legal name of the student or student organization. "
              placeholder="Enter full name"
              required
              {...form.getInputProps("name")}
            />

            <SimpleGrid cols={2}>
              <NumberInput
                hideControls
                label="Months"
                description="Full legal name of the student or student organization. "
                placeholder="Enter full name"
                required
                rightSectionWidth={100}
                rightSection={<Text size="xs">Months</Text>}
                {...form.getInputProps("month")}
              />
              <NumberInput
                hideControls
                leftSection={<Text size="xs">Rs.</Text>}
                label="Price"
                description="Full legal name of the student or student organization. "
                placeholder="Enter full name"
                required
                {...form.getInputProps("price")}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Package Particulars"
              description="Comprehensive contact information for the student or student organization."
              actionButton={
                <Button
                  size="xs"
                  leftSection={<Plus />}
                  onClick={() => {
                    form.insertListItem("specification", {});
                  }}
                >
                  Add
                </Button>
              }
            />

            {form.getValues()?.specification.length > 0 ? (
              <>
                <SimpleGrid cols={2}>
                  <div>
                    <Text size="xs">Service/Item</Text>
                    <Text size="xs" opacity={0.5}>
                      e.g. Admission, Service
                    </Text>
                  </div>
                  <div>
                    <Text size="xs">Price</Text>
                    <Text size="xs" opacity={0.5}>
                      Monthly Price
                    </Text>
                  </div>
                </SimpleGrid>

                {form
                  .getValues()
                  ?.specification.map((iteminfo: any, index: number) => (
                    <SimpleGrid cols={2} spacing="xs" key={index}>
                      <TextInput
                        placeholder="Item/Service"
                        required
                        {...form.getInputProps(`specification.${index}.name`)}
                      />
                      <NumberInput
                        leftSection={<Text size="xs">Rs.</Text>}
                        min={0}
                        placeholder="Price"
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
                        {...form.getInputProps(`specification.${index}.price`)}
                      />
                    </SimpleGrid>
                  ))}
              </>
            ) : (
              <>
                <Text size="xs" opacity={0.5} my="md">
                  Add specification/services to this package to make this
                  useful.
                </Text>
              </>
            )}
          </Stack>
        </>
      );
  }
}
