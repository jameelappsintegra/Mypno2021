import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { getFirebase } from "../firebase";

const Post = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState();

  useEffect(() => {
    const slug = match.params.slug;
    getFirebase()
      .database()
      .ref(`/posts/${slug}`)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          setCurrentPost(snapshot.val());
        }
        setLoading(false);
      });
  }, [match]);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  const postDoesNotExist = !currentPost;
  if (postDoesNotExist) {
    return <Redirect to="/404" />;
  }

  return (
    <>
      <img
        src={currentPost.coverImage}
        alt={currentPost.coverImageAlt}
        style={{ width: "100%" }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ marginBottom: 0 }}>{currentPost.title}</h1>
        <Link
          to={`/edit/${currentPost.slug}`}
          style={{
            height: "32px",
            border: "none",
            color: "#fff",
            backgroundColor: "#039be5",
            borderRadius: "4px",
            padding: "8px 12px",
            fontSize: "0.9rem",
            marginLeft: "12px",
          }}
        >
          Edit
        </Link>
      </div>
      <em>{currentPost.datePretty}</em>
      <p dangerouslySetInnerHTML={{ __html: currentPost.content }}></p>
    </>
  );
};

export default Post;
