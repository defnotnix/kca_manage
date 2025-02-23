import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Name",
    width: 300,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar size="md" src={record.photo} />
        <Text size="xs">
          {record.name}
          <br />
          <span style={{ opacity: 0.5 }}>{record.jp_name}</span>
        </Text>
      </Group>
    ),
    sortable: true,
  },
  {
    accessor: "district",
    title: "District",
    render: (record: any) => (
      <Text size="xs">
        {record.district}
        <br />
        <span style={{ opacity: 0.5 }}>{record.jp_district}</span>
      </Text>
    ),
    sortable: true,
  },

  {
    accessor: "is_married",
    title: "Martial Status",
    render: (record: any) => (
      <Badge
        color={record.is_married === "1" ? "teal" : "orange"}
        variant="light"
        size="xs"
        radius="sm"
      >
        {record.is_married === "1" ? "Married" : "Not Married"}
      </Badge>
    ),
    sortable: true,
  },

  {
    accessor: "has_food_allergy",
    title: "Allergy Status",
    render: (record: any) => (
      <Group gap="xs">
        <Badge
          color={record.has_food_allergy === "1" ? "orange" : "teal"}
          variant="light"
          size="xs"
          radius="sm"
        >
          {record.is_married === "1" ? "Has Food Allergy" : "No Food Allergy"}
        </Badge>
        <Badge
          variant="light"
          color={record.is_married === "1" ? "orange" : "teal"}
          size="xs"
          radius="sm"
        >
          {record.is_married === "1"
            ? "Has Food Prohibition"
            : "No Food Prohibition"}
        </Badge>
      </Group>
    ),
    sortable: true,
  },

  {
    accessor: "strong_point",
    title: "Strengths",
    render: (record: any) => (
      <Text size="xs">
        {record.strong_point}
        <br />
        <span style={{ opacity: 0.5 }}>{record.jp_strong_point}</span>
      </Text>
    ),
    sortable: true,
  },
  {
    accessor: "negative_point",
    title: "Weaknesses",
    render: (record: any) => (
      <Text size="xs">
        {record.negative_point}
        <br />
        <span style={{ opacity: 0.5 }}>{record.jp_negative_point}</span>
      </Text>
    ),
    sortable: true,
  },
  {
    accessor: "certified_skill",
    title: "Certified Skill",
    render: (record: any) => (
      <Text size="xs">
        {record.certified_skill}
        <br />
        <span style={{ opacity: 0.5 }}>{record.jp_certified_skill}</span>
      </Text>
    ),
    sortable: true,
  },
  {
    accessor: "language_certification",
    title: "Language Certification",
    render: (record: any) => (
      <Text size="xs">
        {record.language_certification}
        <br />
        <span style={{ opacity: 0.5 }}>{record.jp_language_certification}</span>
      </Text>
    ),
    sortable: true,
  },

  {
    accessor: "language_training_year",
    title: "L.T.Y",

    sortable: true,
  },

  //   {
  //     accessor: "academic_history",
  //     title: "Academic History",
  //     render: (record: any) =>
  //       `${record.academic_history?.institute} (${record.academic_history?.jp_institute})<br />${record.academic_history?.place} (${record.academic_history?.jp_place})`,
  //     sortable: true,
  //   },
  //   {
  //     accessor: "work_history",
  //     title: "Work History",
  //     render: (record: any) =>
  //       `${record.work_history?.from_year} - ${record.work_history?.to_year}<br />Salary: ${record.work_history?.salary}`,
  //     sortable: true,
  //   },
  //   {
  //     accessor: "orthopedics_appliance",
  //     title: "Orthopedics Appliance",
  //     render: (record: any) =>
  //       `${record.orthopedics_appliance?.teeth_position} (${record.orthopedics_appliance?.jp_teeth_position})<br />Appliance: ${record.orthopedics_appliance?.appliance} (${record.orthopedics_appliance?.jp_appliance})`,
  //     sortable: true,
  //   },
];
