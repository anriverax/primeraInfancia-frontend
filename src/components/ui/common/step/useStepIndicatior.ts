import { useState, useCallback, SetStateAction, Dispatch } from "react";

const useStepIndicatior = (
  steps: string[]
): {
  handleNext: () => void;
  handlePrev: () => void;
  currentStep: number;
  steps: string[];
  setCurrentStep: Dispatch<SetStateAction<number>>;
} => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = useCallback((): void => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  }, [steps.length]);

  const handlePrev = useCallback((): void => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  return {
    handleNext,
    handlePrev,
    currentStep,
    steps,
    setCurrentStep
  };
};

export { useStepIndicatior };
