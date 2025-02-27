"use client";

import React from "react";
//next

//mantine
import {} from "@mantine/core";
import { FormHandler } from "@vframework/core";
//formconfig
import { formProps } from "../../form/form.config";
//api
import { createRecord } from "../../module.api";

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
        onSubmitSuccess={() => {
          alert("done");
        }}
      >
        just a form
      </FormHandler>
    </>
  );
}
