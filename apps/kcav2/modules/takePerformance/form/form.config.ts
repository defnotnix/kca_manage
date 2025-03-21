import _ from "moment";

export const formProps: any = {
  initial: {
    batting_grip: "A",
    stance: "A",
    batlift: "A",
    weight_transfer: "A",
    judgement: "A",
    shot_selection: "A",
    execution: "A",
    bowling_grip: "A",
    runup: "A",
    loading: "A",
    jump: "A",
    landing: "A",
    release: "A",
    accuracy: "A",
    swing: "A",
    turn: "A",
    variation: "A",
    ground_fielding: "A",
    technique: "A",
    collection: "A",
    throwing: "A",
    catching_technique: "A",
    ball_judgement: "A",
    throwing_technique: "A",
    strength: "A",
    mental: "A",
    physical: "A",
    team_player: "A",
    discipline: "A",
    learning: "A",
    overall_performance: "A",
    coach_remarks: "",
  },
  // > STEPS
  steps: ["Select Player", "Student Performance"],
  stepType: "general",
  stepClickable: false,
  initialStep: 0,

  // > VALIDATION
  validation: [],

  // > SUBMIT
  transformDataOnSubmit: (formdata: any) => {
    return formdata;
  },
  submitFormData: false,

  // > API

  submitProps: {
    keyIgnore: [],
    valueIgnore: [],
    stringify: false,
  },
};
