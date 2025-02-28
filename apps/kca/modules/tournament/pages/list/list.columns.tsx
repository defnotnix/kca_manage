import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "Name",
    width: 300,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar size="xs" src={record.image} />
        <Text size="xs">
          {record.firstName} {record.middleName} {record.lastName}
        </Text>
      </Group>
    ),
    sortable: true,
  },
  {
    accessor: "add",
    title: "Address",
    render: (record: any) => (
      <Text size="xs">
        {record.address?.address}, {record.address?.city},{" "}
        {record.address?.state}, {record.address?.stateCode},{" "}
        {record.address?.postalCode}
      </Text>
    ),
    sortable: true,
  },
  {
    accessor: "email",
    title: "Email Address",
    sortable: true,
  },
  {
    accessor: "phone",
    title: "Phone",
    sortable: true,
  },
  {
    accessor: "birthDate",
    title: "Date of Birth",
    sortable: true,
  },
  {
    accessor: "bloodGroup",
    title: "Blood Group",
    render: (record: any) => <Badge variant="light">{record.bloodGroup}</Badge>,
    sortable: true,
  },
  {
    accessor: "macAddress",
    title: "MAC",
    sortable: true,
  },
  {
    accessor: "university",
    title: "University",
    sortable: true,
  },
  {
    accessor: "role",
    title: "Auth Group",
    sortable: true,
  },
];
