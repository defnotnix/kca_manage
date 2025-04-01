"use client";

import { Avatar, Badge, Group, Text } from "@mantine/core";

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
    accessor: "type",
    title: "Email ",
    sortable: true,
    render: (record: any) => {
      return (
        <Group>
          {record.is_admin && (
            <Badge color="blue" size="sm">
              Admin
            </Badge>
          )}

          {record.is_coach && (
            <Badge color="teal" size="sm">
              Coach
            </Badge>
          )}

          {record.is_staff && (
            <Badge color="pink" size="sm">
              Staff
            </Badge>
          )}
        </Group>
      );
    },
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
