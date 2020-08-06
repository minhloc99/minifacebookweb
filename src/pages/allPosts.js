import React, { useState, useEffect } from "react";
import { db, ga } from "../services/db";
import Editor from "../components/editor";
import Layout from "../components/layout";
import PostItem from "../components/postItem";
import { createPost } from "../services/post";
import ImageUploader from "../components/imageUploader";

export default function AllPosts(props) {
  var [posts, setPosts] = useState([]);
  var [content, setContent] = useState();
  var [imageData, setImageData] = useState();

  function onAfterImageUploaded(param) {
    setImageData(param);
  }

  useEffect(() => {
    ga.logEvent(`EventName : user visits allPosts Page`);

    db.ref("posts").on("value", (snapshot) => {
      var postCollection = [];

      snapshot.forEach((snap) => {
        postCollection.push({ id: snap.key, ...snap.val() });
      });

      setPosts(postCollection);
    });
  }, []);

  function onAfterSetText(param) {
    setContent(param.text);

    createPost(param.text, imageData).then(function (success) {
      console.log(success);
    });
  }

  return (
    <Layout>
      <ImageUploader onAfterImageUploaded={onAfterImageUploaded} />
      <Editor
        placeholder={"Share your feelings!"}
        onAfterSetText={onAfterSetText}
      />
      {posts.map((post, index) => {
        return <PostItem key={index} data={post} />;
      })}
    </Layout>
  );
}
