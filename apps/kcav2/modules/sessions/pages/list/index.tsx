"use client";

import { ModuleModalFormLayout, ModuleTableLayout } from "@vframework/ui";
import { useRouter } from "next/navigation";
import { FormHandler, ListHandler } from "@vframework/core";
import {
  createRecord,
  deleteRecord,
  updateRecord,
  getRecords,
} from "../../module.api";

import { createRecord as createAttendance } from "../../form/attendance/form.api";

import { columns } from "./list.columns";
import {
  ActionIcon,
  Badge,
  Box,
  Group,
  LoadingOverlay,
  Menu,
  Modal,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import {
  Calendar,
  Chair,
  Check,
  Cricket,
  DotsThree,
  Invoice,
  Pen,
  Trash,
  UserPlus,
  Users,
} from "@phosphor-icons/react";
import { moduleConfig } from "../../module.config";

import { _Form as Form } from "../../form/form";
import { formProps } from "../../form/form.config";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { _FormPlayer } from "../../form/players/form";
import { _FormAttendance } from "../../form/attendance/form";
import { formPropsAttendance } from "../../form/attendance/form.config";

export function _List() {
  const router = useRouter();

  // * State

  const [openFormModalPlayer, handlersFormModalPlayer] = useDisclosure(false);
  const [openFormModalAttendance, handlersFormModalAttendance] =
    useDisclosure(false);
  const [openFormModalAttendanceNew, handlersFormModalAttendanceNew] =
    useDisclosure(false);
  const [active, setActive] = useState(null);

  return (
    <>
      <ListHandler
        endpoint={moduleConfig.endpoint}
        moduleKey={moduleConfig.moduleKey}
        getRecords={getRecords}
      >
        <ModuleTableLayout
          {...moduleConfig}
          idAccessor="id"
          apiEdit={updateRecord}
          apiCreate={createRecord}
          apiDelete={deleteRecord}
          columns={columns}
          // * TABS
          tabs={[
            { label: "All Records", count: 3344 },
            { label: "Active", count: 2233 },
            { label: "Inactive" },
          ]}
          // * TABLE PROPS
          //tableprops={{ height: "calc(100vh - 200px)" }}
          // * ROW COLORS
          rowStyle={({ gender }: any) => ({
            background:
              gender === "male" ? "var(--mantine-color-indigo-0)" : "",
          })}
          // * EXTRA ACTIONS

          // * MODAL CONFIG
          hasModalForms
          modalFormProps={{ width: "lg", formProps }}
          modalForm={<Form />}
          customRender={({ data, renderEdit, handleDelete }: any) => {
            const RenderEdit = renderEdit;
            return (
              <SimpleGrid spacing="xs" cols={{ base: 1, md: 3, lg: 5 }} px="md">
                {data.map((item: any, index: number) => (
                  <Box key={index}>
                    <Paper withBorder p="md" radius={0}>
                      <Group wrap="nowrap" justify="space-between">
                        <Text size="sm">{item.name}</Text>

                        <Menu>
                          <Menu.Target>
                            <ActionIcon variant="light">
                              <DotsThree weight="bold" />
                            </ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item
                              leftSection={<Cricket />}
                              onClick={() => {
                                router.push("/addons/" + item.id);
                              }}
                            >
                              Manage Add-On's
                            </Menu.Item>
                            <Menu.Item
                              onClick={() => {
                                router.push("/sessions/" + item.id);
                              }}
                              leftSection={<Users />}
                            >
                              Manage Players
                            </Menu.Item>
                            <Menu.Item
                              onClick={() => {
                                router.push(
                                  "/sessions/" + item.id + "/routines"
                                );
                              }}
                              leftSection={<Calendar />}
                            >
                              Review Session Ground Routine
                            </Menu.Item>

                            <RenderEdit row={item}>
                              <Menu.Item leftSection={<Pen />}>Edit</Menu.Item>
                            </RenderEdit>
                            <Menu.Item
                              onClick={() => {
                                handleDelete(item.id);
                              }}
                              leftSection={<Trash />}
                              color="red"
                            >
                              Delete
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Group>
                    </Paper>
                    <Paper
                      bg={item?.player?.length > 0 ? "brand.0" : "teal.0"}
                      radius={0}
                      px="md"
                      py="xs"
                      withBorder
                    >
                      {item?.player?.length > 0 ? (
                        <Text size="xs">
                          {item.player?.length} Active Players
                        </Text>
                      ) : (
                        <Text size="xs">
                          New Session, Add Players to activate
                        </Text>
                      )}
                    </Paper>
                  </Box>
                ))}
              </SimpleGrid>
            );
          }}
        />
      </ListHandler>

      <Modal
        size={"lg"}
        opened={openFormModalPlayer}
        onClose={() => {
          setActive(null);
          handlersFormModalPlayer.close();
        }}
        title={
          <Text tt="uppercase" size="xs" fw={700}>
            Manage Session Players
          </Text>
        }
      >
        <_FormPlayer active={active} />
      </Modal>

      <FormHandler
        formType={"new"}
        {...formPropsAttendance}
        apiSubmit={createAttendance}
        onSubmitSuccess={() => {
          handlersFormModalAttendanceNew.close();
        }}
      >
        <Modal
          size={"lg"}
          opened={openFormModalAttendanceNew}
          onClose={() => {
            setActive(null);
            handlersFormModalAttendanceNew.close();
          }}
          title={
            <Text tt="uppercase" size="xs" fw={700}>
              New Attendance Sheet
            </Text>
          }
        >
          <_FormAttendance active={active} />
        </Modal>
      </FormHandler>
    </>
  );
}
