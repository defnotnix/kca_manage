import { PropModuleConfig } from "@/src/types";
import { ReactNode } from "react";

export type PropModuleFormLayout = {
  //variant
  variant?: "new" | "edit";
  //container
  size?: string | number;
  //steps
  steps?: string[];
  withStepper?: boolean;
  //children
  isLoading?: boolean;
  children: ReactNode;
} & PropModuleConfig;
