"use client";

import NewFrameworkCard from "./new-framework-card";

const MyFrameworksList = ({ frameworks }: any) => {
  return (
    <>
      {frameworks ? (
        <>
          {" "}
          <div className="flex items-center justify-between border-b my-6 pb-6">
            <div className="space-y-1">
              <h1 className="font-medium text-xl">Installed Frameworks</h1>
              <p className="text-sm text-gray-500">
                Content for these frameworks has already been imported and
                setup.
              </p>
            </div>
            {/* <Link href={"/frameworks/new"} className={cn(buttonVariants())}>
      <PlusIcon size={20} />
      Add Framework
    </Link> */}
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {frameworks?.frameworks?.map((framework: any) => (
              <NewFrameworkCard
                added
                framework={framework}
                key={framework?._id}
              />
            ))}
          </div>
        </>
      ) : (
        <> </>
      )}
    </>
  );
};

export default MyFrameworksList;
