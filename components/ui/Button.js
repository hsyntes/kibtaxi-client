const Button = ({ type, variant, className, children }) => {
  let classes = `button font-semibold text-sm block rounded-3xl shadow py-2 px-4 ${className} transition-all `;

  switch (variant) {
    case "primary":
      classes += "bg-primary hover:bg-primary-darker";
      break;

    case "blue":
      classes += "bg-blue-600 hover:bg-blue-700";
      break;
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
