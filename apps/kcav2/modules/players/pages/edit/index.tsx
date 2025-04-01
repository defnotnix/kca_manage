"use client";

import React from "react";
//next

//mantine
import { Center, Loader } from "@mantine/core";
import { FormHandler } from "@vframework/core";
//component
import { _Form as Form } from "../../form/form";
//formconfig
import { formProps } from "../../form/form.config";
//api
import { createRecord, getSingleRecord, updateRecord } from "../../module.api";
import { ModuleFormLayout } from "@vframework/ui";
import { moduleConfig } from "../../module.config";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { RBACCheck } from "@/components/RBACCheck";

const GENDER_MAP: any = {
  "Not Specified": "3",
  Male: "1",
  Female: "2",
};

const EXPERIENCE_MAP: any = {
  Newcomer: "1",
  Amateur: "2",
  Professional: "3",
};

const TRAINING_TIME_MAP: any = {
  Morning: "1",
  Day: "2",
  Evening: "3",
};

const MEMBERSHIP_MAP: any = {
  Yes: "1",
  No: "2",
  Maybe: "3",
};

export function _Edit() {
  // * DEFINITIONS
  const Router = useRouter();
  const Params = useParams();

  // * PRELOAD

  const { data, isLoading } = useQuery({
    queryKey: moduleConfig.moduleKey,
    queryFn: async () => {
      const id = Params.id;
      const res = await getSingleRecord(Params.id);
      console.log(res);
      return {
        ...res,
        package: String(res?.package),
        gender: GENDER_MAP[res?.gender],
        session: res?.session.map((e: any) => String(e)),
        level_experience: EXPERIENCE_MAP[res?.level_experience],
        time_for_training: TRAINING_TIME_MAP[res?.time_for_training],
        membership: MEMBERSHIP_MAP[res?.membership],
      };
    },
  });

  const RenderForm = () => {
    return (
      <ModuleFormLayout
        {...moduleConfig}
        size="md"
        withStepper
        steps={formProps.steps}
      >
        <Form />
      </ModuleFormLayout>
    );
  };

  if (!data) {
    return (
      <Center h={500}>
        <Loader size="xs" />
      </Center>
    );
  }

  return (
    <RBACCheck showStaff>
      <FormHandler
        {...formProps}
        initial={data}
        formType="edit"
        apiSubmit={updateRecord}
    
      >
        {!isLoading && <RenderForm />}
      </FormHandler>
    </RBACCheck>
  );
}
