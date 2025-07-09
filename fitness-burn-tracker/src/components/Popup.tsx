// Popup.tsx
// Simple motivational popup component
import React from 'react';

interface PopupProps {
  message: string;
  visible: boolean;
}

const Popup: React.FC<PopupProps> = ({ message, visible }) => {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s',
        background: '#fffbe6',
        color: '#b8860b',
        border: '1px solid #ffe58f',
        borderRadius: 8,
        padding: '12px 24px',
        position: 'relative',
        margin: '0 auto',
        fontWeight: 600,
        fontSize: 18,
        boxShadow: '0 2px 8px #ffe58f',
        pointerEvents: 'none',
        minHeight: 32,
        maxWidth: 320,
        zIndex: 2,
        display: visible ? 'block' : 'none', // Hide completely when not visible
      }}
    >
      {message}
    </div>
  );
};

export default Popup; 