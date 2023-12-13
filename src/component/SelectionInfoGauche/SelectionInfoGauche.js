import React from "react";

const LeftEdgeInfo = ({ styleData }) => {
  return (
    <div>
      <h2>Content for the left edge</h2>
      {/* Utilisez styleData pour accéder aux données JSON */}
      <p>{styleData.infos.titre}</p>
      <img className="croix" src="../../media/croix.svg"/>
    </div>
  );
};

export default LeftEdgeInfo;	
