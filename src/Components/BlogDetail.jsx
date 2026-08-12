import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";


const API_BASE = import.meta.env.VITE_BACKEND_URL;

/* ---------------- DRIVE IMAGE HELPER ---------------- */
function driveToImage(url, size = 900) {
  if (!url) return null;

  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (!match) return url;

  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w${size}`;
}

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/blogs/${slug}`)
      .then((res) => setBlog(res.data.blog))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!blog) return null;

  return (
    <>
   <Helmet>
  <script type="application/ld+json">
    {JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://zeromedixine.com/blogs/back-pain-reasons-why-does-your-back-hurt"
        },
        "headline": "Back Pain Reasons – Why Does Your Back Hurt?",
        "image": "https://lh3.googleusercontent.com/d/1zch9WYtB2haacjgX6D7RQkaT0v_eIq_6=w900?authuser=0",
        "author": {
          "@type": "Organization",
          "name": "zeromedixine"
        },
        "publisher": {
          "@type": "Organization",
          "name": "zeromedixine",
          "logo": {
            "@type": "ImageObject",
            "url": "https://zeromedixine.com/"
          }
        },
        "datePublished": "2026-04-03"
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://zeromedixine.com/blogs/bmi-calculator-a-complete-guide-by-zeromedxine"
        },
        "headline": "BMI Calculator - A Complete Guide by Zeromedxine",
        "image": "https://lh3.googleusercontent.com/d/1iqSsLoXCkH50KsRLXyoORz_mLj3XB5MI=w900?authuser=0",
        "author": {
          "@type": "Person",
          "name": "zeromedixine",
          "url": "https://zeromedixine.com/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "zeromedixine",
          "logo": {
            "@type": "ImageObject",
            "url": "https://zeromedixine.com/"
          }
        },
        "datePublished": "2026-02-03"
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://zeromedixine.com/blogs/can-physiotherapy-actually-work-through-a-screen-the-surprising-truth-about-virtual-treatment"
        },
        "headline": "Can Physiotherapy Actually Work Through a Screen?",
        "image": "https://lh3.googleusercontent.com/d/1_AxpmJVa8yBWCaIj8p3Pk98tBIbEion3=w900?authuser=0",
        "author": {
          "@type": "Person",
          "name": "zeromedixine",
          "url": "https://zeromedixine.com/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "zeromedixine",
          "logo": {
            "@type": "ImageObject",
            "url": "https://zeromedixine.com/"
          }
        },
        "datePublished": "2026-02-03"
      }
    ])}
  </script>
</Helmet>
    <article className="max-w-4xl mx-auto py-28 px-4">

      {/* BLOG TITLE */}
      <h1 className="text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      {/* AUTHOR */}
      <p className="text-gray-500 mb-8">
        Reviewed by {blog.author} •{" "}
        {new Date(blog.publishedAt).toDateString()}
      </p>

      {/* FEATURED IMAGE */}
      {blog.blogImage && (
        <img
          src={driveToImage(blog.blogImage)}
          alt={blog.title}
          className="w-full rounded-2xl shadow-md mb-10"
          loading="lazy"
        />
      )}

      {/* BLOG CONTENT */}
      <div className="text-lg text-gray-700 leading-relaxed">

        {blog.content.split("\n").map((line, index) => {

          /* IMAGE PLACEHOLDER */
          if (line.startsWith("[IMAGE:")) {
            const imageUrl = line.replace("[IMAGE:", "").replace("]", "");

            const finalImage =
              imageUrl.includes("drive.google.com")
                ? driveToImage(imageUrl)
                : imageUrl;

            return (
              <img
                key={index}
                src={finalImage}
                alt="Blog"
                className="w-full rounded-xl shadow-md my-8"
                loading="lazy"
              />
            );
          }

          /* SUBTITLE DETECTION */
          const isHeading = /^\d+\.\s/.test(line);

          if (isHeading) {
            return (
              <p
                key={index}
                className="font-semibold text-2xl mt-10 mb-4 text-gray-900"
              >
                {line}
              </p>
            );
          }

          /* NORMAL PARAGRAPH */
          return (
            <p key={index} className="mb-5 whitespace-pre-line">
              {line}
            </p>
          );
        })}

      </div>

    </article>
    </>
  );
};

export default BlogDetail;