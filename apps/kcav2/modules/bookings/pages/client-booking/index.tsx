"use client";

import React from "react";
//next

//mantine
import {} from "@mantine/core";
import { FormHandler } from "@vframework/core";
//component
import { _FormClientBooking as Form } from "../../formClientBooking/form";
//formconfig
import { formProps } from "../../form/form.config";
//api
import { createClientBooking, createRecord } from "../../module.api";
import { ModuleFormLayout } from "@vframework/ui";
import { moduleConfig } from "../../module.config";
import { RBACCheck } from "@/components/RBACCheck";
import { useRouter } from "next/navigation";

export function _ClientBooking() {
  // * DEFINITIONS

  const Router = useRouter();

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <FormHandler
      {...formProps}
      apiSubmit={createClientBooking}
      onSubmitSuccess={() => {
        Router.push("/client-booking/success");
      }}
    >
      <ModuleFormLayout
        {...moduleConfig}
        size="md"
        withStepper
        steps={formProps.steps}
      >
        <Form />
      </ModuleFormLayout>
    </FormHandler>
  );
}
