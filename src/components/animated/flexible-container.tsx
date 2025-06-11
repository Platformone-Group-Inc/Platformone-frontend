"use client";

import useMeasure from "react-use-measure";
import { motion, MotionProps } from "motion/react";

interface Props extends MotionProps {
  test?: boolean;
  children?: React.ReactNode;
}

const FlexibleContainer: React.FC<Props> = ({ children, ...props }) => {
  const [ref, { height }] = useMeasure();

  if (!children) return null;
  return (
    <motion.div
      {...props}
      animate={{
        height,
      }}
    >
      <div className="mb-3" ref={ref}>
        {children}
      </div>
    </motion.div>
  );
};

export default FlexibleContainer;
