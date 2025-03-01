const SystemLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-lg font-semibold">System Information</h1>
      <hr />
      {children}
    </div>
  );
};

export default SystemLayout;
