import React, { useState } from "react";
const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview Image
      setError(""); // Clear error if an image is selected
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please upload an image before submitting!");
      return;
    }
    alert("Image uploaded successfully!");
    // Here, you can send the image to the backend using FormData
  };
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {image && (
          <div style={{ marginTop: "10px" }}>
            <img src={image} alt="Preview" width="150" height="150" style={{ borderRadius: "10px" }} />
          </div>
        )}
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};
export default ImageUploadForm;