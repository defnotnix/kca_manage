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
        time: res?.time.map((e: any) => e),
        ground: String(res?.ground),
        addons: res?.addons.map((e: any) => String(e)),
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
    <>
      <FormHandler
        {...formProps}
        initial={data}
        formType="edit"
        apiSubmit={updateRecord}
      >
        {!isLoading && <RenderForm />}
      </FormHandler>
    </>
  );
}
