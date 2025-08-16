'use client';

import React from 'react';
import { Center, Loader } from '@mantine/core';
import { FormHandler } from '@vframework/core';
import { _Form as Form } from '../../form/form';
import { formProps } from '../../form/form.config';
import { createRecord, getSingleRecord, updateRecord } from '../../module.api';
import { ModuleFormLayout } from '@vframework/ui';
import { moduleConfig } from '../../module.config';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { RBACCheck } from '@/components/RBACCheck';

const GENDER_MAP: Record<string, string> = {
  'Not Specified': '3',
  Male: '1',
  Female: '2',
};

const EXPERIENCE_MAP: Record<string, string> = {
  Newcomer: '1',
  Amateur: '2',
  Professional: '3',
};

const TRAINING_TIME_MAP: Record<string, string> = {
  Morning: '1',
  Day: '2',
  Evening: '3',
};

const MEMBERSHIP_MAP: Record<string, string> = {
  Yes: '1',
  No: '2',
  Maybe: '3',
};

export function _Edit() {
  const Router = useRouter();
  const Params = useParams();
  const id = (Params as any)?.id as string | undefined;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [moduleConfig.moduleKey, id], // ✅ include id in key
    enabled: !!id, // ✅ don’t run until id exists
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!id) return undefined as any;
      const res = await getSingleRecord(id);

      // ✅ defensive transforms
      return {
        ...res,
        package: String(res?.package?.id? ''),
        gender: GENDER_MAP[res?.gender as string] ?? String(res?.gender ?? '3'),
        session: Array.isArray(res?.session) ? res.session.map((e: any) => String(e)) : [],
        level_experience:
          EXPERIENCE_MAP[res?.level_experience as string] ?? String(res?.level_experience ?? ''),
        time_for_training:
          TRAINING_TIME_MAP[res?.time_for_training as string] ??
          String(res?.time_for_training ?? ''),
        membership: MEMBERSHIP_MAP[res?.membership as string] ?? String(res?.membership ?? ''),
        addons: res?.addons.map((e: any) => {
          return e.id;
        }),
      };
    },
  });

  const RenderForm = () => (
    <ModuleFormLayout {...moduleConfig} size="md" withStepper steps={formProps.steps}>
      <Form />
    </ModuleFormLayout>
  );

  if (error) {
    return <Center h={500}>Failed to load.</Center>;
  }

  // Show loader while waiting for id or query
  if (!id || isLoading || !data) {
    return (
      <Center h={500}>
        <Loader size="xs" />
      </Center>
    );
  }

  // ✅ Only render after data exists
  return (
    <RBACCheck showStaff>
      <FormHandler
        {...formProps}
        initial={data}
        formType="edit"
        apiSubmit={updateRecord}
        transformDataOnSubmit={(formdata: any) => {
          const { image, ...res } = formdata;

          console.log(formdata);

          return {
            ...res,
            ...(formdata.image instanceof File ? { image: formdata.image } : {}),
            // * FIXINGS
          };
        }}
      >
        <RenderForm />
      </FormHandler>
    </RBACCheck>
  );
}
