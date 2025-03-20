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

    return {
      ...formdata,
      ...(formdata.image instanceof File ? { image: formdata.image } : {}),
      // * FIXINGS
      doe: _(formdata?.doe).format("YYYY-MM-DD"),
      dob: _(formdata?.dob).format("YYYY-MM-DD"),
      decided_date: _(formdata?.decided_date).format("YYYY-MM-DD"),
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
