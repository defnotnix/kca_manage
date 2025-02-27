import { PropGetRecords } from "@/src/helpers";
import { ReactNode } from "react";

export type PropListHandler = {
  getRecords: (apiProps: PropGetRecords) => Promise<any>;
  endpoint?: string;
  dataKey?: string;
  //module
  moduleEndpoint: string;
  moduleKey?: string[];
  //search
  enableServerSearch?: boolean;
  enableServerPagination?: boolean;
  //(children
  children: ReactNode;
};
