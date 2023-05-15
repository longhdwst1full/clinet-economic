import React, { useMemo } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import {
  useGetUserAddToCartQuery,
  getUserFromLS,
  clearLSUser,
} from "../features/user/userSlice";
import Popover from "./Popover";
import { toast } from "react-toastify";
const Header = () => {
  const { data } = useGetUserAddToCartQuery();

  const userLs = getUserFromLS();
  const navigate = useNavigate();

  const totalPrice = useMemo(
    () =>
      data &&
      data.length > 0 &&
      data.reduce((result, current) => {
        return result + current.price * current.quantity;
      }, 0),

    [data]
  );
  const handleLogout = () => {
    fetch("/logout")
      .then((response) => {
        if (response.ok) {
          clearLSUser();
          toast.success("Logout Success");
          navigate("/login");
        } else {
          toast.error("Logout failed");
        }
      })
      .catch((error) => {
        toast.error("Logout failed", error);
      });
  };

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8264954234">
                  +91 8264954234
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white">Dev Corner</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                {userLs ? (
                  <Popover
                    renderPopover={
                      <div className="tw-relative tw-z-10  tw-rounded-sm border tw-border-gray-200 tw-bg-white tw-shadow-md ">
                        <Link
                          to="/user/my-profile"
                          className="tw-block tw-w-full tw-bg-white tw-py-3 tw-px-4 tw-text-left hover:tw-bg-slate-100  tw-text-black tw-hover:tw-text-cyan-500"
                        >
                          Tài khoản của tôi
                        </Link>
                        <Link
                          to="/user/myorders"
                          className="tw-block tw-w-full tw-text-black tw-bg-white tw-py-3 tw-px-4 tw-text-left hover:tw-bg-slate-100 hover:tw-text-cyan-500"
                        >
                          Đơn mua
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="tw-border-none tw-block tw-w-full tw-bg-white tw-py-3 tw-px-4 tw-text-left hover:tw-bg-slate-100 hover:tw-text-cyan-500"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    }
                  >
                    <Link
                      to="/user/my-profile"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img className="tw-block tw-object-cover tw-h-[36px] tw-w-[36px] tw-rounded-full"
                        src={userLs.avatar ? userLs.avatar : user}
                        alt="user"
                      />

                      <p className="mb-0 tw-flex flex-column align-items-center tw-justify-start tw-text-left">
                        {userLs.email ? userLs?.email : userLs?.name}
                      </p>
                    </Link>
                  </Popover>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src={user} alt="user" />

                      <p className="mb-0">
                        Log in <br /> My Account
                      </p>
                    </Link>
                  </div>
                )}

                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {data ? data.length : 0}
                      </span>
                      <p className="mb-0">$ {totalPrice}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
