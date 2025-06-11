/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface AnimatedContainerProps {
  isOpen: boolean;
  children: ReactNode;
  duration?: number;
  delay?: number;
  initialScale?: number;
  exitScale?: number;
  initialOpacity?: number;
  exitOpacity?: number;
  animation?: "fade" | "scale" | "slide" | "drop";
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

const variantsMap: Record<string, (props: AnimatedContainerProps) => Variants> =
  {
    fade: ({ initialOpacity = 0, exitOpacity = 0 }) => ({
      hidden: { opacity: initialOpacity },
      visible: { opacity: 1 },
      exit: { opacity: exitOpacity },
    }),
    scale: ({
      initialScale = 0.95,
      exitScale = 0.95,
      initialOpacity = 0,
      exitOpacity = 0,
    }) => ({
      hidden: { scale: initialScale, opacity: initialOpacity },
      visible: { scale: 1, opacity: 1 },
      exit: { scale: exitScale, opacity: exitOpacity },
    }),
    slide: ({ direction = "up", initialOpacity = 0, exitOpacity = 0 }) => {
      const from = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 },
      }[direction];
      return {
        hidden: { ...from, opacity: initialOpacity },
        visible: { x: 0, y: 0, opacity: 1 },
        exit: { ...from, opacity: exitOpacity },
      };
    },
    drop: ({ initialOpacity = 0, exitOpacity = 0 }) => ({
      hidden: { y: -50, opacity: initialOpacity },
      visible: { y: 0, opacity: 1 },
      exit: { y: -50, opacity: exitOpacity },
    }),
  };

export const AnimatedContainer = ({
  isOpen,
  children,
  duration = 0.3,
  delay = 0,
  animation = "scale",
  className,
  ...props
}: AnimatedContainerProps) => {
  // TODO remove this
  // @ts-ignore
  const variants = variantsMap[animation](props);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={className}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration, delay }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
