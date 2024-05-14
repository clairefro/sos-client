function Button({ children, ...rest }) {
  return (
    <button className="sos-button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
