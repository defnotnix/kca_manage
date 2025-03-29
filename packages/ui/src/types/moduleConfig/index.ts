export type PropModuleConfig = {
  bread: {
    label: string;
    url?: string;
  }[];
  moduleKey: any[];
  moduleTerm: string;
  moduleTermPlural: string;
  moduleName: string;
  moduleDescription: string;
  endpoint?: string;
};
