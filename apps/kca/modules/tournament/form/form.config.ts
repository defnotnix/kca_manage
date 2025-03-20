import _ from "moment";

export const formProps: any = {
  initial: {
    items: [],
    pricelist: [],
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
    const { icon, ...res } = formdata;

    console.log(formdata);

    return {
      ...res,
      ...(formdata.icon instanceof File ? { icon: formdata.icon } : {}),
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
