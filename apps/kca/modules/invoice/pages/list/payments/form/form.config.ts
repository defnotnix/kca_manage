import _ from "moment";

export const formProps: any = {
  initial: {},

  // > STEPS
  steps: ["Billing Details", "Particulars"],
  stepType: "general",
  stepClickable: false,
  initialStep: 0,

  // > VALIDATION
  validation: [],

  // > SUBMIT
  transformDataOnSubmit: (formdata: any) => {
    return formdata;
  },

  // > API

  submitProps: {
    keyIgnore: [],
    valueIgnore: [],
    stringify: false,
  },
};
