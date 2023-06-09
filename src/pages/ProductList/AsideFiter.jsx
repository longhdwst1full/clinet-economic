import React from "react";
import Color from "../../components/Color";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import classNames from "classnames";

export default function AsideFiter({ queryConfig, productCate }) {
  const { _categoryId } = queryConfig;
  const navigate = useNavigate();

  const handleOnChageInput = (e) => {
    const { value, name } = e.target;

    navigate({
      pathname: "",
      search: createSearchParams({
        ...queryConfig,
        [name]: value,
      }).toString(),
    });
  };

  return (
    <div className="col-3">
      <div className="filter-card mb-3">
        <h3 className="filter-title">Shop By Categories</h3>
        <div>
          <ul className="ps-0">
            {productCate &&
              productCate.map((item) => {
                const isActive = _categoryId === item._id;

                return (
                  <li key={item._id}>
                    <Link
                      to={{
                        pathname: "",
                        search: createSearchParams({
                          ...queryConfig,
                          _categoryId: item._id,
                        }).toString(),
                      }}
                      className={classNames("tw-relative tw-px-2", {
                        "tw-font-semibold tw-text-orange": isActive,
                      })}
                    >
                      {isActive && (
                        <svg
                          viewBox="0 0 4 7"
                          className="tw-absolute tw-top-1 tw-left-[-10px] tw-h-2 tw-w-2 tw-fill-orange"
                        >
                          <polygon points="4 3.5 0 0 0 7" />
                        </svg>
                      )}
                      {item.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="filter-card mb-3">
        <h3 className="filter-title">Filter By</h3>
        <div>
          <h5 className="sub-title">Availablity</h5>
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id=""
              />
              <label className="form-check-label" htmlFor="">
                In Stock (1)
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id=""
              />
              <label className="form-check-label" htmlFor="">
                Out of Stock(0)
              </label>
            </div>
          </div>
          <h5 className="sub-title">Price</h5>

          <div className="d-flex align-items-center gap-10">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                name="priceMin"
                placeholder="From"
                onBlur={handleOnChageInput}
              />
              <label htmlFor="floatingInput">From</label>
            </div>
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="floatingInput1"
                name="priceMax"
                placeholder="To"
                onChange={handleOnChageInput}
              />
              <label htmlFor="floatingInput1">To</label>
            </div>
          </div>

          <h5 className="sub-title">Colors</h5>
          <div>
            {/* color */}
            <Color />
          </div>
          <h5 className="sub-title">Size</h5>
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="color-1"
              />
              <label className="form-check-label" htmlFor="color-1">
                S (2)
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="color-2"
              />
              <label className="form-check-label" htmlFor="color-2">
                M (2)
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="filter-card mb-3">
        <h3 className="filter-title">Product Tags</h3>
        <div>
          <div className="product-tags d-flex flex-wrap align-items-center gap-10">
            <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
              Headphone
            </span>
            <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
              Laptop
            </span>
            <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
              Mobile
            </span>
            <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
              Wire
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
