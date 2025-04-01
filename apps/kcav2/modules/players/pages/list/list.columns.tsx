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
            Enrolled on {record.date_of_enroll}
          </Text>
        </div>
      </Group>
    ),
    sortable: true,
  },

  {
    accessor: "st",
    title: "Status",
    render: (record: any) => {
      const expiryDate = new Date(record?.expiry_date);
      const today = new Date();
      const diffInDays = Math.ceil(
        (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      let status = "Expired";
      let color = "red";

      if (diffInDays > 10) {
        status = "Active";
        color = "green";
      } else if (diffInDays > 0) {
        status = "Expiring Soon";
        color = "yellow";
      }

      return (
        <>
          <Group gap="xs">
            <Badge size="sm" color={color}>
              {status}
            </Badge>
            <Text size="xs" opacity={0.5}>
              {diffInDays >= 0
                ? ` Next due in ${diffInDays} days`
                : `Player expired on ${record?.expiry_date}`}
            </Text>
          </Group>
        </>
      );
    },
    sortable: true,
  },

  {
    accessor: "perm_address",
    title: "Address",
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
    accessor: "parent_contact",
    title: "Guardian Contact",
  },
  {
    accessor: "parent_name",
    title: "Guardian",
    render: (row: any) => (
      <>
        {row.parent_name}({row.relation})
      </>
    ),
  },
  {
    accessor: "gender",
    title: "Gender",
    render: (record: any) => (
      <Badge
        size="sm"
        variant="light"
        color={
          record?.gender == "Male"
            ? "brand"
            : record?.gender == "Female"
              ? "pink"
              : "orange"
        }
      >
        {record?.gender}
      </Badge>
    ),
    sortable: true,
  },
];
