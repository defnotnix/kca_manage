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
  Loader,
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
import { getRecords } from "../../module.api";

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

  const queryGrounds = useQuery({
    queryKey: ["config", "grounds"], // query key
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/services/grounds/",
      });

      return res;
    },
    initialData: [],
  });

  const queryTimeFrames = useQuery({
    queryKey: ["config", "timeframes"], // query key
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/services/time/frames/",
      });

      return res;
    },
    initialData: [],
  });

  // * COMPONENTS'

  if (queryGrounds.isLoading || queryTimeFrames.isLoading) {
    return (
      <Center h={400}>
        <Loader />
      </Center>
    );
  }

  switch (current) {
    case 0:
      return (
        <>
          <Stack gap="xs" p="md">
            <SimpleGrid cols={2} spacing="xs">
              <Select
                label="Select Session"
                description="Select session to add to this routine"
                data={queryTimeFrames?.data?.map((item: any) => {
                  return {
                    value: String(item.id),
                    label: `${item.start_time} - ${item.end_time}`,
                  };
                })}
                placeholder="Select Ground"
                {...form.getInputProps(`time`)}
              />
              <Select
                label="Select Ground"
                description="Select ground to add to this routine"
                data={queryGrounds?.data?.map((item: any) => {
                  return {
                    value: String(item.id),
                    label: item.name || "",
                  };
                })}
                placeholder="Select Ground"
                {...form.getInputProps(`ground`)}
              />
            </SimpleGrid>
          </Stack>
        </>
      );
  }
}
