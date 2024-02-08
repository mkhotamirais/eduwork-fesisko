import { useEffect, useState } from "react";
import axios from "axios";
import { blogUrl, imgBlog } from "../../constants/contants";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const response = await axios.get(blogUrl);
    setBlogs(response.data.aaData);
  };
  return (
    <>
      <h1 className="leading-loose text-2xl font-medium text-center my-4">Blog</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-5">
        {blogs
          .map((blog) => (
            <article key={blog.id} className="bg-white p-3 rounded">
              <h2 className="capitalize font-medium">{blog.title}</h2>
              <div className="flex gap-2 text-sm">
                <span>By {blog.by}</span>
                <i>{blog.posted}</i>
              </div>
              <figure>
                <img src={imgBlog + blog.img} alt="" />
              </figure>
              {blog.body}
            </article>
          ))
          .sort()
          .reverse()}
      </section>
    </>
  );
};

export default Blog;
