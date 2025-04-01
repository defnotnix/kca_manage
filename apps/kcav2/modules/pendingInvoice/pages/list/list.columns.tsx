import { Badge } from "@mantine/core";

export const columns = [
  {
    accessor: "invoice_id",
    title: "Invoice ID",
    sortable: true,
  },
  {
    accessor: "status",
    title: "Status",
    sortable: true,
    render: (row: any) => {
      const status =
        row?.remaining_payment == 0
          ? "Paid"
          : Number(row?.remaining_payment) < Number(row?.total_amount)
            ? "Semi Paid"
            : "Not Paid";

      return (
        <Badge
          w={100}
          color={
            status === "Paid"
              ? "teal"
              : status === "Semi Paid"
                ? "orange"
                : "red"
          }
          size="sm"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessor: "created_at",
    title: "Invoice Date",
    sortable: true,
    render: (row: any) => <>{String(row.created_at).substring(0, 10)}</>,
    width: 120,
  },
  {
    accessor: "customer_name",
    title: "Billed To",
    sortable: true,
    width: 200,
  },
  {
    accessor: "customer_address",
    title: "Billing Address",
    sortable: true,
    width: 200,
  },

  {
    accessor: "total_amount",
    title: "Amount",
    sortable: true,
  },

  {
    accessor: "remaining_payment",
    title: "Remaining Amount",
    sortable: true,
  },
];
