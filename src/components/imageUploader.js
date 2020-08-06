import React from "react";
import "./imageUploader.css";

export default function ImageUploader(props) {
  var loadFile = function (event) {
    var reader = new FileReader();
    var files = event.target.files;
    var filename = files[0].name;
    var extension = files[0].type.split("/")[1];

    reader.onload = function () {
      var output = document.getElementById("preview");
      output.src = reader.result;
      props.onAfterImageUploaded({
        name: filename,
        data: reader.result,
        extension: extension,
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <React.Fragment>
      <input id="uploader" type="file" accept="image/*" onChange={loadFile} />
      <img id="preview" alt="" />
    </React.Fragment>
  );
}
