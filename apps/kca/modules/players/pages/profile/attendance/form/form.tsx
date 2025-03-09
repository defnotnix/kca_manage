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

// Assuming you have these defined elsewhere

import { getRecords as getTournaments } from "@/modules/tournament/module.api";
import { useParams } from "next/navigation";

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();
  const Params = useParams();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  // * PRELOADING

  // * FUNCTIONS

  const queryTournament = useQuery({
    queryKey: ["tournament", "tournamentData"],
    queryFn: async () => {
      const res = await getTournaments({
        endpoint: "players/tournament/",
      });
      return res;
    },
  });

  // * COMPONENTS

  useEffect(() => {
    form.setFieldValue("player", Params.id);
  }, []);

  if (queryTournament.isLoading) {
    return (
      <>
        <Center h={400}>
          <Loader size="xs" />
        </Center>
      </>
    );
  }

  switch (current) {
    case 0:
      return (
        <>
          <Stack gap="xs" p="md">
            <FormElement.SectionTitle
              isTopElement
              title="Attendance Details"
              description="Record the attendance status of the student"
            />

            <DateInput
              label="Attendance Date"
              description="Select the date for attendance record"
              placeholder="Enter attendance date"
              {...form.getInputProps("date")}
            />
            <Select
              label="Present Status"
              data={[
                {
                  value: "1",
                  label: "Present",
                },
                {
                  value: "0",
                  label: "Absent",
                },
              ]}
              description="Mark whether the student was present or absent."
              placeholder="Select"
              {...form.getInputProps("is_present")}
            />
          </Stack>
        </>
      );
  }
}
