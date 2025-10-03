"use client";

import { Dispatch, memo, SetStateAction, useCallback, useEffect } from "react";

type DotsProps = {
  setActiveSlide: Dispatch<SetStateAction<number>>;
  activeSlide: number;
};

const Dots = memo(({ setActiveSlide, activeSlide }: DotsProps): React.JSX.Element => {
  const handleSlideChange = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 3000); // it changes every 3 seconds

    return (): void => clearInterval(interval); // Interval cleaning
  }, []);

  return (
    <div className="flex justify-center space-x-2">
      {[0, 1, 2].map((index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full ${activeSlide === index ? "bg-white" : "bg-blue-300"}`}
          aria-label={`Slide ${index + 1}`}
          onClick={() => handleSlideChange(index)}
        />
      ))}
    </div>
  );
});

Dots.displayName = "MemorizedDots";

export { Dots };
