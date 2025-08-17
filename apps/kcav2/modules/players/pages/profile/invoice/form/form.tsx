'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ActionIcon,
  Alert,
  Button,
  Checkbox,
  Group,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Info, Plus, Trash } from '@phosphor-icons/react';
import { randomId } from '@mantine/hooks';

import { FormHandler } from '@vframework/core';
import { FormElement } from '@vframework/ui';

import { useProfileContext } from '../../context';

export function _Form({}) {
  const form = FormHandler.useForm();
  const { current } = FormHandler.usePropContext();
  const { playerData } = useProfileContext();

  // force re-render when numeric fields change (because some form libs mutate in place)
  const [tick, setTick] = useState(0);
  const bump = () => setTick((t) => t + 1);

  const toNum = (v: any) => {
    if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  };

  // tiny getter for deep paths like "invoice_items.0.price"
  const getByPath = (obj: any, path: string) =>
    path.split('.').reduce((acc: any, key: string) => (acc ? acc[key] : undefined), obj);

  function setAddons() {
    if (!form?.setFieldValue) return;

    if (playerData?.decided_rate) {
      form.setFieldValue('invoice_items', [
        {
          id: randomId(),
          description: 'Service Fee (Special Pricing)',
          quantity: 1,
          price: Number(playerData?.decided_rate),
        },
      ]);
    } else {
      form.setFieldValue('invoice_items', [
        {
          id: randomId(),
          description: 'Admission Fee',
          quantity: 1,
          price: playerData?.package?.admission_fee,
        },
        {
          id: randomId(),
          description: 'Service Fee',
          quantity: 1,
          price: playerData?.package?.service_fee,
        },
        ...(playerData?.package?.addon
          ? playerData?.package?.addon?.map((item: any) => ({
              id: randomId(),
              description: item.name,
              quantity: 1,
              price: item.price,
            }))
          : []),
      ]);
    }
    bump();
  }

  function setPlayerData() {
    if (!form?.setFieldValue || !playerData) return;
    form.setFieldValue('player', playerData.id);
    form.setFieldValue('bill_student', true);
    form.setFieldValue('customer_name', playerData.name);
    form.setFieldValue('customer_contact', playerData.contact);
    form.setFieldValue('decided_rate', playerData?.decided_rate);
    form.setFieldValue('service_rate', playerData?.package?.service_fee);
    form.setFieldValue('decided_date', playerData?.decided_date);
    form.setFieldValue('decided_by', playerData?.decided_by);
    form.setFieldValue('customer_address', playerData.temp_address || playerData.permanent_address);
    setAddons();
  }

  function setParentData() {
    if (!form?.setFieldValue) return;
    form.setFieldValue('bill_student', true);
    setAddons();
  }

  useEffect(() => {
    const vals = form?.getValues?.() ?? {};
    if (!Array.isArray(vals.invoice_items)) {
      form.setFieldValue('invoice_items', []);
      bump();
    }
    if (playerData) setPlayerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerData]);

  // ---- numberBind (fixed order!) ----
  const numberBind = (path: string, fallback = 0) => {
    const base = form.getInputProps(path, { withError: true });
    const vals = form.getValues?.() ?? {};
    const value = toNum(getByPath(vals, path) ?? fallback);

    return {
      ...base, // <- spread FIRST so we can override next
      value,
      onChange: (v: number | string) => {
        // call form's handler if it exists
        // (Mantine NumberInput hands back v directly)
        if (typeof base.onChange === 'function') {
          base.onChange(v as any);
        } else {
          form.setFieldValue(path, toNum(v));
        }
        bump();
      },
    };
  };

  // derived values – recompute on tick so we’re immune to in-place mutation
  const vals = form.getValues?.() ?? {};
  const items: any[] = Array.isArray(vals.invoice_items) ? vals.invoice_items : [];
  const taxablePercent = toNum(vals.taxable_percent);
  const discount = toNum(vals.discount);

  const subtotal = useMemo(() => {
    return items.reduce((sum: number, it: any) => {
      return sum + toNum(it?.price) * toNum(it?.quantity);
    }, 0);
  }, [items, tick]);

  const vat = useMemo(() => (taxablePercent / 100) * subtotal, [taxablePercent, subtotal, tick]);

  const total = useMemo(() => subtotal + vat - discount, [subtotal, vat, discount, tick]);

  if (current !== 0) return null;

  return (
    <Paper px="lg" py="md" withBorder>
      <Stack gap="xs">
        <FormElement.SectionTitle
          isTopElement
          title="Invoice Details"
          description="Details of the bill"
        />

        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xs">
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
            {...form.getInputProps('new_renew_date')}
          />
          <DateInput
            label="Expiry Date"
            description="New Date for Package Expiry"
            placeholder="Select Expiry Date"
            {...form.getInputProps('new_expiry_date')}
          />
        </SimpleGrid>

        <FormElement.SectionTitle
          title="Billed To"
          description="Person this bill is assigned to"
          actionButton={
            <Group gap="xs">
              <Paper
                style={{ cursor: 'pointer' }}
                p="xs"
                withBorder
                bg={vals.bill_student ? 'brand.0' : ''}
                onClick={() => {
                  form.setFieldValue('bill_student', true);
                  setPlayerData();
                  bump();
                }}
              >
                <Checkbox
                  styles={{ label: { fontSize: 'var(--mantine-font-size-xs)', fontWeight: 600 } }}
                  label="Bill to Student"
                  checked={!!vals.bill_student}
                  onChange={() => {
                    form.setFieldValue('bill_student', true);
                    bump();
                  }}
                />
              </Paper>

              <Paper
                style={{ cursor: 'pointer' }}
                p="xs"
                withBorder
                bg={!vals.bill_student ? 'brand.0' : ''}
                onClick={() => {
                  form.setFieldValue('bill_student', false);
                  setParentData();
                  bump();
                }}
              >
                <Checkbox
                  styles={{ label: { fontSize: 'var(--mantine-font-size-xs)', fontWeight: 600 } }}
                  label="Bill to Parent"
                  checked={!vals.bill_student}
                  onChange={() => {
                    form.setFieldValue('bill_student', false);
                    bump();
                  }}
                />
              </Paper>
            </Group>
          }
        />

        <SimpleGrid spacing="xs" cols={{ base: 1, lg: 2 }}>
          <TextInput
            disabled
            label="Full Name / Organization"
            {...form.getInputProps('customer_name')}
          />
          <TextInput
            disabled
            label="Invoice Address"
            placeholder="e.g. Balkot, Kathmandu, Nepal"
            {...form.getInputProps('customer_address')}
          />
          <TextInput disabled label="Billing Contact" {...form.getInputProps('customer_contact')} />
          <TextInput label="PAN/VAT Number" {...form.getInputProps('customer_pan')} />
        </SimpleGrid>

        {vals.is_student && (
          <Alert
            icon={<Info />}
            title={
              !vals?.bill_student
                ? "Billed to details is set to Student's Guardian Details"
                : "Billed to details is set to Student's Details"
            }
          />
        )}

        {playerData?.decided_rate && (
          <>
            <FormElement.SectionTitle title="Custom Rates" description="Details of the bill" />
            <SimpleGrid cols={{ base: 1, lg: 3 }}>
              <TextInput
                disabled
                label="Decided Rate/Month"
                {...form.getInputProps('decided_rate')}
              />
              <TextInput
                disabled
                label="Decided Date"
                required
                {...form.getInputProps('decided_date')}
              />
              <TextInput
                disabled
                label="Decided By"
                required
                {...form.getInputProps('decided_by')}
              />
            </SimpleGrid>
          </>
        )}

        <FormElement.SectionTitle title="Discounts" description="Details of the bill" />

        <SimpleGrid cols={2} spacing="xs">
          <NumberInput
            min={0}
            label="Discount Amount"
            description="Enter the discount applied to the invoice"
            placeholder="Enter discount amount"
            {...numberBind('discount', 0)}
          />
          <TextInput label="Discount Issued By" {...form.getInputProps('discount_issued_by')} />
        </SimpleGrid>

        <FormElement.SectionTitle
          title="Particulars"
          description="Comprehensive batting details for the player."
          actionButton={
            <Button
              onClick={() => {
                form.insertListItem('invoice_items', {
                  id: randomId(),
                  description: '',
                  quantity: 1,
                  price: 0,
                });
                bump();
              }}
              leftSection={<Plus />}
            >
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
            {items.map((item: any, index: number) => (
              <Table.Tr key={item?.id ?? index}>
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
                    onClick={() => {
                      form.removeListItem('invoice_items', index);
                      bump();
                    }}
                  >
                    <Trash />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}

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
          title="Advance Payments "
          description="Any advance payments or pre-booking details."
        />

        <NumberInput
          min={0}
          max={total}
          label="Advance Payment"
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
}
