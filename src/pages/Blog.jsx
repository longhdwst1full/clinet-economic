import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useGetAllBlogsQuery } from "../features/blogs/blogSlice";

const Blog = () => {
  const { data, isLoading, isError, isSuccess } = useGetAllBlogsQuery()
  // console.log(blogsList)

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      {isLoading ? (
        <div className="text-center fs-3">
          Loading
        </div>
      ) : (


        <Container class1="blog-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Find By Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Watch</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {data && data.map(item => {
                  return (
                    <div key={item._id} className="col-6 mb-3">
                      <BlogCard data={item} />
                    </div>
                  )
                })}

              </div>
            </div>
          </div>
        </Container>
      )
      }
    </>
  );
};

export default Blog;
