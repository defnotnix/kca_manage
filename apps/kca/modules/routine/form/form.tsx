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
import { DateInput, DatePickerInput, YearPickerInput } from "@mantine/dates";

import { useQuery } from "@tanstack/react-query";

import classes from "./form.module.css";

import { getRecords as getPackages } from "@/modules/package/module.api";

import { Label } from "recharts";
import { Minus } from "@phosphor-icons/react";

// Assuming you have these defined elsewhere

const optionBoolean = [
  {
    value: "1",
    label: "Yes",
  },
  {
    value: "0",
    label: "No",
  },
];

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  const [category, setCategory] = useState<any[]>([]);

  // * PRELOADING

  // * FUNCTIONS

  // * COMPONENTS

  const generateDateList = ({ startDate, endDate }: any) => {
    if (startDate && endDate) {
      const dates = [];
      let currentDate = new Date(startDate);

      while (currentDate <= new Date(endDate)) {
        dates.push(new Date(currentDate)); // Store a copy of the date
        currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
      }

      return dates.map((date, index) => {
        console.log(date);
        return {
          date: new Date(date),
          is_holiday: false,
          activity: "",
        };
      });
    } else {
      return [];
    }
  };

  switch (current) {
    case 0:
      return (
        <>
          <Paper
            radius={0}
            px="lg"
            py="md"
            withBorder
            style={{
              borderBottom: 0,
            }}
          >
            <Stack gap="xs">
              <FormElement.SectionTitle
                isTopElement
                title="Pick Calendar Dates"
                description="Comprehensive student information & details"
                actionButton={
                  <DatePickerInput
                    w={300}
                    type="range"
                    placeholder="Pick dates range"
                    onChange={(e: any) => {
                      if (e[0] !== null && e[1] !== null) {
                        form.setFieldValue(
                          "daterange",
                          generateDateList({ startDate: e[0], endDate: e[1] })
                        );
                      }
                    }}
                  />
                }
              />
            </Stack>
          </Paper>
          <Paper withBorder py="md" radius={0}>
            <Stack gap="xs">
              <SimpleGrid cols={3} spacing="xs" px="lg">
                <Grid>
                  <Grid.Col span={{ base: 12, lg: 2 }}>
                    <Text size="xs">#</Text>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, lg: 10 }}>
                    <Text size="sm">Date</Text>
                  </Grid.Col>
                </Grid>
                <Text fw={600} size="xs">
                  Ground
                </Text>
                <Text fw={600} size="xs">
                  Activity
                </Text>
              </SimpleGrid>

              <Divider />

              {form.getValues()?.daterange.map((date: any, index: number) => (
                <SimpleGrid
                  bg={date.is_holiday ? "orange.0" : ""}
                  cols={{ base: 1, lg: 3 }}
                  spacing="xs"
                  key={index}
                  px="lg"
                >
                  <Grid>
                    <Grid.Col span={{ base: 12, lg: 2 }}>
                      <Text mt="xs" size="xs">
                        {index + 1}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 10 }}>
                      <TextInput
                        disabled
                        value={String(new Date(date?.date)).substring(0, 15)}
                        rightSection={
                          <ActionIcon
                            variant="light"
                            onClick={() => {
                              form.setFieldValue(
                                `daterange.${index}.is_holiday`,
                                !date.is_holiday
                              );
                            }}
                          >
                            <Minus />
                          </ActionIcon>
                        }
                      />
                    </Grid.Col>
                  </Grid>

                  <TextInput
                    disabled={date?.is_holiday}
                    placeholder="Enter Activity"
                    {...form.getInputProps(`daterange.${index}.activity`)}
                  />
                  <Select
                    disabled={date?.is_holiday}
                    data={[]}
                    placeholder="Select Ground"
                  />
                </SimpleGrid>
              ))}
            </Stack>
          </Paper>
        </>
      );
  }
}
