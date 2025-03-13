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
import { DateInput, YearPickerInput } from "@mantine/dates";

import { useQuery } from "@tanstack/react-query";

import classes from "./form.module.css";

import { getRecords as getPackages } from "@/modules/package/module.api";

import { Label } from "recharts";

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

const GENDER_CHOICES = [
  { value: "3", label: "Not Specified" },
  { value: "1", label: "Male" },
  { value: "2", label: "Female" },
];

const EXPERIENCE_CHOICES = [
  { value: "1", label: "Newcomer" },
  { value: "2", label: "Amateur" },
  { value: "3", label: "Professional" },
];

const TRAINING_TIME_CHOICES = [
  { value: "1", label: "Morning" },
  { value: "2", label: "Day" },
  { value: "3", label: "Evening" },
];

const MEMBERSHIP_CHOICES = [
  { value: "1", label: "Yes" },
  { value: "2", label: "No" },
  { value: "3", label: "Maybe" },
];

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();
  const [activeCategory, setActiveCategory] = useState("x");

  //  const current: number = 3;

  // * STATES

  const [category, setCategory] = useState<any[]>([]);

  // * PRELOADING

  const queryPackages = useQuery({
    queryKey: ["config", "packages"], // query key
    queryFn: async () => {
      const res = await getPackages({
        endpoint: "/services/packages/",
      });
      return res;
    },
    initialData: [],
  });

  const querySessions = useQuery({
    queryKey: ["config", "sessions"], // query key
    queryFn: async () => {
      const res = await getPackages({
        endpoint: "/services/sessions/",
      });
      return res;
    },
    initialData: [],
  });

  const queryAddonsCategory = useQuery({
    queryKey: ["service", "addons-category"],
    queryFn: async (id: any) => {
      const res = await getPackages({
        endpoint: "/services/addons/category/",
      });
      console.log(res);
      return res;
    },
    initialData: [],
  });

  const queryAddons = useQuery({
    queryKey: ["service", "addons"],
    queryFn: async (id: any) => {
      const res = await getPackages({
        endpoint: "/services/addons/",
      });
      console.log(res);
      return res;
    },
    initialData: [],
  });

  // * FUNCTIONS

  // * COMPONENTS

  switch (current) {
    case 0:
      return (
        <>
          <Paper px="lg" py="md" withBorder>
            <Stack gap="xs">
              <FormElement.SectionTitle
                isTopElement
                title="General Details"
                description="Comprehensive student information & details"
              />

              <ImageUpload
                {...form.getInputProps("image")}
                label="Student Profile"
                onChange={(image: any) => form.setFieldValue("image", image)}
                value={form.getValues()?.image}
              />

              <SimpleGrid cols={2} spacing="xs">
                <TextInput
                  label="Student Name"
                  description="Full legal name of the student or student organization. "
                  placeholder="Enter full name"
                  required
                  {...form.getInputProps("name")}
                />
                <Select
                  label="Gender"
                  description="Optional if not relevant or preferred not to disclose."
                  placeholder="Select gender"
                  data={GENDER_CHOICES}
                  {...form.getInputProps("gender")}
                />

                <Select
                  data={
                    queryPackages?.data?.map((e: any) => {
                      return {
                        value: String(e.id),
                        label: e.name,
                      };
                    }) || []
                  }
                  label="Packages ID"
                  description="Select Player Packages"
                  placeholder="Select Packages"
                  required
                  {...form.getInputProps("package")}
                />

                <MultiSelect
                  data={
                    querySessions?.data?.map((e: any) => {
                      return {
                        value: String(e.id),
                        label: e.name,
                      };
                    }) || []
                  }
                  label="Involved Sessions"
                  description="Select Player Session"
                  placeholder="Select Session"
                  required
                  {...form.getInputProps("session")}
                />
              </SimpleGrid>

              <FormElement.SectionTitle
                title="Contact Details"
                description="Comprehensive contact information for the student or student organization."
              />

              <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <TextInput
                  label="Permanent Address"
                  description="Complete physical address including street, city, state, and postal code for the student or company."
                  placeholder="Enter permanent address"
                  {...form.getInputProps("permanent_address")}
                />

                <TextInput
                  label="Temporary Address"
                  description="Complete physical address including street, city, state, and postal code for the student or company."
                  placeholder="Enter temporary address"
                  {...form.getInputProps("temp_address")}
                />
                <TextInput
                  label="Primary Contact"
                  description="Primary phone number"
                  placeholder="Enter primary contact number"
                  {...form.getInputProps("contact")}
                />
              </SimpleGrid>
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
                title="Parents Details"
                description="Comprehensive contact information for the student or student organization."
              />

              <SimpleGrid cols={2} spacing="xs">
                <TextInput
                  label="Parent's Name"
                  description="Full legal name of the student or student organization. "
                  placeholder="Enter full name"
                  required
                  {...form.getInputProps("parent_name")}
                />

                <Select
                  label="Relation"
                  description="Optional if not relevant or preferred not to disclose."
                  placeholder="Select gender"
                  data={["Father", "Mother"]}
                  {...form.getInputProps("relation")}
                />

                <TextInput
                  label="Primary Contact"
                  description="Primary phone number"
                  placeholder="Enter primary contact number"
                  {...form.getInputProps("primary_contact")}
                />
                <TextInput
                  label="Emergency Contact"
                  description="Secondary or alternative"
                  placeholder="Enter secondary contact number"
                  {...form.getInputProps("emergency_contact")}
                />
                <TextInput
                  label="Email"
                  description="Official email address"
                  placeholder="Enter email address"
                  required
                  {...form.getInputProps("email")}
                />
              </SimpleGrid>
            </Stack>
          </Paper>
        </>
      );

    case 2:
      return (
        <>
          <Paper px="lg" py="md" withBorder>
            <Stack gap="xs">
              <FormElement.SectionTitle
                isTopElement
                title="Additional Packages"
                description="Additional Services/Items"
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

              <SimpleGrid cols={{ base: 2, lg: 3 }} spacing="xs">
                {queryAddons.data
                  ?.filter((e: any) => {
                    if (activeCategory == "x") {
                      return true;
                    } else {
                      return e.category == Number(activeCategory);
                    }
                  })
                  .map((item: any, index: number) => {
                    return (
                      <Checkbox.Card
                        p="md"
                        key={index}
                        className={classes.card}
                        radius="md"
                        checked={form.getValues()?.addons.includes(item.id)}
                        onClick={() => {
                          if (form.getValues()?.addons.includes(item.id)) {
                            form.setFieldValue(
                              "addons",
                              form.getValues()?.addons.filter((e: any) => {
                                return e !== item.id;
                              })
                            );
                          } else {
                            form.setFieldValue("addons", [
                              ...(form.getValues()?.addons || []),
                              item.id,
                            ]);
                          }
                        }}
                      >
                        <Group wrap="nowrap" align="flex-start">
                          <Checkbox.Indicator />
                          <div>
                            <Text size="xs" fw={600}>
                              {item.name}
                            </Text>
                          </div>
                        </Group>
                      </Checkbox.Card>
                    );
                  })}
              </SimpleGrid>

              <FormElement.SectionTitle
                title="Enrollment Details"
                description="Provide enrollment information, including key dates and batch details."
              />

              <SimpleGrid cols={2} spacing="xs">
                <DateInput
                  label="Enrollment Date"
                  description="The date the student enrolled."
                  placeholder="Enter enrollment date"
                  required
                  {...form.getInputProps("doe")}
                />

                <Select
                  label="Membership"
                  data={MEMBERSHIP_CHOICES}
                  description="Select Intrested Membership Status"
                  placeholder="Choose a membership"
                  {...form.getInputProps("membership")}
                />
                <Select
                  label="Training Schedule"
                  data={TRAINING_TIME_CHOICES}
                  description="Select the student's preferred training schedule."
                  placeholder="Choose a schedule"
                  {...form.getInputProps("training_schedule")}
                />

                <NumberInput
                  label="Decided Rate/Month"
                  description="The agreed monthly rate for the student."
                  placeholder="Enter rate"
                  {...form.getInputProps("decided_rate")}
                />
                <DateInput
                  label="Decided Date"
                  description="The date the rate added."
                  placeholder="Select Date"
                  required
                  {...form.getInputProps("decided_date")}
                />
                <TextInput
                  label="Decided By"
                  description="Enter the person who gave this discount"
                  placeholder="e.g. Ram Kumar"
                  required
                  {...form.getInputProps("decided_by")}
                />
              </SimpleGrid>
              <TextInput
                label="Reason"
                description="Enter the reason for the discount"
                placeholder="e.g. General Discount"
                required
                {...form.getInputProps("reason")}
              />

              {/* <FormElement.SectionTitle
                title="Referrals"
                description="Select the individuals or organizations that referred the student."
              />

              <MultiSelect
                label="Referrals"
                data={[]}
                description="Select referrers from the list."
                placeholder="Enter referrer names"
                {...form.getInputProps("refers")}
              /> */}

              <FormElement.SectionTitle
                title="Misc"
                description="Comprehensive contact information for the student or student organization."
              />

              <Textarea
                rows={5}
                label="Remarks"
                description="Additional notes, special instructions, or supplementary information about the student"
                placeholder="Enter any additional comments or special considerations"
                {...form.getInputProps("remarks")}
              />
            </Stack>
          </Paper>
        </>
      );

    case 3:
      return (
        <Paper px="lg" py="md" withBorder>
          <Stack gap="xs">
            <FormElement.SectionTitle
              isTopElement
              title="Player Preferences"
              description="Favorite player, team, and assigned team details."
            />

            <SimpleGrid cols={2} spacing={"xs"}>
              <TextInput
                label="Favorite Player"
                description="Enter your favorite player."
                placeholder="Enter player name"
                {...form.getInputProps("fav_player")}
              />

              <TextInput
                label="Favorite Team"
                description="Enter your favorite team."
                placeholder="Enter team name"
                {...form.getInputProps("fav_team")}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Equipment & Training Details"
              description="Equipment requirements, training preferences, and experience level."
            />

            <SimpleGrid cols={2} spacing="xs">
              <Select
                label="Experience Level"
                description="Select your experience level."
                placeholder="Choose level"
                data={EXPERIENCE_CHOICES}
                required
                {...form.getInputProps("level_exp")}
              />

              <Select
                label="Training Time Preference"
                description="Preferred time slot for training."
                placeholder="Select time"
                data={TRAINING_TIME_CHOICES}
                required
                {...form.getInputProps("time_for_training")}
              />

              <TextInput
                label="Previous Academy"
                description="Enter the name of the previous academy (if any)."
                placeholder="Enter previous academy"
                {...form.getInputProps("previous_academy")}
              />
            </SimpleGrid>
          </Stack>
        </Paper>
      );
  }
}
