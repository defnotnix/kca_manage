import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "date",
    title: "Name",
    width: 300,

    sortable: true,
  },

  {
    accessor: "status",
    title: "Payment Status",
    sortable: true,
    render: (record: any) => {
      return (
        <>
          <Badge color={!record?.is_available ? "teal" : "orange"} variant="dot">
            {record?.is_available ? "Not Used" : "Active Session"}
          </Badge>
        </>
      );
    },
  },

  {
    accessor: "ground",
    title: "Experience Level",
    sortable: true,
    render: (record: any) => <>{record?.ground?.name}</>,
  },

  {
    accessor: "time",
    title: "Experience Level",
    sortable: true,
    render: (record: any) => (
      <>
        {record?.time?.start_time} - {record?.time?.end_time}
      </>
    ),
  },
];
