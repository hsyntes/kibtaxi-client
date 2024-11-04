import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const BottomSheet = ({
  show,
  handleCloseBottomSheet,
  height,
  className,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [display, setDisplay] = useState("none");
  const bottomsheetOverlayRef = useRef();

  useEffect(
    function () {
      function handleClickOutSide(e) {
        if (e.target.id === "bottomsheet-overlay") handleCloseBottomSheet();
      }

      document.addEventListener("click", handleClickOutSide, true);

      return () => document.addEventListener("click", handleClickOutSide, true);
    },
    [bottomsheetOverlayRef, handleCloseBottomSheet]
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

  useEffect(
    function () {
      setIsMounted(true);

      return () => setIsMounted(false);
    },
    [isMounted]
  );

  if (!isMounted) return null;

  return createPortal(
    <section
      id="bottomsheet-overlay"
      className="fixed w-screen h-[100svh] top-0 left-0 flex items-center justify-center bg-muted-dark dark:bg-muted select-none z-50"
      style={{ display }}
      ref={bottomsheetOverlayRef}
    >
      <motion.section
        animate={{ translateY: show ? "0%" : "100%" }}
        transition={{ ease: "easeOut", duration: 0.1 }}
        className="absolute bottom-0 w-full flex flex-col bg-white dark:bg-dark rounded-t-3xl border dark:border-none"
      >
        <div className="flex items-center justify-center my-4 flex-[0.05]">
          <div className="w-1/4 bg-muted dark:bg-muted-dark bg-none rounded-full p-[2.5px]" />
        </div>
        <section className={`flex flex-[0.95] flex-col px-6 ${className}`}>
          {children}
        </section>
      </motion.section>
    </section>,
    document.getElementById("bottomsheet-backdrop")
  );
};

export default BottomSheet;
