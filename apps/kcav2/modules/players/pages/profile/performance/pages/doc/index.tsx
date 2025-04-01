"use client";

import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Center,
  ColorSwatch,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  Select,
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
import { useParams } from "next/navigation";
import { getRecords } from "../../module.api";
import { useQuery } from "@tanstack/react-query";

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
  const Params = useParams();

  const queryStudents2: any = { data: { player: {} } };
  const [performanceHistory, setPerformanceHistory] = useState<any[]>([]);
  const [compareIndex, setCompareIndex] = useState(null);

  const queryStudents = useQuery({
    queryKey: ["config", "sessions"], // query key
    queryFn: async () => {
      const res = await getRecords({
        endpoint: "/players/grading/history/" + Params.id + "/",
      });

      console.log(res);

      const performanceHistory = await getRecords({
        endpoint: "/players/grading/history",
        params: {
          player_id: res.player?.id,
        },
      });

      setPerformanceHistory(performanceHistory);

      return res;
    },
    initialData: [],
  });

  const calculateOverallGrading = (data: any, categories: string[]) => {
    // Define the grading scale
    const scoreMap: Record<string, number> = {
      "A+": 90,
      A: 80,
      B: 70,
      C: 60,
      "C-": 50, // Assuming C- is the lowest acceptable grade
    };

    // Extract numerical values for valid grades
    const grades = categories
      .map((key) => {
        const grade = data?.[key]; // Get the grade from data
        return scoreMap[grade as keyof typeof scoreMap]; // Convert to number
      })
      .filter((grade) => grade !== undefined); // Exclude undefined values

    if (grades.length === 0) return "N/A"; // Handle missing data

    // Calculate the average score
    const averageScore =
      grades.reduce((sum, grade) => sum + grade, 0) / grades.length;

    // Determine the overall grade based on the average score
    let overallGrade = "C-"; // Default grade if all else fails (lowest grade)

    // Loop through the scoreMap to determine the grade based on average score
    Object.entries(scoreMap)
      .reverse() // Start with the highest grade
      .forEach(([grade, score]) => {
        if (averageScore >= score) {
          overallGrade = grade;
          return; // Exit once we find the correct grade
        }
      });

    return overallGrade;
  };

  const calculateAverageScore = (data: any, categories: string[]) => {
    // Define the grading scale
    const scoreMap: Record<string, number> = {
      "A+": 100,
      A: 70,
      B: 50,
      C: 30,
      "C-": 10, // Assuming C- is the lowest acceptable grade
    };

    // Extract numerical values for valid grades
    const grades = categories
      .map((key) => {
        const grade = data?.[key]; // Get the grade from data
        return scoreMap[grade as keyof typeof scoreMap]; // Convert to number
      })
      .filter((grade) => grade !== undefined); // Exclude undefined values

    if (grades.length === 0) return "N/A"; // Handle missing data

    // Calculate the average score
    const averageScore =
      grades.reduce((sum, grade) => sum + grade, 0) / grades.length;

    return averageScore.toFixed(2); // Return the average score rounded to two decimal places
  };

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
              <Text size="xs">Compare With</Text>
              <Select
                data={performanceHistory.map((item: any, index) => {
                  return {
                    value: String(index),
                    label: item.date,
                    disabled: item.id == queryStudents?.data?.id,
                  };
                })}
                onChange={(e: any) => {
                  setCompareIndex(e);
                }}
              />
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
                Report Date :{" "}
                {String(new Date(queryStudents?.data?.date)).substring(0, 15)}
              </Text>
            </Group>

            <Space h=".5in" />

            <Text size="3rem" ta="center">
              {queryStudents.data?.player?.name}
            </Text>

            <Group mt="md" justify="center">
              <Text size="xs">
                Enrolled: <b> {queryStudents.data?.player?.date_of_enroll}</b>
              </Text>
              <Text size="xs">
                Address:{" "}
                <b>
                  {queryStudents.data?.player?.temp_addrses ||
                    queryStudents?.data?.player?.perm_address}
                </b>
              </Text>
            </Group>

            <RadarChart
              my="xl"
              h={200}
              data={[
                {
                  performance: "Batting",
                  score: calculateAverageScore(queryStudents?.data, [
                    "batting_grip",
                    "stance",
                    "batlift",
                    "weight_transfer",
                    "judgement",
                    "shot_selection",
                    "execution",
                  ]),
                  preScore: compareIndex
                    ? calculateAverageScore(performanceHistory[compareIndex], [
                        "batting_grip",
                        "stance",
                        "batlift",
                        "weight_transfer",
                        "judgement",
                        "shot_selection",
                        "execution",
                      ])
                    : 0,
                },
                {
                  performance: "Bowling",
                  score: calculateAverageScore(queryStudents?.data, [
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
                  ]),
                  preScore: compareIndex
                    ? calculateAverageScore(performanceHistory[compareIndex], [
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
                      ])
                    : 0,
                },
                {
                  performance: "Fielding",
                  score: calculateAverageScore(queryStudents?.data, [
                    "ground_fielding",
                    "technique",
                    "collection",
                    "throwing",
                    "catching_technique",
                    "ball_judgement",
                    "throwing_technique",
                  ]),
                  preScore: compareIndex
                    ? calculateAverageScore(performanceHistory[compareIndex], [
                        "ground_fielding",
                        "technique",
                        "collection",
                        "throwing",
                        "catching_technique",
                        "ball_judgement",
                        "throwing_technique",
                      ])
                    : 0,
                },
                {
                  performance: "Performance",
                  score: calculateAverageScore(queryStudents?.data, [
                    "strength",
                    "mental",
                    "physical",
                    "team_player",
                    "discipline",
                    "learning",
                  ]),
                  preScore: compareIndex
                    ? calculateAverageScore(performanceHistory[compareIndex], [
                        "strength",
                        "mental",
                        "physical",
                        "team_player",
                        "discipline",
                        "learning",
                      ])
                    : 0,
                },
                {
                  performance: "Overall",
                  score: calculateAverageScore(queryStudents?.data, [
                    "batting_grip",
                    "stance",
                    "batlift",
                    "weight_transfer",
                    "judgement",
                    "shot_selection",
                    "execution",
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
                    "ground_fielding",
                    "technique",
                    "collection",
                    "throwing",
                    "catching_technique",
                    "ball_judgement",
                    "throwing_technique",
                    "strength",
                    "mental",
                    "physical",
                    "team_player",
                    "discipline",
                    "learning",
                  ]),
                  preScore: compareIndex
                    ? calculateAverageScore(performanceHistory[compareIndex], [
                        "batting_grip",
                        "stance",
                        "batlift",
                        "weight_transfer",
                        "judgement",
                        "shot_selection",
                        "execution",
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
                        "ground_fielding",
                        "technique",
                        "collection",
                        "throwing",
                        "catching_technique",
                        "ball_judgement",
                        "throwing_technique",
                        "strength",
                        "mental",
                        "physical",
                        "team_player",
                        "discipline",
                        "learning",
                      ])
                    : 0,
                },
              ]}
              dataKey="performance"
              series={[
                { name: "score", color: "blue.4", opacity: 0.2 },
                {
                  name: "preScore",
                  color: "orange.4",
                  opacity: 0.2,
                },
              ]}
              withPolarRadiusAxis={false}
            />

            {compareIndex && (
              <Group justify="center" gap="xs">
                <Badge variant="dot" size="xs" color="brand">
                  G1 : For {queryStudents?.data?.date}
                </Badge>
                <Badge variant="dot" size="xs" color="orange">
                  G2 : For {performanceHistory[compareIndex]?.date}
                </Badge>
              </Group>
            )}

            <SimpleGrid cols={3} mt="md" spacing="xs">
              <table className={classes.doctable}>
                <thead>
                  <tr>
                    <th>Batting</th>
                    <th>{compareIndex ? "G1" : "Grading"}</th>
                    {compareIndex && <th>G2</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Batting Grip</td>
                    <td> {queryStudents.data?.batting_grip}</td>
                    {compareIndex && (
                      <td> {performanceHistory[compareIndex]?.batting_grip}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Stance</td>
                    <td> {queryStudents.data?.stance}</td>
                    {compareIndex && (
                      <td> {performanceHistory[compareIndex]?.stance}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Bat Lift</td>
                    <td> {queryStudents.data?.batlift}</td>
                    {compareIndex && (
                      <td> {performanceHistory[compareIndex]?.batlift}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Weight Transfer</td>
                    <td> {queryStudents.data?.weight_transfer}</td>
                    {compareIndex && (
                      <td>
                        {" "}
                        {performanceHistory[compareIndex]?.weight_transfer}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Judgement</td>
                    <td> {queryStudents.data?.judgement}</td>
                    {compareIndex && (
                      <td> {performanceHistory[compareIndex]?.judgement}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Shot Selection</td>
                    <td> {queryStudents.data?.shot_selection}</td>
                    {compareIndex && (
                      <td>
                        {" "}
                        {performanceHistory[compareIndex]?.shot_selection}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Execution</td>
                    <td> {queryStudents.data?.execution}</td>
                    {compareIndex && (
                      <td> {performanceHistory[compareIndex]?.execution}</td>
                    )}
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
                  <tr style={{ background: "var(--mantine-color-brand-2)" }}>
                    <td>
                      <b>Overalll</b>
                    </td>
                    <td>
                      {calculateOverallGrading(queryStudents?.data, [
                        "batting_grip",
                        "stance",
                        "batlift",
                        "weight_transfer",
                        "judgement",
                        "shot_selection",
                        "execution",
                      ])}
                    </td>
                    {compareIndex && (
                      <td>
                        {calculateOverallGrading(
                          performanceHistory[compareIndex],
                          [
                            "batting_grip",
                            "stance",
                            "batlift",
                            "weight_transfer",
                            "judgement",
                            "shot_selection",
                            "execution",
                          ]
                        )}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>

              {/* Bowling Stats */}
              <table className={classes.doctable}>
                <thead>
                  <tr>
                    <th>Bowling</th>
                    <th>{compareIndex ? "G1" : "Grading"}</th>
                    {compareIndex && <th>G2</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bowling Grip</td>
                    <td>{queryStudents.data?.bowling_grip}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.bowling_grip}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Run Up</td>
                    <td>{queryStudents.data?.runup}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.runup}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Loading</td>
                    <td>{queryStudents.data?.loading}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.loading}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Jump</td>
                    <td>{queryStudents.data?.jump}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.jump}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Landing</td>
                    <td>{queryStudents.data?.landing}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.landing}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Release</td>
                    <td>{queryStudents.data?.release}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.release}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Accuracy</td>
                    <td>{queryStudents.data?.accuracy}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.accuracy}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Swing</td>
                    <td>{queryStudents.data?.swing}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.swing}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Turn</td>
                    <td>{queryStudents.data?.turn}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.turn}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Variation</td>
                    <td>{queryStudents.data?.variation}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.variation}</td>
                    )}
                  </tr>
                  <tr style={{ background: "var(--mantine-color-brand-2)" }}>
                    <td>
                      <b>Overall</b>
                    </td>
                    <td>
                      {calculateOverallGrading(queryStudents?.data, [
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
                      ])}
                    </td>
                    {compareIndex && (
                      <td>
                        {calculateOverallGrading(
                          performanceHistory[compareIndex],
                          [
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
                          ]
                        )}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>

              {/* Fielding Stats */}
              <table className={classes.doctable}>
                <thead>
                  <tr>
                    <th>Fielding</th>
                    <th>{compareIndex ? "G1" : "Grading"}</th>
                    {compareIndex && <th>G2</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ground Fielding</td>
                    <td>{queryStudents.data?.ground_fielding}</td>
                    {compareIndex && (
                      <td>
                        {performanceHistory[compareIndex]?.ground_fielding}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Technique</td>
                    <td>{queryStudents.data?.technique}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.technique}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Collection</td>
                    <td>{queryStudents.data?.collection}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.collection}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Throwing</td>
                    <td>{queryStudents.data?.throwing}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.throwing}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Catching Technique</td>
                    <td>{queryStudents.data?.catching_technique}</td>
                    {compareIndex && (
                      <td>
                        {performanceHistory[compareIndex]?.catching_technique}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Ball Judgement</td>
                    <td>{queryStudents.data?.ball_judgement}</td>
                    {compareIndex && (
                      <td>
                        {performanceHistory[compareIndex]?.ball_judgement}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Throwing Technique</td>
                    <td>{queryStudents.data?.throwing_technique}</td>
                    {compareIndex && (
                      <td>
                        {performanceHistory[compareIndex]?.throwing_technique}
                      </td>
                    )}
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
                  <tr style={{ background: "var(--mantine-color-brand-2)" }}>
                    <td>
                      <b>Overalll</b>
                    </td>
                    <td>
                      {" "}
                      {calculateOverallGrading(queryStudents?.data, [
                        "strength",
                        "mental",
                        "physical",
                        "team_player",
                        "discipline",
                        "learning",
                      ])}
                    </td>
                    {compareIndex && (
                      <td>
                        {calculateOverallGrading(queryStudents?.data, [
                          "strength",
                          "mental",
                          "physical",
                          "team_player",
                          "discipline",
                          "learning",
                        ])}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>

              {/* Agility Stats */}
              <table className={classes.doctable}>
                <thead>
                  <tr>
                    <th>Performance</th>
                    <th>{compareIndex ? "G1" : "Grading"}</th>
                    {compareIndex && <th>G2</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Strength</td>
                    <td>{queryStudents.data?.strength}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.strength}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Mental</td>
                    <td>{queryStudents.data?.mental}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.mental}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Physical</td>
                    <td>{queryStudents.data?.physical}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.physical}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Team Player</td>
                    <td>{queryStudents.data?.team_player}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.team_player}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Discipline</td>
                    <td>{queryStudents.data?.discipline}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.discipline}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Learning</td>
                    <td>{queryStudents.data?.learning}</td>
                    {compareIndex && (
                      <td>{performanceHistory[compareIndex]?.learning}</td>
                    )}
                  </tr>

                  <tr style={{ background: "var(--mantine-color-brand-2)" }}>
                    <td>
                      <b>Overalll</b>
                    </td>
                    <td>
                      {" "}
                      {calculateOverallGrading(queryStudents?.data, [
                        "strength",
                        "mental",
                        "physical",
                        "team_player",
                        "discipline",
                        "learning",
                      ])}
                    </td>
                    {compareIndex && (
                      <td>
                        {calculateOverallGrading(queryStudents?.data, [
                          "strength",
                          "mental",
                          "physical",
                          "team_player",
                          "discipline",
                          "learning",
                        ])}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>

              {compareIndex ? (
                <div>
                  <Text size="xs">
                    Index : <br />
                    <b>
                      G1 - Grading for {queryStudents?.data?.date}
                      <br />
                      G2 - Grading for {performanceHistory[compareIndex]?.date}
                    </b>
                  </Text>
                </div>
              ) : (
                <div />
              )}

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
                  {queryStudents?.data?.overall || "-"}
                </Text>
                <Text ta="right" size="xs" opacity={0.5} fw={600}>
                  Note: This is a general rating based on KCA Standard of
                  Metrics
                </Text>
              </Box>
            </SimpleGrid>

            <SimpleGrid cols={2}>
              <Box>
                <Text ta="left" size="sm" fw={800} mt="xl">
                  Recent Tournments
                </Text>

                <ul
                  style={{
                    padding: 0,
                  }}
                >
                  {queryStudents.data?.player?.player_tournament
                    .slice(0, 3)
                    .map((item: any, index: number) => (
                      <li key={index}>
                        <Text size="xs">
                          {item.name} ( {item.start_date} - {item.end_date})
                        </Text>
                        <Text size="xs" opacity={0.6}>
                          {item.location}
                        </Text>
                      </li>
                    ))}
                </ul>
              </Box>
              <Box>
                <Text ta="left" size="sm" fw={800} mt="xl">
                  Recent Achievements
                </Text>

                <ul
                  style={{
                    padding: 0,
                  }}
                >
                  {queryStudents.data?.player?.player_achievement
                    ?.slice(0, 3)
                    .map((item: any, index: number) => (
                      <li key={index}>
                        <Text size="xs">
                          {item.award} ( {item.awarded_date})
                        </Text>
                        <Text size="xs" opacity={0.6}>
                          {item.extra_details}
                        </Text>
                      </li>
                    ))}
                </ul>
              </Box>
            </SimpleGrid>

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
