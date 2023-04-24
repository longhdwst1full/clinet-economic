import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import blog from "../images/blog-1.jpg";
import Container from "../components/Container";

import { useGetOneBlogQuery } from "../features/blogs/blogSlice";

const SingleBlog = () => {
  const { id } = useParams();
  // console.log(id)
  const { data, isLoading } = useGetOneBlogQuery(id)
  console.log("getBlogFn", data);

  //   useEffect(() => {
  //     getBlogFn(id);
  // }, [getBlogFn, id]);
  // return null
  return (
    <>
      <Meta title={data?.title} />
      <BreadCrumb title={data?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          {isLoading && (
            <div>
              Loading...
            </div>
          )}
          {data && (

            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
                </Link>
                <h3 className="title">{data?.title}</h3>
                <img src={data.images[0] ? data.images[0].url : blog} className="img-fluid w-100 my-4" alt="blog" />
                <p dangerouslySetInnerHTML={{ __html: data.description }}>

                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
