import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ---------------- DRIVE IMAGE HELPER ---------------- */
function driveToImage(url, size = 600) {
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) return null;
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w${size}`;
  }

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`)
      .then(res => {
        if (res.data?.blogs) {
          setBlogs(res.data.blogs);
        } else {
          setBlogs([]);
        }
      })
      .catch(err => {
        console.error("Failed to load blogs", err);
        setBlogs([]);
      });
  }, []);
  
  return (
    <section className="py-25 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Health Blogs</h1>

        <div className="grid md:grid-cols-2 gap-8">
        {blogs.map(blog => (
  <div
    key={blog._id}
    className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
    onClick={() => navigate(`/blogs/${blog.slug}`)}
  >
    {/* Blog Image */}
    {/* ✅ BLOG IMAGE FIXED */}
    {blog.blogImage && (
                <img
                  src={driveToImage(blog.blogImage, 600)}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              )}


    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-3">
        {blog.title}
      </h2>

      <p className="text-gray-600 line-clamp-3">
        {blog.content}
      </p>

      <p className="text-sm text-gray-400 mt-4">
        {new Date(blog.publishedAt).toDateString()}
      </p>
    </div>
  </div>
))}

        </div>
      </div>
    </section>
  );
};

export default Blogs;
