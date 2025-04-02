"use client";

import React from "react";
//next
import { usePathname, useRouter } from "next/navigation";
//mantine
import {
  ActionIcon,
  Alert,
  AppShell,
  Badge,
  Box,
  Burger,
  Button,
  Drawer,
  Group,
  Menu,
  NavLink,
  Paper,
  ScrollArea,
  Space,
  Text,
  TextInput,
  ThemeIcon,
  Tree,
  UnstyledButton,
} from "@mantine/core";
//mantine

//icons
import {
  Atom,
  Calendar,
  ChartDonut,
  Circle,
  DotsThree,
  Info,
  MagnifyingGlass,
  Plus,
  SignOut,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import { PropAdminNavSideNav } from "../../AdminNavLayout.type";

//styles
import classes from "./AdminNav.Sidenav.module.css";
import classesNavLink from "./AdminNav.NavLink.module.css";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";

//components

export function _AdminNavLayoutSidenav({
  essentials,
  softwareInfo,
  navItems,
  navModules = [],
  onLogout = () => {},
}: PropAdminNavSideNav) {
  // * DEFINITIONS

  const Router = useRouter();
  const Pathname = usePathname();

  // * CONTEXT

  const [opened, handler] = useDisclosure(false);

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  const renderNavModules = navModules?.map((navModule: any, index: number) => {
    return (
      <Menu.Item
        key={index}
        leftSection={
          <ThemeIcon variant="light" color={navModule.color}>
            <navModule.icon weight="bold" />
          </ThemeIcon>
        }
      >
        <div>
          <Text size="xs" fw={600}>
            {navModule.label}
          </Text>
          <Text size="xs" opacity={0.5}>
            {navModule.description}
          </Text>
        </div>
      </Menu.Item>
    );
  });

  const renderNavItems = navItems.map((navMain: any, index: number) => {
    const subnavlinks = navMain.children?.map(
      (navChild: any, index: number) => {
        return navChild.value;
      }
    );

    return (
      <NavLink
        className={classes.navmain}
        variant="subtle"
        label={navMain.label}
        key={index}
        color="gray"
        leftSection={
          navMain.icon ? <navMain.icon size={14} weight="duotone" /> : null
        }
        childrenOffset={26}
        active={
          navMain?.children
            ? subnavlinks.includes(Pathname)
            : Pathname === navMain.value
        }
        classNames={classesNavLink}
        href={navMain.value}
      >
        {navMain?.children?.map((navChild: any, index: number) => {
          return (
            <NavLink
              className={classes.subnav}
              color="brand.8"
              c={navChild.value == Pathname ? "white" : ""}
              variant="filled"
              label={
                <>
                  {Pathname == navChild.value && (
                    <Circle
                      size={8}
                      weight="fill"
                      style={{
                        marginRight: 8,
                        opacity: 0.5,
                      }}
                    />
                  )}

                  {navChild.label}
                </>
              }
              key={index}
              classNames={classesNavLink}
              active={Pathname == navChild.value}
              href={navChild.value}
            />
          );
        })}
      </NavLink>
    );
  });

  // * ANIMATIONS

  return (
    <>
      <AppShell.Navbar
        className={classes.navContainer}
        style={{
          border: "none",
          overflow: "visible",
          background: "none",
        }}
        visibleFrom="lg"
      >
        <Box h={180} p="sm">
          <Menu position="right-start" withArrow shadow="md">
            <Menu.Target>
              <Box w="100%" p="xs">
                <Group justify="space-between">
                  <Group gap="xs">
                    <ThemeIcon size="lg" radius="xl" color="white">
                      <Atom
                        weight="duotone"
                        color="var(--mantine-color-brand-8)"
                      />
                    </ThemeIcon>
                    <div>
                      <Text size="sm" c="gray.0">
                        {softwareInfo.org}
                      </Text>
                      <Text size="10px" c="gray.0" opacity={0.4}>
                        Anamol Maharjan
                      </Text>
                    </div>
                  </Group>

                  {navModules?.length > 0 && (
                    <ActionIcon variant="subtle" color="gray.0">
                      <DotsThree weight="bold" />
                    </ActionIcon>
                  )}
                </Group>
              </Box>
            </Menu.Target>
            {navModules?.length > 0 && (
              <Menu.Dropdown>
                <Menu.Label>
                  <Text size="xs" opacity={0.7}>
                    Available Modules
                  </Text>
                </Menu.Label>
                {renderNavModules}
                <Menu.Label>
                  <Text size="xs" opacity={0.7}>
                    Integrations
                  </Text>
                </Menu.Label>

                <Button fullWidth variant="light" leftSection={<Plus />}>
                  Add Integration
                </Button>
              </Menu.Dropdown>
            )}
          </Menu>

          <TextInput
            my="sm"
            variant="filled"
            size="sm"
            leftSection={<MagnifyingGlass />}
            rightSection={
              <ActionIcon variant="subtle" color="gray.0">
                <SlidersHorizontal />
              </ActionIcon>
            }
            placeholder="Search Modules"
            styles={{
              input: {
                background: "rgba(255,255,255,.1)",
                fontSize: "var(--mantine-font-size-xs)",
              },
            }}
          />

          <div>
            <Group gap={0}>
              <Text px="sm" size="md" c="gray.0">
                {softwareInfo?.module}
              </Text>
              <Badge color="red.6" size="xs">
                69
              </Badge>
            </Group>
            <Text size="xs" c="gray.0" px="sm" opacity={0.4}>
              {softwareInfo?.moduleDescription}
            </Text>
          </div>
        </Box>

        {essentials && (
          <Text size="xs" opacity={0.3} c="gray.0" px={24}>
            Quick Nav
          </Text>
        )}

        {essentials}

        {essentials && (
          <Text size="xs" opacity={0.3} c="gray.0" px={24}>
            Navigation
          </Text>
        )}

        <ScrollArea p="sm" h="calc(100% - 180px)" pb={150}>
          {renderNavItems}
        </ScrollArea>

        <Paper
          p="md"
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))",
          }}
        >
          {/* <Paper p="xs" bg="dark.7">
            <Group wrap="nowrap">
              <Calendar
                weight="duotone"
                color="var(--mantine-color-orange-5)"
              />
              <Text size="xs" c="gray.0">
                You have 3 booking requests on pending
              </Text>
            </Group>
          </Paper> */}

          <Group justify="space-between">
            <Button
              size="sm"
              variant="subtle"
              color="dark"
              c="gray.0"
              leftSection={<SignOut />}
              onClick={() => {
                modals.openConfirmModal({
                  title: (
                    <Group>
                      <ActionIcon size="sm" color="brand" variant="light">
                        <Info size={12} />
                      </ActionIcon>
                      <Text
                        size="sm"
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        Are you sure you want to sign out?
                      </Text>
                    </Group>
                  ),
                  children: (
                    <>
                      <Text size="xs" my="md">
                        On proceeding, you will be logged out of all your
                        applications and sessions will be closed.
                        <br />
                        <br />
                        <span
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          Are you sure you want to proceed?
                        </span>
                      </Text>
                      <Space h="6px" />
                    </>
                  ),
                  labels: {
                    confirm: "Yes",
                    cancel: "No",
                  },
                  confirmProps: {
                    color: "brand",
                    size: "xs",
                  },
                  cancelProps: {
                    size: "xs",
                  },
                  onCancel: () => {},
                  onConfirm: () => {
                    onLogout();
                  },
                  styles: {
                    header: {
                      background: "var(--mantine-color-brand-0)",
                    },
                  },
                  size: "sm",
                });
              }}
            >
              Sign Out
            </Button>
            <Text c="gray.0" opacity={0.5} size="10px">
              Version 1.2.3
            </Text>
          </Group>
        </Paper>
      </AppShell.Navbar>

      <Paper
        bg="dark.9"
        radius={0}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",

          zIndex: 10,
        }}
        hiddenFrom="lg"
      >
        <Group justify="space-between" h={60} px="xl">
          <Text size="sm" c="gray.0">
            KCA.Admin
          </Text>
          <Burger
            size={18}
            color="white"
            onClick={() => {
              handler.open();
            }}
          />
        </Group>
      </Paper>

      <Drawer
        opened={opened}
        onClose={() => {
          handler.close();
        }}
        title={
          <Text size="sm" c="gray.0">
            KCA.Admin
          </Text>
        }
        styles={{
          header: {
            background: "var(--mantine-color-dark-9)",
          },
          content: {
            background: "var(--mantine-color-dark-9)",
          },
        }}
      >
        {essentials && (
          <Text size="xs" opacity={0.3} c="gray.0" px={24}>
            Quick Nav
          </Text>
        )}

        {essentials}

        {essentials && (
          <Text size="xs" opacity={0.3} c="gray.0" px={24}>
            Navigation
          </Text>
        )}

        <ScrollArea p="sm" h="calc(100% - 180px)" pb={150}>
          {renderNavItems}
        </ScrollArea>
      </Drawer>
    </>
  );
}
