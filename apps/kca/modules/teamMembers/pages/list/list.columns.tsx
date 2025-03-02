import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "player",
    title: "Player Details",
    render: (row: any) => {
      return (
        <Group wrap="nowrap">
          <Avatar size="md" src={row?.player?.image} />
          <Text size="xs">{row?.player?.name}</Text>
        </Group>
      );
    },
    sortable: true,
  },
  {
    accessor: "role",
    title: "Player Role",
    sortable: true,
  },
];
