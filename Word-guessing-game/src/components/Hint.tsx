import React from 'react';

interface HintProps {
  hint: string;
}

export const Hint: React.FC<HintProps> = ({ hint }) => {
  return (
    <div className="hint-container">
      <p className="hint-text">Hint: {hint}</p>
    </div>
  );
};
