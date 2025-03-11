import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "award",
    title: "Award",
    sortable: true,
  },
  {
    accessor: "extra_details",
    title: "Extra Details",
  },
  {
    accessor: "tournament",
    title: "Tournament",
    sortable: true,
    render: (row: any) => <Text size="sm">{row.tournament?.name}</Text>,
  },

  {
    accessor: "awarded_date",
    title: "Awarded Date",
    sortable: true,
  },
];
