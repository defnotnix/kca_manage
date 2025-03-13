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

  const RenderForm = () => {
    const { form } = FormHandler.useForm();

    const { data, isLoading } = useQuery({
      queryKey: moduleConfig.moduleKey,
      queryFn: async () => {
        const res = await getSingleRecord(Params.id);
        console.log(res);
        form.setValues({
          ...res,
          package: String(res?.package),
          gender: GENDER_MAP[res?.gender],
          sessions: res?.session.map((e: any) => String(e)),
          level_exp: EXPERIENCE_MAP[res?.level_exp],
          time_for_training: TRAINING_TIME_MAP[res?.time_for_training],
          membership: MEMBERSHIP_MAP[res?.membership],
        });
        return res;
      },
    });

    if (isLoading) {
      return (
        <Center h={500}>
          <Loader size="xs" />
        </Center>
      );
    }

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

  return (
    <>
      <FormHandler
        {...formProps}
        formType="edit"
        apiSubmit={updateRecord}
        onSubmitSuccess={() => {
          alert("done");
        }}
      >
        <RenderForm />
      </FormHandler>
    </>
  );
}
