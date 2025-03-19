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
import { Plus, Trash, Warning } from "@phosphor-icons/react";
import { Form } from "@mantine/form";
import { modals } from "@mantine/modals";

// Assuming you have these defined elsewhere

export function _FormAttendance({ active }: any) {
  // * DEFINITIONS

  // * CONTEXT

  //  const current: number = 3;

  // * STATES

  // * PRELOADING

  const queryData: any = useQuery({
    queryKey: ["session", "players"],
    queryFn: async () => {
      const res = {
        name: "Morning Session",
        session_start: "2023-01-01T00:00:00.000Z",
        session_end: "2023-01-01T00:00:00.000Z",
        coach: "XYZ Coach",
        players: [
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
        ],
      };
      return res;
    },
  });

  // * FUNCTIONS

  // * MUTATIONS
  const mutationSubmit = useMutation({
    mutationFn: async (delId) => {
      triggerNotification.form.isLoading({});
      const res = {};
      return res;
    },
    onSuccess: (res: any, delId: any) => {
      triggerNotification.form.isSuccess({});
      queryData.refetch();
    },
    onError: (err: any) => {
      triggerNotification.form.isError({});
    },
  });

  const handleDelete = (id: any) => {
    modals.openConfirmModal({
      title: (
        <Group>
          <ActionIcon size="sm" color="red" variant="light">
            <Warning size={12} />
          </ActionIcon>
          <Text
            size="sm"
            style={{
              fontWeight: 600,
            }}
          >
            Please confirm your action
          </Text>
        </Group>
      ),
      children: (
        <>
          <Text size="xs" my="md">
            This student will be removed from the session, along with any
            associated attendance records and reports.
            <br />
            <br />
            <span
              style={{
                fontWeight: 600,
              }}
            >
              Are you sure you want to proceed?
            </span>
          </Text>
          <Space h="6px" />
        </>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: {
        color: "red",
        size: "xs",
      },
      cancelProps: {
        size: "xs",
      },
      onCancel: () => {},
      onConfirm: () => {
        mutationSubmit.mutate(id);
      },
      styles: {
        header: {
          background: "var(--mantine-color-red-1)",
        },
      },
      size: "sm",
    });
  };

  // * COMPONENTS

  return (
    <>
      <Paper px="lg" py="md" withBorder>
        <Stack gap="xs">
          <FormElement.SectionTitle
            isTopElement
            title="Session Attendance Sheet"
            description="Check for the players present"
          />
        </Stack>
      </Paper>
      <Paper withBorder>
        <Stack gap={0}>
          {queryData?.students?.map((playerinfo: any, index: number) => (
            <Group
              px="lg"
              py="sm"
              wrap="nowrap"
              justify="space-between"
              key={index}
              bg={index % 2 == 0 ? "brand.0" : ""}
            >
              <Text size="sm">{playerinfo.name}</Text>

              <Switch size="md" />
            </Group>
          ))}
        </Stack>
      </Paper>
    </>
  );
}
