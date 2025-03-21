import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Name",
    sortable: true,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar src={record.image} alt="Service Image" />
        <Text size="sm">{record.name}</Text>
      </Group>
    ),
  },
  {
    accessor: "price",
    title: "Price",
    sortable: true,
  },

  {
    accessor: "category",
    title: "Category",
    render: (record: any) => <Text>{record.category}</Text>,
  },
  {
    accessor: "specification",
    title: "Specification",
    render: (record: any) => (
      <Group gap="xs">
        {record.specification &&
          record.specification?.map(({ key, value }: any) => (
            <Badge
              size="sm"
              variant="light"
              key={key}
            >{`${key}: ${value}`}</Badge>
          ))}
      </Group>
    ),
  },
];
