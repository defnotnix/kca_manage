import { ReactNode } from "react";

export type PropGetApiProps = {
  searchValue?: string;
  page?: number;
  pageSize?: number;
  params?: any;
};

export type PropListHandler = {
  getRecords: (apiProps: PropGetApiProps) => Promise<any>;
  endpoint?: string;
  dataKey?: string;
  moduleKey?: string[];
  //search
  enableServerSearch?: boolean;
  enableServerPagination?: boolean;
  //(children
  children: ReactNode;
};
