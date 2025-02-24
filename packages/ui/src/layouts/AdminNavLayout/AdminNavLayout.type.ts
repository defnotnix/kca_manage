import { ReactNode } from "react";
import { Icon } from "@phosphor-icons/react";
import { MantineColor, TreeNodeData } from "@mantine/core";

type PropAdminNavItems = TreeNodeData & {
  icon?: Icon;
};

type PropAdminNavModule = {
  icon: Icon;
  label?: string;
  description?: string;
  color?: MantineColor;
};

type PropAdminNavSideNav = {
  navItems: PropAdminNavItems[];
  navModules: PropAdminNavModule[];
};

type PropAdminNavStyles = {
  classNames?: {
    root?: any;
    topnav?: any;
    sidenav?: any;
  };
};

type PropAdminNavGeneral = {
  classNames?: any;
  children: ReactNode;
};

export type PropAdminNavLayout = PropAdminNavStyles &
  PropAdminNavGeneral &
  PropAdminNavSideNav;
export type { PropAdminNavItems, PropAdminNavSideNav, PropAdminNavModule };
