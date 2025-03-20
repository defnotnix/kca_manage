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
import { getRecords as getR } from "@/modules/bookings/module.api";

import { useParams } from "next/navigation";
import { moduleConfig } from "../module.config";

// Assuming you have these defined elsewhere

export function _Form() {
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
      const res = await getR({
        endpoint: "/players/info/drop/",
      });
      console.log("team", res);
      return res;
    },
    initialData: [],
  });

  const queryMembers = useQuery({
    queryKey: ["config", "members"], // query key
    queryFn: async () => {
      const res = await getRecords({
        endpoint: moduleConfig?.endpoint,
        params: {
          session_id: Params.id,
        },
      });

      return res?.player || [];
    },
    initialData: [],
  });

  // * FUNCTIONS

  useEffect(() => {
    form.setFieldValue("session_id", Params.id);
  }, []);

  // * COMPONENTS

  switch (current) {
    case 0:
      return (
        <>
          <Stack gap="xs" p="md">
            <MultiSelect
              data={queryData?.data
                ?.filter(
                  (e: any) =>
                    !queryMembers?.data?.some((ee: any) => ee.id === e.id) // Ensures filtering works
                )
                .map((e: any) => ({
                  value: String(e.id),
                  label: `${e.name}`,
                }))}
              label="Select Player"
              description="Select player to add to this team"
              placeholder="Select Player"
              required
              {...form.getInputProps("player")}
            />
          </Stack>
        </>
      );
  }
}
