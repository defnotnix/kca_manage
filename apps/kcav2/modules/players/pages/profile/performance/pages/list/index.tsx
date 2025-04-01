"use client";

import { ModuleTableLayout, triggerNotification } from "@vframework/ui";
import { useParams, useRouter } from "next/navigation";
import { ListHandler } from "@vframework/core";
import {
  createRecord,
  deleteRecord,
  updateRecord,
  getRecords,
  createSave,
} from "../../module.api";
import { columns } from "./list.columns";
import {
  ActionIcon,
  Divider,
  Group,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { Invoice, Pen, Printer, Trash, Warning } from "@phosphor-icons/react";
import { moduleConfig } from "../../module.config";

import { _Form as Form } from "../../form/form";
import { formProps } from "../../form/form.config";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

const gradingChoice = ["A+", "A", "B", "C", "C-"];

export function _List() {
  const router = useRouter();
  const Params = useParams();

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
      triggerNotification.form.isError({
        title: "Grading Already Exists",
        message:
          "A grading entry has already been saved for today. Delete existing log to save a new one.",
      });
    },
  });

  return (
    <>
      <ListHandler
        endpoint={moduleConfig.endpoint}
        moduleKey={moduleConfig.moduleKey}
        getRecords={getRecords}
        getParams={{
          player_id: Params.id,
        }}
      >
        <ModuleTableLayout
          {...moduleConfig}
          idAccessor="id"
          apiEdit={updateRecord}
          apiCreate={createRecord}
          apiDelete={deleteRecord}
          columns={columns}
          onEditTrigger={(formdata) => {
            return {
              ...formdata,
              is_present: String(formdata?.is_present ? "1" : "0"),
            };
          }}
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
          customCreateText="Save Grading"
          customCreate={(data: any) => {
            if (data.length > 0) {
              mutationSubmit.mutate(data[0]?.id);
            } else {
              notifications.show({
                color: "red",
                icon: <Warning size={16} />,
                id: "x",
                title: "No Grading Data",
                message: "Please add a grading data first",
              });
            }
          }}
          // * MODAL CONFIG
          hasModalForms
          modalFormProps={{ width: "xl", formProps }}
          modalForm={<Form />}
          customRender={({ data, renderEdit, handleDelete }) => {
            const EditContainer = renderEdit;

            return (
              <Stack gap="xs" px="md">
                {data.map((item: any, index: number) => {
                  return (
                    <Paper key={index} withBorder p="xs">
                      <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="xs">
                        <Paper p="sm" bg="teal.0">
                          <Stack gap="xs">
                            <Text size="sm">Batting</Text>

                            {[
                              "batting_grip",
                              "stance",
                              "batlift",
                              "weight_transfer",
                              "judgement",
                              "shot_selection",
                              "execution",
                            ].map((field, index) => (
                              <Group
                                key={index}
                                justify="space-between"
                                wrap="nowrap"
                              >
                                <Text tt="capitalize" size="xs">
                                  {field.replace("_", " ")}
                                </Text>
                                <SegmentedControl
                                  color="teal"
                                  size="xs"
                                  data={gradingChoice}
                                  value={item[field] || ""}
                                />
                              </Group>
                            ))}
                          </Stack>
                        </Paper>
                        <Paper bg="blue.0" p="sm">
                          <Stack gap="xs">
                            <Text size="sm">Bowling</Text>

                            {[
                              "bowling_grip",
                              "runup",
                              "loading",
                              "jump",
                              "landing",
                              "release",
                              "accuracy",
                              "swing",
                              "turn",
                              "variation",
                            ].map((field, index) => (
                              <Group
                                key={index}
                                justify="space-between"
                                wrap="nowrap"
                              >
                                <Text tt="capitalize" size="xs">
                                  {field.replace("_", " ")}
                                </Text>
                                <SegmentedControl
                                  color="blue"
                                  size="xs"
                                  data={gradingChoice}
                                  value={item[field] || ""}
                                />
                              </Group>
                            ))}
                          </Stack>
                        </Paper>{" "}
                        <Paper bg="indigo.0" p="sm">
                          <Stack gap="xs">
                            <Text size="sm">Fielding</Text>

                            {[
                              "ground_fielding",
                              "technique",
                              "collection",
                              "throwing",
                              "catching_technique",
                              "ball_judgement",
                              "throwing_technique",
                            ].map((field, index) => (
                              <Group
                                key={index}
                                justify="space-between"
                                wrap="nowrap"
                              >
                                <Text tt="capitalize" size="xs">
                                  {field.replace("_", " ")}
                                </Text>
                                <SegmentedControl
                                  color="indigo"
                                  size="xs"
                                  data={gradingChoice}
                                  value={item[field] || ""}
                                />
                              </Group>
                            ))}
                          </Stack>
                        </Paper>{" "}
                        <Paper bg="orange.0" p="sm">
                          <Stack gap="xs">
                            <Text size="sm">Discipline</Text>
                            {[
                              "strength",
                              "mental",
                              "physical",
                              "team_player",
                              "discipline",
                              "learning",
                            ].map((field, index) => (
                              <Group
                                key={index}
                                justify="space-between"
                                wrap="nowrap"
                              >
                                <Text tt="capitalize" size="xs">
                                  {field.replace("_", " ")}
                                </Text>
                                <SegmentedControl
                                  color="orange"
                                  size="xs"
                                  data={gradingChoice}
                                  value={item[field] || ""}
                                />
                              </Group>
                            ))}
                          </Stack>
                        </Paper>
                      </SimpleGrid>

                      <Group justify="space-between" mt="sm">
                        <Group gap="xs">
                          <Text size="xs">Overall : {item.overall}</Text>
                          <Divider orientation="vertical" />
                          <Text size="xs">
                            Remarks:
                            {item?.remarks}
                          </Text>
                        </Group>

                        <Group gap="xs">
                          <EditContainer row={item}>
                            <ActionIcon>
                              <Pen />
                            </ActionIcon>
                          </EditContainer>
                        </Group>
                      </Group>
                    </Paper>
                  );
                })}
              </Stack>
            );
          }}
        />
      </ListHandler>
    </>
  );
}
