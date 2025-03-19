import _ from "moment";

export const formProps: any = {
  initial: {},

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
    const { image, ...res } = formdata;

    console.log("call", formdata);

    return {
      ...res,
      ...(formdata.image instanceof File ? { image: formdata.image } : {}),
    };
  },
  submitFormData: true,

  // > API

  submitProps: {
    keyIgnore: [],
    valueIgnore: [],
    stringify: false,
  },
};
