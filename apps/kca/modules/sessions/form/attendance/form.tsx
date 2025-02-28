"use client";

import React, { useEffect, useState } from "react";
//mantine
import {
  ActionIcon,
  Avatar,
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
  Space,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
//framework
import { FormHandler } from "@vframework/core";
import { FormElement, ImageUpload, triggerNotification } from "@vframework/ui";
import { DateInput, TimeInput, YearPickerInput } from "@mantine/dates";

import { useMutation, useQuery } from "@tanstack/react-query";

import classes from "./form.module.css";
import { Check, Plus, Trash, Warning } from "@phosphor-icons/react";
import { Form } from "@mantine/form";
import { modals } from "@mantine/modals";

// Assuming you have these defined elsewhere

export function _FormAttendance({ active }: any) {
  // * DEFINITIONS

  // * CONTEXT

  const { handleSubmit } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  // * PRELOADING

  const queryData: any = useQuery({
    queryKey: ["session", "players"],
    queryFn: async () => {
      const res = [
        {
          name: "Aniel Gurung",
          email: "xyz@gmail.com",
          phone: "1234567890",
          gender: "male",
          dob: "2023-01-01T00:00:00.000Z",
          image:
            "https://i.pinimg.com/736x/69/18/92/691892011b12bbc110cf5fd35eb356a2.jpg",
          memberid: "M11033",
        },
        {
          name: "Aniel Gurung",
          email: "xyz@gmail.com",
          phone: "1234567890",
          gender: "male",
          dob: "2023-01-01T00:00:00.000Z",
          image:
            "https://i.pinimg.com/736x/69/18/92/691892011b12bbc110cf5fd35eb356a2.jpg",
          memberid: "M11033",
        },

        {
          name: "Aniel Gurung",
          email: "xyz@gmail.com",
          phone: "1234567890",
          gender: "male",
          dob: "2023-01-01T00:00:00.000Z",
          image:
            "https://i.pinimg.com/736x/69/18/92/691892011b12bbc110cf5fd35eb356a2.jpg",
          memberid: "M11033",
        },
      ];
      return res;
    },
  });

  // * FUNCTIONS

  // * MUTATIONS

  // * COMPONENTS

  return (
    <>
      <Stack gap="xs" p="md">
        <FormElement.SectionTitle
          isTopElement
          title="Session Attendance Sheet"
          description="Check for the players present"
        />
      </Stack>
      <Stack gap={0}>
        {queryData?.data?.map((playerinfo: any, index: number) => (
          <Group
            p="md"
            wrap="nowrap"
            justify="space-between"
            key={index}
            bg={index % 2 == 0 ? "brand.0" : ""}
          >
            <Text size="sm">{playerinfo.name}</Text>

            <Switch size="sm" />
          </Group>
        ))}
      </Stack>

      <Group p="md" justify="flex-end">
        <Button
          variant="teal"
          leftSection={<Check />}
          onClick={() => {
            handleSubmit();
          }}
        >
          Finish Sheet
        </Button>
      </Group>
    </>
  );
}
