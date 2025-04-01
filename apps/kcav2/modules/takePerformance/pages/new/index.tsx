"use client";

import React from "react";
//next

//mantine
import { ActionIcon, Group, Space, Text } from "@mantine/core";
import { FormHandler } from "@vframework/core";
//component
import { _Form as Form } from "../../form/form";
//formconfig
import { formProps } from "../../form/form.config";
//api
import { createRecord, createSave, updateRecord } from "../../module.api";
import { ModuleFormLayout, triggerNotification } from "@vframework/ui";
import { moduleConfig } from "../../module.config";
import { modals } from "@mantine/modals";
import { Warning } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";

export function _New() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  const mutationSubmit = useMutation({
    mutationFn: async (id) => {
      triggerNotification.form.isLoading({});
      const res = await createSave(id);
      return res;
    },
    onSuccess: (res: any, delId: any) => {
      triggerNotification.form.isSuccess({});
    },
    onError: (err: any) => {
      triggerNotification.form.isError({});
    },
  });

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <FormHandler
        {...formProps}
        formType="edit"
        apiSubmit={updateRecord}
        onSubmitSuccess={(res) => {
          console.log(res);
          modals.openConfirmModal({
            title: (
              <Group>
                <ActionIcon size="sm" color="teal" variant="light">
                  <Warning size={12} />
                </ActionIcon>
                <Text
                  size="sm"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Save as a Permanent Record?
                </Text>
              </Group>
            ),
            children: (
              <>
                <Text size="sm" my="md">
                  The current data is stored as a general performance data.
                  Click on Save Permanent to store it permanently.
                  <br />
                  <br />
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Saving as as permanent record will save a current snapshot
                    of the performance log.
                  </span>
                </Text>
                <Space h="6px" />
              </>
            ),
            labels: { confirm: "Save Permanent", cancel: "Cancel" },
            confirmProps: {
              color: "teal",
              size: "xs",
            },
            cancelProps: {
              size: "xs",
            },
            onCancel: () => {},
            onConfirm: async () => {
              triggerNotification.form.isLoading({});
              await mutationSubmit.mutate(res.id);
            },
            styles: {
              header: {
                background: "var(--mantine-color-teal-1)",
              },
            },
            size: "sm",
          });
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
    </>
  );
}
