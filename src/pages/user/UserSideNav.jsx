import React from "react";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import { getUserFromLS } from "../../features/user/userSlice";

export default function UserSideNav() {
  const user = getUserFromLS();
  return (
    <div>
      <div className="tw-flex tw-items-center tw-border-b tw-border-b-gray-200 tw-py-4">
        <Link
          to=""
          className="tw-h-12 tw-w-12 tw-flex-shrink-0 tw-overflow-hidden tw-rounded-full tw-border tw-border-black/10"
        >
          <img src="" alt="" className="tw-h-full tw-w-full tw-object-cover" />
        </Link>
        <div className="tw-flex-grow tw-pl-4">
          <div className="tw-mb-1 tw-truncate tw-font-semibold tw-text-gray-600">
            {user?.email}
          </div>
          <Link
            to=""
            className="tw-flex tw-items-center tw-capitalize tw-text-gray-500"
          >
            <svg
              width={12}
              height={12}
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: 4 }}
            >
              <path
                d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                fill="#9B9B9B"
                fillRule="evenodd"
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className="tw-mt-7">
        <NavLink
          to="/user/my-profile"
          className={({ isActive }) =>
            classNames(
              "tw-flex tw-items-center tw-capitalize tw-transition-colors",
              {
                " tw-text-orange-500": isActive,
                " tw-text-gray-600": !isActive,
              }
            )
          }
        >
          <div className="tw-mr-3 tw-h-[22px] tw-w-[22px]">
            <img
              src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
              alt=""
              className="tw-h-full tw-w-full"
            />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to="/user/change-my-password"
          className={({ isActive }) =>
            classNames(
              "tw-mt-4 tw-flex tw-items-center tw-capitalize tw-transition-colors",
              {
                " tw-text-orange-500": isActive,
                " tw-text-gray-600": !isActive,
              }
            )
          }
        >
          <div className="tw-mr-3 tw-h-[22px] tw-w-[22px]">
            <img
              src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
              alt=""
              className="tw-h-full tw-w-full"
            />
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to="/user/myorders"
          className={({ isActive }) =>
            classNames(
              "tw-mt-4 tw-flex tw-items-center tw-capitalize tw-transition-colors",
              {
                " tw-text-orange-500": isActive,
                " tw-text-gray-600": !isActive,
              }
            )
          }
        >
          <div className="tw-mr-3 tw-h-[22px] tw-w-[22px]">
            <img
              src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
              alt=""
              className="tw-h-full tw-w-full"
            />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  );
}
