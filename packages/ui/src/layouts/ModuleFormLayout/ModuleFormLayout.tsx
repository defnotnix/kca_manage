"use client";

import React from "react";
//next

//mantine
import {
  Alert,
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
//mantine

//icons
import {
  ArrowLeft,
  ArrowRight,
  Check,
  House,
  Warning,
  X,
} from "@phosphor-icons/react";

//styles

//components
import { FormHandler } from "@vframework/core";
//type
import { PropModuleFormLayout } from "./ModuleFormLayout.type";

export function ModuleFormLayout({
  bread,
  moduleKey,
  moduleTerm,
  moduleTermPlural,
  moduleName,
  moduleDescription,
  //type
  variant = "new",
  // size
  size = "lg",
  //steps
  withStepper = false,
  steps = [],
  //editonly
  isLoading = false,
  //children
  children,
}: PropModuleFormLayout) {
  // * DEFINITIONS

  // * CONTEXT

  const form = FormHandler.useForm();
  const { current, handleSubmit, handleStepBack, handleStepNext } =
    FormHandler.usePropContext();

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <Container size={size}>
        <Paper withBorder mt="xl" shadow="sm">
          <Box p="md">
            <Breadcrumbs
              separatorMargin={4}
              separator={
                <Text size="xs" c="gray.5">
                  /
                </Text>
              }
            >
              <House
                weight="duotone"
                size={12}
                color="var(--mantine-color-brand-5)"
              />
              {bread.map((breadinfo: any, index: number) => (
                <Anchor size="xs" c={"gray.5"} fw={600} key={index}>
                  {breadinfo.label}
                </Anchor>
              ))}
              <Anchor size="xs" c={"dark.9"} fw={600}>
                New Record
              </Anchor>
            </Breadcrumbs>

            <Space h="md" />

            <SimpleGrid cols={{ base: 1, lg: 2 }}>
              <div>
                <Text size="xl" fw={600}>
                  New {moduleTerm}
                </Text>
                <Text size="sm" opacity={0.5} tt="capitalize">
                  Fill in the fields below to create a new {moduleTerm}.
                </Text>
              </div>

              {/* <Alert
                icon={<Warning weight="duotone" />}
                variant="light"
                color="red"
                title="Some fields are missing/invalid."
              /> */}
            </SimpleGrid>
          </Box>
        </Paper>

        <Paper
          withBorder
          radius={0}
          style={{
            borderTop: "none",
            borderBottom: "none",
          }}
        >
          {withStepper && (
            <SimpleGrid spacing={0} cols={steps.length > 5 ? steps.length : 5}>
              {steps.map((stepinfo: any, index: number) => (
                <Paper
                  p="md"
                  key={index}
                  radius={0}
                  opacity={current >= index ? 1 : 0.3}
                  style={{
                    background:
                      current == index
                        ? "var(--mantine-color-brand-0)"
                        : current > index
                          ? "var(--mantine-color-teal-0)"
                          : "",
                    borderLeft: "1px solid var(--mantine-color-gray-2)",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <Stack gap={4}>
                    <Text size="8px" opacity={0.5} fw={600} tt="uppercase">
                      Step {index + 1} of {steps.length}
                    </Text>
                    <Text size="xs">{stepinfo}</Text>
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>
          )}
        </Paper>

        <Box pos="relative">
          <LoadingOverlay visible={isLoading} />
          {children}
        </Box>

        <Group gap={0} justify="space-between">
          {withStepper ? (
            <Button
              onClick={handleStepBack}
              disabled={current == 0}
              leftSection={<ArrowLeft />}
              variant="light"
            >
              Previous Step
            </Button>
          ) : (
            <div />
          )}

          <Group justify="flex-end" gap={4} py="md">
            {/* <Button size="sm" leftSection={<X />} variant="light">
              Cancel
            </Button> */}

            {withStepper && current < steps.length - 1 && (
              <Button
                size="sm"
                rightSection={<ArrowRight />}
                onClick={handleStepNext}
              >
                Next Step
              </Button>
            )}

            {(current + 1 == steps.length || !withStepper) && (
              <Button
                size="sm"
                color="teal"
                leftSection={<Check />}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </Group>
        </Group>
      </Container>
    </>
  );
}
