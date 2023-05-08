import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useGetUserOrdersQuery } from "../../features/user/userSlice";
import { Link, createSearchParams, useParams } from "react-router-dom";
import classNames from "classnames";

export default function Myorder() {
  const { data } = useGetUserOrdersQuery();
  const { status } = useParams();

  console.log(data);
  const purchaseTabs = [
    { status: "all", name: "Tất cả" },
    { status: "xacnhan", name: "Chờ xác nhận" },
    { status: "lay", name: "Chờ lấy hàng" },
    { status: "giao", name: "Đang giao" },
    { status: "dagiao", name: "Đã giao" },
    { status: "huy", name: "Đã hủy" },
  ];

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: "",
        search: createSearchParams({
          status: String(tab.status),
        }).toString(),
      }}
      className={classNames(
        "tw-flex tw-flex-1 tw-items-center tw-justify-center tw-border-b-2 tw-bg-white tw-py-4 tw-text-center",
        {
          "tw-border-b-orange-500 tw-text-orange-500": status === tab.status,
          "tw-border-b-black/10 tw-text-gray-900": status !== tab.status,
        }
      )}
    >
      {tab.name}
    </Link>
  ));

  return (
    <>
      <BreadCrumb title="My order" />
      <div className="tw-overflow-x-auto">
        <div className="tw-min-w-[700px]">
          <div className="tw-sticky tw-top-0 tw-flex tw-rounded-t-sm tw-shadow-sm">
            {purchaseTabsLink}
          </div>
          <div>
            {data &&
              data.map((item) => {
                return item?.orderItems.map((purchase) => (
                  <div
                    key={purchase._id}
                    className="tw-mt-4 tw-rounded-sm tw-border-black/10 tw-bg-white p-6 tw-text-gray-800 tw-shadow-sm"
                  >
                    <Link to="/" className="tw-flex">
                      <div className="tw-flex-shrink-0">
                        <img
                          className="tw-h-20 tw-w-20 tw-object-cover"
                          src={purchase?.product?.images[0]?.url}
                          alt={""}
                        />
                      </div>
                      <div className="tw-ml-3 tw-flex-grow tw-overflow-hidden">
                        <div className="tw-truncate">
                          {purchase?.product?.title}
                        </div>
                        <div className="tw-mt-3">x{purchase.quantity}</div>
                      </div>
                      <div className="tw-ml-3 tw-flex-shrink-0">
                        <span className="tw-truncate tw-text-gray-500 tw-line-through">
                          ₫{purchase.price}
                        </span>
                        <span className="tw-ml-2 tw-truncate tw-text-orange">
                          ₫{purchase.price}
                        </span>
                      </div>
                    </Link>
                    <div className="tw-flex tw-justify-end">
                      <div>
                        <span>Tổng giá tiền</span>
                        <span className="tw-ml-4 tw-text-xl tw-text-orange-500">
                          ₫{item.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ));
              })}
          </div>
        </div>
      </div>
    </>
  );
}
