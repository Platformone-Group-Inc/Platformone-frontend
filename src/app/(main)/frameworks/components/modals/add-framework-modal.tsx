"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

const AddFrameworkModal = ({ title }: { title: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-auto gap-1.5 py-2.5 px-5">
          <PlusIcon className="text-xl" />
          <span className="font-medium">Add {title}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <div className="overflow-y-auto">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6">Add Framework</DialogTitle>
            <DialogDescription asChild>
              <div className="p-6">
                <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-secondary">
                  <div className="space-y-1">
                    <p>
                      <strong>Lorem, ipsum dolor.</strong>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti eius aperiam ab. In minus iusto, praesentium
                      vitae nemo architecto animi, eaque explicabo officia
                      quisquam alias eligendi quas necessitatibus asperiores
                      nesciunt.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Lorem, ipsum dolor.</strong>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti eius aperiam ab. In minus iusto, praesentium
                      vitae nemo architecto animi, eaque explicabo officia
                      quisquam alias eligendi quas necessitatibus asperiores
                      nesciunt.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Lorem, ipsum dolor.</strong>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti eius aperiam ab. In minus iusto, praesentium
                      vitae nemo architecto animi, eaque explicabo officia
                      quisquam alias eligendi quas necessitatibus asperiores
                      nesciunt.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Lorem, ipsum dolor.</strong>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti eius aperiam ab. In minus iusto, praesentium
                      vitae nemo architecto animi, eaque explicabo officia
                      quisquam alias eligendi quas necessitatibus asperiores
                      nesciunt.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Lorem, ipsum dolor.</strong>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti eius aperiam ab. In minus iusto, praesentium
                      vitae nemo architecto animi, eaque explicabo officia
                      quisquam alias eligendi quas necessitatibus asperiores
                      nesciunt.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Lorem, ipsum dolor.</strong>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti eius aperiam ab. In minus iusto, praesentium
                      vitae nemo architecto animi, eaque explicabo officia
                      quisquam alias eligendi quas necessitatibus asperiores
                      nesciunt.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Lorem, ipsum dolor.</strong>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti eius aperiam ab. In minus iusto, praesentium
                      vitae nemo architecto animi, eaque explicabo officia
                      quisquam alias eligendi quas necessitatibus asperiores
                      nesciunt.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Lorem, ipsum dolor.</strong>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti eius aperiam ab. In minus iusto, praesentium
                      vitae nemo architecto animi, eaque explicabo officia
                      quisquam alias eligendi quas necessitatibus asperiores
                      nesciunt.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Lorem, ipsum dolor.</strong>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti eius aperiam ab. In minus iusto, praesentium
                      vitae nemo architecto animi, eaque explicabo officia
                      quisquam alias eligendi quas necessitatibus asperiores
                      nesciunt.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Lorem, ipsum dolor.</strong>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti eius aperiam ab. In minus iusto, praesentium
                      vitae nemo architecto animi, eaque explicabo officia
                      quisquam alias eligendi quas necessitatibus asperiores
                      nesciunt.
                    </p>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="px-6 pb-6 sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button">Okay</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFrameworkModal;
