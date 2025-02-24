import React from "react";

export interface PropQueryWrapper {
  apiProvider: string;
  queryProps?: any;
  children: React.ReactNode;
}
