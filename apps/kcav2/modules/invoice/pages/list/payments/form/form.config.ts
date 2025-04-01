import _ from "moment";

export const formProps: any = {
  initial: {
    gateway: "1",
  },

  // > STEPS
  steps: ["Billing Details", "Particulars"],
  stepType: "general",
  stepClickable: false,
  initialStep: 0,

  // > VALIDATION
  validation: [],

  // > SUBMIT
  transformDataOnSubmit: (formdata: any) => {
    console.log(formdata);

    return {
      ...formdata,
      status: 1,
      type: 2,
    };
  },

  // > API

  submitProps: {
    keyIgnore: [],
    valueIgnore: [],
    stringify: false,
  },
};
