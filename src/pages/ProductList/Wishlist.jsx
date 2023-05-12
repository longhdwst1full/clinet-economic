import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import { useGetUserProductsWithListQuery } from "../../features/user/userSlice";
import { useAddToWishListMutation } from "../../features/products/productSlice";

const Wishlist = () => {
  const getWishList = useGetUserProductsWithListQuery();

  const [getwishlist, setWishlist] = useState([]);
  useEffect(() => {
    setWishlist(getWishList?.data?.wishlist);
  }, [getWishList?.data?.wishlist]);
  // console.log(getWishList)
  const [addToWishListFn, addToWishListRep] = useAddToWishListMutation();
  const handleRemoveWishlist = async (id) => {
    await addToWishListFn(id);
    setWishlist(getwishlist.filter((item) => item._id !== id));
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {getwishlist && getwishlist.length > 0
            ? getwishlist.map((item) => (
                <div className="col-3" key={item._id}>
                  <div className="wishlist-card position-relative">
                    <img
                      src="images/cross.svg"
                      alt="cross"
                      onClick={() => handleRemoveWishlist(item._id)}
                      className="position-absolute cross img-fluid"
                    />
                    <div className="wishlist-card-image bg-white">
                      <img
                        src={
                          item.images[0]?.url
                            ? item.images[0]?.url
                            : "images/watch.jpg"
                        }
                        className="img-fluid d-block m-auto"
                        alt="watch"
                        width={160}
                      />
                    </div>
                    <div className="py-3 px-3">
                      <h5 className="title">{item.title}</h5>
                      <h6 className="price">$ {item.price}</h6>
                    </div>
                  </div>
                </div>
              ))
            : "Chua co san pham nao"}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
