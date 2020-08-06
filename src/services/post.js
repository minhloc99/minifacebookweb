import { db, auth, storageRef } from "../services/db";
import { createImage } from "./image";

export function fetchPosts() {
  let posts = [];
  db.ref("posts").on("value", (snapshot) => {
    snapshot.forEach((snap) => {
      posts.push(snap.val());
    });

    return posts;
  });
}

export function updateNumberOfLikes(postId, numberOfLikes) {
  return db.ref("posts/" + postId).update({
    numberOfLikes: numberOfLikes,
  });
}

export function updateNumberOfComments(postId, numberOfComments) {
  return db.ref("posts/" + postId).update({
    numberOfComments: numberOfComments,
  });
}

export function updateImage(postId, url) {
  return db.ref("posts/" + postId).update({
    imageUrl: url,
  });
}

export function createPost(content, imageData) {
  var imagePath = "images/" + imageData.name;
  var postData = {
    content: content,
    userId: auth().currentUser.uid,
    userEmail: auth().currentUser.email,
    timestamp: new Date(),
    imagePath: imagePath,
  };

  var newPostKey = db.ref().child("posts").push().key;
  var updates = {};

  updates["/posts/" + newPostKey] = postData;

  return Promise.all([
    db.ref().update(updates),
    createImage(imagePath, imageData.data),
  ]);
}
