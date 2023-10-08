import "./DragSelection.css";
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const DragSelection = () => {
  const x = useMotionValue(0);
  const xInput = [-600, 0, 600];
  const borderRadius = useTransform(x, xInput, ["5%", "50%", "5%"]);
  const parentRef = useRef(null);

  return (
    <motion.div className="example-container" ref={parentRef}>
      <h1 className="histoire">Histoire</h1>
      <h1 className="instrument">Instrument</h1>
      <h1 className="sous-genres">Sous-genres</h1>
      <motion.div
        style={{ borderRadius, x }}
        className="box"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Contraintes pour empêcher le dépassement de l'écran
        dragElastic={1}
        dragDirectionLock
        dragSnapToOrigin
        whileDrag={{
          scale: 1.5
        }}
      >
        <div className="GenreName">POP</div>
      </motion.div>
    </motion.div>
  );
};

export default DragSelection;
