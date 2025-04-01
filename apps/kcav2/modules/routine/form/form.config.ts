import _ from "moment";
import z from "zod";

export const formProps: any = {
  initial: {
    daterange: [],
    allow_custom_dates: false,
  },

  // > STEPS
  // steps: [
  //   "Personal Details",
  //   "Guardian Details",
  //   "Enroll Details",
  //   "Extra Details",
  // ],
  // stepType: "general",
  // stepClickable: false,
  // initialStep: 0,

  // > VALIDATION
  validation: [
    {
      session: z.string().nonempty(),
      daterange: z.array(
        z.object({
          date: z.string().datetime().nonempty(),
          time: z.array(z.string()).nonempty(),
          ground: z.array(z.string()).nonempty(),
        })
      ),
    },
  ],

  // > SUBMIT
  transformDataOnSubmit: (formdata: any) => {
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
  submitFormData: false,

  // > API

  submitProps: {
    keyIgnore: [],
    valueIgnore: [],
    stringify: false,
  },
};
