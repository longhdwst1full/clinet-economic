import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import { toast } from "react-toastify"
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useAddToWishListMutation } from "../features/products/productSlice";

const ProductCard = (props) => {
  const { grid, data } = props;

  let location = useLocation();
  const [addToWishListFn, addToWishListRep] = useAddToWishListMutation();
  // console.log(addToWishListRep);

  const handleClickAddToWishList = async (id) => {
    try {
      addToWishListFn(id);

      if (addToWishListRep?.error?.status == 500) {
        toast.error("Ban can dang nhap");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {data &&
        Array.isArray(data) &&
        data.map((product) => {
          return (
            <div
              key={product._id}
              className={` ${
                location.pathname === "/product" ? `gr-${grid}` : "col-3"
              } `}
            >
              <Link className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                  <button className="border-0 bg-transparent">
                    <img
                      src={wish}
                      alt="wishlist"
                      onClick={() => handleClickAddToWishList(product._id)}
                    />
                  </button>
                </div>
                <div className="product-image">
                  <img src={watch} className="img-fluid m-auto" alt="" />
                  <img
                    src={product?.images[0]?.url}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="product-details">
                  <h6 className="brand">{product.brand}</h6>
                  <Link to={`${product._id}`}>
                    <h5 className="product-title cursor-pointer">
                      {product.title}
                    </h5>
                  </Link>
                  <ReactStars
                    count={5}
                    size={24}
                    value={Number(product?.totalrating)}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p
                    className={`description ${
                      grid === 12 ? "d-block" : "d-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  ></p>
                  <p className="price">$ {product.price}</p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <button className="border-0 bg-transparent">
                      <img src={prodcompare} alt="compare" />
                    </button>
                    <button className="border-0 bg-transparent">
                      <Link to={`${product._id}`}>
                        <img src={view} alt="view" />
                      </Link>
                    </button>
                    <button className="border-0 bg-transparent">
                      <img src={addcart} alt="addcart" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default ProductCard;
