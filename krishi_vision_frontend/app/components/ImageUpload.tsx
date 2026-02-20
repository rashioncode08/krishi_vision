"use client";

import { useRef, useState, useCallback } from "react";

interface ImageUploadProps {
    onImageSelected: (file: File, preview: string) => void;
    disabled?: boolean;
}

export default function ImageUpload({ onImageSelected, disabled }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFile = useCallback(
        (file: File) => {
            if (!file.type.startsWith("image/")) {
                alert("Please upload an image file (JPG, PNG, or WEBP).");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                onImageSelected(file, e.target?.result as string);
            };
            reader.readAsDataURL(file);
        },
        [onImageSelected]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleCameraCapture = async () => {
        // On mobile, this opens the camera; on desktop, it opens file picker
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.capture = "environment";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) handleFile(file);
        };
        input.click();
    };

    return (
        <div style={{ width: "100%" }}>
            {/* Drag & Drop Zone */}
            <div
                className={`upload-zone ${isDragOver ? "drag-over" : ""}`}
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                    opacity: disabled ? 0.5 : 1,
                    pointerEvents: disabled ? "none" : "auto",
                }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleInputChange}
                    style={{ display: "none" }}
                />

                <div
                    style={{
                        fontSize: "3.5rem",
                        marginBottom: 16,
                    }}
                    className="animate-float"
                >
                    🍃
                </div>

                <h3
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: 8,
                    }}
                >
                    {isDragOver ? "Drop your image here!" : "Drag & drop a leaf photo"}
                </h3>

                <p
                    style={{
                        fontSize: "0.9rem",
                        color: "var(--text-muted)",
                        marginBottom: 24,
                    }}
                >
                    or click to browse — supports JPG, PNG, WEBP (max 10 MB)
                </p>

                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        className="btn-primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick();
                        }}
                        style={{ fontSize: "0.9rem", padding: "12px 28px" }}
                    >
                        📁 Browse Files
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCameraCapture();
                        }}
                        style={{ fontSize: "0.9rem", padding: "12px 28px" }}
                    >
                        📷 Use Camera
                    </button>
                </div>
            </div>
        </div>
    );
}
