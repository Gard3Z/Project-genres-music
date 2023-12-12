import "./SelectionInfo.css";
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LeftEdgeInfo from "../SelectionInfoGauche/SelectionInfoGauche";
import RightEdgeInfo from "../SelectionInfoDroite/SelectionInfoDroite";
import TopEdgeInfo from "../SelectionInfoHaut/SelectionInfoHaut";

const SelectionInfo = ({styleData}) => {
const defaultContent = <div>{styleData.infos.titre}</div>;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xInput = [-600, 0, 600];
  const yInput = [-300, 0, 300];
  const parentRef = useRef();
  const [infoContent, setInfoContent] = React.useState(defaultContent);
  const [isCustomRadius, setIsCustomRadius] = React.useState(false); // Ajouter un état pour vérifier si la condition est remplie
  const customBorderRadius = "5%"; // Définir le borderRadius personnalisé

  // Utilisez useNavigate pour obtenir la fonction de navigation
  const navigate = useNavigate();

  const handleDragEnd = (event, info) => {
    const screenWidth = window.innerWidth; // Récupérer la largeur de l'écran
    const screenHeight = window.innerHeight; // Récupérer la hauteur de l'écran
    console.log(screenWidth, screenHeight);
    const box = parentRef.current.querySelector(".box")

    if (info.point.x < 250) {
      // Dragged to the left edge
      setInfoContent(<LeftEdgeInfo styleData={styleData}/>);
      box.style.width = "90vw";
      box.style.height = "90vh";
      setIsCustomRadius(true); // Activer le mode personnalisé
    } else if (info.point.x > screenWidth-250) {
      // Dragged to the right edge
      setInfoContent(<RightEdgeInfo styleData={styleData}/>);
      box.style.width = "90vw";
      box.style.height = "90vh";
      setIsCustomRadius(true); // Activer le mode personnalisé
    } else if (info.point.y < 150) {
      // Dragged to the top edge
      setInfoContent(<TopEdgeInfo styleData={styleData}/>);
      box.style.width = "90vw";
      box.style.height = "90vh";
      
      setIsCustomRadius(true); // Activer le mode personnalisé
    } else if (info.point.y > screenHeight-5) {
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
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.5,
          ease: [0, 0.71, 0.1, 1],
        }}
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
        <div className="GenreName">
          {infoContent}
        </div>
      </motion.div>
      <div className="circle-histoire">
      <h2 className="histoire">Histoire</h2>
      </div>
      <div className="circle-sousgenre">
      <h2 className="sous-genre">Sous-genre</h2>
      </div>
      <div className="circle-instruments">
      <h2 className="instruments">Instruments</h2>  
      </div>
    </div>
  );
};

export default SelectionInfo;
