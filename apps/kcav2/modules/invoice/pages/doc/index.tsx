"use client";

import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { House, Pen, Printer } from "@phosphor-icons/react";

import imgLogo from "@/assets/img/logo.png";
import { useQuery } from "@tanstack/react-query";

import {
  createPrint,
  getRecords,
  getSingleRecord,
  getStudentInvoices,
} from "../../module.api";
import { useParams } from "next/navigation";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

import { jwtDecode } from "jwt-decode";

export function _Doc() {
  const ref = useRef(null);

  const Params = useParams();

  const queryData = useQuery({
    queryKey: ["invoice", "doc", "data"],
    queryFn: async () => {
      const res = await getSingleRecord("/billing/invoice/", Params.id);
      const resPendingInvoice = await getStudentInvoices({
        params: {
          player_id: res?.player,
        },
      });

      const pendingInvoices = resPendingInvoice?.filter((item: any) => {
        return Number(item?.remaining_payment) > 0;
      });

      const pendingSum = pendingInvoices?.reduce(
        (sum: any, item: any) => sum + Number(item?.remaining_payment),
        0
      );

      console.log(resPendingInvoice);

      return {
        ...res,
        pendingInvoices,
        pendingSum,
      };
    },
    initialData: {},
  });

  const bread = [
    {
      label: "KCA Admin",
    },
    {
      label: "Invoice",
    },
    {
      label: "Invoice - " + queryData?.data?.invoice_id,
    },
  ];

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",

    onAfterPrint: async () => {
      try {
        const sessionData: any = sessionStorage.getItem("kcatoken");
        const _decoded: any = jwtDecode(sessionData);
        const _userId = _decoded?.user_id;

        createPrint({
          invoice_id: queryData?.data?.invoice_id,
          user_id: _userId,
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <section
        style={{
          display: "block",
          width: "100%",
          minHeight: "calc(100vh - 50px)",
          background: "var(--mantine-color-gray-2)",
        }}
      >
        <Container size="lg" py="md">
          <Breadcrumbs
            separatorMargin={4}
            separator={
              <Text size="xs" c="gray.5">
                /
              </Text>
            }
          >
            <House
              weight="duotone"
              size={12}
              color="var(--mantine-color-brand-5)"
            />
            {bread.map((breadinfo: any, index: number) => (
              <Anchor
                size="xs"
                c={index == bread.length - 1 ? "dark.9" : "gray.5"}
                fw={600}
                key={index}
              >
                {breadinfo.label}
              </Anchor>
            ))}
          </Breadcrumbs>

          <Space h="md" />
          <Group justify="space-between" align="flex-end">
            <div>
              <Text size="xl" fw={600}>
                Invoice - {queryData?.data?.invoice_id}
              </Text>
              <Text size="sm" opacity={0.5}>
                General Invoice
              </Text>
            </div>

            <Group>
              <Button
                onClick={() => {
                  handlePrint(() => ref.current);
                }}
              >
                Print Document
              </Button>
            </Group>
          </Group>
        </Container>

        <Center mt="xl">
          <div ref={ref}>
            <Paper
              pos="relative"
              style={{
                height: "15in",
                width: "11in",
              }}
              p="1in"
            >
              <Group justify="space-between" mb="xl">
                <Image w={200} h={100} src={imgLogo.src} />
                <Text size="64px" fw={800} tt="uppercase">
                  Invoice
                </Text>
              </Group>

              <SimpleGrid cols={4} my="md">
                <div>
                  <Text size="sm" tt="uppercase">
                    N.Invoice
                  </Text>
                  <Text size="xs" tt="uppercase" fw={700}>
                    {queryData?.data?.invoice_id?.substring(0, 15) || "-"}
                    <br />
                    {queryData?.data?.invoice_id?.substring(
                      16,
                      queryData?.data?.invoice_id?.length
                    ) || "-"}
                  </Text>
                </div>
                <div>
                  <Text size="sm" tt="uppercase">
                    Date
                  </Text>
                  <Text size="md" tt="uppercase" fw={700}>
                    {String(new Date(queryData?.data?.created_at)).substring(
                      0,
                      15
                    )}
                  </Text>
                </div>

                <div>
                  <Text size="sm" tt="uppercase">
                    Amount Due
                  </Text>
                  <Text size="md" tt="uppercase" fw={700}>
                    Rs.{" "}
                    {Number(queryData?.data?.remaining_payment || 0).toFixed(2)}
                  </Text>
                </div>

                <div>
                  <Text size="sm" tt="uppercase">
                    Payment STATUS
                  </Text>
                  <Text
                    size="md"
                    tt="uppercase"
                    fw={700}
                    c={queryData?.data?.remaining_amount == 0 ? "teal.7" : ""}
                  >
                    {queryData?.data?.remaining_amount == 0
                      ? "Paid"
                      : "Pending"}
                  </Text>
                </div>
              </SimpleGrid>

              <Divider my="xl" />

              <SimpleGrid cols={2} mt="md">
                <Stack gap="2px">
                  <Text size="sm" tt="uppercase">
                    BILLED TO
                  </Text>
                  <Text size="md" tt="uppercase" fw={700}>
                    {queryData?.data?.customer_name}
                  </Text>

                  <Text size="sm" w="60%">
                    {queryData?.data?.customer_contact}
                  </Text>
                  <Text size="sm" w="60%">
                    {queryData?.data?.customer_email}
                  </Text>

                  <Text size="sm" w="60%">
                    {queryData?.data?.customer_address}
                  </Text>
                  <Text size="sm" w="60%">
                    {queryData?.data?.customer_pan}
                  </Text>
                </Stack>

                <Stack gap="2px">
                  <Text size="sm" tt="uppercase">
                    BILLED FROM
                  </Text>
                  <Text size="md" tt="uppercase" fw={700}>
                    Kathmandu Cricket Academy
                  </Text>

                  <Text size="sm" w="60%">
                    (+977) - 99812341231
                  </Text>
                  <Text size="sm" w="60%">
                    info@kathmanducricketacademy.com.np
                  </Text>

                  <Text size="sm" w="60%">
                    Rabindra Chowk, Kalimati, Kathmandu, Nepal.
                  </Text>
                  <Text size="sm" w="60%">
                    PAN No : 4335123123
                  </Text>
                </Stack>
              </SimpleGrid>

              <Table withTableBorder withColumnBorders withRowBorders my="4rem">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Particulars</Table.Th>
                    <Table.Th>Items</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Total</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {queryData?.data?.invoice_items?.map(
                    (item: any, index: number) => (
                      <Table.Tr key={index}>
                        <Table.Td>{item.description}</Table.Td>
                        <Table.Td>{item.quantity}</Table.Td>
                        <Table.Td>Rs. {item.price}</Table.Td>
                        <Table.Td>
                          Rs. {Number(item.quantity * item.price).toFixed(2)}
                        </Table.Td>
                      </Table.Tr>
                    )
                  )}

                  <Table.Tr>
                    <Table.Td bg="gray.1"></Table.Td>
                    <Table.Td bg="gray.1"></Table.Td>
                    <Table.Td fw={800}>Subtotal</Table.Td>
                    <Table.Td>Rs. {queryData?.data?.amount}</Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Td bg="gray.1"></Table.Td>
                    <Table.Td bg="gray.1"></Table.Td>
                    <Table.Td fw={800}>
                      VAT/TAX ({queryData?.data?.taxable_percent}%)
                    </Table.Td>
                    <Table.Td>Rs. {queryData?.data?.taxable_amount}</Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Td bg="gray.1"></Table.Td>
                    <Table.Td bg="gray.1"></Table.Td>
                    <Table.Td fw={800}>Discount</Table.Td>
                    <Table.Td>Rs. {queryData?.data?.discount}</Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Td bg="gray.1"></Table.Td>
                    <Table.Td bg="gray.1"></Table.Td>
                    <Table.Td fw={800}>Remaining</Table.Td>
                    <Table.Td>Rs. {queryData?.data?.pendingSum || 0}</Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Td bg="gray.1"></Table.Td>
                    <Table.Td bg="gray.1"></Table.Td>
                    <Table.Td fw={800}>Total</Table.Td>
                    <Table.Td>Rs. {queryData?.data?.total_amount}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>

              <Box
                p="1in"
                style={{
                  width: "100%",
                }}
                pos="absolute"
                left={0}
                bottom={24}
              >
                <Divider mb="xl" />
                <Text size="xs">
                  Payment for this invoice is due within 30 days from the
                  invoice date. We accept payments via bank transfer, check, and
                  major credit cards; for bank transfers, please refer to the
                  banking details provided. A late fee of [X]% per month will be
                  applied to any overdue balances, and any invoice discrepancies
                  or disputes must be communicated in writing within 7 days of
                  receipt. Should you have any questions or require further
                  clarification regarding these terms, please do not hesitate to
                  contact us via the provided email or phone number.
                </Text>
              </Box>
            </Paper>
          </div>
        </Center>

        <Space h="xl" />
      </section>
    </>
  );
}
