import {Avatar, Badge, Group, Stack, Text} from "@mantine/core";

export const columns = [
    {
        accessor: "player",
        title: "Player Details",
        render: (row: any) => {
            return (
                <Group wrap="nowrap">
                    <Avatar size="sm" src={row?.image}/>
                    <Text size="xs">{row?.name}</Text>
                </Group>
            );
        },
        sortable: true,
    },

];
