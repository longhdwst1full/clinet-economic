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
import { useGetAllProductCatesQuery } from "../../features/cateProduct/cateProduct";
import { toast } from "react-toastify";

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const queryConfig = useQueryConfig1();
  let queryString = Object.keys(queryConfig)
    .map((key) => key + "=" + queryConfig[key])
    .join("&");

  const productList = useGetAllProductsQuery(queryString);

  const { data, isLoading, isError, error } = productList;

  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      setListProducts(data.data);
    }
    if (data && data.code === 404) {
      toast.success("Không tìm thấy sản phầm phù hợp");
    }
  }, [data]);

  const { data: dataCateProduct } = useGetAllProductCatesQuery();

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
              productCate={dataCateProduct && dataCateProduct}
            />
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                {/*  */}
                <SortProductTop queryConfig={queryConfig} setGrid={setGrid} />
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
