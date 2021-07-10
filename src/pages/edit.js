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
  const [slug, setSlug] = useState(match.params.slug);

  useEffect(() => {
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
  }, [currentPost ]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const [title, setTitle] = useState(currentPost.title);
  const [coverImage, setCoverImage] = useState(currentPost.coverImage);
  const [coverImageAlt, setCoverImageAlt] = useState(currentPost.coverImageAlt);
  const [content, setContent] = useState(currentPost.content);

  const savePost = () => {
    const updatePost = {
      title,
      slug,
      coverImage,
      coverImageAlt,
      content,
    };

    getFirebase()
      .database()
      .ref(`posts/${slug}`)
      .set(updatePost)
      .then(() => history.push(`/${slug}`));
  };

  return (
    <>
      <h1>Edit post</h1>
      <section style={{ margin: "2rem 0" }}>
        <label style={labelStyles} htmlFor="title-field">
          Title
        </label>
        <input
          style={inputStyles}
          id="title-field"
          type="text"
          value={title || currentPost.title}
          onChange={({ target: { value } }) => {
            setTitle(value);
          }}
        />
        <label style={labelStyles} htmlFor="slug-field">
          Slug
        </label>
        <input
          style={inputStyles}
          id="slug-field"
          type="text"
          value={slug}
          onChange={({ target: { value } }) => {
            setSlug(value);
          }}
        />

        <label style={labelStyles} htmlFor="cover-image-field">
          Cover image
        </label>
        <input
          style={inputStyles}
          id="cover-image-field"
          type="text"
          value={coverImage || currentPost.coverImage}
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
          value={coverImageAlt || currentPost.coverImageAlt}
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
          value={content || currentPost.content}
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
