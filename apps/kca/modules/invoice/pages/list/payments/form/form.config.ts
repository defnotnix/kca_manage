import _ from "moment";

export const formProps: any = {
  initial: {
    user: "73be03eb30484c6783826683d1fa0f57",
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
    const calculateAmount = () => {
      let _sum: number = 0;

      formdata?.invoice_details?.forEach((item: any) => {
        _sum += item.quantity * item.price;
      });

      return _sum;
    };

    const amount = calculateAmount();
    const taxable_amount =
      (calculateAmount() * formdata?.taxable_percent) / 100;

    return {
      ...formdata,
      amount: amount,
      taxable_amount: taxable_amount,
      total_amount: amount + taxable_amount - Number(formdata?.discount),
      paid_amount: 0,
    };
  },

  // > API

  submitProps: {
    keyIgnore: [],
    valueIgnore: [],
    stringify: false,
  },
};
