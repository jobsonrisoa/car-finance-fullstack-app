'use client';

import React from 'react';
import './Input.css';

type InputProps = {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ type, value, onChange }) => (
  <input className="input" type={type} value={value} onChange={onChange} />
);

export default Input;
