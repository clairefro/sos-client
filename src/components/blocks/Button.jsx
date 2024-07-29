function Button({ children, ...rest }) {
  const className = { rest };
  return (
    <button className={`sos-button ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
