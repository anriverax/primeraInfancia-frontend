import { FormikErrors, FormikTouched } from "formik";
import { useState } from "react";
import { Appendix3Input, DimensionPlan } from "../appendix3Type";
import { makeBlankDimension } from "../appendix3Data";

type UseAppendix3FuncProps = {
  setTouched: (
    touched: FormikTouched<Appendix3Input>,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<Appendix3Input>>;
  validateForm: (values?: any) => Promise<FormikErrors<Appendix3Input>>;
  touched: FormikTouched<Appendix3Input>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<Appendix3Input>>;
  data: [DimensionPlan, ...DimensionPlan[]];
};

const useAppendix3Func = ({
  setTouched,
  validateForm,
  touched,
  setFieldValue,
  data
}: UseAppendix3FuncProps): {
  addNewTask: () => void;
  newTask: number[];
  addNewDimension: () => Promise<void>;
  currentIndex: number;
} => {
  const [newTask, setNewTask] = useState<number[]>([0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const addNewTask = (): void => {
    setNewTask((prev) => {
      if (prev.length < 3) {
        const nextIndex = prev.length;
        return [...prev, nextIndex];
      }
      return prev;
    });
  };

  const addNewDimension = async (): Promise<void> => {
    const errs = await validateForm();
    const dimErrors = (errs as any)?.dimensions?.[currentIndex];

    if (dimErrors && Object.keys(dimErrors).length > 0) {
      const touchedActivities = newTask.map(() => ({
        activity: true,
        resource: true,
        timing: true,
        successIndicator: true
      }));

      const dimsTouched: any[] = [];
      dimsTouched[currentIndex] = {
        goal: true,
        levelOfAchievement: true,
        dimension: true,
        subDimension: true,
        activities: touchedActivities
      };

      setTouched(
        {
          ...(touched as any),
          dimensions: dimsTouched
        } as any,
        true
      );
      return;
    }

    const next = [...data, makeBlankDimension()];
    await setFieldValue("dimensions", next);
    setCurrentIndex(next.length - 1);
  };

  return { addNewTask, newTask, addNewDimension, currentIndex };
};

export { useAppendix3Func };
