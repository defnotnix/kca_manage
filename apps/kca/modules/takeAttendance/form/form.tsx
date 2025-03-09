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
  Switch,
  Text,
  Textarea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
//framework
import { FormHandler } from "@vframework/core";
import { FormElement, ImageUpload } from "@vframework/ui";
import { DateInput, YearPickerInput } from "@mantine/dates";

import { useQuery } from "@tanstack/react-query";

import { getRecords as getSessions } from "@/modules/sessions/module.api";

import classes from "./form.module.css";

// Assuming you have these defined elsewhere

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current, handleStepNext } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  const [category, setCategory] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  // * PRELOADING

  const querySessions = useQuery({
    queryKey: ["config", "sessions"], // query key
    queryFn: async () => {
      // query function
      const res = await getSessions({
        endpoint: "/players/sessions/",
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
                title="Active Sessions"
                description="Choose the session for which you want to take attendance."
              />

              <SimpleGrid spacing="xs" cols={3}>
                {querySessions.data?.map((sessiondata: any, index: number) => (
                  <UnstyledButton
                    key={index}
                    onClick={() => {
                      form.setFieldValue("session", sessiondata.id);
                      setStudents(sessiondata?.children || []);
                      handleStepNext();
                    }}
                  >
                    <Paper withBorder p="md" className={classes.optioncard}>
                      <Text size="xs" opacity={0.5}>
                        {sessiondata.start_time.substring(0, 5)} -{" "}
                        {sessiondata.end_time.substring(0, 5)}
                      </Text>
                      <Text size="md">{sessiondata.name}</Text>
                      <Text size="xs" c="brand.5">
                        {sessiondata.coach}
                      </Text>
                    </Paper>
                  </UnstyledButton>
                ))}
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
                title="Session Attendance Sheet"
                description="Check for the players present"
              />
            </Stack>
          </Paper>
          <Paper withBorder>
            <Stack gap={0}>
              {/* {students?.map((playerinfo: any, index: number) => (
                <Group
                  px="lg"
                  py="sm"
                  wrap="nowrap"
                  justify="space-between"
                  key={index}
                  bg={index % 2 == 0 ? "brand.0" : ""}
                >
                  <Text size="sm">{playerinfo.name}</Text>

                  <Checkbox size="md" />
                </Group>
              ))} */}
            </Stack>
          </Paper>
        </>
      );
  }
}
