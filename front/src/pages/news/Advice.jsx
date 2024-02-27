import React from "react";

import "../../assets/styles/other/other.css";

import panelImg from "../../assets/images/home/conseils2.png";
import lune from "../../assets/images/home/lune.png";

const Advice = () => {
  const openYouTubeVideo = () => {
    window.open(
      "https://www.youtube.com/embed/8IMpXvpKXbA?si=OywIv7sZe5oWSR5r",
      "_blank"
    );
  };

  return (
    <main className="panel-container">
      <section className="panel-first">
        <h1 className="panel-h1">Conseils</h1>
        <ul className="panel-ul">
          <li>
            <img src={panelImg} alt="panel-title" className="panel-title-img" />
          </li>
          <li>
            <p className="panel-none">
              Que vous soyez un écrivain chevronné ou un novice passionné, nous
              sommes ravis de partager des conseils qui vous aideront à affiner
              vos compétences littéraires, stimuler votre créativité et vous
              guider à travers le processus d'écriture.
            </p>
          </li>
          <li>
            <img src={lune} alt="fond-lune" className="panel-fond-img" />
          </li>
        </ul>
      </section>

      <section className="panel-second" id="advice-panel">
        <section className="panel">
          <h3>Conseils Vidéo : Des Experts Partagent Leurs Astuces</h3>
          <article className="panel-content">
            <p>
              Dans cette vidéo inspirante, des experts littéraires chevronnés
              partagent leurs expériences et offrent des astuces pratiques pour
              vous aider à surmonter les blocages créatifs, à développer des
              intrigues captivantes et à donner vie à vos personnages.
            </p>

            <iframe
              src="https://www.youtube.com/embed/8IMpXvpKXbA?si=OywIv7sZe5oWSR5r"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              onClick={openYouTubeVideo}
              className="panel-iframe"
            ></iframe>
          </article>
        </section>

        <section className="panel">
          <h3>Prochaines Étapes</h3>

          <article className="panel-content">
            <p>
              Maintenant que vous avez exploré nos conseils et astuces, il est
              temps de passer à l'action. La première étape consiste à définir
              clairement vos objectifs d'écriture. Que vous aspiriez à écrire un
              roman captivant, à développer un scénario intrigant ou simplement
              à composer de courtes histoires, il est essentiel d'avoir une
              vision claire de ce que vous souhaitez accomplir.
            </p>
            <p>
              Une fois vos objectifs établis, élaborez un plan d'action détaillé
              pour réaliser vos aspirations littéraires. Identifiez les étapes
              concrètes que vous devez franchir pour progresser dans votre
              projet d'écriture. Que ce soit la recherche, la planification des
              personnages, l'élaboration de l'intrigue ou la rédaction
              proprement dite, chaque étape vous rapproche un peu plus de votre
              objectif final.
            </p>
          </article>
        </section>
      </section>
    </main>
  );
};

export default Advice;
