"use client";

import { motion } from "motion/react";

const AiChatBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" w-[400px]  border-l p-4 shrink-0"
    >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, dolor
      voluptatum? Reprehenderit quidem unde hic, quae praesentium accusamus
      delectus sed fuga impedit cumque accusantium beatae harum nobis eos.
      Accusamus, dicta.
    </motion.div>
  );
};

export default AiChatBox;
