import React from "react";

import "../../assets/styles/other/other.css";

import panelImg from "../../assets/images/home/recrutement2.png";
import lune from "../../assets/images/home/lune.png";

const Recruitement = () => {
  return (
    <main className="panel-container">
      <section className="panel-first">
        <h1 className="panel-h1">Recrutement</h1>
        <ul className="panel-ul">
          <li>
            <img
              src={panelImg}
              alt="panel-title"
              className="panel-title-img"
              aria-label="panel-title"
              title="panel-title"
            />
          </li>
          <li>
            <p className="panel-none">
              Chez Scribify, nous sommes constamment à la recherche de talents
              passionnés et créatifs pour renforcer notre équipe dédiée à
              l'épanouissement de la communauté littéraire. Si vous partagez
              notre passion pour l'écriture et l'innovation, alors Scribify est
              l'endroit idéal pour vous.
            </p>
          </li>
          <li>
            <img src={lune} alt="fond-lune" className="panel-fond-img" />
          </li>
        </ul>
      </section>

      <section className="panel-second" id="recruitement-panel">
        <section className="panel">
          <h3>Qui Nous Recrutons</h3>
          <article className="panel-content">
            <p>
              Chez Scribify, nous recherchons des individus passionnés par
              l'écriture, la technologie et la construction de communautés. Que
              vous soyez un développeur talentueux, un designer créatif, un
              expert en marketing, ou un passionné des médias sociaux, nous
              sommes intéressés par des esprits innovants prêts à contribuer à
              notre mission commune.
            </p>

            <h4>Positions Ouvertes</h4>

            <ol>
              <li>
                <strong> Développeurs Full Stack </strong>: Expérience avec les
                technologies Node.js, React, et MongoDB.
              </li>
              <li>
                <strong> Graphistes / Designers UX : </strong>Compétences
                avancées dans la conception graphique et l'expérience
                utilisateur.
              </li>
            </ol>
          </article>
        </section>

        <section className="panel">
          <h3>Comment Postuler</h3>

          <article className="panel-content">
            <p>
              Si vous êtes prêt à rejoindre l'équipe Scribify, envoyez votre CV
              et une lettre de motivation décrivant votre expérience, votre
              passion pour l'écriture, et la manière dont vous pouvez contribuer
              à "Scribify@gmail.com".
            </p>
            <p>
              Scribify offre un environnement de travail stimulant, des
              opportunités de croissance professionnelle, et la chance de
              participer à la création d'une plateforme qui inspire et connecte
              les écrivains du monde entier.
            </p>
            <p>
              Nous valorisons la diversité et l'inclusion, et nous sommes
              impatients de travailler avec des individus talentueux et
              passionnés qui partagent notre vision. Rejoignez-nous dans cette
              aventure littéraire et aidez-nous à façonner l'avenir de
              l'écriture en ligne.
            </p>
          </article>
        </section>
      </section>
    </main>
  );
};

export default Recruitement;
