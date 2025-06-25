import { useState } from "react";
import { Clipboard } from "lucide-react";
import { AnimationView, Circles, Dots, Greeting, Title } from './partials';
import { TransitionPanel } from '@/shared/ui/motionPrimitive/TransitionPanel';
import { IAnimationViewResponse } from '../../type';

const IllustratedAuthPortal = (): React.JSX.Element => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <div className="bg-blue-500 text-white p-8 rounded-tl-lg rounded-bl-lg hidden md:flex md:items-center">
      <div>
        <Title />
        <div className="flex items-center justify-center my-12">
          <div className="relative">
            <div className="w-48 h-56 bg-white shadow-lg rounded-lg overflow-hidden transform rotate-3 z-10 relative">
              {/** component */}

              <TransitionPanel
                activeIndex={activeSlide}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                variants={{
                  enter: { opacity: 0, y: 50, filter: "blur(4px)" },
                  center: { opacity: 1, y: 0, filter: "blur(0px)" },
                  exit: { opacity: 0, y: -50, filter: "blur(4px)" }
                }}
              >
                {AnimationView.map(({ id, Component }: IAnimationViewResponse) => (
                  <div key={id} className="absolute top-6 left-6 right-6 bottom-6">
                    <Component />
                  </div>
                ))}
              </TransitionPanel>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-400 rounded-full flex items-center justify-center w-10 h-10">
              <Clipboard size={20} className="text-white" />
            </div>
            <Circles />
          </div>
        </div>
        <Greeting />
        <Dots setActiveSlide={setActiveSlide} activeSlide={activeSlide} />
      </div>
    </div>
  );
};

export default IllustratedAuthPortal;
