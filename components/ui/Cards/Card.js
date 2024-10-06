const Card = ({ className, children, onClick }) => (
  <div
    className={`card bg-white dark:bg-dark hover:!bg-light hover:dark:!bg-black border dark:border-dark rounded ${className} p-4 transition-all`}
    onClick={onClick}
  >
    {children}
  </div>
);

export default Card;
