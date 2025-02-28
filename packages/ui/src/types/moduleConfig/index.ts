export type PropModuleConfig = {
  bread: {
    label: string;
    url?: string;
  }[];
  moduleKey: string[];
  moduleTerm: string;
  moduleTermPlural: string;
  moduleName: string;
  moduleDescription: string;
  endpoint?: string;
};
