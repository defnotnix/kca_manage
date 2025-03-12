"use client";

import { ModuleTableLayout } from "@vframework/ui";
import { useRouter } from "next/navigation";
import { ListHandler } from "@vframework/core";
import {
  createRecord,
  deleteRecord,
  updateRecord,
  getRecords,
} from "../../module.api";
import { columns } from "./list.columns";
import {
  ActionIcon,
  Group,
  Menu,
  Paper,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import { Cricket, DotsThree, Invoice, Pen, Trash } from "@phosphor-icons/react";
import { moduleConfig } from "../../module.config";

import { _Form as Form } from "../../form/form";
import { formProps } from "../../form/form.config";

export function _List() {
  const router = useRouter();

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
                  <Paper key={index} withBorder p="md">
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
                ))}
              </SimpleGrid>
            );
          }}
        />
      </ListHandler>
    </>
  );
}
