import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Name",
    width: 300,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar size="md" src={record.image} />
        <div>
          <Text size="sm" fw={600}>
            {record.name}
          </Text>
          <Text size="xs" opacity={0.5}>
            {record.member_id} | Enrolled on {record.doe}
          </Text>
        </div>
      </Group>
    ),
    sortable: true,
  },

  {
    accessor: "dob",
    title: "Payment Status",
    sortable: true,
    render: (record: any) => {
      return (
        <>
          <Badge color="teal" variant="dot" size="md">
            PAID & ACTIVE
          </Badge>
          <Text size="10px" opacity={0.5} ml={22} mt="4px">
            Next Due in 16 days
          </Text>
        </>
      );
    },
  },
  {
    accessor: "gender",
    title: "Gender",
    render: (record: any) => (
      <Badge
        size="sm"
        variant="light"
        color={
          record?.gender == "M"
            ? "brand"
            : record?.gender == "F"
              ? "pink"
              : "orange"
        }
      >
        {record?.gender == "M"
          ? "Male"
          : record?.gender == "F"
            ? "Female"
            : "Other"}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "contact",
    title: "Contact Details",
    render: (record: any) => (
      <Text size="xs">
        <b>{record?.contact}</b> <br /> {record?.email}
      </Text>
    ),
    sortable: true,
  },

  {
    accessor: "team",
    title: "Team",
    sortable: true,
    render: (record: any) => (
      <Text size="xs">{record?.team?.name} - Team Captain</Text>
    ),
  },
  {
    accessor: "package",
    title: "Package",
    sortable: true,
    render: (record: any) => <Text size="xs">{record?.package?.name}</Text>,
  },
];
