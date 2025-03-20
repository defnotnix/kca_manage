import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Name",
    width: 300,

    sortable: true,
  },
  {
    accessor: "location",
    title: "Address",

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
