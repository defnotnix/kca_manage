"use client";

import React from "react";
//next

//mantine
import {} from "@mantine/core";
import { FormHandler } from "@vframework/core";
//component
import { _Form as Form } from "../../form/form";
//formconfig
import { formProps } from "../../form/form.config";
//api
import { createRecord } from "../../module.api";
import { ModuleFormLayout } from "@vframework/ui";
import { moduleConfig } from "../../module.config";
import { RBACCheck } from "@/components/RBACCheck";

export function _New() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <RBACCheck showStaff>
      <FormHandler {...formProps} apiSubmit={createRecord}>
        <ModuleFormLayout
          {...moduleConfig}
          size="md"
          withStepper
          steps={formProps.steps}
        >
          <Form />
        </ModuleFormLayout>
      </FormHandler>
    </RBACCheck>
  );
}
