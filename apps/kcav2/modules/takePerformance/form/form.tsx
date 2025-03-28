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

import { getRecords as getPlayers } from "@/modules/players/module.api";
import { createRecord, getRecords, getSingleRecord } from "../module.api";

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

  const queryStudents = useQuery({
    queryKey: ["config", "sessions"], // query key
    queryFn: async () => {
      const res = await getPlayers({
        endpoint: "/players/info/",
      });

      console.log(res);

      return res;
    },
    initialData: [],
  });

  // * FUNCTIONS

  const handleLoadPreGrading = async (id: any) => {
    const res = await getRecords({
      endpoint: "/players/grading/",
      params: {
        player_id: id,
      },
    });

    if (res.length > 0) {
      console.log(res[0]);
      form.setValues(res[0]);
    } else {
      form.reset();
      createRecord({
        player: id,
      }).then((res) => {
        form.setValues(res.data);
      });
    }
    return res;
  };

  // * COMPONENTS+id+"/"

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

              <SimpleGrid spacing="xs" cols={{ base: 1, lg: 3 }}>
                {queryStudents.data
                  ?.filter((e: any) => {
                    return e.name.toLowerCase().includes(search.toLowerCase());
                  })
                  .map((playerData: any, index: number) => (
                    <UnstyledButton
                      key={index}
                      onClick={async () => {
                        form.setFieldValue("player", playerData.id);
                        await handleLoadPreGrading(playerData?.id);
                        handleStepNext();
                      }}
                    >
                      <Paper withBorder p="md" className={classes.optioncard}>
                        <Group gap="xs">
                          <Avatar size="sm" src={playerData?.image} />
                          <Text size="sm">{playerData?.name}</Text>
                        </Group>
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

              <Paper withBorder>
                <Stack gap={0}>
                  {[
                    "batting_grip",
                    "stance",
                    "batlift",
                    "weight_transfer",
                    "judgement",
                    "shot_selection",
                    "execution",
                  ].map((field, index) => (
                    <Group
                      wrap="nowrap"
                      justify="space-between"
                      py="xs"
                      px="md"
                      key={index}
                    >
                      <Text tt="capitalize" size="sm">
                        {field.replace("_", " ")}
                      </Text>
                      <SegmentedControl
                        color="brand"
                        data={gradingChoice}
                        {...form.getInputProps(field)}
                      />
                    </Group>
                  ))}
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

            {/* Bowling Performance */}
            <div>
              <Paper px="lg" py="md" withBorder bg="gray.0">
                <FormElement.SectionTitle
                  isTopElement
                  description="Assess the player's bowling mechanics, accuracy, and variations."
                  title="Bowling Skills"
                />
              </Paper>

              <Paper withBorder>
                <Stack gap={0}>
                  {[
                    "bowling_grip",
                    "runup",
                    "loading",
                    "jump",
                    "landing",
                    "release",
                    "accuracy",
                    "swing",
                    "turn",
                    "variation",
                  ].map((field, index) => (
                    <Group
                      wrap="nowrap"
                      justify="space-between"
                      py="xs"
                      px="md"
                      key={index}
                    >
                      <Text tt="capitalize" size="sm">
                        {field.replace("_", " ")}
                      </Text>
                      <SegmentedControl
                        color="brand"
                        data={gradingChoice}
                        {...form.getInputProps(field)}
                      />
                    </Group>
                  ))}
                </Stack>
              </Paper>
            </div>

            {/* Fielding and Catching Performance */}
            <div>
              <Paper px="lg" py="md" withBorder bg="gray.0">
                <FormElement.SectionTitle
                  isTopElement
                  description="Evaluate the player's ability to field, catch, and throw accurately."
                  title="Fielding & Catching Skills"
                />
              </Paper>

              <Paper withBorder>
                <Stack gap={0}>
                  {[
                    "ground_fielding",
                    "technique",
                    "collection",
                    "throwing",
                    "catching_technique",
                    "ball_judgement",
                    "throwing_technique",
                  ].map((field, index) => (
                    <Group
                      wrap="nowrap"
                      justify="space-between"
                      py="xs"
                      px="md"
                      key={index}
                    >
                      <Text tt="capitalize" size="sm">
                        {field.replace("_", " ")}
                      </Text>
                      <SegmentedControl
                        color="brand"
                        data={gradingChoice}
                        {...form.getInputProps(field)}
                      />
                    </Group>
                  ))}
                </Stack>
              </Paper>
            </div>

            {/* Performance and Mentality */}
            <div>
              <Paper px="lg" py="md" withBorder bg="gray.0">
                <FormElement.SectionTitle
                  isTopElement
                  description="Assess the player's physical ability, mental strength, and teamwork."
                  title="Performance & Mentality"
                />
              </Paper>

              <Paper withBorder>
                <Stack gap={0}>
                  {[
                    "strength",
                    "mental",
                    "physical",
                    "team_player",
                    "discipline",
                    "learning",
                  ].map((field, index) => (
                    <Group
                      wrap="nowrap"
                      justify="space-between"
                      py="xs"
                      px="md"
                      key={index}
                    >
                      <Text tt="capitalize" size="sm">
                        {field.replace("_", " ")}
                      </Text>
                      <SegmentedControl
                        color="brand"
                        data={gradingChoice}
                        {...form.getInputProps(field)}
                      />
                    </Group>
                  ))}
                  <Group py="xs" px="md" opacity={0} visibleFrom="lg">
                    <SegmentedControl data={gradingChoice} />
                  </Group>
                </Stack>
              </Paper>
            </div>
          </SimpleGrid>

          {/* Overall Performance */}
          <Paper withBorder>
            <Stack gap={0}>
              <Group wrap="nowrap" justify="space-between" py="xs" px="md">
                <Text size="sm">Overall Performance</Text>
                <SegmentedControl
                  data={gradingChoice}
                  {...form.getInputProps("overall_performance")}
                />
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
              {...form.getInputProps("remarks")}
            />
          </Paper>
        </>
      );
  }
}
