import React from "react";
import { Link } from "react-router-dom";
import moment from "momnet"

const BlogCard = ({ data }) => {

  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content d-flex justify-content-start flex-column align-items-start">
        <p className="date">{moment(data?.createdAt).format("MMMM Do YYYY, h:mm a")}</p>
        <h5 className="title">{data?.title}</h5>
        <p className="desc flex-shrink-1 flex-grow-1 " dangerouslySetInnerHTML={{
          __html
            : (data?.description.substr(0, 100) + "...")
        }}>

        </p>
        <Link to={`/blog/${data?._id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
