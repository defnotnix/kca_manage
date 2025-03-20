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

export function _FormPlayer({ active }: any) {
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
      <Stack gap="xs" p="md">
        <FormElement.SectionTitle
          isTopElement
          title="Session Players"
          description="Add the players who will be attending this session."
        />

        <Select data={[]} placeholder="Select student to add" />

        {queryData?.data?.players?.length > 0 ? (
          <>
            <SimpleGrid cols={3} spacing="xs">
              {queryData?.data?.players.map((iteminfo: any, index: number) => (
                <Paper
                  key={index}
                  withBorder
                  pos="relative"
                  className={classes.playercard}
                >
                  <ActionIcon
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                    variant="filled"
                    color="red"
                    onClick={() => {
                      handleDelete(iteminfo.id);
                    }}
                  >
                    <Trash />
                  </ActionIcon>

                  <Paper bg="brand.0">
                    <Image h={160} src={iteminfo.image} />
                  </Paper>

                  <Box p="md">
                    <Text size="md">{iteminfo.name}</Text>
                    <Text size="xs" opacity={0.5}>
                      Student ID : {iteminfo.memberid}
                    </Text>
                  </Box>
                </Paper>
              ))}
            </SimpleGrid>
          </>
        ) : (
          <>
            <Text size="xs" opacity={0.5} my="md">
              You have not added any players to this session yet
            </Text>
          </>
        )}
      </Stack>
    </>
  );
}
