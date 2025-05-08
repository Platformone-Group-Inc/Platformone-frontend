/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";

import { InfoCircle } from "iconsax-react";
import { useState } from "react";
import FrameworkInfoModal from "./modals/framework-info-modal";
import ImportFrameworkModal from "./modals/import-framework-modal";

import AddedFrameworkBadge from "./added-framework-badge";

// TODO: add framework props
interface Props {
  added?: boolean;
  framework?: any
}
const NewFrameworkCard: React.FC<Props> = ({ added,framework }) => {
  const [openInfoModal, setOpenInfoModal] = useState(false);
  return (
    <>
      <div className="w-full border rounded-xl p-5">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-1.5">
            {/* TODO */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvJSRyd-WENuShraJJsJ22fdVvoKTztuuZ4A&s"
              alt=""
              className="size-10 rounded-lg"
            />

            <p className="font-semibold text-sm">
              {/* Fedramp (Rev5) Moderate Baseline */}
              {framework?.name}
            </p>
          </div>

          <Button
            variant={"transparent"}
            size={"icon"}
            onClick={() => setOpenInfoModal(true)}
          >
            <InfoCircle size={20} className="stroke-secondary-400" />
          </Button>
        </div>
        <p className="text-xs text-gray-700 py-6 w-full">
          {/* 330 requirements in 13 families to be implemented */}
          {framework?.description}
        </p>
        <hr className="mb-4" />
        {/* TODO add framework props */}
        {added ? <AddedFrameworkBadge /> : <ImportFrameworkModal />}
      </div>
      <FrameworkInfoModal
        open={openInfoModal}
        onOpenChange={() => setOpenInfoModal(false)}
      />
    </>
  );
};

export default NewFrameworkCard;
