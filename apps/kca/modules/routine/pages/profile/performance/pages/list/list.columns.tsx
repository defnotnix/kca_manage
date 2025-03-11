import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

const getBadgeColor = (grade: string) => {
  switch (grade) {
    case "A":
      return "teal";
    case "B":
      return "blue";
    case "C":
      return "yellow";
    case "D":
      return "orange";
    case "E":
      return "red";
    default:
      return "gray";
  }
};

export const columns = [
  {
    accessor: "createdat",
    title: "Performance Created",
    sortable: true,
    render: (row: any) => {
      return (
        <Text size="sm">
          {String(new Date(row.createdat)).substring(0, 15)}
        </Text>
      );
    },
  },
  {
    accessor: "updated_at",
    title: "Performance Updated",
    sortable: true,
    render: (row: any) => {
      return (
        <Text size="sm">
          {String(new Date(row.updated_at)).substring(0, 15)}
        </Text>
      );
    },
  },
  {
    accessor: "batting_grip",
    title: "Batting Grip",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.batting_grip)}>
        {record.batting_grip}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "stance",
    title: "Stance",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.stance)}>{record.stance}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "batlift",
    title: "Bat Lift",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.batlift)}>{record.batlift}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "weight_transfer",
    title: "Weight Transfer",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.weight_transfer)}>
        {record.weight_transfer}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "judgement",
    title: "Judgement",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.judgement)}>{record.judgement}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "shot_selection",
    title: "Shot Selection",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.shot_selection)}>
        {record.shot_selection}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "execution",
    title: "Execution",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.execution)}>{record.execution}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "bowling_grip",
    title: "Bowling Grip",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.bowling_grip)}>
        {record.bowling_grip}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "accuracy",
    title: "Accuracy",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.accuracy)}>{record.accuracy}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "swing",
    title: "Swing",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.swing)}>{record.swing}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "turn",
    title: "Turn",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.turn)}>{record.turn}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "variation",
    title: "Variation",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.variation)}>{record.variation}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "ground_fielding",
    title: "Ground Fielding",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.ground_fielding)}>
        {record.ground_fielding}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "catching_technique",
    title: "Catching Technique",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.catching_technique)}>
        {record.catching_technique}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "strength",
    title: "Strength",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.strength)}>{record.strength}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "mental",
    title: "Mental",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.mental)}>{record.mental}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "physical",
    title: "Physical",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.physical)}>{record.physical}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "team_player",
    title: "Team Player",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.team_player)}>
        {record.team_player}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "discipline",
    title: "Discipline",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.discipline)}>
        {record.discipline}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "learning",
    title: "Learning",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.learning)}>{record.learning}</Badge>
    ),
    sortable: true,
  },
  {
    accessor: "overall",
    title: "Overall",
    render: (record: any) => (
      <Badge color={getBadgeColor(record.overall)}>{record.overall}</Badge>
    ),
    sortable: true,
  },
];
