type PropModuleTableLayout = {
  bread: {
    label?: string;
    url?: string;
  }[];
  moduleName?: string;
  moduleDescription?: string;
  moduleTerm?: string;
  moduleTermPlural?: string;
  // data
  idAccessor?: string;
  columns: any[];
  //tabs
  enableTabs?: boolean;
  tabs?: any[];
  //server
  hasServerSearch?: boolean;
  pageSizes?: number[];
  //style
  rowColor?: ({}) => any;
  rowBackgroundColor?: ({}) => any;
  rowStyle?: ({}) => any;
};

export type { PropModuleTableLayout };
