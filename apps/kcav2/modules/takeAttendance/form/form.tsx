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
import { getRecords } from "../module.api";

import _ from "moment";

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
                    onClick={async () => {
                      form.setFieldValue("session", sessiondata.id);

                      const res = await getSessions({
                        endpoint: "/players/sessions/" + sessiondata.id + "/",
                      });

                      form.setFieldValue(
                        "students",
                        res.player?.map((item: any, index: number) => {
                          return {
                            name: item.name,
                            player: item.id,
                            is_present: false,
                            date: _(new Date()).format("YYYY-MM-DD"),
                          };
                        })
                      );

                      setStudents(res.player || []);
                      handleStepNext();
                    }}
                  >
                    <Paper withBorder p="md" className={classes.optioncard}>
                      <Text size="md">{sessiondata.name}</Text>
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
              {form
                .getValues()
                ?.students.map((playerinfo: any, index: number) => (
                  <Group
                    px="lg"
                    py="sm"
                    wrap="nowrap"
                    justify="space-between"
                    key={index}
                    bg={index % 2 == 0 ? "brand.0" : ""}
                  >
                    <Text size="sm">{playerinfo.name}</Text>

                    <Checkbox
                      size="md"
                      {...form.getInputProps("termsOfService", {
                        type: `students.${index}.is_present`,
                      })}
                    />
                  </Group>
                ))}
            </Stack>
          </Paper>
        </>
      );
  }
}
