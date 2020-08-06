import React, { useEffect, useState } from "react";
import { db } from "../services/db";
import "./comments.css";

function Comment(props) {
  return (
    <article class="comment">
      <p>{props.data.content}</p>
      <div className="user-info">
        <time>{props.data.timestamp}</time>
        <span>{props.data.userEmail}</span>
      </div>
    </article>
  );
}

export default function Comments(props) {
  var [comments, setComments] = useState([]);

  useEffect(() => {
    db.ref("comments/" + props.postId).on("value", (snapshot) => {
      var commentCollection = [];
      console.log(snapshot);

      snapshot.forEach((snap) => {
        commentCollection.push({ id: snap.key, ...snap.val() });
      });

      return setComments(commentCollection);
    });
  }, []);

  return (
    <React.Fragment>
      {comments.map((comment, index) => {
        return <Comment key={index} data={comment} />;
      })}
    </React.Fragment>
  );
}
