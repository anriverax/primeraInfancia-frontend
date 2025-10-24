"use client";

import { Children } from "react";
import { AnimatePresence, Transition, Variant, motion, MotionProps } from "framer-motion";

export type TransitionPanelProps = {
  children: React.ReactNode | React.ReactNode[];
  transition?: Transition;
  activeIndex?: number;
  variants?: { enter: Variant; center: Variant; exit: Variant };
} & MotionProps;

export function TransitionPanel({
  children,
  transition,
  variants,
  activeIndex = 0
}: TransitionPanelProps): React.JSX.Element {
  const panels = Children.toArray(children);

  return (
    <div className="relative">
      <AnimatePresence initial={false}>
        <motion.div
          key={activeIndex}
          variants={variants}
          transition={transition}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {panels[activeIndex] ?? null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
