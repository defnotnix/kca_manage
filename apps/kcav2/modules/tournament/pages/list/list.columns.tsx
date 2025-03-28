import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Name",
    width: 300,
    render: (record: any) => (
      <Group wrap="nowrap">
      
        <Text size="sm">{record.name}</Text>
      </Group>
    ),
    sortable: true,
  },
  {
    accessor: "add",
    title: "Address",
    render: (record: any) => <Text size="sm">{record.location}</Text>,
    sortable: true,
  },
  {
    accessor: "location",
    title: "Event Location",
    sortable: true,
  },
  {
    accessor: "start_date",
    title: "Start Date",
    sortable: true,
  },
  {
    accessor: "end_date",
    title: "End Date",
    sortable: true,
  },
];
