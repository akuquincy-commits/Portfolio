import { useRef, useState } from "react";
import "./Button.css";

export function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
  ...props
}) {
  const [press, setPress] = useState(0);
  const buttonRef = useRef(null);

  const handlePointerDown = () => setPress(1);
  const handlePointerUp = () => setPress(0);
  const handlePointerLeave = () => setPress(0);

  const variantClass =
    variant === "primary"
      ? "soap-bubble-button--primary"
      : "soap-bubble-button--secondary";

  const sizeClass =
    size === "sm"
      ? "soap-bubble-button--sm"
      : size === "lg"
      ? "soap-bubble-button--lg"
      : "";

  return (
    <Component
      ref={buttonRef}
      className={`soap-bubble-surface soap-bubble-button ${variantClass} ${sizeClass} ${className}`.trim()}
      style={{ "--soap-bubble-press": press }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      {...props}
    >
      <span className="soap-bubble-button-content">{children}</span>
    </Component>
  );
}

export const SoapBubbleButton = Button;

export default Button;

