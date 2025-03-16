"use client";

import React, { useEffect, useState } from "react";
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
import { DateInput, TimeInput, YearPickerInput } from "@mantine/dates";

import { useQuery } from "@tanstack/react-query";

import classes from "./form.module.css";
import { Plus, Trash } from "@phosphor-icons/react";
import { getRecords } from "../module.api";
import { useParams } from "next/navigation";
import { moduleConfig } from "../module.config";

// Assuming you have these defined elsewhere

export function _FormEdit() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  const Params = useParams();

  // * PRELOADING

  const queryData = useQuery({
    queryKey: ["config", "teams"], // query key
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/players/drop/",
        params: {
          team_id: Params.id,
        },
      });
      console.log("team", res);
      return res;
    },
    initialData: [],
  });

  // * FUNCTIONS

  useEffect(() => {
    form.setFieldValue("team", Params.id);
  }, []);

  // * COMPONENTS

  switch (current) {
    case 0:
      return (
        <>
          <Stack gap="xs" p="md">
            <Select
              data={queryData?.data.map((e: any) => ({
                value: String(e.id),
                label: `${e.name} - ${e.member_id}`,
              }))}
              label="Select Player"
              description="Select player to add to this team"
              placeholder="Select Player"
              required
              {...form.getInputProps("player")}
            />
            <TextInput
              label="Member Role"
              description="Enter the name of the team"
              placeholder="e.g. KCA Main Team"
              required
              {...form.getInputProps("role")}
            />
          </Stack>
        </>
      );
  }
}
