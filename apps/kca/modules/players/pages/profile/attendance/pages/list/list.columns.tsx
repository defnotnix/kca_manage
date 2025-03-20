import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "date",
    title: "Date of Attendance",
    sortable: true,
  },
  {
    accessor: "is_present",
    title: "Attendance Status",
    render: (row: any) => {
      return (
        <Badge variant="light" color={row.is_present ? "teal" : "red"}>
          {row.is_present ? "Present" : "Absent"}
        </Badge>
      );
    },
  },
];
