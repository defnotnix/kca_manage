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

import { useMutation, useQuery } from "@tanstack/react-query";

import { getRecords } from "../module.api";

import classes from "./form.module.css";
import { Check, Plus, Trash } from "@phosphor-icons/react";

// Assuming you have these defined elsewhere

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  // * PRELOADING

  const queryCategory = useQuery({
    queryKey: ["service", "addon-category"],
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/services/addons/category/",
      });
      return res;
    },
    initialData: [],
  });

  const queryAddons = useQuery({
    queryKey: ["service", "addons"],
    queryFn: async (id: any) => {
      const res = await getRecords({
        endpoint: "/services/addons/",
      });
      console.log(res);
      return res;
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
              description="Additional Services/Items"
              actionButton={
                <Select
                  data={[
                    {
                      value: "x",
                      label: "All",
                    },
                    ...queryCategory.data?.map((item: any) => {
                      return {
                        value: String(item.id),
                        label: item.name,
                      };
                    }),
                  ]}
                  placeholder="Item/Service"
                  nothingFoundMessage="No add-ons added yet"
                  required
                  {...form.getInputProps(`category`)}
                />
              }
            />

            <SimpleGrid cols={2} spacing="xs">
              {queryAddons.data
                ?.filter((e: any) => {
                  if (form.getValues()?.category == "x") {
                    return true;
                  } else {
                    return e.category == form.getValues()?.category;
                  }
                })
                .map((item: any, index: number) => {
                  return (
                    <Checkbox.Card
                      key={index}
                      className={classes.card}
                      radius="md"
                      checked={form.getValues()?.addon.includes(item.id)}
                      onClick={() => {
                        if (form.getValues()?.addon.includes(item.id)) {
                          form.setFieldValue(
                            "addon",
                            form.getValues()?.addon.filter((e: any) => {
                              return e !== item.id;
                            })
                          );
                        } else {
                          form.setFieldValue("addon", [
                            ...(form.getValues()?.addon || []),
                            item.id,
                          ]);
                        }
                      }}
                    >
                      <Group wrap="nowrap" align="flex-start">
                        <Checkbox.Indicator />
                        <div>
                          <Text size="xs" fw={600}>
                            {item.name}
                          </Text>
                        </div>
                      </Group>
                    </Checkbox.Card>
                  );
                })}
            </SimpleGrid>
          </Stack>
        </>
      );
  }
}
