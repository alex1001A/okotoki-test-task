import React from "react";

export default function Input({ value, onChange, onKeyUp }) {
  return <input type="text" value={value} onChange={(e) => onChange(e)} onKeyUp={onKeyUp}/>;
}
