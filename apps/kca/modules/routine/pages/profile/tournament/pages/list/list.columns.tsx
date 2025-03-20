import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "tournament.name",
    title: "Name",
    width: 300,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar size="md" src={record?.tournament?.icon} />
        <Text size="sm">{record?.tournament?.name}</Text>
      </Group>
    ),
    sortable: true,
  },
  {
    accessor: "add",
    title: "Address",
    render: (record: any) => (
      <Text size="sm">{record?.tournament?.location}</Text>
    ),
    sortable: true,
  },

  {
    accessor: "start_date",
    title: "Start Date",
    sortable: true,
    render: (record: any) => (
      <Text size="xs">{record?.tournament?.start_date}</Text>
    ),
  },
  {
    accessor: "end_date",
    title: "End Date",
    sortable: true,
    render: (record: any) => (
      <Text size="xs">{record?.tournament?.end_date}</Text>
    ),
  },
];
