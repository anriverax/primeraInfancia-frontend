"use client";

import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps): React.JSX.Element => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      const percentage = (currentStep / (steps.length - 1)) * 100;
      animate(lineRef.current, { width: `${percentage}%` }, { duration: 0.5 });
    }
  }, [currentStep, steps.length]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  index <= currentStep
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-neutral-200 text-neutral-500"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 bg-neutral-200 rounded-full relative">
                  <div
                    className="h-full bg-primary-500 rounded-full"
                    style={{
                      width: index < currentStep ? "100%" : index === currentStep ? "50%" : "0%"
                    }}
                  />
                </div>
              )}
            </div>
            <p
              className={`text-xs mt-2 text-center font-medium transition-colors duration-300 ${
                index <= currentStep ? "text-primary-600" : "text-neutral-500"
              }`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
