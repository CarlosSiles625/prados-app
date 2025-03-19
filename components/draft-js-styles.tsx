"use client";
import React from "react";

const DraftJsStyles: React.FC = () => {
  return (
    <style jsx global>{`
      .DraftEditor-root {
        position: relative;
      }
      .public-DraftEditor-content {
        min-height: 150px;
      }
      .public-DraftEditorPlaceholder-root {
        position: absolute;
        color: #aaa;
      }
    `}</style>
  );
};

export default DraftJsStyles;
