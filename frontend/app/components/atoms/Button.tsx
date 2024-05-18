'use client';

import React from 'react';
import './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button className="button" onClick={onClick}>{children}</button>
);

export default Button;
