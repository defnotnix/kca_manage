"use client";

import React, { useCallback, useEffect, useState } from "react";

//context
import {
  FormProvider,
  useFormContext,
  useForm,
  PropContext,
  usePropContext,
} from "./FormHandler.context";
//validation
import { z } from "zod";
import { zodResolver } from "@mantine/form";
//type
import { PropFormHandler } from "./FormHandler.type";
import { useMutation } from "@tanstack/react-query";
import { triggerNotification } from "@vframework/ui";
import { toFormData } from "@vframework/core";

export function FormHandler({
  // * form
  initial,
  formType = "new",
  // * steps
  steps,
  stepType = "general",
  stepClickable = false,
  initialStep = 0,
  // * validatino
  validation,
  // * submitProps
  transformDataOnSubmit = (formdata) => formdata,
  submitFormData,
  // * APIs
  apiSubmit = () => {},
  submitProps = {},
  // * Handlers
  onSubmitSuccess = () => {},
  onSubmitError = () => {},
  onSubmitInitiate = () => {},
  // *
  children,
}: PropFormHandler) {
  // * DEFINITIONS

  const [current, setCurrent] = useState(0);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: initial,
    validate:
      validation.length > 0
        ? zodResolver(z.object(validation[current]))
        : undefined,
  });

  // * CONTEXT

  // * STATES

  // * PRELOADS

  // * FUNCTIONS

  // > VALIDATION

  const checkValidity = async () => {
    const hasErrors = form.validate().hasErrors;

    return {
      err: hasErrors,
      errObj: hasErrors ? form.errors : null,
    };
  };

  function findNextStep(current: any) {
    if (form?.getValues()?.tabs_enabler?.includes(String(current + 1))) {
      return current + 1;
    } else {
      if (steps && current >= steps?.length) {
        return 99;
      } else {
        return findNextStep(current + 1);
      }
    }
  }

  function findBackStep(current: any) {
    if (form?.getValues()?.tabs_enabler?.includes(String(current - 1))) {
      return current - 1;
    } else {
      if (steps && current == 1) {
        return 0;
      } else {
        return findBackStep(current - 1);
      }
    }
  }

  // > STEPS

  const handleStepNext = useCallback(async () => {
    const hasErrors = await checkValidity();

    if (hasErrors.err) {
      triggerNotification.form.isValidationStepError({});
    } else {
      if (form?.getValues()?.tabs_enabler) {
        setCurrent(findNextStep(current));
      } else {
        setCurrent(current + 1);
      }
    }
  }, [current, form]);

  const handleStepBack = useCallback(() => {
    setCurrent(current - 1);

    if (form?.getValues()?.tabs_enabler) {
      setCurrent(findBackStep(current));
    } else {
      setCurrent(current - 1);
    }
  }, [current, form]);

  // > SUBMITS

  async function mutationSubmiFunction() {
    triggerNotification.form.isLoading({});
    // PROCESSING DATA
    const _dataToProcess = transformDataOnSubmit(form.getValues());
    const _dataToSend = submitFormData
      ? await toFormData({
          values: _dataToProcess,
          ...submitProps,
          hasDirtCheck: form.getValues()._dirtcheck !== null,
        })
      : _dataToProcess;
    // TEST
    console.log(_dataToSend);
    // SUBMIT
    return apiSubmit(_dataToSend, form.getValues()?.id);
  }

  const mutationSubmit = useMutation({
    mutationFn: mutationSubmiFunction,
    // SUCCESS HANDLER
    onSuccess: (res: any) => {
      console.log("success");
      if (formType == "new") {
        form.reset();
      }
      triggerNotification.form.isSuccess({});
      // initialization

      setCurrent(0);
      // handleSubmit
      if (onSubmitSuccess) {
        onSubmitSuccess(formType == "edit" ? form.getValues() : res);
      }
    },
    // ERROR HANDLER
    onError: (err: any) => {
      let errObject = err.object?.response?.data;

      console.log(err, errObject);

      if (onSubmitError) {
        onSubmitError(formType == "edit" ? form.getValues() : err);
      }

      switch (errObject.type) {
        case "Validation Error":
          form.setErrors(errObject);
          triggerNotification.form.isError({
            title: "Whoops! Hold on a Moment 🖐️",
            message:
              "It seems some fields are missing or incorrect. Please review and resubmit.",
          });
          break;
        case "Error":
          console.log(errObject);
          if (errObject?._message) {
            triggerNotification.form.isError({
              title: "Whoops! Hold on a Moment 🖐️",
              message:
                errObject?._message ||
                "It seems some fields are missing or incorrect. Please review and resubmit.",
            });
          } else {
            form.setErrors(errObject);
            triggerNotification.form.isError({
              title: "Whoops! Hold on a Moment 🖐️",
              message:
                "It seems some fields are missing or incorrect. Please review and resubmit.",
            });
          }
          break;
        default:
          triggerNotification.form.isError({});
      }
    },
  });

  const handleSubmit = () => {
    console.log("submit");

    if (form.validate()) {
      onSubmitInitiate();
      mutationSubmit.mutate();
    }
  };

  // * COMPONENTS

  return (
    <FormProvider form={form}>
      <PropContext.Provider
        value={{
          current,
          handleSubmit,
          steps,
          stepClickable,
          initialStep,
          handleStepBack,
          handleStepNext,
        }}
      >
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
          {children}
        </form>
      </PropContext.Provider>
    </FormProvider>
  );
}

FormHandler.useForm = useFormContext;
FormHandler.usePropContext = usePropContext;
