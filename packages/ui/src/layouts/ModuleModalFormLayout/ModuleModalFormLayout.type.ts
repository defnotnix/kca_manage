import { PropConfigModule } from "@vsphere/core";
import { ReactNode } from "react";

type propHintDetails = {
  icon: any;
  title: string;
  description: string;
};

export type PropModuleModalFormLayout = {
  moduleConfig: PropConfigModule;
  //variant
  variant?: "new" | "edit";
  //hint
  withHint?: boolean;
  hintDetails?: propHintDetails;
  //container
  size?: string | number;
  //steps
  steps?: string[];
  withStepper?: boolean;
  onEditTrigger?: (id: string | number, form: any) => void;
  //children
  isLoading?: boolean;
  children: ReactNode;
};
