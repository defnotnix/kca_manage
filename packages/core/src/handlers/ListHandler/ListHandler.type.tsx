import { PropGetRecords } from "@/src/helpers";
import { ReactNode } from "react";

export type PropListHandler = {
  getRecords: (apiProps: PropGetRecords) => Promise<any>;
  dataKey?: string;
  //module
  endpoint?: string;
  moduleKey?: string[];
  //search
  enableServerSearch?: boolean;
  enableServerPagination?: boolean;
  //(children
  children: ReactNode;
};
