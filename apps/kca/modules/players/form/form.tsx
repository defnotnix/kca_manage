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
  { value: "NA", label: "Not Specified" },
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
];

const EQUIPMENT_CHOICES = [
  { value: "Balls", label: "Balls" },
  { value: "Bats", label: "Bats" },
  { value: "Kits", label: "Kits" },
];

const JERSEY_SIZE = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

const PACKAGE_CHOICES = [
  { value: "Regular", label: "Regular" },
  { value: "Silver", label: "Silver" },
  { value: "Gold", label: "Gold" },
];

const EXPERIENCE_CHOICES = [
  { value: "Newcomer", label: "Newcomer" },
  { value: "Amateur", label: "Amateur" },
  { value: "Professional", label: "Professional" },
];

const TRAINING_TIME_CHOICES = [
  { value: "Morning", label: "Morning" },
  { value: "Day", label: "Day" },
  { value: "Evening", label: "Evening" },
];

const MEMBERSHIP_CHOICES = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
  { value: "Maybe", label: "Maybe" },
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

  const queryPackages = useQuery({
    queryKey: ["config", "packages"], // query key
    queryFn: async () => {
      const res = await getPackages({
        endpoint: "/players/packages/",
      });
      return res;
    },
    initialData: [],
  });

  const querySessions = useQuery({
    queryKey: ["config", "sessions"], // query key
    queryFn: async () => {
      const res = await getPackages({
        endpoint: "/players/sessions/",
      });
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

              <TextInput
                label="Student Name"
                description="Full legal name of the student or student organization. "
                placeholder="Enter full name"
                required
                {...form.getInputProps("name")}
              />

              <SimpleGrid cols={2} spacing="xs">
                <TextInput
                  label="Member ID"
                  description="Enter Member ID"
                  placeholder="e.g. XXXXXX"
                  required
                  {...form.getInputProps("member_id")}
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

                <Select
                  data={
                    querySessions?.data?.map((e: any) => {
                      return {
                        value: String(e.id),
                        label: e.name,
                      };
                    }) || []
                  }
                  label="Session ID"
                  description="Select Player Session"
                  placeholder="Select Session"
                  required
                  {...form.getInputProps("sessions")}
                />
              </SimpleGrid>

              <FormElement.SectionTitle
                title="Contact Details"
                description="Comprehensive contact information for the student or student organization."
              />

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

              <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <TextInput
                  label="Contact 1"
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
                  label="Contact 1"
                  description="Primary phone number"
                  placeholder="Enter primary contact number"
                  {...form.getInputProps("primary_contact")}
                />
                <TextInput
                  label="Contact 2"
                  description="Secondary or alternative"
                  placeholder="Enter secondary contact number"
                  {...form.getInputProps("secondary_contact")}
                />
                <TextInput
                  label="Email"
                  description="Official email address"
                  placeholder="Enter email address"
                  required
                  {...form.getInputProps("email")}
                />
                <TextInput
                  label="Emergency Contact"
                  description="Emergency phone number"
                  placeholder="Enter emergency contact number"
                  {...form.getInputProps("emergency_contact")}
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
                <TextInput
                  label="Team"
                  description="Specify the batch or team assigned to the student."
                  placeholder="Enter batch or team"
                  required
                  {...form.getInputProps("assigned_team")}
                />
                <Select
                  label="Training Schedule"
                  data={["Morning", "Afternoon", "Evening"]}
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
                <TextInput
                  label="Reason"
                  description="Enter the reason for the discount"
                  placeholder="e.g. General Discount"
                  required
                  {...form.getInputProps("reason")}
                />
              </SimpleGrid>

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
                label="Equipment Required"
                description="Specify if equipment is needed."
                placeholder="Select"
                data={EQUIPMENT_CHOICES}
                required
                {...form.getInputProps("equipment_required")}
              />

              <Select
                label="Jersey Size"
                description="Select preferred jersey size."
                placeholder="Choose size"
                data={JERSEY_SIZE}
                required
                {...form.getInputProps("jersey")}
              />

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

              <Select
                label="Membership"
                description="Select your membership type."
                placeholder="Choose membership"
                data={MEMBERSHIP_CHOICES}
                required
                {...form.getInputProps("membership")}
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
