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
  SegmentedControl,
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
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useDebouncedState } from "@mantine/hooks";

// Assuming you have these defined elsewhere

const gradingChoice = ["A+", "A", "B", "C", "C-"];

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXT

  const { current, handleStepNext } = FormHandler.usePropContext();

  //  const current: number = 3;

  const [search, setSearch] = useDebouncedState("", 200);

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
                title="Select Student"
                description="Choose the student for which you want to take attendance."
                actionButton={
                  <TextInput
                    placeholder="Search.."
                    leftSection={<MagnifyingGlass />}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                }
              />

              <SimpleGrid spacing="xs" cols={3}>
                {querySessions.data
                  ?.filter((e) => {
                    return e.name.toLowerCase().includes(search.toLowerCase());
                  })
                  .map((sessiondata: any, index: number) => (
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
                          Morning Sessions - S2
                        </Text>
                        <Text size="md">{sessiondata.coach}</Text>
                        <Text size="xs" c="brand.5">
                          M123456
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
          <SimpleGrid spacing={0} cols={{ base: 1, lg: 2 }}>
            {/* Batting Performance */}
            <div>
              <Paper px="lg" py="md" withBorder bg="gray.0">
                <FormElement.SectionTitle
                  isTopElement
                  description="Evaluate the player's batting skills based on technique."
                  title="Batting Skills"
                />
              </Paper>

              {/* Batting Fields */}
              <Paper withBorder>
                <Stack gap={0}>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Batting Grip</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Stance</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Bat Lift</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Weight Transfer</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Judgement</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Shot Selection</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Execution</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group py="xs" px="md" opacity={0} visibleFrom="lg">
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group py="xs" px="md" opacity={0} visibleFrom="lg">
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group py="xs" px="md" opacity={0} visibleFrom="lg">
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                </Stack>
              </Paper>
            </div>
            <div>
              {/* Bowling Performance */}
              <Paper px="lg" py="md" withBorder bg="gray.0">
                <FormElement.SectionTitle
                  isTopElement
                  description="Assess the player's bowling mechanics, accuracy, and variations."
                  title="Bowling Skills"
                />
              </Paper>

              {/* Bowling Fields */}
              <Paper withBorder>
                <Stack gap={0}>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Bowling Grip</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Run-up</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Loading</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Jump</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Landing</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Release</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Accuracy</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Swing</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Turn</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Variation</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                </Stack>
              </Paper>
            </div>

            <div>
              {/* Fielding and Catching Performance */}
              <Paper px="lg" py="md" withBorder bg="gray.0">
                <FormElement.SectionTitle
                  isTopElement
                  description="Evaluate the player's ability to field, catch, and throw accurately."
                  title="Fielding & Catching Skills"
                />
              </Paper>

              {/* Fielding Fields */}
              <Paper withBorder>
                <Stack gap={0}>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Ground Fielding</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Technique</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Collection</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Throwing</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Catching Technique</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Ball Judgement</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Throwing Technique</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                </Stack>
              </Paper>
            </div>

            <div>
              {/* Performance and Mentality */}
              <Paper px="lg" py="md" withBorder bg="gray.0">
                <FormElement.SectionTitle
                  isTopElement
                  description="Assess the player's physical ability, mental strength, and teamwork."
                  title="Performance & Mentality"
                />
              </Paper>

              {/* Performance and Mentality Fields */}
              <Paper withBorder>
                <Stack gap={0}>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Strength</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Mental</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Physical</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Team Player</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Discipline</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                    <Text size="sm">Learning</Text>
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                  <Group py="xs" px="md" opacity={0} visibleFrom="lg">
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                </Stack>
              </Paper>
            </div>
          </SimpleGrid>
          {/* Overall */}
          <Paper withBorder>
            <Stack gap={0}>
              <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                <Text size="sm">Overall Performance</Text>
                <SegmentedControl data={gradingChoice} />
              </Group>
            </Stack>
          </Paper>

          {/* Remarks */}
          <Paper withBorder p="md">
            <Textarea
              rows={4}
              label="Coach Remarks"
              description="Add any remarks or comments about the player."
              placeholder="Enter any remarks..."
            />
          </Paper>
        </>
      );
  }
}
