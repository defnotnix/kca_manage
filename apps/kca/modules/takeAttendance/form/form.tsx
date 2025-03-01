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
      const res = [
        {
          id: 1,
          name: "Morning Fitness",
          description: "A high-energy morning workout to kickstart your day.",
          start: "06:00",
          end: "07:00",
          coach: "Aarav Sharma",
          children: [
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
        },
        {
          id: 2,
          name: "Strength Training",
          description:
            "Focus on building muscle strength with weight training.",
          start: "07:00",
          end: "08:00",
          coach: "Bikash Thapa",
        },
        {
          id: 3,
          name: "Cardio Blast",
          description:
            "An intense cardio session designed for endurance and stamina.",
          start: "08:30",
          end: "09:30",
          coach: "Ramesh Karki",
        },
        {
          id: 4,
          name: "Yoga & Mindfulness",
          description:
            "A relaxing yoga session to improve flexibility and reduce stress.",
          start: "10:00",
          end: "11:00",
          coach: "Sita Maharjan",
        },
        {
          id: 5,
          name: "Evening HIIT",
          description:
            "A high-intensity interval training (HIIT) workout for fat burning.",
          start: "17:00",
          end: "18:00",
          coach: "Prakash Gurung",
        },
        {
          id: 6,
          name: "Sports Conditioning",
          description:
            "Agility, strength, and endurance training for athletes.",
          start: "18:30",
          end: "19:30",
          coach: "Raju Magar",
        },
      ];

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
                        {sessiondata.start} - {sessiondata.end}
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
              {students?.map((playerinfo: any, index: number) => (
                <Group
                  px="lg"
                  py="sm"
                  wrap="nowrap"
                  justify="space-between"
                  key={index}
                  bg={index % 2 == 0 ? "brand.0" : ""}
                >
                  <Text size="sm">{playerinfo.name}</Text>

                  <Switch size="md" />
                </Group>
              ))}
            </Stack>
          </Paper>
        </>
      );
  }
}
