import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Name",
    width: 300,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar size="xs" src={record.image} />
        <Text size="sm">{record.name}</Text>
      </Group>
    ),
    sortable: true,
  },

  {
    accessor: "email",
    title: "Email Address",
    sortable: true,
  },
  {
    accessor: "username",
    title: "Phone",
    sortable: true,
  },
];
