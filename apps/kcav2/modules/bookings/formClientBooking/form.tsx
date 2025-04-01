"use client";

import React, { useState } from "react";
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
  Indicator,
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
  ThemeIcon,
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
import { getRecords } from "../module.api";
import { start } from "repl";
import _ from "moment";
//capcha
// import ReCAPTCHA from "react-google-recaptcha";

// Assuming you have these defined elsewhere

export function _FormClientBooking() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  const [activeSlot, setActiveSlot] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("x");

  const [excludeList, setExcludeList] = useState<any[]>([
    "2025-02-26",
    "2025-02-27",
  ]);

  const [dateRange, setDateRange] = useState<Date[]>([
    new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of the month
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // End of the month
  ]);

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

      return res.filter((item: any) => {
        return item.status == true;
      });
    },
    initialData: [],
  });

  const queryAddonsCategory = useQuery({
    queryKey: ["service", "addons-category"],
    queryFn: async (id: any) => {
      const res = await getRecords({
        endpoint: "/services/addons/category/",
      });
      console.log(res);
      return res;
    },
    initialData: [],
  });

  const queryAddons = useQuery({
    queryKey: ["config", "addons"], // query key
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/services/addons/",
      });

      return res;
    },
    initialData: [],
  });

  const queryBookingLogs = useQuery({
    queryKey: ["config", "bookingLogs"], // query key
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/schedule/sessions/",
        params: {
          start_date: _(dateRange[0]).format("YYYY-MM-DD"),
          end_date: _(dateRange[1]).format("YYYY-MM-DD"),
        },
      });

      return res.map((_: any) => {
        return {
          ..._,
          time: _.time?.id,
          ground: _.ground?.id,
        };
      });
    },
    initialData: [],
  });

  const RenderSlots = ({ date }: any) => {
    const RenderTimeButton = ({ time }: { time: any }) => {
      const active = form.getValues()?.time.includes(time.id);

      const _activeDay = queryBookingLogs?.data?.find((item: any) => {
        return (
          item.time == time.id &&
          item.date == date &&
          item.ground == form.getValues()?.ground &&
          item.is_available == false
        );
      });

      return (
        <Button
          onClick={() => {
            if (active) {
              form.setFieldValue(
                "time",
                form.getValues()?.time.filter((e: any) => e !== time.id)
              );

              if (_activeDay?.session) {
                form.setFieldValue(
                  "overlaps",
                  form.getValues()?.overlaps.filter((e: any) => e !== time.id)
                );
              }
            } else {
              form.setFieldValue("time", [...form.getValues()?.time, time.id]);
              if (_activeDay?.session) {
                form.setFieldValue(
                  "overlaps",
                  form.setFieldValue("overlaps", [
                    ...form.getValues()?.overlaps,
                    time.id,
                  ])
                );
              }
            }
          }}
          size="lg"
          style={{
            fontSize: "var(--mantine-font-size-xs)",
          }}
          variant={active ? "filled" : "light"}
          color={_activeDay?.session ? "orange" : "brand"}
          disabled={_activeDay && !_activeDay?.session}
        >
          {time?.start_time} - {time?.end_time}
        </Button>
      );
    };

    return (
      <SimpleGrid cols={4} spacing="xs">
        {queryTimeFrames?.data?.map((slot: any, index: number) => (
          <RenderTimeButton key={index} time={slot} />
        ))}
      </SimpleGrid>
    );
  };

  const getDayProps: DatePickerProps["getDayProps"] = (_date) => {
    const date = _(new Date(_date)).format("YYYY-MM-DD");

    const _isBooked = queryBookingLogs?.data?.find(
      (item: any) =>
        item.date == date && item.ground == form.getValues()?.ground
    );

    const active = _date == form.getValues()?.date;

    if (_isBooked) {
      if (_isBooked.session) {
        return {
          style: {
            backgroundColor: !active
              ? "var(--mantine-color-orange-1)"
              : "var(--mantine-color-orange-6)",
            color: !active ? "black" : "white",
          },
        };
      } else {
        return {
          style: {
            backgroundColor: !active
              ? "var(--mantine-color-teal-1)"
              : "var(--mantine-color-teal-6)",
            color: !active ? "black" : "white",
          },
        };
      }
    }

    return {};
  };

  const renderDay = (date: any) => {
    const day = new Date(date).getDate();
    const _date = _(new Date(date)).format("YYYY-MM-DD");

    const _isBooked = queryBookingLogs?.data?.filter(
      (item: any) => item.date == date
    );

    return (
      <Indicator inline size="xs" disabled={!_isBooked.length}>
        <Text size="xs" fw={600} p="sm">
          {day}
        </Text>
      </Indicator>
    );
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

              <Radio.Group {...form.getInputProps("ground")}>
                <SimpleGrid cols={{ base: 1, lg: 3 }} my="md" spacing="xs">
                  {queryGrounds.data?.map((ground: any, index: number) => (
                    <Radio.Card
                      key={index}
                      className={classes.root}
                      radius="md"
                      value={String(ground.id)}
                    >
                      <Group wrap="nowrap" align="flex-start" p="md">
                        <Radio.Indicator size="xs" />
                        <div>
                          <Text size="sm" fw={600}>
                            {ground?.name}
                          </Text>
                          <Text size="xs" opacity={0.5}>
                            {ground?.pitch}
                          </Text>
                        </div>
                      </Group>
                      <Paper bg="brand.0" p="md">
                        <Group>
                          <Text size="xs" fw={600}>
                            Rs. {ground?.price_hr} / hr
                          </Text>
                          <Divider orientation="vertical" />
                          <Text size="xs" fw={600}>
                            Rs. {ground?.price_day} / day
                          </Text>
                        </Group>
                      </Paper>
                    </Radio.Card>
                  ))}
                </SimpleGrid>
              </Radio.Group>
            </Stack>
          </Paper>
        </>
      );

    case 1:
      return (
        <>
          <Paper px="lg" py="md" withBorder>
            <Stack gap="xs">
              <FormElement.SectionTitle
                isTopElement
                title="Select Add-On's"
                description="Comprehensive service information & details"
                actionButton={
                  <Select
                    data={[
                      {
                        value: "x",
                        label: "All",
                      },
                      ...queryAddonsCategory.data?.map((item: any) => {
                        return {
                          value: String(item.id),
                          label: item.name,
                        };
                      }),
                    ]}
                    placeholder="Item/Service"
                    nothingFoundMessage="No add-ons added yet"
                    required
                    value={activeCategory}
                    onChange={(e: any) => {
                      setActiveCategory(e);
                    }}
                  />
                }
              />

              <Checkbox.Group {...form.getInputProps("addons")}>
                <SimpleGrid cols={{ base: 1, lg: 3 }} my="md" spacing="xs">
                  {queryAddons.data
                    ?.filter((e: any) => {
                      if (activeCategory == "x") {
                        return true;
                      } else {
                        return e.category == Number(activeCategory);
                      }
                    })
                    ?.map((ground: any, index: number) => (
                      <Checkbox.Card
                        key={index}
                        className={classes.root}
                        radius="md"
                        value={String(ground.id)}
                      >
                        <Group wrap="nowrap" align="flex-start" p="md">
                          <Checkbox.Indicator size="xs" />
                          <div>
                            <Text size="sm" fw={600}>
                              {ground?.name}
                            </Text>
                            <Text size="xs" opacity={0.5}>
                              {ground?.pitch}
                            </Text>
                          </div>
                        </Group>
                        <Paper bg="brand.0" p="md">
                          <Group>
                            <Text size="xs" fw={600}>
                              Rs. {ground?.price} / hr
                            </Text>
                          </Group>
                        </Paper>
                      </Checkbox.Card>
                    ))}
                </SimpleGrid>
              </Checkbox.Group>
            </Stack>
          </Paper>
        </>
      );

    case 2:
      return (
        <Paper px="lg" py="md" withBorder>
          <Stack gap="xs">
            <Center my="2rem">
              <DatePicker
                onNextMonth={() => {
                  setDateRange(([start, end]) => [
                    new Date(start.getFullYear(), start.getMonth() + 1, 1), // Next month's start date
                    new Date(end.getFullYear(), end.getMonth() + 2, 0), // Next month's end date
                  ]);
                }}
                onPreviousMonth={() => {
                  setDateRange(([start, end]) => [
                    new Date(start.getFullYear(), start.getMonth() - 1, 1), // Previous month's start date
                    new Date(end.getFullYear(), end.getMonth(), 0), // Previous month's end date
                  ]);
                }}
                size="md"
                highlightToday
                excludeDate={(date) => {
                  return new Date(date) < new Date();
                }}
                value={form.getValues()?.date}
                getDayProps={getDayProps}
                onChange={(e) => {
                  console.log(e);
                  form.setFieldValue("time", []);
                  form.setFieldValue("date", e);
                  setActiveSlot(e);
                }}
                renderDay={renderDay}
              />
            </Center>

            <FormElement.SectionTitle
              isTopElement
              title="Available Slots"
              description="Comprehensive service information & details"
              actionButton={
                <Button
                  size="xs"
                  onClick={() => {
                    form.setFieldValue(
                      "time",
                      queryTimeFrames?.data?.map((item: any) => item.id)
                    );
                  }}
                  disabled={queryBookingLogs?.data?.find((item: any) => {
                    return (
                      item.ground == form.getValues()?.ground &&
                      item.date == form.getValues()?.date &&
                      item.is_booked == true
                    );
                  })}
                >
                  {queryBookingLogs?.data?.find((item: any) => {
                    return (
                      item.ground == form.getValues()?.ground &&
                      item.date == form.getValues()?.date &&
                      item.is_booked == true
                    );
                  })
                    ? "Full Day Booking Not Available"
                    : "Full Day Booking"}
                </Button>
              }
            />

            <RenderSlots date={form.getValues().date} />
          </Stack>
        </Paper>
      );

    case 3:
      return (
        <Paper px="lg" py="md" withBorder>
          <Stack gap="xs">
            <FormElement.SectionTitle
              isTopElement
              title="Personal Details"
              description="Comprehensive service information & details"
            />

            <TextInput
              label="Full Name"
              placeholder="Enter full name"
              description="Enter the full name of the individual performing the booking"
              {...form.getInputProps("name")}
            />

            <SimpleGrid cols={2} spacing="xs">
              <TextInput
                label="Contact Number"
                placeholder="Enter contact number"
                description="Enter the contact number of the individual performing the booking"
                {...form.getInputProps("contact")}
              />
              <TextInput
                label="Email Address"
                placeholder="Enter email address"
                description="Enter the email address of the individual performing the booking"
                {...form.getInputProps("email")}
              />
              <Select
                label="Status"
                placeholder="Select status"
                description="Select the status of the individual performing the booking"
                data={[
                  {
                    label: "Approved",
                    value: "1",
                  },
                  {
                    label: "Rejected",
                    value: "2",
                  },
                  {
                    label: "Pending",
                    value: "3",
                  },
                ]}
                {...form.getInputProps("status")}
              />

              {/* <ReCAPTCHA sitekey="Your client site key" onChange={onChange} /> */}
            </SimpleGrid>
          </Stack>
        </Paper>
      );
  }
}
