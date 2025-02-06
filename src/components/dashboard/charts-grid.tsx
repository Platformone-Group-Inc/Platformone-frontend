import ChartCard from "./chart-card";

const ChartsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {Array.from({ length: 21 }).map((_, i) => (
        <ChartCard key={i} />
      ))}
    </div>
  );
};

export default ChartsGrid;
