import { Badge } from "@mantine/core";

export const columns = [
  {
    accessor: "invoice_id",
    title: "Invoice ID",
    sortable: true,
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
    accessor: "paid_amount",
    title: "Paid Amount",
    sortable: true,
  },
];
