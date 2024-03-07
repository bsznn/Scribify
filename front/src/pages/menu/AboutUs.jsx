import React, { useState } from "react";

import "../../assets/styles/book/book.css";
import "../../assets/styles/footer/faq.css";

import lune from "../../assets/images/forms/lune9.png";

import { IoIosArrowForward } from "react-icons/io";

const AboutUs = () => {
  // Utilisation du hook useState pour gérer l'état des questions ouvertes/fermées
  const [isOpen, setIsOpen] = useState({
    question1: false,
    question2: false,
    question3: false,
    question4: false,
    question5: false,
    question6: false,
  });

  // Fonction pour basculer l'état d'une question ouverte/fermée
  const toggleAnswer = (question) => {
    setIsOpen({ ...isOpen, [question]: !isOpen[question] });
  };

  return (
    <main className="m-container">
      {/* Section principale */}
      <section className="faq-section" id="aboutus-section">
        <h2>À Propos</h2>
        <img src={lune} alt="faq-fond" className="aboutus-fond" />
        <article className="faq-article">
          {/* Titre de la première question avec icône de flèche */}
          <h4 onClick={() => toggleAnswer("question1")}>
            <IoIosArrowForward className="arrow-aboutus" />
            Notre Mission
          </h4>
          {/* Affichage de la réponse si la question est ouverte */}
          {isOpen.question1 && (
            <>
              <p className="faq-answer">
                Notre mission chez Scribify est de fournir un espace virtuel où
                les auteurs de tous horizons peuvent s'exprimer, explorer, et
                participer à une expérience d'écriture personnelle et
                enrichissante. Nous aspirons à encourager la créativité, à
                stimuler l'imagination, et à cultiver une communauté dynamique
                et inclusive.
              </p>
            </>
          )}
        </article>

        <article className="faq-article">
          <h4 onClick={() => toggleAnswer("question2")}>
            <IoIosArrowForward className="arrow-aboutus" />
            Nos Valeurs
          </h4>
          {isOpen.question2 && (
            <>
              <p className="faq-answer">
                Nos Valeurs Chez Scribify, la créativité, l'inclusion et la
                qualité sont nos piliers. Nous croyons fermement en l'importance
                de chaque voix, guidés par l'intégrité et un engagement constant
                envers l'amélioration. Ensemble, nous créons un espace où
                l'écriture et la créativité s'épanouissent, inspirant chacun à
                partager son histoire unique.
              </p>
            </>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question3")}>
            <IoIosArrowForward className="arrow-aboutus" />
            Ce que nous Offrons
          </h4>
          {isOpen.question3 && (
            <p className="faq-answer">
              <ol>
                <li>
                  Créativité Sans Limite : Sur Scribify, votre imagination est
                  la seule limite. Exprimez-vous à travers des récits, des
                  poèmes, des essais, et bien plus encore. Notre plateforme
                  offre des outils d'édition intuitifs pour donner vie à vos
                  idées.
                </li>

                <li>
                  Communauté Engagée : Rejoignez une communauté d'écrivains
                  passionnés. Partagez vos œuvres, découvrez celles des autres,
                  et échangez des idées constructives pour faire évoluer votre
                  art.
                </li>

                <li>
                  Concours Stimulants : Testez vos compétences créatives en
                  participant à nos concours d'écriture réguliers. Des thèmes
                  captivants, des défis uniques et la possibilité de remporter
                  des récompenses excitantes vous attendent.
                </li>
              </ol>
            </p>
          )}
        </article>
        <article>
          <h4 onClick={() => toggleAnswer("question4")}>
            <IoIosArrowForward className="arrow-aboutus" />
            Notre Engagement envers la Sécurité
          </h4>
          {isOpen.question4 && (
            <p className="faq-answer">
              Chez Scribify, la protection de vos écrits est primordiale. Nous
              employons des mesures de sécurité avancées pour garantir la
              confidentialité de votre travail et vous offrir une expérience
              d'écriture sans souci.
            </p>
          )}
        </article>
        <article>
          <h4 onClick={() => toggleAnswer("question5")}>
            <IoIosArrowForward className="arrow-aboutus" />
            Notre Équipe
          </h4>
          {isOpen.question5 && (
            <p className="faq-answer">
              Notre équipe chez Scribify est une fusion dynamique de passionnés
              de l'écriture, de développeurs web et de designers, unis par notre
              engagement envers l'excellence. Avec une collaboration étroite et
              une créativité sans limites, nous mettons notre expertise au
              service de notre communauté d'écrivains, créant ainsi une
              expérience d'écriture exceptionnelle. Nous valorisons profondément
              notre communauté et nous nous engageons à offrir une plateforme
              qui inspire, encourage et soutient chaque membre de Scribify dans
              son voyage créatif.
            </p>
          )}
        </article>
        <article>
          <h4 onClick={() => toggleAnswer("question6")}>
            <IoIosArrowForward className="arrow-aboutus" />
            Rejoignez-nous sur ce Voyage Littéraire
          </h4>
          {isOpen.question6 && (
            <p className="faq-answer">
              Scribify a été créé pour être plus qu'une simple plateforme
              d'écriture ; c'est une communauté qui célèbre la diversité des
              voix, des styles et des récits. Rejoignez-nous dans cette aventure
              littéraire où chaque mot compte, et chaque histoire trouve son
              écho. Inscrivez-vous dès maintenant et plongez dans l'univers
              captivant de Scribify. Ensemble, écrivons des histoires qui
              perdureront.
            </p>
          )}
        </article>
        <img src={lune} alt="faq-fond" className="aboutus-fond2" />
      </section>
    </main>
  );
};

export default AboutUs;
