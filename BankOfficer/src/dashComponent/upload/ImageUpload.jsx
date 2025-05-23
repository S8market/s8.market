import React, { useState, useRef, useContext } from "react";
import "./imageUpload.scss";
import { AppContext } from "../../context/context";

const ImageUpload = () => {
  const {uploadedFiles, setUploadedFiles, newImages, setNewImages, removedImages, setRemovedImages, editProperty} = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null); // Reference for file input

  // Handle file input (for adding new images)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]); // Track newly added images
  };

  // Handle removing an image
  const handleRemoveImage = (image) => {
    setRemovedImages([...removedImages, image.public_id]); // Track removed images by public_id
    setUploadedFiles(uploadedFiles.filter((img) => img.public_id !== image.public_id));
  };

  // Function to handle file selection
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
  };

  // Function to process dropped or selected files
  const processFiles = (files) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  // Function to trigger file input when button is clicked
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Drag & Drop handlers
  const handleDragOver = (event) => {
    event.preventDefault(); 
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
  };

  return (
    <div className="image-upload-form-wrapper">
      <div className="image-upload-container">
        {showPopup && <div className="popup-message">File uploaded successfully!</div>}

        <div 
          className="upload-box"
          onDragOver={handleDragOver} 
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            multiple 
            onChange={handleFileUpload} 
            ref={fileInputRef} 
            style={{ display: "none" }} 
          />
          <div className="upload-area">
            <img src="/upload.svg" alt="Upload Icon" className="upload-icon" />
            <p>Choose a file or drag & drop it here</p>
            <p className="file-info">JPEG, PNG up to 20MB</p>
            <button className="browse-btn" onClick={handleBrowseClick}>Browse File</button>
          </div>
        </div>

        <div className="uploaded-media">
          <h4>Uploaded Media</h4>
          {uploadedFiles.length > 0 ? (
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index} className="file-item">
                  <img src="pdf.svg" alt="File" className="file-icon" />
                  <div className="file-info">
                    <p>{file.name}</p>
                    <span>{file.size} KB</span>
                  </div>
                  <span className="status">
                    <img src="check.svg" alt="Completed" className="status-icon" />
                  </span>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
                    }}
                  >
                    <img src="/delete.svg" alt="Delete" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-files">No files uploaded yet</p>
          )}
        </div>
      </div>

      {/* The form wrapper should be placed here */}
      <div className="form-wrapper">
        <form>
          <label htmlFor="property-name">Property Name</label>
          <input type="text" id="property-name" name="property-name" />
          
          <label htmlFor="property-description">Description</label>
          <textarea id="property-description" name="property-description"></textarea>
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;
