import { JSX, ReactNode } from "react";
import { PropFormHandlerWithoutChildren } from "@vframework/core";

type DataTable = {
  idAccessor?: string;
  columns: any[];
};

type ExtraContent = {
  contentPreHeader?: ReactNode;
  contentPreTable?: ReactNode;
  contentPostTable?: ReactNode;
};

type PropTabs = {
  icon?: any;
  label: string;
  titleLabel?: string;
  onChange?: (id: any) => void;
  count?: number | string;
};

type PropHeader = {
  tabs?: PropTabs[];
  tabsSize?: number;
  enableTabLabel?: boolean;
  customNewUrl?: string;
};

type ModalFormProps = {
  width?: string;
  formProps: PropFormHandlerWithoutChildren;
};

type PropModalFormHandler = {
  hasModalForms?: boolean;
  modalProps?: any;
  modalFormProps?: ModalFormProps;
  modalForm?: JSX.Element;
  modalEdit?: any;
  modalCreate?: () => JSX.Element;
  onModalEditOpen?: (row: any) => void;
  onModalNewOpen?: (row: any) => void;
};

type APIHandlers = {
  apiCreate?: (id: any) => void;
  onCreateSuccess?: (id: any) => void;
  apiDelete?: (id: any) => void;
  onDeleteTrigger?: (row: any) => any;
  onDeleteSuccess?: (id: any) => void;
  apiEdit?: (body: any, id: any) => void;
  onEditTrigger?: (row: any) => any;
  onEditSuccess?: (id: any) => void;
};

type TableStyle = {
  rowColor?: (row: any) => any;
  rowBackgroundColor?: (row: any) => any;
  rowStyle?: (row: any) => any;
  tableProps?: any;
};

export type PropModuleTableLayout = {
  bread?: { label?: string; url?: string }[];
  moduleName?: string;
  moduleDescription?: string;
  moduleTerm?: string;
  moduleTermPlural?: string;
  extraActions?: ({ row }: { row: any }) => JSX.Element;
  enableTabs?: boolean;
  tabs?: PropTabs[];
  hasServerSearch?: boolean;
  pageSizes?: number[];
  customNewUrl?: string;
  customEditUrl?: string;
  hasContainer?: boolean;
  containerSize?: string | number;
} & APIHandlers &
  DataTable &
  ExtraContent &
  PropHeader &
  PropModalFormHandler &
  TableStyle;
