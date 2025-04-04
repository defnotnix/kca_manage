
"use client";

import _ from "moment";
import { jwtDecode } from "jwt-decode";

export const formProps: any = {
  initial: {
    bill_student: true,
    invoice_items: [],
    d: new Date(),
    taxable_percent: 13,
    is_student: false,
    advance: 0,
    discount: 0,
    status_choice: "1",
    bill_date: _(new Date()).format("YYYY-MM-DD"),
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
    console.log(formdata);

    try {
      const sessionData: any = sessionStorage.getItem("kcatoken");
      const _decoded: any = jwtDecode(sessionData);
      const _userId = _decoded?.user_id;

      const calculateAmount = () => {
        return formdata?.invoice_items?.reduce(
          (sum: any, item: any) =>
            sum + (item.price || 0) * (item.quantity || 0),
          0
        );
      };

      const amount = calculateAmount();
      const taxable_amount =
        (calculateAmount() * formdata?.taxable_percent) / 100;

      const total =
        amount +
        taxable_amount -
        Number(formdata?.discount) -
        Number(formdata?.advance);

      return {
        ...formdata,
        amount: amount,
        taxable_amount: taxable_amount,
        total_amount: total,
        paid_amount: formdata?.advance,
        remaining_payment: total - formdata?.advance,
        user_id: _userId,
        status:
          formdata?.advance == total ? "1" : formdata?.advance ? "2" : "3",
        is_custom: false,
        new_decided_rate: formdata?.decided_rate,
        new_service_rate: formdata?.service_rate,
        renew_data: formdata?.new_renew_date,
        expiry_data: formdata?.new_expiry_date,
      };
    } catch (err) {
      const _userId = "";
      return formdata;
    }
  },
  submitFormData: false,

  // > API

  submitProps: {
    keyIgnore: [],
    valueIgnore: [],
    stringify: false,
  },
};
