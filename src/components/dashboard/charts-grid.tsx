// "use client";
// import { containerVariants } from "@/constants/variants";
// import ChartCard from "./chart-card";
// import { cn } from "@/lib/utils";
// import { useAiChatBoxStore } from "@/store/useAiChatBoxStore";
// import { useSideBarStore } from "@/store/useSidebarStore";

// import { motion } from "motion/react";

// const ChartsGrid = () => {
//   const { isExpanded } = useSideBarStore();
//   const { isOpen } = useAiChatBoxStore();

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="show"
//       layout
//       // [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]
//       className={cn(
//         "p-4 grid gap-4 ",
//         isExpanded || isOpen
//           ? isExpanded && isOpen
//             ? "grid-cols-2"
//             : "grid-cols-3"
//           : "grid-cols-4"
//       )}
//     >
//       {Array.from({ length: 21 }).map((_, i) => (
//         <ChartCard key={i} />
//       ))}
//     </motion.div>
//   );
// };

// export default ChartsGrid;

"use client";

import { containerVariants } from "@/constants/variants";
import ChartCard from "./chart-card";
import { motion } from "motion/react";

const ChartsGrid = () => {
  return (
    <div className="p-4 @container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        layout
        className="grid gap-4 grid-cols-1 @[550px]:grid-cols-2 @[800px]:grid-cols-3 @[1200px]:grid-cols-4 "
      >
        <ChartCard />
        <ChartCard />
        <ChartCard />
        {/* {Array.from({ length: 21 }).map((_, i) => (
        ))} */}
      </motion.div>
    </div>
  );
};

export default ChartsGrid;
