import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Image as ImageIcon } from "lucide-react";

const AdminAddBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitBlog = async () => {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", "Dr Manish Mahin");
    if (image) formData.append("blogImage", image);

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setTitle("");
      setContent("");
      setImage(null);
      setPreview(null);

      navigate("/blogs");
    } catch (err) {
      console.error("Blog publish failed", err);
      alert("Failed to publish blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto py-20 px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Publish New Blog
          </h1>
          <p className="text-gray-500 mt-1">
            Write and publish articles for Zeromedixine
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-3
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Content
            </label>
            <textarea
              rows="10"
              className="w-full border border-gray-300 rounded-lg px-4 py-3
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Image Upload (AFTER content) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>

            <label
              className="flex flex-col items-center justify-center
                         border-2 border-dashed border-gray-300
                         rounded-xl p-6 cursor-pointer
                         hover:border-blue-500 transition"
            >
              <UploadCloud className="h-10 w-10 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload image
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, JPEG supported
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>

            {/* Image Preview */}
            {preview && (
              <div className="mt-4 flex items-center gap-3">
                <ImageIcon className="text-gray-500" />
                <img
                  src={preview}
                  alt="Preview"
                  className="h-20 rounded-lg border object-cover"
                />
              </div>
            )}
          </div>

          {/* Publish Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={submitBlog}
              disabled={loading}
              className="px-8 py-3 rounded-lg text-white font-medium
                         bg-gradient-to-r from-blue-600 to-green-500
                         hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </div>
      </div>

      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl px-8 py-6 text-center shadow-lg">
            <div className="mb-4 animate-spin rounded-full h-10 w-10
                            border-4 border-blue-600 border-t-transparent mx-auto" />
            <p className="text-gray-700 font-medium">
              Publishing blog, please wait…
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAddBlog;
