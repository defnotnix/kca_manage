"use client";


import _ from "moment";

export const formProps: any = {
  initial: {
    addons: [],
    session: [],
  },

  // initial: {
  //   addons: ["1", "8", "11"],
  //   name: "Magic Mike",
  //   member_id: "m10123",
  //   gender: "1",
  //   package: "1",
  //   session: ["1"],
  //   permanent_address: "Kupondole, Kathmandu",
  //   contact: "9813511101",
  //   parent_name: "GRM",
  //   relation: "Father",
  //   primary_contact: "9813511101",
  //   secondary_contact: "9813511101",
  //   email: "a@a.com",
  //   emergency_contact: "9813511101",
  //   doe: "2025-03-06",
  //   assigned_team: "",
  //   training_schedule: "Morning",
  //   decided_by: "Ram Kumar",
  //   decided_rate: 4500,
  //   decided_date: "2025-03-29",
  //   reason: "GD",
  //   remarks: "XYZ",
  //   fav_player: "P101",
  //   fav_team: "T101",
  //   level_exp: "1",
  //   time_for_training: "1",
  //   previous_academy: "KCAv2",
  // },

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

    console.log(formdata);

    return {
      ...res,
      ...(formdata.image instanceof File ? { image: formdata.image } : {}),
      // * FIXINGS
      date_of_enroll: _(formdata?.doe).format("YYYY-MM-DD"),
      expiry_date: _(formdata?.dob).format("YYYY-MM-DD"),
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
