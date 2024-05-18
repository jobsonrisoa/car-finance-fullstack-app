'use client';

import React from 'react';
import './Button.css';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string; // Allow className as a prop
};

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => (
  <button className={`button ${className}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;
