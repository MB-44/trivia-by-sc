import React from "react";

type BackgroundVideoProps = {
  src: string;
};

export default function BackgroundVideo({ src }: BackgroundVideoProps) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="backgroundVideo"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
