"use client";

import _ from "moment";

export const formProps: any = {
  initial: {
    type: "Staff",
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
      ...(formdata.image instanceof File ? { image: formdata.image } : {}),
      is_admin: formdata.type == "Superadmin",
      is_coach: formdata.type == "Coach",
      is_staff: formdata.type == "Staff",
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
