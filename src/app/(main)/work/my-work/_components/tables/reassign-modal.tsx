"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectUserTable from "./select-user-table";
import { useEffect, useState } from "react";
import { TickCircle } from "iconsax-react";

const ReAssignModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // Show the success modal only after a user is selected
  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        setIsOpen(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>Reassign User</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reassign User</DialogTitle>
          </DialogHeader>
          <SelectUserTable
            onClose={() => setIsOpen(false)}
            onSelectUser={(user) => {
              console.log(user);
              setIsOpen(false);
              setShowSuccessModal(true);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="aspect-video flex items-center justify-center">
          <DialogHeader className="flex flex-col items-center gap-4">
            <span className="bg-success-700/20 aspect-square p-4 rounded-full">
              <TickCircle className="stroke-success-800 size-8" />
            </span>
            <DialogTitle className="text-center text-xl">
              User Reassigned!
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReAssignModal;
