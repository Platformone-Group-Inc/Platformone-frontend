import Header from "@/components/dashboard/header";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;
