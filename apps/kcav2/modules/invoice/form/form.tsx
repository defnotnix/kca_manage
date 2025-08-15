'use client';

import React, { useEffect, useMemo, useState } from 'react';
// mantine
import {
  ActionIcon,
  Button,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
// framework
import { FormHandler } from '@vframework/core';
import { FormElement } from '@vframework/ui';
import { DateInput } from '@mantine/dates';

import { useQuery } from '@tanstack/react-query';
import { Plus, Trash } from '@phosphor-icons/react';
import { randomId } from '@mantine/hooks';

import { getRecords as getPlayers } from '@/modules/players/module.api';

export function _Form() {
  // * DEFINITIONS
  const form = FormHandler.useForm();

  // * CONTEXT
  const { current } = FormHandler.usePropContext();

  // Force rerender on numeric changes (guards against in-place mutation)
  const [tick, setTick] = useState(0);
  const bump = () => setTick((t) => t + 1);

  // * PRELOADING
  const queryStudent = useQuery({
    queryKey: ['invoice', 'players'],
    queryFn: async () => {
      const res = await getPlayers({ endpoint: '/players/info/' });
      return res;
    },
    // optional:
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  // Init invoice_items so the table isn’t empty on first paint
  useEffect(() => {
    const vals = form.getValues?.() ?? {};
    if (!Array.isArray(vals.invoice_items)) {
      form.setFieldValue('invoice_items', []);
      bump();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- helpers ----------
  const toNum = (v: any) => {
    if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  };
  const getByPath = (obj: any, path: string) =>
    path.split('.').reduce((acc: any, k: string) => (acc ? acc[k] : undefined), obj);

  // Bind NumberInput so we always update form AND force a rerender
  const numberBind = (path: string, fallback = 0) => {
    const base = form.getInputProps(path, { withError: true });
    const vals = form.getValues?.() ?? {};
    const value = toNum(getByPath(vals, path) ?? fallback);
    return {
      ...base, // spread first so we can override value/onChange
      value,
      onChange: (v: number | string) => {
        if (typeof base.onChange === 'function') {
          base.onChange(v as any);
        } else {
          form.setFieldValue(path, toNum(v));
        }
        bump();
      },
    };
  };

  // ---------- derived totals (reactive) ----------
  const vals = form.getValues?.() ?? {};
  const items: any[] = Array.isArray(vals.invoice_items) ? vals.invoice_items : [];
  const discount = toNum(vals.discount);
  const taxablePercent = toNum(vals.taxable_percent);

  const subtotal = useMemo(() => {
    return items.reduce((sum: number, it: any) => {
      return sum + toNum(it?.price) * toNum(it?.quantity);
    }, 0);
  }, [items, tick]);

  const vat = useMemo(() => (taxablePercent / 100) * subtotal, [taxablePercent, subtotal, tick]);
  const total = useMemo(() => subtotal + vat - discount, [subtotal, vat, discount, tick]);

  // ---------- actions ----------
  const addItem = () => {
    form.insertListItem('invoice_items', {
      id: randomId(),
      description: '',
      price: 0,
      quantity: 1,
    });
    bump();
  };
  const removeItem = (idx: number) => {
    form.removeListItem('invoice_items', idx);
    bump();
  };

  // * RENDER
  switch (current) {
    case 0:
      return (
        <Paper px="lg" py="md" withBorder>
          <Stack gap="xs">
            <FormElement.SectionTitle
              isTopElement
              title="Invoice Details"
              description="Details of the bill"
            />

            <SimpleGrid cols={2} spacing="xs">
              <TextInput
                disabled
                label="Bill Date"
                description="If an actual bill is printed, enter its number"
                placeholder="Enter bill number"
                {...form.getInputProps('bill_date')}
              />
              <NumberInput
                min={0}
                label="Tax Percentage"
                description="Percentage of tax applied to the invoice"
                placeholder="Enter tax percentage"
                {...numberBind('taxable_percent', 0)}
              />
              <DateInput
                label="Renew Date"
                description="Date of Package Renewal"
                placeholder="Select Renew Date"
                {...form.getInputProps('renew_date')}
              />
              <DateInput
                label="Expiry Date"
                description="New Date for Package Expiry"
                placeholder="Select Expiry Date"
                {...form.getInputProps('expiry_date')}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Billed To"
              description="Person this bill is assigned to"
            />

            <SimpleGrid cols={2} spacing="xs">
              <TextInput
                label="Full Name / Organization"
                description="Name of the individual or organization being billed"
                placeholder="Enter full name or organization name"
                {...form.getInputProps('customer_name')}
              />
              <TextInput
                label="Invoice Address"
                description="Address of the recipient of this invoice"
                placeholder="e.g. Balkot, Kathmandu, Nepal"
                {...form.getInputProps('customer_address')}
              />
              <TextInput
                label="Billing Contact"
                description="Phone number or email of the billing recipient"
                placeholder="Enter contact number or email"
                {...form.getInputProps('customer_contact')}
              />
              <TextInput
                label="PAN/VAT Number"
                description="Enter PAN/VAT number if applicable, leave empty if not"
                placeholder="Enter PAN/VAT number"
                {...form.getInputProps('customer_pan')}
              />
            </SimpleGrid>

            <FormElement.SectionTitle title="Discounts" description="Details of the bill" />

            <SimpleGrid cols={2} spacing="xs">
              <NumberInput
                min={0}
                label="Discount Amount"
                description="Enter the discount applied to the invoice"
                placeholder="Enter discount amount"
                {...numberBind('discount', 0)}
              />
              <TextInput
                label="Discount Issued By"
                description="Name of the person or department authorizing the discount"
                placeholder="Enter name"
                {...form.getInputProps('discount_issued_by')}
              />
            </SimpleGrid>

            <FormElement.SectionTitle
              title="Particulars"
              description="Comprehensive batting details for the player."
              actionButton={
                <Button onClick={addItem} leftSection={<Plus />}>
                  Add
                </Button>
              }
            />

            <Table cellSpacing={'xs'} fz="xs">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>#</Table.Th>
                  <Table.Th style={{ width: '50%' }}>Particulars</Table.Th>
                  <Table.Th>Rate</Table.Th>
                  <Table.Th>Qty</Table.Th>
                  <Table.Th>#</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {items.map((iteminfo: any, index: number) => (
                  <Table.Tr key={iteminfo?.id ?? index}>
                    <Table.Td>
                      <Text size="xs">{index + 1}</Text>
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        variant="filled"
                        placeholder="Item Description"
                        {...form.getInputProps(`invoice_items.${index}.description`)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <NumberInput
                        variant="filled"
                        placeholder="Item Rate"
                        min={0}
                        {...numberBind(`invoice_items.${index}.price`, 0)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <NumberInput
                        variant="filled"
                        placeholder="Quantity"
                        min={0}
                        {...numberBind(`invoice_items.${index}.quantity`, 1)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon
                        variant="light"
                        color="red"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}

                {/* Overview (reactive) */}
                <Table.Tr>
                  <Table.Td />
                  <Table.Td style={{ width: '50%' }} />
                  <Table.Td />
                  <Table.Td fw={800}>Subtotal</Table.Td>
                  <Table.Td>{subtotal}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td />
                  <Table.Td style={{ width: '50%' }} />
                  <Table.Td />
                  <Table.Td fw={800}>VAT / TAX</Table.Td>
                  <Table.Td>{vat.toFixed(2)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td />
                  <Table.Td style={{ width: '50%' }} />
                  <Table.Td />
                  <Table.Td fw={800}>Discount</Table.Td>
                  <Table.Td>{discount.toFixed(2)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td />
                  <Table.Td style={{ width: '50%' }} />
                  <Table.Td />
                  <Table.Td fw={800}>Total</Table.Td>
                  <Table.Td>{total.toFixed(2)}</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>

            <FormElement.SectionTitle
              title="Advance Payments / Booking Payments"
              description="Any advance payments or pre-booking details."
            />

            <NumberInput
              min={0}
              label="Advance/Booking Amount"
              description="Enter the advance amount paid for this invoice"
              placeholder="Enter amount"
              {...numberBind('advance', 0)}
            />

            <Textarea
              rows={10}
              label="Remarks"
              description="Bill number of the invoice"
              placeholder="Enter bill number"
              {...form.getInputProps('remarks')}
            />
          </Stack>
        </Paper>
      );
    default:
      return null;
  }
}
