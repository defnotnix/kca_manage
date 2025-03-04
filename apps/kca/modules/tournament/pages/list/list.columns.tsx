import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Name",
    width: 300,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar size="xs" src={record.icon} />
        <Text size="xs">{record.name}</Text>
      </Group>
    ),
    sortable: true,
  },
  {
    accessor: "add",
    title: "Address",
    render: (record: any) => (
      <Text size="xs">
        {record.address?.address}, {record.address?.city},{" "}
        {record.address?.state}, {record.address?.stateCode},{" "}
        {record.address?.postalCode}
      </Text>
    ),
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
