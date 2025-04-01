"use client";

import React, { useState } from "react";
//next

//mantine
import {
  Alert,
  Anchor,
  Badge,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Group,
  Menu,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
//mantine-form
import { useForm } from "@mantine/form";
// framework
import { triggerNotification } from "@vframework/ui";

//icons
import {
  AppleLogo,
  Atom,
  GoogleLogo,
  Info,
  X,
  Warning,
  CaretDown,
  Check,
} from "@phosphor-icons/react";

//styles
import classes from "./auth.module.css";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

//api
import { apiLogin } from "./auth.api";

//components

export const configModule = {
  successRedirect: "/dashboard",
};

export function ModuleAuth() {
  // * DEFINITIONS

  const Router = useRouter();

  // * CONTEXT

  // * STATE

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      fLoading: false,
      remember: false,
    },
    validate: {
      username: (value) =>
        value.length < 1 ? "Username Cannot be Empty" : null,
      password: (value) =>
        value.length < 1 ? "Password Cannot be Empty" : null,
    },
  });

  const [errorType, setErrorType] = useState<string>("nan");

  // * FUNCTIONS

  const handleRememberMe = () => {};

  const mutation = useMutation({
    mutationFn: async () => {
      form.setFieldValue("fLoading", true);
      triggerNotification.auth.isLoading({});
      return apiLogin(form.values);
    },
    onSuccess: (res) => {
      sessionStorage.setItem("kcatoken", res?.data?.access_token || "");

      if (form.values.remember) {
        handleRememberMe();
      }

      form.setFieldValue("fLoading", false);
      triggerNotification.auth.isSuccess({});
      setTimeout(() => {
        Router.push(configModule.successRedirect);
      }, 1000);
    },
    onError: (err: any) => {
      const { response } = err.object;

      console.log("ERROR", response);
      setErrorType(response?.data?.type || "nan");
      form.setFieldValue("fLoading", false);
      triggerNotification.auth.isError({
        message: err.message || "Cannot Reach Server, Try Again!",
      });
    },
  });

  function handleSignIn() {
    if (!form.validate().hasErrors) {
      mutation.mutate();
    }
  }

  // * COMPONENTS

  const RenderAlert = () => {
    switch (errorType) {
      case "info":
        return (
          <Alert py="xs" color="blue" icon={<Info weight="bold" />}>
            <Text size="xs" c="blue.8" fw={500} py="2">
              Server under Maintainance, Try Later!
            </Text>
          </Alert>
        );
      case "pending":
        return (
          <Alert py="xs" color="indigo" icon={<Info weight="bold" />}>
            <Text size="xs" c="indigo.8" fw={500} py="2">
              Verification Pending, Try Later!
            </Text>
          </Alert>
        );
      case "blocked":
        return (
          <Alert py="xs" color="red" icon={<X weight="bold" />}>
            <Text size="xs" c="red.8" fw={500} py="2">
              Account Blocked! Contact Admin
            </Text>
          </Alert>
        );
      case "nan":
        return (
          <Alert py="xs" color="red" icon={<X weight="bold" />}>
            <Text size="xs" c="red.8" fw={500} py="2">
              Cannot Reach Server, Try Again!
            </Text>
          </Alert>
        );
      default:
        return (
          <Alert py="xs" color="red" icon={<Warning weight="bold" />}>
            <Text size="xs" c="red.8" fw={500} py="2">
              Invalid Credentials. Try Again!
            </Text>
          </Alert>
        );
    }
  };

  // * ANIMATIONS

  return (
    <>
      <section
        className={classes.root}
        style={{
          background: "var(--mantine-color-gray-4)",
        }}
      >
        <Container
          w={400}
          h="100vh"
          size="xs"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack w="100%">
            <Group justify="center" gap="xs">
              <ThemeIcon color="dark.9">
                <Atom />
              </ThemeIcon>

              <Text size="sm" fw={700}>
                Kathmandu Cricket Academy
              </Text>
            </Group>

            <Paper withBorder py="xl" px="lg" radius="lg">
              <Stack gap="sm">
                <div>
                  <Text size="xl" ta="center" fw={600}>
                    Welcome Back!
                  </Text>
                  <Text size="sm" ta="center" opacity={0.6}>
                    Login with your Credentials
                  </Text>
                </div>

                {/* <Stack my="md" gap="xs">
                  <Button
                    variant="light"
                    leftSection={<AppleLogo weight="bold" />}
                    disabled={form.getValues()?.fLoading}
                  >
                    Sign In with Apple
                  </Button>
                  <Button
                    variant="light"
                    leftSection={<GoogleLogo weight="bold" />}
                    disabled={form.getValues()?.fLoading}
                  >
                    Sign In with Google
                  </Button>
                </Stack>

                <Divider label="or continue with" /> */}

                <TextInput
                  label="Email"
                  placeholder="x@example.com"
                  disabled={form.getValues()?.fLoading}
                  {...form.getInputProps("username")}
                />

                <PasswordInput
                  label="Password"
                  disabled={form.getValues()?.fLoading}
                  {...form.getInputProps("password")}
                />

                <Group justify="space-between">
                  <Checkbox
                    disabled
                    //disabled={form.getValues()?.fLoading}
                    size="xs"
                    label="Remember me"
                  />
                  <Anchor size="xs" c="dark" fw={600}>
                    Forgot Password?
                  </Anchor>
                </Group>

                {mutation.isError && <RenderAlert />}

                <Stack gap={0}>
                  <Button
                    loading={form.getValues()?.fLoading}
                    onClick={() => {
                      if (!mutation.isSuccess) {
                        handleSignIn();
                      }
                    }}
                  >
                    Sign In
                  </Button>
                  <Button variant="subtle">
                    Don't have an account? Sign Up Here
                  </Button>
                </Stack>
              </Stack>
            </Paper>

            <Group gap={0} justify="space-between" px="lg">
              <Text size="11" lh={5} fw={900}>
                <span
                  style={{
                    opacity: 0.6,
                  }}
                >
                  Based on
                </span>{" "}
                vFramework
              </Text>
              <Menu>
                <Menu.Target>
                  <UnstyledButton>
                    <Badge variant="light" size="lg">
                      <Group gap={3}>
                        <Text fw={500} size="11" lh={5} tt="none">
                          English (United States)
                        </Text>
                        <CaretDown size="11" />
                      </Group>
                    </Badge>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<Check />}>
                    <Text size="xs">English (United States)</Text>
                  </Menu.Item>
                  <Menu.Item>
                    <Text size="xs">Japanese ( 日本語 )</Text>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Stack>
        </Container>
      </section>
    </>
  );
}
