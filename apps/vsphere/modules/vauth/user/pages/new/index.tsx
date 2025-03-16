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

export function _New() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <FormHandler
        {...formProps}
        apiSubmit={createRecord}
    
      >
        <ModuleFormLayout size="md" withStepper steps={["x", "y", "z"]}>
          <Form />
        </ModuleFormLayout>
      </FormHandler>
    </>
  );
}
