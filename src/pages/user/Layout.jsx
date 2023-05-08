import React from "react";
import UserSideNav from "./UserSideNav";
import { Outlet } from "react-router-dom";

export default function LayoutUser() {
  return (
    <div className=" tw-bg-neutral-100 tw-py-16 tw-text-sm tw-text-gray-600">
      <div className="container tw-w-[1200px] tw-m-atuo">
        <div className="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-12">
          <div className="md:tw-col-span-3 lg:tw-col-span-2">
            <UserSideNav />
          </div>
          <div className="md:tw-col-span-9 lg:tw-col-span-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
