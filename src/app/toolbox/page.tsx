"use client";
import React from "react";

const ToolBoxPage = () => {
  const slidesUrl =
    "https://docs.google.com/presentation/d/1E-Ddrsp7EcEvfxUL5wkDd_qLA4ubDTfYkz_jNcDgzKo/edit";

  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    if (url.includes("/edit")) {
      return url.replace("/edit", "/embed");
    }

    if (!url.includes("/embed")) {
      const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        return `https://docs.google.com/presentation/d/${match[1]}/embed`;
      }
    }

    return url;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Your Toolbox
      </h1>

      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative w-full pt-[56.25%]">
          {" "}
          <iframe
            src={getEmbedUrl(slidesUrl)}
            className="absolute top-0 left-0 w-full h-full border-none"
            allowFullScreen={true}
            title="Google Slides Presentation"
          ></iframe>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white dark:bg-neutral-900 rounded-lg dark:text-white shadow-md outline outline-2 dark:outline-red-900 outline-red-600">
        <h2 className="text-xl font-semibold mb-2">About:</h2>
        <p>
          These slides contain important resources you may/may not take
          advantage of along your journey. You can navigate through the slides
          using the controls in the embedded viewer or use the full-screen
          option for a better experience.
        </p>
      </div>
    </div>
  );
};

export default ToolBoxPage;
