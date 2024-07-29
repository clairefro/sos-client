function ButtonSecondary({ children, className, ...rest }) {
  return (
    <button
      className={`sos-button sos-button-secondary ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default ButtonSecondary;
