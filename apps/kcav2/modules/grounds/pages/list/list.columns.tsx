import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Ground Name",
    sortable: true,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar size="sm" src={record.image} />
        <Text size="sm">{record.name}</Text>
      </Group>
    ),
  },
  {
    accessor: "pitch",
    title: "Pitch",
    sortable: true,
  },
  {
    accessor: "price_hr",
    title: "Hourly Price",
    sortable: true,
  },
  {
    accessor: "price_day",
    title: "Day Price",
    sortable: true,
  },
  {
    accessor: "booking_price_hr",
    title: "Hourly Booking Price",
    sortable: true,
  },
  {
    accessor: "booking_price_day",
    title: "Day Booking Price",
    sortable: true,
  },
];
