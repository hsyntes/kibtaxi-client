const Button = ({ type, variant, className, onClick, children }) => {
  let classes = `button font-semibold text-sm block rounded-3xl shadow py-2 px-4 ${className} transition-all `;

  switch (variant) {
    case "primary":
      classes += "bg-primary hover:bg-primary-darker";
      break;

    case "blue":
      classes += "bg-blue-600 hover:bg-blue-700 text-white";
      break;
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
