import { ReactNode } from "react";

export type PropGetApiProps = {
  endpoint: string;
  searchValue?: string;
  page?: number;
  pageSize?: number;
  params?: any;
};

export type PropListHandler = {
  api: (apiProps: PropGetApiProps) => Promise<any[]>;
  apiParams?: any;
  addToURL?: string;
  endpoint?: string;
  dataKey?: string;
  queryKey?: string[];
  //search
  enableServerSearch?: boolean;
  enableServerPagination?: boolean;
  //(children
  children: ReactNode;
};
