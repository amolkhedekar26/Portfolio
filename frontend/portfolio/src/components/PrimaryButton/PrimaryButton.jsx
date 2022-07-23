import React from "react";
import "./PrimaryButton.css";

function PrimaryButton({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export default PrimaryButton;
