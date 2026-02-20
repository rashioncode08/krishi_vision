"use client";

import { useEffect, useRef, useState } from "react";

interface MobileScannerOverlayProps {
  onProcessImage: (file: File) => void;
  onClose: () => void;
}

export default function MobileScannerOverlay({
  onProcessImage,
  onClose,
}: MobileScannerOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [hasCameraError, setHasCameraError] = useState(false);
  const [flashlightSupported, setFlashlightSupported] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);

  // Start Camera
  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;

        // Check if flashlight is supported on the acquired video track
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities() as any;
        if (capabilities && capabilities.torch) {
          setFlashlightSupported(true);
        }
      } catch (err) {
        console.error("Camera access failed", err);
        setHasCameraError(true);
      }
    }

    initCamera();

    return () => {
      // Cleanup: stop camera streams when the component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle Capture
  const handleCapture = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `scan-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          onProcessImage(file);
          onClose(); // Automatically close scanner after capture
        }
      }, "image/jpeg", 0.9);
    }
  };

  // Handle Gallery Selection
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onProcessImage(file);
      onClose(); // Automatically close scanner
    }
  };

  // Toggle Flashlight
  const toggleFlashlight = async () => {
    if (!streamRef.current || !flashlightSupported) return;
    try {
      const track = streamRef.current.getVideoTracks()[0];
      await track.applyConstraints({
        advanced: [{ torch: !isFlashOn }] as any,
      });
      setIsFlashOn(!isFlashOn);
    } catch (err) {
      console.error("Failed to toggle flashlight", err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <span style={{ color: "white", fontSize: "1.2rem", fontWeight: 700 }}>
          Scan Leaf
        </span>
        <button
          onClick={onClose}
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            borderRadius: "50%",
            width: 40,
            height: 40,
            color: "white",
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
          }}
        >
          ✕
        </button>
      </div>

      {/* Main Scanner Area */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Camera Feed */}
        {hasCameraError ? (
          <div style={{ color: "white", textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>📷❌</div>
            <p>Camera access denied or unavailable.</p>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: 8 }}>
              Please allow camera permissions or use the gallery option below.
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Overlay Darkening / Target Window */}
        {!hasCameraError && (
          <>
            {/* Creates a cut-out visual effect by defining borders over the video */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.5)",
                clipPath:
                  "polygon(0% 0%, 0% 100%, 15% 100%, 15% 25%, 85% 25%, 85% 65%, 15% 65%, 15% 100%, 100% 100%, 100% 0%)",
                // Notice the poly path cuts out a center rectangle box: left15%, top25%, right85%, bottom65%
              }}
            />

            {/* Target Box with Brackets & Scanline */}
            <div
              style={{
                position: "absolute",
                top: "25%",
                left: "15%",
                width: "70%",
                height: "40%",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.2)",
              }}
            >
              {/* Animated Scan Line */}
              <div
                style={{
                  width: "100%",
                  height: "2px",
                  background: "#22c55e",
                  position: "absolute",
                  left: 0,
                  boxShadow: "0 0 8px 1px #22c55e",
                  animation: "scanLine 2s linear infinite alternate",
                }}
              />

              {/* Four Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500" />
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes scanLine {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* Bottom Actions */}
      <div
        style={{
          background: "#121212",
          padding: "32px 24px",
          paddingBottom: "48px", // Extra padding for safe area
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Gallery Option */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              borderRadius: "50%",
              width: 56,
              height: 56,
              color: "white",
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginBottom: 8,
            }}
          >
            🖼️
          </button>
          <span style={{ color: "#a1a1aa", fontSize: "0.8rem" }}>Gallery</span>
          
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleGalleryUpload}
          />
        </div>

        {/* Capture Button (Center Pivot) */}
        {!hasCameraError && (
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "40px" }}>
            <button
              onClick={handleCapture}
              style={{
                width: 72,
                height: 72,
                background: "transparent",
                border: "4px solid white",
                borderRadius: "50%",
                padding: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  transition: "transform 0.1s",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </button>
          </div>
        )}

        {/* Flashlight Option */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={toggleFlashlight}
            disabled={!flashlightSupported}
            style={{
              background: isFlashOn ? "white" : "rgba(255, 255, 255, 0.1)",
              border: "none",
              borderRadius: "50%",
              width: 56,
              height: 56,
              color: isFlashOn ? "#000" : "white",
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: flashlightSupported ? "pointer" : "not-allowed",
              opacity: flashlightSupported ? 1 : 0.3,
              marginBottom: 8,
            }}
          >
            🔦
          </button>
          <span style={{ color: "#a1a1aa", fontSize: "0.8rem" }}>Flash</span>
        </div>
      </div>
    </div>
  );
}
