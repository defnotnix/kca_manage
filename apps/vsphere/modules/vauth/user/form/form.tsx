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
import { ImageUpload, FormElement } from "@vframework/ui";
import { DateInput, YearPickerInput } from "@mantine/dates";
import {
  PictureInPicture,
  Plus,
  Trash,
  Upload,
  YoutubeLogo,
} from "@phosphor-icons/react";

import { useQuery } from "@tanstack/react-query";

import classes from "./form.module.css";

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
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
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

  const queryType = useQuery({
    queryKey: ["config", "type"],
    queryFn: async () => {
      //const res = await apiType.getData();
      const res: any[] = [];
      return res;
    },
    initialData: [],
  });

  const queryBrand = useQuery({
    queryKey: ["config", "brand"],
    queryFn: async () => {
      //const res = await apiBrand.getData();
      const res: any[] = [];
      return res;
    },
    initialData: [],
  });

  const queryCategory = useQuery({
    queryKey: ["config", "category"],
    queryFn: async () => {
      //const res = await apiCategory.getData();
      const res: any[] = [];
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
          <Stack gap="xs" p="md">
            <FormElement.SectionTitle
              isTopElement
              title="General Details"
              description="Comprehensive student information & details"
            />

            <ImageUpload
              {...form.getInputProps("picture")}
              label="Student Logo"
              onChange={(image: any) => form.setFieldValue("picture", image)}
              value={form.getValues()?.picture}
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
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Contact Details"
              description="Comprehensive contact information for the student or student organization."
            />

            <TextInput
              label="Address"
              description="Complete physical address including street, city, state, and postal code for the student or company."
              placeholder="Enter full address"
              {...form.getInputProps("address")}
            />

            <SimpleGrid cols={{ base: 1, lg: 2 }}>
              <TextInput
                label="Contact 1"
                description="Primary phone number"
                placeholder="Enter primary contact number"
                {...form.getInputProps("contact1")}
              />
              <TextInput
                label="Contact 2"
                description="Secondary or alternative"
                placeholder="Enter secondary contact number"
                {...form.getInputProps("contact2")}
              />
              <TextInput
                label="Email"
                description="Official email address"
                placeholder="Enter email address"
                required
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Nationality"
                description="Citizenship or nationality"
                placeholder="Enter nationality"
                {...form.getInputProps("nationality")}
              />
            </SimpleGrid>
          </Stack>
        </>
      );

    case 1:
      return (
        <>
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
                data={GENDER_CHOICES}
                {...form.getInputProps("parent_relation")}
              />

              <TextInput
                label="Contact 1"
                description="Primary phone number"
                placeholder="Enter primary contact number"
                {...form.getInputProps("contact1")}
              />
              <TextInput
                label="Contact 2"
                description="Secondary or alternative"
                placeholder="Enter secondary contact number"
                {...form.getInputProps("contact2")}
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
                {...form.getInputProps("emergency")}
              />
            </SimpleGrid>
          </Stack>
        </>
      );

    case 2:
      return (
        <>
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
                {...form.getInputProps("enrollment_date")}
              />
              <DateInput
                label="Enrollment End Date"
                description="The expected end date of the enrollment period."
                placeholder="Enter enrollment end date"
                {...form.getInputProps("enrollment_end_date")}
              />
              <TextInput
                label="Batch/Team"
                description="Specify the batch or team assigned to the student."
                placeholder="Enter batch or team"
                required
                {...form.getInputProps("batch")}
              />{" "}
              <Select
                label="Training Schedule"
                data={[]}
                description="Select the student's preferred training schedule."
                placeholder="Choose a schedule"
                {...form.getInputProps("training_schedule")}
              />
              <Select
                label="Select Plan"
                data={[]}
                description="Choose the training plan for the student."
                placeholder="Select a plan"
                {...form.getInputProps("plan")}
              />
              <NumberInput
                label="Decided Rate/Month"
                description="The agreed monthly rate for the student."
                placeholder="Enter rate"
                {...form.getInputProps("rate")}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Referrals"
              description="Select the individuals or organizations that referred the student."
            />

            <MultiSelect
              label="Referrals"
              data={[]}
              description="Select referrers from the list."
              placeholder="Enter referrer names"
              {...form.getInputProps("refers")}
            />

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
        </>
      );
  }
}
