// @ts-nocheck

"use client";

import React, { useEffect } from "react";
//nextjs
import { usePathname, useRouter } from "next/navigation";
//mantine
import {
  ActionIcon,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
//icons
import { ArrowLeft, CaretRight, Check, Info } from "@phosphor-icons/react";
//core
import { FormHandler } from "@vframework/core";
//type
import { PropModuleModalFormLayout } from "./ModuleModalFormLayout.type";

export function ModuleModalFormLayout({
  moduleConfig,
  //
  size = "lg",
  //type
  variant = "new",
  //steps
  steps = [],
  withStepper = false,
  //hints
  withHint = false,
  hintDetails,

  //loading
  isLoading = true,
  //children
  children,
}: PropModuleModalFormLayout) {


  // * DEFINITIONS
  const Pathname = usePathname();
  const Router = useRouter();

  // * CONTEXT

  const form = FormHandler.useForm();
  const { current, handleSubmit, handleStepBack, handleStepNext } =
    FormHandler.usePropContext();

  // * STATES

  // * FUNCTIONS

  const handleClearFields = () => {
    form.reset()
  }


  // * COMPONENTS


  return (
    <>
      {withHint && (
        <Paper withBorder p="sm">
          <Group wrap="nowrap">
            <ThemeIcon variant="light">
              <Info />
            </ThemeIcon>
            <Stack gap={0}>
              <Text size="xs">{hintDetails?.title}</Text>
              <Text size="xs" opacity={0.5}>
                {hintDetails?.description}
              </Text>
            </Stack>
          </Group>
        </Paper>
      )}

      {children}

      {!isLoading && (
        <Group justify="flex-end" p="sm" gap="xs">

          <Button color="brand" variant="outline" leftSection={<Check />} onClick={handleClearFields}>
            Clear Fields
          </Button>

          {withStepper && (
            <Button
              onClick={handleStepBack}
              disabled={current == 0}
              leftSection={<ArrowLeft />}
              variant="light"
            >
              Back
            </Button>
          )}

          {withStepper && current < steps.length - 1 && (
            <Button onClick={handleStepNext} rightSection={<CaretRight />}>
              Next
            </Button>
          )}

          {(current + 1 == steps.length || !withStepper) && (

            <Button color="teal" leftSection={<Check />} onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Group>
      )}
    </>
  );
}
