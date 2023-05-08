import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import {
  getUserFromLS,
  useAddToCartMutation,
  useDeleteUserAddToCartMutation,
  useGetUserAddToCartQuery,
} from "../features/user/userSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomInputForWorkRef from "../components/CustomInputForwrokRef";
import { useCreateOrderByUserMutation } from "../features/user/userSlice";
import { nanoid } from "@reduxjs/toolkit";

const schema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  // pincode: yup.number().required(),
});

const shipping = 10000;
const Checkout = () => {
  const navigate = useNavigate();
  const { data } = useGetUserAddToCartQuery();
  const [deleteUserAddToCarFN, deleteUserAddRep] =
    useDeleteUserAddToCartMutation();
  const [orderFn, orderRes] = useCreateOrderByUserMutation();
  const totalPrice = useMemo(
    () =>
      data &&
      data.length > 0 &&
      data.reduce((result, current) => {
        return result + current.price * current.quantity;
      }, 0),

    [data]
  );
  // console.log(getUserFromLS);
  const user = getUserFromLS;
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      state: "",
      city: "",
      country: "",

      other: "",
    },
    resolver: yupResolver(schema),
  });
 
  const processSubmit = async (dataresult) => {
    try {
      const productList = [];

      data &&
        data.map(item => {
          productList.push({
            product: item.productId._id,
            quantity: item.quantity,
            color: item.color._id,
            price: item.productId.price,
          });
        });

      const data1 = {
        shippingInfo: {
          ...dataresult,
          pincode: nanoid(),
        },
        orderItems: productList,
        totalPrice: totalPrice,
        totalPriceAfterDisccount: totalPrice,
        paymentInfo: {
          razorpayOrderId: nanoid(),
          razorpayPaymentId: nanoid(),
        },
      };
    
      await orderFn(data1);

    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (orderRes.isSuccess) {
      data &&
        data.map(async (item) => {
          await deleteUserAddToCarFN(item._id);
        });
      toast.success("Dat hang thanh cong");
      navigate("/");
    }
    if (orderRes?.isError || deleteUserAddRep?.isError) {
      toast.error("error");
    }
  }, [data, deleteUserAddRep?.isError, deleteUserAddToCarFN, navigate, orderRes?.isError, orderRes.isSuccess]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/vi/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDk fail to load");
      return;
    }
    const result = await axios.post(
      "http://localhost:5000/api/user/order/checkout"
    );
  };
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">{user ? user.email : ""}</p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={handleSubmit(processSubmit)}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    {...register("country")}
                    name="country"
                    className="form-control form-select"
                  >
                    <option value="" defaultChecked disabled>
                      Select Country
                    </option>
                    <option value="VietNam">Viet Nam</option>
                  </select>
                  <div className="error">{errors?.country?.message}</div>
                </div>
                <div className="w-100">
                  <CustomInputForWorkRef
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={(e) => e.target.value}
                    control={control}
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <CustomInputForWorkRef
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    onChange={(e) => e.target.value}
                    control={control}
                  />
                </div>
                <div className="w-100">
                  <CustomInputForWorkRef
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    name="other"
                    onChange={(e) => e.target.value}
                    control={control}
                  />
                </div>
                <div className="flex-grow-1">
                  <CustomInputForWorkRef
                    type="text"
                    placeholder="City"
                    onChange={(e) => e.target.value}
                    control={control}
                    name="city"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <select
                    {...register("state")}
                    name="state"
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" defaultChecked disabled>
                      Select State
                    </option>
                    <option value="Haryana">Haryana</option>
                  </select>
                  <div className="error">{errors?.state?.message}</div>
                </div>

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button className="button" type="submit">
                      Buy now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            {data &&
              data.map((item) => {
                return (
                  <div key={item._id} className="border-bottom py-4">
                    <div className="d-flex gap-10 mb-2 align-align-items-center">
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            className="img-fluid"
                            src={item?.productId?.images[0]?.url}
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {item?.productId.title}
                          </h5>
                          <p
                            style={{ background: item?.color?.title }}
                            className="total-price"
                          >
                            s / {item?.color?.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">$ {item?.price}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">$ {totalPrice}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ {shipping}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">$ {totalPrice + shipping}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
