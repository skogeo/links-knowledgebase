// FileComponent.js

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';

export const FileComponent = ({ name }) => {
  return (
    <div className="file-card">
      <div className="file-icon">📄</div>
      <div className="file-name">{name}</div>
    </div>
  );
};
