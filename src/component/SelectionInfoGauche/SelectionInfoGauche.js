import React from "react";



const LeftEdgeInfo = ({ styleData, onCloseClick, resetBoxSize }) => {

  const handleCrossClick = () => {
    // Appelez la fonction de rappel pour désactiver le mode personnalisé
    onCloseClick();
  
    resetBoxSize();
  };

  return (
    <section className="container-modal">
      <img className="croix" src="../../media/croix.svg" onClick={handleCrossClick}/>
    </section>
  );
};

export default LeftEdgeInfo;	
