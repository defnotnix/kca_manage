import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Name",
    width: 300,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar size="md" src={record.image} />
        <Text size="xs">{record.name}</Text>
      </Group>
    ),
    sortable: true,
  },
  {
    accessor: "member_id",
    title: "Member ID",
    sortable: true,
  },
  {
    accessor: "dob",
    title: "Date of Birth",
    sortable: true,
  },
  {
    accessor: "gender",
    title: "Gender",
    render: (record: any) => <Text size="xs">{record.gender}</Text>,
    sortable: true,
  },
  {
    accessor: "contact",
    title: "Contact",
    sortable: true,
  },
  {
    accessor: "email",
    title: "Email",
    sortable: true,
  },
  {
    accessor: "assigned_team",
    title: "Assigned Team",
    sortable: true,
  },
  {
    accessor: "package",
    title: "Package",
    sortable: true,
    render: (record: any) => <Text size="xs">{record?.package?.name}</Text>,
  },
  {
    accessor: "level_exp",
    title: "Experience Level",
    sortable: true,
  },
  {
    accessor: "time_for_training",
    title: "Training Time",
    sortable: true,
  },
  {
    accessor: "membership",
    title: "Membership",
    sortable: true,
  },
  {
    accessor: "parent_name",
    title: "Parent Name",
    sortable: true,
  },
  {
    accessor: "primary_contact",
    title: "Parent Contact",
    sortable: true,
  },
  {
    accessor: "emergency_contact",
    title: "Emergency Contact",
    sortable: true,
  },
  {
    accessor: "doe",
    title: "Enrollment Date",
    sortable: true,
  },
  {
    accessor: "decided_rate",
    title: "Decided Rate",
    sortable: true,
  },
];
