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
  Table,
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
import { randomId } from "@mantine/hooks";

// Assuming you have these defined elsewhere

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  // * PRELOADING

  // * FUNCTIONS

  // * COMPONENTS

  switch (current) {
    case 0:
      return (
        <Stack gap="xs" p="md">
          <FormElement.SectionTitle
            isTopElement
            title="Authentication Credentials"
            description="Enter the credentials required for authentication."
          />

          <SimpleGrid cols={2} spacing="xs">
            <TextInput
              label="Username"
              description="Enter your unique username for authentication."
              placeholder="Enter username"
              required
              {...form.getInputProps("username")}
            />
            <TextInput
              label="Password"
              description="Enter your secure password."
              placeholder="Enter password"
              type="password"
              required
              {...form.getInputProps("password")}
            />
          </SimpleGrid>

          <FormElement.SectionTitle
            title="General Information"
            description="Provide general details about the user."
          />

          <TextInput
            label="Full Name"
            description="Enter the user's full name."
            placeholder="Enter full name"
            required
            {...form.getInputProps("name")}
          />

          <SimpleGrid cols={2} spacing="xs">
            <TextInput
              label="Contact Number"
              description="Enter the user's phone number."
              placeholder="Enter contact number"
              required
              {...form.getInputProps("contact")}
            />
            <TextInput
              label="Email Address"
              description="Enter the user's email address."
              placeholder="Enter email address"
              required
              {...form.getInputProps("email")}
            />
            <Select
              label="Staff Category"
              description="Select the user's role or employment status."
              placeholder="Select category"
              data={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
              required
              {...form.getInputProps("status")}
            />
          </SimpleGrid>
        </Stack>
      );
  }
}
