import _ from "moment";

export const formProps: any = {
  initial: {},

  // > STEPS
  steps: ["Select Session", "Student Attendance"],
  stepType: "general",
  stepClickable: false,
  initialStep: 0,

  // > VALIDATION
  validation: [],

  // > SUBMIT
  transformDataOnSubmit: (formdata: any) => {
    const { image, ...res } = formdata;

    console.log(formdata);

    return formdata?.students || [];
  },
  submitFormData: false,

  // > API

  submitProps: {
    keyIgnore: [],
    valueIgnore: [],
    stringify: false,
  },
};
