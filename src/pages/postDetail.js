import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { db, auth, ga } from "../services/db";
import "./postDetail.css";
import { updateNumberOfLikes } from "../services/post";
import Editor from "../components/editor";
import { createComment } from "../services/comment";
import Comments from "../components/comments";
import { getImage } from "../services/image";

export default function PostDetail(props) {
  var [detailData, setDetailData] = useState(props.location.detail);
  var [imageUrl, setImageUrl] = useState(props.location.detail.imagePath);
  var [numberOfLikes, setNumberOfLikes] = useState(
    props.location.detail.numberOfLikes
      ? props.location.detail.numberOfLikes
      : 0
  );

  function onLike() {
    setNumberOfLikes(++numberOfLikes);
    updateNumberOfLikes(props.match.params.id, numberOfLikes);
  }

  useEffect(() => {
    ga.logEvent(`EventName : user visits detail page`);

    if (detailData) {
      setDetailData(props.location.detail);
      getImage(imageUrl).then(function (url) {
        setImageUrl(url);
      });
    } else {
      db.ref(
        "posts/" + auth().currentUser.uid + "/" + props.match.params.id
      ).on("value", (snapshot) => {
        setDetailData({
          id: snapshot.key,
          ...snapshot.val(),
        });
      });
    }

    return () => {
      setDetailData(null);
      setNumberOfLikes(null);
    };
  }, []);

  function onAfterSetText(param) {
    createComment(props.match.params.id, { content: param.text }).then(
      function (success) {
        console.log("OK");
      }
    );
  }

  return (
    <Layout>
      <section>
        <article>
          <p>{detailData.content}</p>
          <img id="preview" src={imageUrl} alt="" />
          <div className="like-and-comment">
            <i className="far fa-thumbs-up" onClick={onLike}>
              {`${numberOfLikes} like(s)`}
            </i>
            <i className="far fa-comments">{`${props.location.detail.numberOfComments} comment(s)`}</i>
          </div>
        </article>
      </section>
      <section>
        <Editor
          placeholder={"Write your comments!"}
          onAfterSetText={onAfterSetText}
        />
        <Comments postId={props.match.params.id} />
      </section>
    </Layout>
  );
}
