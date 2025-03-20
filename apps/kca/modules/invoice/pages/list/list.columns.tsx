import { Badge } from "@mantine/core";

export const columns = [
  {
    accessor: "bill_id",
    title: "Bill ID",
    sortable: true,
  },
  {
    accessor: "invoice_id",
    title: "Invoice ID",
    sortable: true,
  },

  {
    accessor: "receipt_date",
    title: "Receipt Date",
    sortable: true,
  },
  {
    accessor: "customer_name",
    title: "Customer Name",
    sortable: true,
  },
  {
    accessor: "customer_pan",
    title: "Customer PAN",
    sortable: true,
  },
  {
    accessor: "gateway_type",
    title: "Gateway Type",
    sortable: true,
  },
  {
    accessor: "amount",
    title: "Amount",
    sortable: true,
  },
  {
    accessor: "discount",
    title: "Discount",
    sortable: true,
  },
  {
    accessor: "taxable_amount",
    title: "Taxable Amount",
    sortable: true,
  },
  {
    accessor: "total_amount",
    title: "Total Amount",
    sortable: true,
  },
  {
    accessor: "discount_issued_by",
    title: "Discount Issued By",
    sortable: true,
  },
  {
    accessor: "payer_id",
    title: "Payer ID",
    sortable: true,
  },
  {
    accessor: "paid_amount",
    title: "Paid Amount",
    sortable: true,
  },
  {
    accessor: "status",
    title: "Status",
    render: (record: any) => <Badge variant="light">{record.status}</Badge>,
    sortable: true,
  },
  {
    accessor: "remarks",
    title: "Remarks",
    sortable: true,
  },
];
