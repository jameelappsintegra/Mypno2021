import React, { useEffect, useState } from "react";
import { getFirebase } from "../firebase";

const labelStyles = {
  display: "block",
  marginBottom: 4,
};

const inputStyles = {
  width: "100%",
  height: "2rem",
  lineHeight: "2rem",
  verticalAlign: "middle",
  fontSize: "1rem",
  marginBottom: "1.5rem",
  padding: "0 0.25rem",
};

const Edit = ({ match, history }) => {
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    const slug = match.params.slug;
    getFirebase()
      .database()
      .ref(`posts/${slug}`)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          setCurrentPost(snapshot.val());
        }
        setLoading(false);
      });
  }, [match]);

  const [title, setTitle] = useState(currentPost.title);
  const [coverImage, setCoverImage] = useState(currentPost.coverImage);
  const [coverImageAlt, setCoverImageAlt] = useState(currentPost.coverImageAlt);
  const [content, setContent] = useState(currentPost.content);

  const savePost = () => {
    const updatePost = {
      title: title === undefined ? currentPost.title : title,
      dateFormatted: currentPost.dateFormatted,
      datePretty: currentPost.datePretty,
      slug: currentPost.slug,
      coverImage:
        coverImage === undefined ? currentPost.coverImage : coverImage,
      coverImageAlt:
        coverImageAlt === undefined ? currentPost.coverImageAlt : coverImageAlt,
      content: content === undefined ? currentPost.content : content,
    };

    getFirebase()
      .database()
      .ref(`posts/${currentPost.slug}`)
      .set(updatePost)
      .then(() => history.push(`/${currentPost.slug}`));
  };

  const deletePost = () => {
    getFirebase()
      .database()
      .ref(`/posts/${currentPost.slug}`)
      .remove()
      .then(() => {
        history.push("/");
      });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Edit post</h1>
        <button
          style={{
            height: "32px",
            border: "none",
            color: "#fff",
            backgroundColor: "#d32f2f",
            borderRadius: "4px",
            padding: "8px 12px",
            fontSize: "0.9rem",
            marginLeft: "24px",
            textDecoration: "none",
          }}
          onClick={deletePost}
        >
          Delete
        </button>
      </div>
      <section style={{ margin: "2rem 0" }}>
        <label style={labelStyles} htmlFor="title-field">
          Title
        </label>
        <input
          style={inputStyles}
          id="title-field"
          type="text"
          value={title === undefined ? currentPost.title : title}
          onChange={({ target: { value } }) => {
            setTitle(value);
          }}
        />

        <label style={labelStyles} htmlFor="cover-image-field">
          Cover image
        </label>
        <input
          style={inputStyles}
          id="cover-image-field"
          type="text"
          value={coverImage === undefined ? currentPost.coverImage : coverImage}
          onChange={({ target: { value } }) => {
            setCoverImage(value);
          }}
        />

        <label style={labelStyles} htmlFor="cover-image-alt-field">
          Cover image alt
        </label>
        <input
          style={inputStyles}
          id="cover-image-alt-field"
          type="text"
          value={
            coverImageAlt === undefined
              ? currentPost.coverImageAlt
              : coverImageAlt
          }
          onChange={({ target: { value } }) => {
            setCoverImageAlt(value);
          }}
        />

        <label style={labelStyles} htmlFor="content-field">
          Content
        </label>
        <textarea
          style={{ ...inputStyles, height: 200, verticalAlign: "top" }}
          id="content"
          type="text"
          value={content === undefined ? currentPost.content : content}
          onChange={({ target: { value } }) => {
            setContent(value);
          }}
        />
        <div style={{ textAlign: "right" }}>
          <button
            style={{
              border: "none",
              color: "#fff",
              backgroundColor: "#039be5",
              borderRadius: "4px",
              padding: "8px 12px",
              fontSize: "0.9rem",
            }}
            onClick={savePost}
          >
            Save
          </button>
        </div>
      </section>
    </>
  );
};
export default Edit;
