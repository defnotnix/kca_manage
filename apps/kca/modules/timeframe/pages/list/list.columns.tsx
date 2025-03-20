import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
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
  {
    accessor: "status",
    title: "Status",
    sortable: true,
    render: (record: any) => {
      return (
        <Group>
          {record.status == true && (
            <Badge color="teal" size="sm">
              Active
            </Badge>
          )}
          {record.status == false && (
            <Badge color="orange" size="sm">
              Inactive
            </Badge>
          )}
        </Group>
      );
    },
  },
];
