import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

const statusMap: any = {
  "1": "Approved",
  "2": "Rejected",
  "3": "Pending",
};

const statusColorMap: any = {
  "1": "teal",
  "2": "red",
  "3": "blue",
};

export const columns = [
  {
    accessor: "status",
    title: "Status",
    sortable: true,
    render: (records: any) => {
      return (
        <Badge color={statusColorMap[records.status]}>
          {statusMap[records.status]}
        </Badge>
      );
    },
  },
  {
    accessor: "date",
    title: "Booked Date",
    width: 150,
    render: (record: any) => <>{String(record.date).substring(0, 15)}</>,
    sortable: true,
  },

  {
    accessor: "Booked Times",
    title: "Booking Slots",
    sortable: true,
    render: (record: any) => (
      <Group gap={2}>
        {record.time?.map((item: any, index: number) => (
          <Badge variant="light" key={index}>
            {item.start_time} - {item.end_time}
          </Badge>
        ))}
      </Group>
    ),
  },

  {
    accessor: "name",
    title: "Booked By",
    width: 200,
    sortable: true,
  },

  {
    accessor: "contact",
    title: "Phone",
    sortable: true,
  },
  {
    accessor: "email",
    title: "Email Address",
    sortable: true,
  },
  {
    accessor: "ground",
    title: "Ground",
    width: 200,
    sortable: true,
    render: (record: any) => <>{record?.ground?.name}</>,
  },
  {
    accessor: "addons",
    title: "Add-On's",
    sortable: true,
    render: (record: any) => (
      <Group gap={2}>
        {record.addons?.map((item: any, index: number) => (
          <Badge variant="dot" key={index}>
            {item.name}
          </Badge>
        ))}
      </Group>
    ),
  },
];
