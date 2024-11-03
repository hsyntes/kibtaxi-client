import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Modal = ({ show, handleCloseModal, className, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [display, setDisplay] = useState("none");
  const modalOverlayRef = useRef();

  if (typeof window !== "undefined")
    window.addEventListener("keyup", function (e) {
      if (e.key === "Escape") handleCloseModal();
    });

  useEffect(
    function () {
      function handleClickOutSide(e) {
        if (e.target.id === "modal-overlay") handleCloseModal();
      }

      document.addEventListener("click", handleClickOutSide, true);

      return () => document.addEventListener("click", handleClickOutSide, true);
    },
    [modalOverlayRef, handleCloseModal]
  );

  useEffect(
    function () {
      const identifier = setTimeout(function () {
        if (!show) setDisplay("none");
      }, 100);

      if (show) setDisplay("block");

      return () => clearTimeout(identifier);
    },

    [show]
  );

  useEffect(
    function () {
      if (show) document.body.style.overflow = "hidden";
      if (!show) document.body.style.overflow = "auto";
    },
    [show]
  );

  useEffect(function () {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <section
      id="modal-overlay"
      className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-muted-dark dark:bg-muted select-none z-50"
      style={{ display }}
      ref={modalOverlayRef}
    >
      <motion.section
        initial={{ scale: 1.1 }}
        animate={{ scale: show ? [1.1, 1] : [1, 0.9] }}
        className={`modal absolute top-1/2 left-1/2 w-3/4 xl:w-1/2 bg-white dark:bg-dark rounded-lg border dark:border-dark shadow py-6 px-8 z-50 ${className}`}
        style={{
          transformOrigin: "center",
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {children}
      </motion.section>
    </section>,
    document.getElementById("modal-backdrop")
  );
};

const ModalHeader = ({ className, children }) => (
  <div className={`modal-header ${className}`}>{children}</div>
);

const ModalBody = ({ classNmae, onClick, children }) => (
  <div className={`modal-body ${classNmae}`} onClick={onClick}>
    {children}
  </div>
);

const ModalFooter = ({ className, children }) => (
  <div className={`modal-footer ${className}`}>{children}</div>
);

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
