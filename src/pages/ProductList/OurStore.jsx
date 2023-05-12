import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../../components/ProductCard";

import Container from "../../components/Container";
import { useGetAllProductsQuery } from "../../features/products/productSlice";

import { useQueryConfig1 } from "../../Hook/useQueryConfig";
import AsideFiter from "./AsideFiter";
import SortProductTop from "./SortProductTop";

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const queryConfig = useQueryConfig1();
  let queryString = Object.keys(queryConfig)
    .map((key) => key + "=" + queryConfig[key])
    .join("&");

  const productList = useGetAllProductsQuery(queryString);

  console.log(productList);
  const { data, isLoading } = productList;
  const [titleCateProduct, setTitleCateProduct] = useState();
  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    if (data && data.data) {
      setListProducts(data.data);
    }
  }, [data]);
  useEffect(() => {
    if (titleCateProduct) {
      setListProducts(
        listProducts.filter((item) => item.category == titleCateProduct)
      );
    }
  }, []);
  // const handleFilterCateClick = (title) => {
  //   setTitleCateProduct();
  // };
  // const handleFillterByClick = () => {
  //   if (titleCateProduct || data) {
  //   }
  // };

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      {isLoading ? (
        "Loading"
      ) : (
        <Container class1="store-wrapper home-wrapper-2 py-5">
          <div className="row">
            <AsideFiter
              queryConfig={queryConfig}
              setTitleCateProduct={setTitleCateProduct}
            />
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                {/*  */}
                <SortProductTop setGrid={setGrid} />
              </div>
              <div className="products-list pb-5">
                <div className="d-flex gap-10 flex-wrap">
                  <ProductCard data={listProducts} grid={grid} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default OurStore;
