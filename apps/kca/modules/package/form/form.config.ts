import _ from "moment";

export const formProps: any = {
  initial: {
    addon: [],
    category: "x",
  },

  // > STEPS
  steps: [
    "Personal Details",
    "Guardian Details",
    "Enroll Details",
    "Extra Details",
  ],
  stepType: "general",
  stepClickable: false,
  initialStep: 0,

  // > VALIDATION
  validation: [],

  // > SUBMIT
  transformDataOnSubmit: (formdata: any) => {
    return {
      ...formdata,
      addon: formdata.addon?.map((e: any) => {
        return e.addon;
      }),
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
