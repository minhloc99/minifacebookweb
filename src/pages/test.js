import React, { useState } from "react";
import ImageUploader from "../components/imageUploader";
import { db, auth, storageRef } from "../services/db";

export default function Test(props) {
  var [content, setContent] = useState();
  var [imageData, setImageData] = useState();

  function onAfterImageUploaded(param) {
    setImageData(param);
  }

  function createPost(imagePath) {
    var postData = {
      content: content,
      userId: auth().currentUser.uid,
      userEmail: auth().currentUser.email,
      timestamp: new Date(),
      imagePath: imagePath,
    };
    var newPostKey = db.ref().child("postCollection").push().key;
    var updates = {};
    updates["/post-collection/" + newPostKey] = postData;
    return db.ref().update(updates);
  }

  function createPostWithImage() {
    var imagePath = "images/" + imageData.name;
    var imageRef = storageRef.child(imagePath);
    Promise.all([
      createPost(imagePath),
      imageRef.putString(imageData.data, "data_url"),
    ]).then(() => {
      console.log("OK");
    });
  }

  return (
    <React.Fragment>
      <div>
        <ImageUploader onAfterImageUploaded={onAfterImageUploaded} />
      </div>
      <div>
        <input type="text" onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        <button onClick={createPostWithImage}>OK</button>
      </div>
    </React.Fragment>
  );
}
