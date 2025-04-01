"use client";
import _ from "moment";

export const formPropsAchievement: any = {
  // initial: {},
  initial: {
    assigned_team: "T101",
    contact: "9813511101",
    decided_by: "Ram Kumar Shah",
    decided_date: "2025-03-05",
    decided_rate: 2500,
    doe: "2025-03-14",
    email: "a@a.com",
    emergency_contact: "9813511101",
    equipment_required: "Balls",
    fav_player: "P101",
    gender: "F",

    jersey: "XS",
    level_exp: "Newcomer",
    member_id: "M11101",
    membership: "Yes",
    name: "Shivata Love",
    package: "Silver",
    packages: "2",
    parent_name: "adfsasdf",
    permanent_address: "Kamalaidi ,asdfadsfasdfa",
    previous_academy: "KCC",
    primary_contact: "9813511101",
    reason: "General Discount",
    relation: "Father",
    remarks: "asdfasfasdf",
    secondary_contact: "9851147487",
    session: "1",
    time_for_training: "Day",
    training_schedule: "Afternoon",
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
      package: Number(formdata?.package),
      session: Number(formdata?.session),
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
