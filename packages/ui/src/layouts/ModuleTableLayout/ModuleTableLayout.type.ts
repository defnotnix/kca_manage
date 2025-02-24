type PropModuleTableLayout = {
  // data
  idAccessor?: string;
  columns: any[];
  //server
  hasServerSearch?: boolean;
  pageSizes?: number[];
  //style
  rowColor?: ({}) => any;
  rowBackgroundColor?: ({}) => any;
  rowStyle?: ({}) => any;
};

export type { PropModuleTableLayout };
