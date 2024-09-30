const Card = ({ className, children }) => (
  <div
    className={`card bg-white dark:bg-dark border dark:border-dark rounded ${className} p-4`}
  >
    {children}
  </div>
);

// const CardHeader = ({ className, children }) => (
//   <div className={`card-header flex items-start justify-between ${className}`}>
//     {children}
//   </div>
// );

// const CardBody = ({ className, children }) => (
//   <div className={`card-body ${className}`}>{children}</div>
// );

// const CardFooter = ({ className, children }) => (
//   <div className={`card-footer flex items-center justify-between ${className}`}>
//     {children}
//   </div>
// );

// Card.Header = CardHeader;
// Card.Body = CardBody;
// Card.Footer = CardFooter;

export default Card;
