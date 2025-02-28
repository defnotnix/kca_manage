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
import {
  DateInput,
  DatePicker,
  DatePickerProps,
  YearPickerInput,
} from "@mantine/dates";

import { useQuery } from "@tanstack/react-query";

import classes from "./form.module.css";

// Assuming you have these defined elsewhere

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  const [excludeList, setExcludeList] = useState<any[]>([
    "2025-02-26",
    "2025-02-27",
  ]);

  //  const current: number = 3;

  // * STATES

  // * PRELOADING

  // * FUNCTIONS

  const RenderSlots = ({ date }: any) => {
    const RenderTimeButton = ({ time }: { time: string }) => {
      const active = form.getValues()?.bookingTime.includes(time);

      return (
        <Button
          onClick={() => {
            if (active) {
              form.setFieldValue(
                "bookingTime",
                form.getValues()?.bookingTime.filter((e: any) => e !== time)
              );
            } else {
              form.setFieldValue("bookingTime", [
                ...form.getValues()?.bookingTime,
                time,
              ]);
            }
          }}
          size="lg"
          style={{
            fontSize: "var(--mantine-font-size-xs)",
          }}
          variant={active ? "filled" : "light"}
        >
          {time}
        </Button>
      );
    };

    const generateTimeSlots = () => {
      const slots = [];
      let hour = 6; // Start time: 6 AM
      let period = "AM";

      while (!(hour === 7 && period === "PM")) {
        const nextHour = hour + 1;
        const nextPeriod =
          nextHour === 12 ? (period === "AM" ? "PM" : "AM") : period;
        const formattedSlot = `${hour}:00 ${period} - ${nextHour === 13 ? 1 : nextHour}:00 ${nextPeriod}`;
        slots.push(formattedSlot);

        hour = nextHour === 13 ? 1 : nextHour;
        period = nextPeriod;
      }

      return slots;
    };

    const timeSlots = generateTimeSlots();

    return (
      <SimpleGrid cols={4} spacing="xs">
        {timeSlots.map((slot, index) => (
          <RenderTimeButton key={index} time={slot} />
        ))}
      </SimpleGrid>
    );
  };

  const getDayProps: DatePickerProps["getDayProps"] = (_date) => {
    const date = new Date(_date);

    if (date.getDay() === 5) {
      return {
        style: {
          backgroundColor: "var(--mantine-color-brand-light)",
        },
      };
    }

    if (date.getDay() === 6) {
      return {
        style: {
          backgroundColor: "var(--mantine-color-orange-light)",
        },
      };
    }

    return {};
  };

  // * COMPONENTS

  switch (current) {
    case 0:
      return (
        <>
          <Paper px="lg" py="md" withBorder>
            <Stack gap="xs">
              <FormElement.SectionTitle
                isTopElement
                title="Select Ground"
                description="Comprehensive service information & details"
              />

              <Radio.Group {...form.getInputProps("service")}>
                <SimpleGrid cols={{ base: 1, lg: 3 }} my="md">
                  <Radio.Card
                    p="md"
                    className={classes.root}
                    radius="md"
                    value="x"
                  >
                    <Group wrap="nowrap" align="flex-start">
                      <Radio.Indicator size="xs" />
                      <div>
                        <Text size="sm" fw={600}>
                          Tuff Ground
                        </Text>
                        <Text size="xs" opacity={0.5}>
                          Tuff Ground applicable for general practice
                        </Text>

                        <Group mt="sm" justify="space-between">
                          <Text size="sm" fw={600}>
                            500/hr
                          </Text>
                          <Badge size="xs" variant="light">
                            3 Optional Services
                          </Badge>
                        </Group>
                      </div>
                    </Group>
                  </Radio.Card>
                </SimpleGrid>
              </Radio.Group>
            </Stack>
          </Paper>
        </>
      );

    case 1:
      return (
        <Paper px="lg" py="md" withBorder>
          <Stack gap="xs">
            <Center my="2rem">
              <DatePicker
                size="md"
                highlightToday
                excludeDate={(date) => {
                  return excludeList.includes(
                    new Date(date).toLocaleDateString("en-CA").split("T")[0]
                  );
                }}
                getDayProps={getDayProps}
                {...form.getInputProps("date")}
              />
            </Center>

            <FormElement.SectionTitle
              isTopElement
              title="Available Slots"
              description="Comprehensive service information & details"
            />

            <RenderSlots date={form.values.date} />
          </Stack>
        </Paper>
      );

    case 2:
      return (
        <Paper px="lg" py="md" withBorder>
          <Stack gap="xs">
            <FormElement.SectionTitle
              isTopElement
              title="Booking Details"
              description="Comprehensive service information & details"
            />

            <TextInput
              label="Full Name"
              description="Full name of the service."
              placeholder="Enter service name"
              required
              {...form.getInputProps("name")}
            />

            <SimpleGrid cols={2} spacing="xs">
              <TextInput
                label="Contact Details"
                description="Full name of the service."
                placeholder="Enter service name"
                required
                {...form.getInputProps("phone")}
              />

              <TextInput
                label="Email Address"
                description="Full name of the service."
                placeholder="Enter service name"
                required
                {...form.getInputProps("email")}
              />
            </SimpleGrid>
          </Stack>
        </Paper>
      );
  }
}
