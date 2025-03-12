import FrameworkCard from "./framework-card";
// import FrameworkInfoModal from "./modals/framework-info-modal";

const FrameworksGrid = () => {
  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <FrameworkCard key={i} />
        ))}
      </div>
    </>
  );
};

export default FrameworksGrid;
