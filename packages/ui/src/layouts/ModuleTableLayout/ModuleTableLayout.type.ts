import { JSX, ReactNode } from "react";
import { PropFormHandlerWithoutChildren } from "@vframework/core";

/**
 * Data Table Configuration
 */
type DataTable = {
  idAccessor?: string;
  columns: any[];
};

/**
 * API Handlers for CRUD operations
 */
type APIHandlers = {
  apiCreate?: (body: any, records?: any) => void;
  onCreateSuccess?: (id: any) => void;
  apiDelete?: (id: any, records?: any) => void;
  onDeleteTrigger?: (row: any) => any;
  onDeleteSuccess?: (id: any) => void;
  apiEdit?: (body: any, id: any) => void;
  onEditTrigger?: (row: any) => any;
  onEditSuccess?: (id: any) => void;
};

/**
 * Extra Content that can be displayed before or after the table
 */
type ExtraContent = {
  contentPreHeader?: ReactNode;
  contentPreTable?: ReactNode;
  contentPostTable?: ReactNode;
};

/**
 * Tab Configuration for the table layout
 */
type PropTabs = {
  icon?: any;
  label: string;
  titleLabel?: string;
  onChange?: (id: any) => void;
  count?: number | string;
};

/**
 * Header Configuration including tabs
 */
type PropHeader = {
  tabs?: PropTabs[];
  tabsSize?: number;
  enableTabLabel?: boolean;
  customNewUrl?: string;
};

/**
 * Modal Form Configuration
 */
type ModalFormProps = {
  width?: string;
  formProps: PropFormHandlerWithoutChildren;
};

/**
 * Modal Form Handling
 */
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

/**
 * Table Styling Properties
 */
type TableStyle = {
  rowColor?: (row: any) => any;
  rowBackgroundColor?: (row: any) => any;
  rowStyle?: (row: any) => any;
  tableProps?: any;
};

/**
 * Main Prop Type for the Table Layout Module
 */
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
  // TableHeaders
  withFilter?: boolean;
  withColumnSelect?: boolean;
  disableAdd?: boolean;
  disableDelete?: boolean;
  disableEdit?: boolean;
  withAddExtra?: boolean;
  customRender?: (props: any) => JSX.Element;
  customCreate?: any;
  withBackButton?: boolean;
  customCreateText?: string;
  forceFilter?: (records: any) => any;
} & APIHandlers &
  DataTable &
  ExtraContent &
  PropHeader &
  PropModalFormHandler &
  TableStyle;
