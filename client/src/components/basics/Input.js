import React from 'react';
import {Input as RawComp} from "antd";
const TextArea = RawComp.TextArea;

const Input = ({placeholder, value, onChange, disabled, ...props}) => {
  return (
    <RawComp placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} disabled={disabled} {...props} />
  )
};

export const Textarea = ({placeholder, value, onChange, disabled, ...props}) => {
  return (
    <TextArea placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} disabled={disabled} {...props} />
  )
};

export default Input;
