import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Package Name",
    sortable: true,
  },

  {
    accessor: "i",
    title: "Package Particulars",
    sortable: true,
    render: (record: any) => {
      console.log(record);

      return (
        <>
          <Group gap="xs">
            {record?.specification.map((spec: any, index: number) => (
              <Badge size="md" variant="light" key={index}>
                <Group gap="xs">
                  <Text size="xs" opacity={0.8}>
                    {spec.name}
                  </Text>
                  <Text size="xs" opacity={0.6}>
                    :
                  </Text>
                  <Text size="xs" fw={600} c="brand.6">
                    Rs. {spec.price}
                  </Text>
                </Group>
              </Badge>
            ))}
          </Group>
        </>
      );
    },
  },
];
