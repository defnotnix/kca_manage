"use client";

import {
  Anchor,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { House, Pen, Printer } from "@phosphor-icons/react";
import { RadarChart } from "@mantine/charts";

import classes from "./doc.module.css";
import { useState } from "react";

import imgLogo from "@/assets/img/logo.png";

const playerData: any = {
  name: "Paras Khadka",
  studentId: "124123123",
  team: "KCA Core Team",
  enrolled: "2023-05-01",

  // Batting
  batting_grip: "A",
  stance: "B",
  batlift: "C",
  weight_transfer: "A",
  judgement: "B",
  shot_selection: "C",
  execution: "A",

  // Bowling
  bowling_grip: "B",
  runup: "C",
  loading: "A",
  jump: "B",
  landing: "C",
  release: "A",
  accuracy: "B",
  swing: "C",
  turn: "A",
  variation: "B",

  // Fielding and Catching
  ground_fielding: "C",
  technique: "A",
  collection: "B",
  throwing: "C",
  catching_technique: "A",
  ball_judgement: "B",
  throwing_technique: "C",
  // Performance and Mentality
  strength: "A",
  mental: "B",
  physical: "C",
  team_player: "A",
  discipline: "B",
  learning: "C",

  overall: "A",
  remarks: "Demonstrates strong leadership and technical skills.",

  achievements: [
    {
      tournament: "World Cup 2023",
      position: "A",
      award: "B",
      awardedDate: "C",
    },
    {
      tournament: "T20 League 2022",
      position: "B",
      award: "A",
      awardedDate: "C",
    },
  ],
};

export const data = [
  {
    product: "Bowling",
    sales: 120,
  },
  {
    product: "Batting",
    sales: 98,
  },
  {
    product: "Fielding",
    sales: 86,
  },
  {
    product: "Agility",
    sales: 99,
  },
  {
    product: "Discipline",
    sales: 85,
  },
  {
    product: "Overall",
    sales: 85,
  },
];

const playerData2: any = {
  name: "Paras Khadka",
  studentId: "124123123",
  team: "KCA Core Team",
  enrolled: "2023-05-01",

  // Batting
  batting_grip: "A",
  stance: "B",
  batlift: "C",
  weight_transfer: "A",
  judgement: "B",
  shot_selection: "C",
  execution: "A",

  // Bowling
  bowling_grip: "B",
  runup: "C",
  loading: "A",
  jump: "B",
  landing: "C",
  release: "A",
  accuracy: "B",
  swing: "C",
  turn: "A",
  variation: "B",

  // Fielding and Catching
  ground_fielding: "C",
  technique: "A",
  collection: "B",
  throwing: "C",
  catching_technique: "A",
  ball_judgement: "B",
  throwing_technique: "C",
  // Performance and Mentality
  strength: "A",
  mental: "B",
  physical: "C",
  team_player: "A",
  discipline: "B",
  learning: "C",

  overall: "A",
  remarks: "Demonstrates strong leadership and technical skills.",

  achievements: [
    {
      tournament: "World Cup 2023",
      position: "A",
      award: "B",
      awardedDate: "C",
    },
    {
      tournament: "T20 League 2022",
      position: "B",
      award: "A",
      awardedDate: "C",
    },
  ],
};

const bread = [
  {
    label: "KCA Admin",
  },
  {
    label: "Invoice",
  },
  {
    label: "Invoice 124123",
  },
];

export function _Doc() {
  const [comparision, setComparision] = useState(true);

  return (
    <>
      <section
        style={{
          display: "block",
          width: "100%",
          minHeight: "calc(100vh - 50px)",
          background: "var(--mantine-color-gray-2)",
        }}
      >
        <Container size="lg" py="md">
          <Breadcrumbs
            separatorMargin={4}
            separator={
              <Text size="xs" c="gray.5">
                /
              </Text>
            }
          >
            <House
              weight="duotone"
              size={12}
              color="var(--mantine-color-brand-5)"
            />
            {bread.map((breadinfo: any, index: number) => (
              <Anchor
                size="xs"
                c={index == bread.length - 1 ? "dark.9" : "gray.5"}
                fw={600}
                key={index}
              >
                {breadinfo.label}
              </Anchor>
            ))}
          </Breadcrumbs>

          <Space h="md" />
          <Group justify="space-between" align="flex-end">
            <div>
              <Text size="xl" fw={600}>
                Invoice - 1124123
              </Text>
              <Text size="sm" opacity={0.5}>
                General Invoice | Student - 1231231 | 123123
              </Text>
            </div>

            <Group>
              <Button>Print Document</Button>
            </Group>
          </Group>
        </Container>

        <Center mt="xl">
          <Paper
            pos="relative"
            style={{
              height: "16.5in",
              width: "11in",
            }}
            p=".8in"
          >
            <Group justify="space-between" mb="xl">
              <Text size="sm" tt="uppercase" fw={700}>
                PLAYER's Performance Report & Evaluation Sheet
              </Text>

              <Text size="sm" tt="uppercase" opacity={0.5}>
                May 16, 2024
              </Text>
            </Group>

            <Space h=".5in" />

            <Text size="3rem" ta="center">
              {playerData.name}
            </Text>

            <Group mt="md" justify="center">
              <Text size="xs">Student ID: {playerData.studentId}</Text>
              <Text size="xs">Enrolled: {playerData.enrolled}</Text>
              <Text size="xs">Team: {playerData.team}</Text>
            </Group>

            <RadarChart
              my="xl"
              h={300}
              data={data}
              dataKey="product"
              series={[{ name: "sales", color: "blue.4", opacity: 0.2 }]}
              withPolarRadiusAxis={false}
            />

            <SimpleGrid cols={3} mt="md" spacing="xs">
              <table className={classes.doctable}>
                <thead>
                  <tr>
                    <th>Batting</th>
                    <th>{comparision ? "G1" : "Grading"}</th>
                    {comparision && <th>G2</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Batting Grip</td>
                    <td> {playerData.batting_grip}</td>
                    <td> {playerData2.batting_grip}</td>
                  </tr>
                  <tr>
                    <td>Stance</td>
                    <td> {playerData.stance}</td>
                    <td> {playerData2.stance}</td>
                  </tr>
                  <tr>
                    <td>Bat Lift</td>
                    <td> {playerData.bat_lift}</td>
                    <td> {playerData2.bat_lift}</td>
                  </tr>
                  <tr>
                    <td>Weight Transfer</td>
                    <td> {playerData.weight_transfer}</td>
                    <td> {playerData2.weight_transfer}</td>
                  </tr>
                  <tr>
                    <td>Judgement</td>
                    <td> {playerData.judgement}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Shor Selection</td>
                    <td> {playerData.shot_selection}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Execution</td>
                    <td> {playerData.execution}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr style={{background:"var(--mantine-color-brand-2)"}}>
                    <td><b>Overalll</b></td>
                    <td> A</td>
                    <td>A</td>
                  </tr>
                </tbody>
              </table>

              {/* Bowling Stats */}
              <table className={classes.doctable}>
                <thead>
                  <tr>
                    <th>Bowling</th>
                    <th>{comparision ? "G1" : "Grading"}</th>
                    {comparision && <th>G2</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bowling Grip</td>
                    <td>{playerData.bowling_grip}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Run Up</td>
                    <td>{playerData.run_up}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Loading</td>
                    <td>{playerData.loading}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Jump</td>
                    <td>{playerData.jump}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Landing</td>
                    <td>{playerData.landing}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Release</td>
                    <td>{playerData.release}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Accuracy</td>
                    <td>{playerData.accuracy}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Swing</td>
                    <td>{playerData.swing}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Turn</td>
                    <td>{playerData.turn}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Variation</td>
                    <td>{playerData.variation}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr style={{background:"var(--mantine-color-brand-2)"}}>
                    <td><b>Overalll</b></td>
                    <td> A</td>
                    <td>A</td>
                  </tr>
                </tbody>
              </table>

              {/* Fielding Stats */}
              <table className={classes.doctable}>
                <thead>
                  <tr>
                    <th>Fielding</th>
                    <th>{comparision ? "G1" : "Grading"}</th>
                    {comparision && <th>G2</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ground Fielding</td>
                    <td>{playerData.ground_fielding}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Technique</td>
                    <td>{playerData.technique}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Collection</td>
                    <td>{playerData.collection}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Throwing</td>
                    <td>{playerData.throwing}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Catching Technique</td>
                    <td>{playerData.catching_technique}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Ball Judgement</td>
                    <td>{playerData.ball_judgement}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Throwing Technique</td>
                    <td>{playerData.throwing_technique}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr style={{background:"var(--mantine-color-brand-2)"}}>
                    <td><b>Overalll</b></td>
                    <td> A</td>
                    <td>A</td>
                  </tr>
                </tbody>
              </table>

              {/* Agility Stats */}
              <table className={classes.doctable}>
                <thead>
                  <tr>
                    <th>Performance</th>
                    <th>{comparision ? "G1" : "Grading"}</th>
                    {comparision && <th>G2</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Strength</td>
                    <td>{playerData.strength}</td>
                    <td>{playerData2.strength}</td>
                  </tr>
                  <tr>
                    <td>Mental</td>
                    <td>{playerData.mental}</td>
                    <td>{playerData2.mental}</td>
                  </tr>
                  <tr>
                    <td>Physical</td>
                    <td>{playerData.physical}</td>
                    <td>{playerData2.physical}</td>
                  </tr>
                  <tr>
                    <td>Team Player</td>
                    <td>{playerData.team_player}</td>
                    <td>{playerData.team_player}</td>
                  </tr>
                  <tr>
                    <td>Discipline</td>
                    <td>{playerData.discipline}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr>
                    <td>Learning</td>
                    <td>{playerData.learning}</td>
                    <td>{playerData.discipline}</td>
                  </tr>
                  <tr style={{background:"var(--mantine-color-brand-2)"}}>
                    <td><b>Overalll</b></td>
                    <td> A</td>
                    <td>A</td>
                  </tr>
                </tbody>
              </table>

              <div>
                <Text size="xs">
                  Note : <br />
                  <b>
                    G1 - Grading for January
                    <br />
                    G2 - Grading for February
                  </b>
                </Text>
              </div>

              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Text ta="right" size="sm" fw={600}>
                  Overall Evaluation Score
                </Text>
                <Text ta="right" size="6rem" fw={600} my="sm">
                  A
                </Text>
                <Text ta="right" size="xs" opacity={0.5} fw={600}>
                  Note: This is a general rating based on KCA Standard of
                  Metrics
                </Text>
              </Box>
            </SimpleGrid>

            <Text ta="left" size="sm" fw={800} mt="xl">
              Tournments & Achievements
            </Text>

            <Stack gap="0" mt="xs">
              {playerData.achievements.map((item: any, index: number) => (
                <Text size="xs" key={index}>
                  {item.tournament} ( {item.position} - {item.award} -{" "}
                  {item.awardedDate} - {item.extraDetails})
                </Text>
              ))}
            </Stack>

            <Box
              py="1in"
              style={{
                width: "100%",
              }}
              pos="absolute"
              left={0}
              bottom={24}
            >
              <Divider mb="xl" />

              <Group justify="space-between" px=".8in">
                <Image
                  w={100}
                  h={50}
                  src={imgLogo.src}
                  style={{
                    objectPosition: "flex-start",
                  }}
                />
                <Group gap="xl">
                  <div>
                    <Text size="sm" tt="uppercase" fw={700}>
                      Kathmandu Cricket Academy
                    </Text>

                    <Text size="xs">(+977) - 99812341231</Text>
                  </div>
                  <div>
                    <Text size="xs">info@kathmanducricketacademy.com.np</Text>

                    <Text size="xs">
                      Rabindra Chowk, Kalimati, Kathmandu, Nepal.
                    </Text>
                  </div>
                </Group>
              </Group>
            </Box>
          </Paper>
        </Center>

        <Space h="xl" />
      </section>
    </>
  );
}
