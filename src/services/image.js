const { storageRef } = require("./db");

export function getImage(imagePath) {
  return storageRef.child(imagePath).getDownloadURL();
}

export function createImage(imagePath, data) {
  return storageRef.child(imagePath).putString(data, "data_url");
}
