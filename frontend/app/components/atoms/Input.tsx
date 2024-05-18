'use client';

import React from 'react';
import './Input.css';

type InputProps = {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
};

const Input: React.FC<InputProps> = ({ type, value, onChange, onClick }) => (
  <input className="input" type={type} value={value} onChange={onChange} onClick={onClick} />
);

export default Input;
