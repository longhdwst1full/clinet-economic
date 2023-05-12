import React from "react";

export default function SortProductTop({ setGrid }) {
  return (
    <div className="d-flex justify-content-between align-items-center tw-bg-gray-300/40 tw-py-4 tw-px-3">
      <div className="">
        <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2">
          <div className="tw-flex tw-items-center tw-flex-wrap tw-gap-2">
            <div>Sắp xếp theo</div>
            <button className="btn tw-h-8 tw-px-4 tw-capitalize tw-bg-orange-500 tw-text-white tw-text-sm hover:tw-bg-orange-300/80 tw-text-center">
              Phổ biến
            </button>
            <button className="btn tw-h-8 tw-px-4 tw-capitalize tw-bg-white tw-text-black tw-text-sm hover:tw-bg-slate-100 tw-text-center">
              Mới nhất
            </button>
            <button className="btn tw-h-8 tw-px-4 tw-capitalize tw-bg-white tw-text-black tw-text-sm hover:tw-bg-slate-100 tw-text-center">
              Bán chạy
            </button>
            <select
              className="btn tw-h-8 tw-px-4 tw-capitalize tw-bg-white tw-text-black tw-text-sm hover:tw-bg-slate-100 tw-text-left tw-outline-none"
              value=""
            >
              <option value="" disabled>
                Giá
              </option>
              <option value="price:asc">Giá: Thấp đến cao</option>
              <option value="price:desc">Giá: Cao đến thấp</option>
            </select>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-10">
        {/* <p className="totalproducts mb-0">21 Products</p> */}
        <div className="d-flex gap-10 align-items-center grid">
          <img
            onClick={() => {
              setGrid(3);
            }}
            src="images/gr4.svg"
            className="d-block img-fluid"
            alt="grid"
          />
          <img
            onClick={() => {
              setGrid(4);
            }}
            src="images/gr3.svg"
            className="d-block img-fluid"
            alt="grid"
          />
          <img
            onClick={() => {
              setGrid(6);
            }}
            src="images/gr2.svg"
            className="d-block img-fluid"
            alt="grid"
          />

          <img
            onClick={() => {
              setGrid(12);
            }}
            src="images/gr.svg"
            className="d-block img-fluid"
            alt="grid"
          />
        </div>
      </div>
    </div>
  );
}
