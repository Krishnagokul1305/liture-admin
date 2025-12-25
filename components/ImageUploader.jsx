"use client";

import { useState, useRef } from "react";

export default function ImageUploader({
  image,
  onImageChange,
  disabled = false,
}) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onImageChange(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onImageChange(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayImage = preview || (typeof image === "string" ? image : null);

  return (
    <div className="space-y-4">
      {displayImage && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden bg-input">
          <img
            src={displayImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              Remove
            </button>
          )}
        </div>
      )}

      {!disabled && (
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-muted p-6">
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*"
            disabled={disabled}
          />
        </label>
      )}

      {disabled && !displayImage && (
        <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
          No image available
        </div>
      )}
    </div>
  );
}
