import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { toast } from "react-toastify";
import {
  useDeleteUserAddToCartMutation,
  useGetUserAddToCartQuery,
  useUpdateQuantityUserAddToCartMutation,
} from "../features/user/userSlice";

const Cart = () => {
  const { data } = useGetUserAddToCartQuery();

  const [deleteUserAddToCarFN, deleteUserAddRep] =
    useDeleteUserAddToCartMutation();
  const [updateUserAddToCartFn, updateUserAddToCartRep] =
    useUpdateQuantityUserAddToCartMutation();

  const hanleDeleteCart = async (id) => {
    try {
      deleteUserAddToCarFN(id);
    } catch (error) {
      console.log(error);
    }
  };

  const hanleUpdateQuantityCart = async (data) => {
    try {
      updateUserAddToCartFn({
        cartItemId: data.id,
        newQuantity: data.quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (deleteUserAddRep.isSuccess) {
      toast.success("Xoa thanh cong");
    }
    if (deleteUserAddRep.isError) {
      toast.error("Something wrong");
    }
  }, [deleteUserAddRep.isSuccess, deleteUserAddRep.isError]);

  const totalPrice = useMemo(
    () =>
      data &&
      data.length > 0 &&
      data.reduce((result, current) => {
        return result + current.price * current.quantity;
      }, 0),

    [data]
  );

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {data && !data.length ? (
              <div>
                <p className="text-center">Chua co san pham nao</p>
              </div>
            ) : (
              data?.map((item) => (
                <div
                  key={item._id}
                  className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                >
                  <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div className="w-25">
                      <img
                        src={item?.productId?.images[0].url}
                        className="img-fluid"
                        alt={item?.productId?.title}
                      />
                    </div>
                    <div className="w-75">
                      <p>{item?.productId?.title}</p>
                      <p>Size: hgf</p>
                      <p className="d-flex gap-3">
                        Color:
                        <li
                          style={{ backgroundColor: item?.color.title }}
                          className=""
                        ></li>
                      </p>
                    </div>
                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">$ {item.price}</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div>
                      <input
                        className="form-control"
                        type="number"
                        value={item?.quantity}
                        onChange={async (e) => {
                          hanleUpdateQuantityCart({
                            id: item._id,
                            quantity: e.target.value,
                          });
                        }}
                        min={1}
                        max={10}
                        id=""
                      />
                    </div>
                    <div>
                      <AiFillDelete
                        className="text-danger "
                        onClick={() => hanleDeleteCart(item?._id)}
                      />
                    </div>
                  </div>
                  <div className="cart-col-4">
                    <h5 className="price">$ {item?.price * item?.quantity}</h5>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: $ {totalPrice}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
