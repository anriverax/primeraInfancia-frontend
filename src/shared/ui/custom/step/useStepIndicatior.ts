import { useState } from "react";

const useStepIndicatior = (
  steps: string[]
): { handleNext: () => void; handlePrev: () => void; currentStep: number; steps: string[] } => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = (): void => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    handleNext,
    handlePrev,
    currentStep,
    steps
  };
};

export { useStepIndicatior };
