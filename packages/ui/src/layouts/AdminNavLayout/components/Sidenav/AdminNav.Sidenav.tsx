"use client";

import React from "react";
//next
import { usePathname, useRouter } from "next/navigation";
//mantine
import {
  ActionIcon,
  AppShell,
  Badge,
  Box,
  Button,
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
  ChartDonut,
  DotsThree,
  MagnifyingGlass,
  Plus,
  SignOut,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import { PropAdminNavSideNav } from "../../AdminNavLayout.type";

//styles
import classes from "./AdminNav.Sidenav.module.css";
import classesNavLink from "./AdminNav.NavLink.module.css";

//components

export function _AdminNavLayoutSidenav({
  essentials,
  softwareInfo,
  navItems,
  navModules = [],
}: PropAdminNavSideNav) {
  // * DEFINITIONS

  const Router = useRouter();
  const Pathname = usePathname();

  // * CONTEXT

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
        active={Pathname === navMain.value}
        classNames={classesNavLink}
        href={navMain.value}
      >
        {navMain?.children?.map((navChild: any, index: number) => {
          return (
            <NavLink
              className={classes.subnav}
              color="brand"
              variant="filled"
              label={navChild.label}
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
        w={252}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))",
        }}
      >
        <Paper mb="sm" bg="rgba(255,255,255,.1)" p="md">
          <Text size="xs" c="gray.0" mb={3}>
            This is a message for the software user.
          </Text>
          <Text size="10px" c="gray.0" opacity={0.5}>
            Something like a license.
          </Text>
        </Paper>

        <Group justify="space-between">
          <Button
            size="sm"
            variant="subtle"
            color="dark"
            c="gray.0"
            leftSection={<SignOut />}
          >
            Sign Out
          </Button>
          <Text c="gray.0" opacity={0.5} size="10px">
            Version 1.2.3
          </Text>
        </Group>
      </Paper>
    </AppShell.Navbar>
  );
}
