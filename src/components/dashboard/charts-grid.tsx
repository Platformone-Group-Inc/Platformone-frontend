import ChartCard from "./chart-card";

const ChartsGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <ChartCard key={i} />
      ))}
    </div>
  );
};

export default ChartsGrid;
