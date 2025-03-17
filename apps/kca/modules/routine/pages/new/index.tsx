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

import _ from "moment";

export function _New() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  const formattedData = (_data: any) =>
    _data.daterange
      ?.filter((e: any) => {
        return e.is_holiday !== true;
      })
      .flatMap(({ date, is_holiday, time, ground }: any) =>
        time
          ? time.map((t: any) => ({
              date: _(date).format("YYYY-MM-DD"),
              time: t,
              ground,
              is_available: is_holiday || false,
              is_booked: false,
              session: _data?.session,
            }))
          : [
              {
                date: _(date).format("YYYY-MM-DD"),
                ground,
                is_holiday,
                is_available: is_holiday || false,
                is_booked: false,
                session: _data?.session,
              },
            ]
      );

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <FormHandler
        {...formProps}
        apiSubmit={(body) => {
          return createRecord(formattedData(body));
        }}
      >
        <ModuleFormLayout
          {...moduleConfig}
          size="md"
          // withStepper
          // steps={formProps.steps}
        >
          <Form />
        </ModuleFormLayout>
      </FormHandler>
    </>
  );
}
