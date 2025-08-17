'use client';

import { Menu, Modal, Text } from '@mantine/core';
import { FilePdf, Money } from '@phosphor-icons/react';
import { ListHandler } from '@vframework/core';
import { ModuleTableLayout } from '@vframework/ui';
import { useParams, useRouter } from 'next/navigation';
import { createRecord, deleteRecord, getRecords, updateRecord } from '../../module.api';
import { moduleConfig } from '../../module.config';
import { columns } from './list.columns';

import { InvoicePayments } from '@/modules/invoice/pages/list/payments';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { _Form as Form } from '../../form/form';
import { formProps } from '../../form/form.config';

export function _List() {
  const router = useRouter();
  const Params = useParams();

  const [openPayments, handlerPayments] = useDisclosure(false);

  const [active, setActive] = useState(null);

  const query = useQueryClient();

  return (
    <>
      <ListHandler
        endpoint="/billing/player/invoice/"
        moduleKey={moduleConfig.moduleKey}
        getRecords={getRecords}
        getParams={{
          player_id: Params.id,
        }}
      >
        <ModuleTableLayout
          {...moduleConfig}
          idAccessor="id"
          apiEdit={updateRecord}
          apiCreate={createRecord}
          apiDelete={deleteRecord}
          columns={columns}
          onEditTrigger={(formdata) => {
            return {
              ...formdata,
              is_present: String(formdata?.is_present ? '1' : '0'),
            };
          }}
          // * TABS
          tabs={[
            { label: 'All Records', count: 3344 },
            { label: 'Active', count: 2233 },
            { label: 'Inactive' },
          ]}
          extraActions={({ row }: { row: any }) => (
            <>
              <Menu.Item
                onClick={() => {
                  router.push(`/invoices/${row.id}`);
                }}
                leftSection={<FilePdf />}
              >
                Show Document
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  handlerPayments.open();
                  setActive(row);
                }}
                leftSection={<Money />}
              >
                Payments
              </Menu.Item>
            </>
          )}
          // * TABLE PROPS
          //tableprops={{ height: "calc(100vh - 200px)" }}
          // * ROW COLORS
          rowStyle={({ gender }: any) => ({
            background: gender === 'male' ? 'var(--mantine-color-indigo-0)' : '',
          })}
          // * EXTRA ACTIONS

          // * MODAL CONFIG
          hasModalForms
          modalFormProps={{ width: 'xl', formProps }}
          modalForm={<Form />}
        />
      </ListHandler>

      <Modal
        size={'lg'}
        opened={openPayments}
        onClose={() => {
          setActive(null);
          //@ts-ignore
          query.invalidateQueries(moduleConfig?.moduleKey);
          handlerPayments.close();
        }}
        title={
          <Text tt="uppercase" size="xs" fw={700}>
            Manage Session Players
          </Text>
        }
      >
        <InvoicePayments active={active} />
      </Modal>
    </>
  );
}
