"use client";

import React, { useEffect, useState } from "react";
//next
import { usePathname, useRouter } from "next/navigation";

//mantine
import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Divider,
  Group,
  HoverCard,
  LoadingOverlay,
  Menu,
  Modal,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
//mantine
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";

//icons
import {
  ArrowLeft,
  ArrowsClockwise,
  CaretDown,
  Check,
  DotsThree,
  DotsThreeVertical,
  Export,
  Eye,
  GearSix,
  House,
  MagnifyingGlass,
  PaintBucket,
  Pen,
  Plus,
  SlidersHorizontal,
  Trash,
  Warning,
} from "@phosphor-icons/react";

//datatable
import { DataTable, DataTableSortStatus } from "mantine-datatable";
//context
import { FormHandler, useListHandlerContext } from "@vframework/core";
//func
import sortBy from "lodash/sortBy";
//type
import { PropModuleTableLayout } from "./ModuleTableLayout.type";
import { useMutation } from "@tanstack/react-query";
import { triggerNotification } from "@vframework/ui";
import { ModuleModalFormLayout } from "../ModuleModalFormLayout";

export function ModuleTableLayout({
  /**
   * Breadcrumb navigation links
   */
  bread = [],

  /**
   * Module information
   */
  moduleName = "Enter Module Name",
  moduleDescription = "This is a module description that says something about the module.",
  moduleTerm,
  moduleTermPlural,

  /**
   * API handlers for CRUD operations
   */
  apiCreate = (d) => null,
  onCreateSuccess,
  apiDelete = (d) => null,
  onDeleteTrigger = () => {},
  onDeleteSuccess,
  apiEdit = (d) => null,
  onEditTrigger = (row) => row,
  onEditSuccess,

  /**
   * Table data configuration
   */
  idAccessor = "id",
  columns = [],
  extraActions,

  /**
   * Server-side configuration
   */
  hasServerSearch = false,

  /**
   * Table styling properties
   */
  rowColor,
  rowBackgroundColor,
  rowStyle,
  customCreate,

  /**
   * Tab settings
   */
  enableTabs = false,
  tabs = [],

  /**
   * Pagination settings
   */
  pageSizes = [20, 35, 50],

  /**
   * Custom URL configurations
   */
  customNewUrl,
  customEditUrl,

  /**
   * Modal form configurations
   */
  hasModalForms = false,
  modalProps = { width: "md" },
  modalFormProps = {
    formProps: {
      initial: {},
      formType: "new",
      steps: [],
      stepType: "default",
      stepClickable: false,
      initialStep: 0,
      validation: [],
      submitFormData: false,
      submitProps: {
        keyIgnore: [],
        valueIgnore: [],
        stringify: false,
      },
    },
  },
  modalForm,
  modalEdit,
  onModalEditOpen,
  onModalNewOpen,

  /**
   * Additional content placement around the table
   */
  contentPreHeader,
  contentPreTable,
  contentPostTable,

  /**
   * TableHeaderOptions
   */
  withFilter = false,
  withColumnSelect = false,
  withAddExtra = false,
  disableAdd = false,
  disableDelete = false,
  customRender,
  withBackButton,
  customCreateText,
}: PropModuleTableLayout) {
  // Create moduleConfig object to maintain compatibility

  const CustomRender = customRender;

  const moduleConfig = {
    moduleName,
    moduleDescriptions: { default: moduleDescription },
    prename: "",
    endpoint: "",
    moduleTerm,
    moduleTermPlural,
  };

  // * DEFINITIONS
  const Router = useRouter();
  const Pathname = usePathname();

  // * CONTEXT
  const {
    state,
    dispatch,
    //table
    data,
    isLoading,
    isFetching,
    refetch,
    //search
    searchVal,
    setSearchVal,
  } = useListHandlerContext();

  const {
    search,
    filters,
    tabActive,
    selectedRecords,
    page,
    pageSize,
    totalPages,
  } = state;

  // * STATE
  const [records, setRecords] = useState<any[]>([]);
  const [enableRowStyle, setEnableRowStyle] = useState(false);
  const [paginationData, setPaginationData] = useState<any>({});

  // > MODALS
  const [openFormModal, handlersFormModal] = useDisclosure(false);
  const [activeEdit, setActiveEdit] = useState<null | any>(null);
  const [editLoading, setEditLoading] = useState(false);

  // > SORTING
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<any>>({
    columnAccessor: "name",
    direction: "asc",
  });

  // * FUNCTIONS
  useEffect(() => {
    if (!hasServerSearch) {
      const _data = sortBy(data, sortStatus.columnAccessor);
      setRecords(sortStatus.direction === "desc" ? _data.reverse() : _data);
    } else {
      setRecords(data);
    }
  }, [data, sortStatus]);

  // * MUTATIONS
  const mutationSubmit = useMutation({
    mutationFn: async (delId) => {
      triggerNotification.form.isLoading({});
      const res = await apiDelete(delId,records);
      return res;
    },
    onSuccess: (res: any, delId: any) => {
      triggerNotification.form.isSuccess({});
      refetch();
      if (onDeleteSuccess) {
        onDeleteSuccess(delId);
      }
    },
    onError: (err: any) => {
      triggerNotification.form.isError({});
    },
  });

  const handleDelete = (id: any) => {
    modals.openConfirmModal({
      title: (
        <Group>
          <ActionIcon size="sm" color="red" variant="light">
            <Warning size={12} />
          </ActionIcon>
          <Text
            size="sm"
            style={{
              fontWeight: 600,
            }}
          >
            Please confirm your action
          </Text>
        </Group>
      ),
      children: (
        <>
          <Text size="xs" my="md">
            This might result in unexpected deletion of other dependent records
            under it.
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
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: {
        color: "red",
        size: "xs",
      },
      cancelProps: {
        size: "xs",
      },
      onCancel: () => {},
      onConfirm: () => {
        mutationSubmit.mutate(id);
      },
      styles: {
        header: {
          background: "var(--mantine-color-red-1)",
        },
      },
      size: "sm",
    });
  };

  // * ACTION COMPONENTS

  const RenderEdit = ({ row, children }: any) => {
    const form = FormHandler.useForm();

    const handleEditOpen = async () => {
      setActiveEdit(row);
      handlersFormModal.open();
      setEditLoading(true);
      const _editData = await onEditTrigger(row);

      form.setValues(await _editData);
      setEditLoading(false);
    };

    return (
      <div
        onClick={async () => {
          if (hasModalForms) {
            handleEditOpen();
          } else {
            Router.push(Pathname + (customEditUrl || "/edit/") + row.id);
          }
        }}
      >
        {children}
      </div>
    );
  };

  // Define tableActions
  const tableActions = [
    {
      accessor: "actions",
      title: "Actions",
      width: 100,
      textAlign: "right",
      render: (row: any) => (
        <Menu>
          <Menu.Target>
            <ActionIcon variant="light">
              <DotsThreeVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <RenderEdit row={row}>
              <Menu.Item leftSection={<Pen />}>Edit</Menu.Item>
            </RenderEdit>

            {extraActions && (
              <>
                <Menu.Divider />
                {extraActions({ row })}
                <Menu.Divider />
              </>
            )}

            <Menu.Item
              disabled={disableDelete}
              onClick={() => {
                handleDelete(row.id);
              }}
              leftSection={<Trash />}
              color="red"
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];

  // Extract the width from modalProps for the modals
  const { width } = modalProps;

  return (
    <>
      <FormHandler
        formType={activeEdit ? "edit" : "new"}
        {...modalFormProps.formProps}
        apiSubmit={
          activeEdit
            ? apiEdit
            : (body: any) => {
                return apiCreate(body, records);
              }
        }
        onSubmitSuccess={(res: any) => {
          refetch();
          handlersFormModal.close();
          if (activeEdit && onEditSuccess) {
            onEditSuccess(res);
          } else if (!activeEdit && onCreateSuccess) {
            onCreateSuccess(res);
          }
        }}
      >
        <Paper
          px="md"
          pt="md"
          pb="lg"
          bg="linear-gradient(to right, var(--mantine-color-gray-0), var(--mantine-color-brand-0))"
        >
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
              <Anchor
                size="xs"
                c={index == bread.length - 1 ? "dark.9" : "gray.5"}
                fw={600}
                key={index}
              >
                {breadinfo.label}
              </Anchor>
            ))}
          </Breadcrumbs>

          <Space h="md" />
          <Group justify="space-between" align="flex-end">
            <Group gap="sm">
              {withBackButton && (
                <ActionIcon
                  onClick={() => {
                    Router.back();
                  }}
                >
                  <ArrowLeft />
                </ActionIcon>
              )}
              <div>
                <Text size="xl" fw={600}>
                  {moduleName}
                </Text>
                <Text size="sm" opacity={0.5}>
                  {moduleDescription}
                </Text>
              </div>
            </Group>

            <Group gap={4} visibleFrom="lg">
              {/* <HoverCard shadow="md" withArrow>
                <HoverCard.Target>
                  <ActionIcon
                    size={28}
                    onClick={() => {
                      setEnableRowStyle(!enableRowStyle);
                    }}
                    variant={enableRowStyle ? "filled" : "light"}
                  >
                    <PaintBucket />
                  </ActionIcon>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="xs" ta="center">
                    Row Color :{" "}
                    <b
                      style={{
                        color: enableRowStyle
                          ? "var(--mantine-color-teal-6)"
                          : "var(--mantine-color-orange-6)",
                      }}
                    >
                      {enableRowStyle ? "Enabled" : "Disabled"}
                    </b>
                  </Text>
                </HoverCard.Dropdown>
              </HoverCard> */}

              <TextInput
                rightSection={<MagnifyingGlass />}
                size="xs"
                placeholder="Search"
                w={{ base: "100%", md: "auto" }}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
              />

              {withFilter && (
                <Button
                  leftSection={<SlidersHorizontal size={12} />}
                  variant="light"
                  size="xs"
                >
                  Filters
                </Button>
              )}

              {withColumnSelect && (
                <Button
                  leftSection={<GearSix size={12} />}
                  variant="light"
                  size="xs"
                >
                  Customize
                </Button>
              )}

              <Menu
                withArrow
                styles={{
                  item: {
                    fontSize: "var(--mantine-font-size-xs)",
                  },
                }}
              >
                <Menu.Target>
                  <Button
                    variant="light"
                    rightSection={<CaretDown />}
                    disabled={isFetching}
                    size="xs"
                  >
                    Actions
                  </Button>
                </Menu.Target>
                <Menu.Dropdown w={200}>
                  <Menu.Label>Bulk Actions</Menu.Label>
                  <Menu.Item leftSection={<Pen />}>Bulk Edit</Menu.Item>
                  <Menu.Item leftSection={<Trash />}>Bulk Delete</Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>General</Menu.Label>

                  <Menu.Item
                    leftSection={<ArrowsClockwise />}
                    onClick={() => {
                      refetch();
                    }}
                  >
                    Reload Table
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>Export to CSV</Menu.Label>
                  <Menu.Item leftSection={<Export />}>Export All</Menu.Item>
                  <Menu.Item leftSection={<Check />}>Export Selected</Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <ButtonGroup>
                <Button
                  disabled={disableAdd}
                  variant="filled"
                  size="xs"
                  leftSection={<Plus />}
                  onClick={() => {
                    if (customCreate) {
                      customCreate(records);
                    } else {
                      if (hasModalForms) {
                        setActiveEdit(null);
                        handlersFormModal.open();
                        if (onModalNewOpen) {
                          onModalNewOpen({});
                        }
                      } else {
                        Router.push(
                          customNewUrl ? customNewUrl : Pathname + "/new"
                        );
                      }
                    }
                  }}
                >
                  {customCreateText || "Add " + moduleTerm || "Item"}
                </Button>
                <Button
                  disabled={!withAddExtra}
                  variant="filled"
                  size="xs"
                  px="8"
                  ml={1}
                >
                  <CaretDown />
                </Button>
              </ButtonGroup>
            </Group>
          </Group>

          <Stack gap="xs" hiddenFrom="lg" mt="sm">
            <TextInput
              rightSection={<MagnifyingGlass />}
              size="xs"
              placeholder="Search"
              w={{ base: "100%", md: "auto" }}
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
            />

            <SimpleGrid cols={2} spacing={4} hiddenFrom="lg">
              <Menu
                withArrow
                styles={{
                  item: {
                    fontSize: "var(--mantine-font-size-xs)",
                  },
                }}
              >
                <Menu.Target>
                  <Button
                    variant="light"
                    rightSection={<CaretDown />}
                    disabled={isFetching}
                    size="xs"
                  >
                    Actions
                  </Button>
                </Menu.Target>
                <Menu.Dropdown w={200}>
                  <Menu.Label>Bulk Actions</Menu.Label>
                  <Menu.Item leftSection={<Pen />}>Bulk Edit</Menu.Item>
                  <Menu.Item leftSection={<Trash />}>Bulk Delete</Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>General</Menu.Label>

                  <Menu.Item
                    leftSection={<ArrowsClockwise />}
                    onClick={() => {
                      refetch();
                    }}
                  >
                    Reload Table
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>Export to CSV</Menu.Label>
                  <Menu.Item leftSection={<Export />}>Export All</Menu.Item>
                  <Menu.Item leftSection={<Check />}>Export Selected</Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Button
                disabled={disableAdd}
                variant="filled"
                size="xs"
                leftSection={<Plus />}
                onClick={() => {
                  if (customCreate) {
                    customCreate(records);
                  } else {
                    if (hasModalForms) {
                      setActiveEdit(null);
                      handlersFormModal.open();
                      if (onModalNewOpen) {
                        onModalNewOpen({});
                      }
                    } else {
                      Router.push(
                        customNewUrl ? customNewUrl : Pathname + "/new"
                      );
                    }
                  }
                }}
              >
                {customCreateText || "Add " + moduleTerm || "Item"}
              </Button>
            </SimpleGrid>
          </Stack>
        </Paper>

        {!contentPreTable && <Divider mb={!enableTabs ? "md" : 0} />}

        {enableTabs && (
          <>
            <Group
              justify="space-between"
              px="md"
              py="xs"
              bg="linear-gradient(to right, var(--mantine-color-gray-0), var(--mantine-color-brand-0))"
            >
              <Group gap="4px">
                {tabs.map((tab, index) => (
                  <Button
                    key={index}
                    size="xs"
                    variant={index === tabActive ? "filled" : "light"}
                    onClick={() => {
                      dispatch({
                        type: "SET_TAB_ACTIVE",
                        payload: index,
                      });
                    }}
                  >
                    {tab.label}
                  </Button>
                ))}
                {tabs.length === 0 && (
                  <>
                    <Button size="xs" variant="filled">
                      Active Users
                    </Button>
                    <Button size="xs" variant="light">
                      Inactive Users
                    </Button>
                  </>
                )}
              </Group>
            </Group>

            <Divider mb="sm" />
          </>
        )}

        {contentPreTable}

        {CustomRender ? (
          <CustomRender
            data={records}
            renderEdit={RenderEdit}
            handleDelete={handleDelete}
          />
        ) : (
          <Paper radius="md" withBorder h={"calc(100vh - 205px)"} mx="md">
            <DataTable
              //Loading
              fetching={isFetching}
              styles={{
                header: {
                  background: "var(--mantine-color-gray-1)",
                },
              }}
              //fonts
              fz="sm"
              fw={500}
              // styling
              highlightOnHover
              // spacing
              verticalSpacing="xs"
              horizontalSpacing="md"
              //Data
              idAccessor={idAccessor}
              records={records}
              columns={[
                {
                  accessor: "#",
                  title: "#",
                  width: 50,
                  render: (row, index) => <>{index + 1}</>,
                },
                ...columns,
                ...tableActions,
              ]}
              //Row Styling
              rowColor={rowColor}
              rowBackgroundColor={rowBackgroundColor}
              rowStyle={enableRowStyle ? rowStyle : undefined}
              //Sorting
              sortStatus={sortStatus}
              onSortStatusChange={setSortStatus}
              //Pagination
              totalRecords={
                hasServerSearch ? totalPages * pageSize : records.length
              }
              page={page}
              onPageChange={(p) => {
                dispatch({
                  type: "SET_PAGE",
                  payload: p,
                });
              }}
              // > Pagination Size
              recordsPerPage={pageSize}
              recordsPerPageOptions={pageSizes}
              onRecordsPerPageChange={(e) => {
                dispatch({
                  type: "SET_PAGE_DATA",
                  payload: {
                    pageSize: e,
                    page: 1,
                  },
                });
              }}
              // Selection handling
              selectedRecords={selectedRecords}
              onSelectedRecordsChange={(e) => {
                dispatch({
                  type: "SET_SELECTED_RECORDS",
                  payload: e,
                });
              }}
              selectionTrigger="cell"
            />
          </Paper>
        )}

        {/* Modal for creating new items */}
        {hasModalForms && (
          <Modal
            size={modalFormProps?.width || "md"}
            opened={openFormModal && !activeEdit}
            onClose={() => {
              handlersFormModal.close();
            }}
            title={
              <Text tt="uppercase" size="xs" fw={700}>
                {`New ${moduleTerm || moduleName}`}
              </Text>
            }
          >
            <ModuleModalFormLayout
              variant="new"
              isLoading={false}
              moduleConfig={moduleConfig}
            >
              {modalForm}
            </ModuleModalFormLayout>
          </Modal>
        )}

        {/* Modal for editing items */}
        {hasModalForms && (
          <Modal
            size={modalFormProps?.width || "md"}
            opened={openFormModal && !!activeEdit}
            onClose={() => {
              setActiveEdit(null);
              handlersFormModal.close();
            }}
            title={
              <Text tt="uppercase" size="xs" fw={700}>
                {`Edit ${moduleTerm || moduleName}`}
              </Text>
            }
          >
            <LoadingOverlay visible={editLoading} />
            <ModuleModalFormLayout
              variant="edit"
              isLoading={false}
              moduleConfig={moduleConfig}
            >
              {modalEdit
                ? React.cloneElement(modalEdit, { preData: activeEdit })
                : modalForm}
            </ModuleModalFormLayout>
          </Modal>
        )}
      </FormHandler>
    </>
  );
}
