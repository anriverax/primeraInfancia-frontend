"use client";

import { AnimatePresence, Transition, Variant, motion, MotionProps } from "framer-motion";

export type TransitionPanelProps = {
  children: React.ReactNode[];
  transition?: Transition;
  activeIndex: number;
  variants?: { enter: Variant; center: Variant; exit: Variant };
} & MotionProps;

export function TransitionPanel({
  children,
  transition,
  variants,
  activeIndex
}: TransitionPanelProps): React.JSX.Element {
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
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
