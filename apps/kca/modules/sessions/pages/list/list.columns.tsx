import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Session Name",
    sortable: true,
  },
  {
    accessor: "coach",
    title: "Session Coach",
    sortable: true,
  },
  {
    accessor: "start_time",
    title: "Start Time",
    sortable: true,
  },
  {
    accessor: "end_time",
    title: "End Time",
    sortable: true,
  },
];
