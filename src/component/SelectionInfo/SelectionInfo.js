import "./SelectionInfo.css";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LeftEdgeInfo from "../SelectionInfoGauche/SelectionInfoGauche";
import RightEdgeInfo from "../SelectionInfoDroite/SelectionInfoDroite";
import TopEdgeInfo from "../SelectionInfoHaut/SelectionInfoHaut";

const SelectionInfo = ({ styleData }) => {
  const defaultContent = <div>{styleData.infos.titre}</div>;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xInput = [-600, 0, 600];
  const yInput = [-300, 0, 300];
  const parentRef = useRef();
  const [infoContent, setInfoContent] = useState(defaultContent);
  const [isCustomRadius, setIsCustomRadius] = useState(false); // Ajouter un état pour vérifier si la condition est remplie
  const customBorderRadius = "5%"; // Définir le borderRadius personnalisé
  const MAGNETIC_THRESHOLD = 50; // Adjust as needed for the magnetic effect

  // Utilisez useNavigate pour obtenir la fonction de navigation
  const navigate = useNavigate();

  const handleDragEnd = (event, info) => {
    const screenWidth = window.innerWidth; // Récupérer la largeur de l'écran
    const screenHeight = window.innerHeight; // Récupérer la hauteur de l'écran
    console.log(screenWidth, screenHeight);
    const box = parentRef.current.querySelector(".box");

    if (info.point.x < 250) {
      // Dragged to the left edge
      setInfoContent(<LeftEdgeInfo styleData={styleData} />);
      box.style.width = "90vw";
      box.style.height = "90vh";
      setIsCustomRadius(true); // Activer le mode personnalisé
    } else if (info.point.x > screenWidth - 250) {
      // Dragged to the right edge
      setInfoContent(<RightEdgeInfo styleData={styleData} onCloseClick={handleCustomModeDisable} resetBoxSize={resetBoxSize} />);
      box.style.width = "90vw";
      box.style.height = "90vh";
      setIsCustomRadius(true); // Activer le mode personnalisé
    } else if (info.point.y < 150) {
      // Dragged to the top edge
      setInfoContent(<TopEdgeInfo styleData={styleData} />);
      box.style.width = "90vw";
      box.style.height = "90vh";

      setIsCustomRadius(true); // Activer le mode personnalisé
    } else if (info.point.y > screenHeight - 300) {
      console.log(info.point.y);
      // Dragged to the bottom edge
      setInfoContent("Content for the bottom edge");
      box.style.width = "90vw";
      box.style.height = "90vh";
      setIsCustomRadius(true); // Activer le mode personnalisé
      navigate("/");
    } else {
      setInfoContent(defaultContent);
      setIsCustomRadius(false); // Désactiver le mode personnalisé
    }
  };

  const borderRadius = useTransform(
    x,
    xInput,
    isCustomRadius ? [customBorderRadius, customBorderRadius, customBorderRadius] : ["5%", "50%", "5%"]
  );

  // Désactivez le drag lorsque le mode personnalisé est activé
  const isDragEnabled = !isCustomRadius;

  const handleCustomModeDisable = () => {
    setIsCustomRadius(false);
    setInfoContent(defaultContent);
  };
  
  const resetBoxSize = () => {
    // Réinitialisez la taille de la boîte à sa valeur initiale
    const box = parentRef.current.querySelector(".box");
    if (box) {
      box.style.width = ""; // Réinitialisez la largeur à la valeur par défaut (vide)
      box.style.height = ""; // Réinitialisez la hauteur à la valeur par défaut (vide)
    }
  };

  return (
    <div className="example-container" ref={parentRef}>
      <motion.div
        style={{
          x,
          y,
          touchAction: "none",
          borderRadius,
        }}
        className="box"
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1}} // Utilisez le contrôle d'animation pour l'animation de la boîte
        transition={{duration: 0.5}}

        drag={isDragEnabled} // Activez ou désactivez le drag en fonction de isCustomRadius
        dragConstraints={parentRef}
        dragDirectionLock
        dragSnapToOrigin
        dragElastic={0.1}
        whileDrag={{
          scale: 1.1,
        }}
        onDragEnd={handleDragEnd}
      >
        <div className="GenreName">{infoContent}</div>
      </motion.div>
        <h2 className="histoire">Histoire</h2>
        <h2 className="sous-genre">Sous-genre</h2>
        <h2 className="instruments">Instruments</h2>
        <img className="maison" src="../../media/maison.svg"/>  
    </div>
  );
};

export default SelectionInfo;
