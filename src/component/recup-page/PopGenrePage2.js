import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';

const PopGenrePage = () => {
  const [popContent, setPopContent] = useState([]);
  const popContentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=List_of_music_genres_and_styles&prop=text&origin=*'
        );

        if (response.data && response.data.parse && response.data.parse.text) {
          const pageContent = response.data.parse.text['*'];
          const $popContent = $("<div>").html(pageContent); // Convertir le texte en éléments jQuery
          
          // Utiliser jQuery pour extraire le contenu entre les balises h2 "Histoire" et la prochaine balise h2
          const extractedContent = $popContent.find("div").nextUntil("div").clone();

          // Récupérer les balises h2 "Histoire" également
          const h2Elements = $popContent.find("h2").clone();

          // Mettre à jour le contenu d'affichage
          setPopContent([...h2Elements.toArray(), ...extractedContent.toArray()]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (popContent.length > 0 && popContentRef.current) {
      popContentRef.current.innerHTML = ''; // Effacer le contenu précédent

      // Ajouter chaque élément au DOM
      popContent.forEach(element => {
        popContentRef.current.appendChild(element);
      });
    }
  }, [popContent]);

  return (
    <div>
      <h1>Pop Music Wikipedia Info</h1>
      <div className="pop-content" ref={popContentRef} />
      <style>
        {`
          /* Ajoutez vos styles CSS personnalisés ici */
          .pop-content {
            margin: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            background-color: #f7f7f7;
            color: #333;
          }
        `}
      </style>
    </div>
  );
};

export default PopGenrePage;
