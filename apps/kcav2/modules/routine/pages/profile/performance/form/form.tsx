"use client";

import React, { useEffect, useState } from "react";
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
  Loader,
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

// Assuming you have these defined elsewhere

import { getRecords as getTournaments } from "@/modules/tournament/module.api";
import { useParams } from "next/navigation";

const gradingChoice = ["A+", "A", "B", "C", "C-"];

export function _Form() {
  // * DEFINITIONS

  const form = FormHandler.useForm();
  const Params = useParams();

  // * CONTEXT

  const { current } = FormHandler.usePropContext();

  //  const current: number = 3;

  // * STATES

  // * PRELOADING

  // * FUNCTIONS

  const queryTournament = useQuery({
    queryKey: ["tournament", "tournamentData"],
    queryFn: async () => {
      const res = await getTournaments({
        endpoint: "players/tournament/",
      });
      return res;
    },
  });

  // * COMPONENTS

  useEffect(() => {
    form.setFieldValue("player", Params.id);
  }, []);

  if (queryTournament.isLoading) {
    return (
      <>
        <Center h={400}>
          <Loader size="xs" />
        </Center>
      </>
    );
  }

  switch (current) {
    case 0:
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
                    "bat_lift",
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
                      <Text size="sm">{field.replace("_", " ")}</Text>
                      <SegmentedControl
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
                    "run_up",
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
                      <Text size="sm">{field.replace("_", " ")}</Text>
                      <SegmentedControl
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
                      <Text size="sm">{field.replace("_", " ")}</Text>
                      <SegmentedControl
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
                      <Text size="sm">{field.replace("_", " ")}</Text>
                      <SegmentedControl
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
