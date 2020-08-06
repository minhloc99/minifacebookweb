import { db, auth } from "../services/db";
import { updateNumberOfComments } from "./post";

export var changedChild = null;
var commentsRef = db.ref("comments");

export function createComment(postId, comment) {
  return db.ref("comments/" + postId).push({
    content: comment.content,
    userId: auth().currentUser.uid,
    userEmail: auth().currentUser.email,
    timestamp: new Date(),
  });
}

export function updateComment(commentId, content) {
  return db.ref("comments/" + commentId).update({
    content: content,
  });
}

commentsRef.on("child_added", onCommentDataChanged);
commentsRef.on("child_changed", onCommentDataChanged);
commentsRef.on("child_removed", onCommentDataChanged);

function onCommentDataChanged(snapshot) {
  updateNumberOfComments(snapshot.key, snapshot.numChildren()).then();
}
