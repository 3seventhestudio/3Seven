import "./Button.css";

function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;