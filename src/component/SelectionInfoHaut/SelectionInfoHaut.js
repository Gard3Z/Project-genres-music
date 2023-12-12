import React from "react";
import "./SelectionInfoHaut.css";

const TopEdgeInfo = ({ styleData }) => {
  return (
    <section>
        <div>
        <h2 id="info-haut-titre">Le {styleData.infos.titre}</h2>
        {/* Utilisez styleData pour accéder aux données JSON */}
        <p></p>
        </div>
    </section>
  );
};

export default TopEdgeInfo;
