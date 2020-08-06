import React, { useState, useEffect } from "react";
import "./postItem.css";
import { Link } from "react-router-dom";
import { getImage } from "../services/image";
import { db } from "../services/db";

export default function PostItem(props) {
  var [imageUrl, setImageUrl] = useState();
  // var [numberOfComments, setNumberOfComments]

  useEffect(() => {
    getImage(props.data.imagePath).then(function (url) {
      setImageUrl(url);
    });
  }, []);

  return (
    <React.Fragment>
      <article>
        <span>{props.data.userEmail}</span>
        <p>{props.data.content}</p>
        <img id="preview" src={imageUrl} alt="" />
        <div>
          <i className="far fa-thumbs-up">
            {props.data.numberOfLikes ? props.data.numberOfLikes : 0}
          </i>
          <i className="far fa-comments">
            {props.data.numberOfComments ? props.data.numberOfComments : 0}
          </i>
        </div>
        <Link
          to={{
            pathname: `/posts/${props.data.id}`,
            detail: props.data,
          }}
        >
          Detail
        </Link>
      </article>
    </React.Fragment>
  );
}
