import { add } from "lodash";
import _ from "moment";

export const formProps: any = {
  initial: {
    ground: [],
    addons: [],
    time: [],
    status: "3",
  },

  // > STEPS
  steps: ["Ground", "Add-On's", "Timing", "Details"],
  stepType: "general",
  stepClickable: false,
  initialStep: 0,

  // > VALIDATION
  validation: [],

  // > SUBMIT
  transformDataOnSubmit: (formdata: any) => {
    return {
      ...formdata,
    };
  },
  submitFormData: false,

  // > API

  submitProps: {
    keyIgnore: [],
    valueIgnore: [],
    stringify: false,
  },
};
