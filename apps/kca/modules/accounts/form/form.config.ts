import _ from "moment";

export const formProps: any = {
  initial: {
    items: [],
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
    const { image, ...res } = formdata;

    console.log(formdata);

    return {
      ...formdata,
      is_admin: formdata?.type === "Superadmin",
      is_staff: formdata?.type === "Staff",
      is_coach: formdata?.type === "Coach",
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
