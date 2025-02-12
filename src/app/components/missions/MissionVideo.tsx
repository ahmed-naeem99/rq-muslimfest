import React from "react";

interface MissionVideoProps {
  videoLink: string;
  mission: number;
}

const MissionVideo: React.FC<MissionVideoProps> = ({ videoLink, mission }) => {
  return (
    <div className="w-full flex justify-center">
      <iframe
        className="w-full h-72 rounded-lg shadow-lg"
        src={videoLink}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={`Mission ${mission} Video`}
      ></iframe>
    </div>
  );
};

export default MissionVideo;
