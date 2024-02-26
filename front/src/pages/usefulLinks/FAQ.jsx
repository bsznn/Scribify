import React, { useState } from "react";

import "../../assets/styles/book/book.css";
import "../../assets/styles/footer/faq.css";

import lune from "../../assets/images/forms/lune6.png";

import { IoIosArrowForward } from "react-icons/io";

const FAQ = () => {
  const [isOpen, setIsOpen] = useState({
    question1: false,
    question2: false,
    question3: false,
    question4: false,
    question5: false,
    question6: false,
    question7: false,
    question8: false,
  });

  const toggleAnswer = (question) => {
    setIsOpen({ ...isOpen, [question]: !isOpen[question] });
  };

  return (
    <main className="m-container">
      <section className="faq-section">
        <h2>Faq</h2>
        <img src={lune} alt="faq-fond" className="faq-fond" />
        <article className="faq-article">
          <h4 onClick={() => toggleAnswer("question1")}>
            <IoIosArrowForward className="arrow-faq" />
            Qu'est-ce que Scribify?
          </h4>
          {isOpen.question1 && (
            <p className="faq-answer">
              Scribify représente une plateforme d'écriture immersive, dédiée à
              tous les passionnés de la plume. C'est un espace dynamique où les
              auteurs peuvent donner vie à leur créativité littéraire, partager
              leurs récits et s'immerger dans un monde d'écriture collaboratif.
            </p>
          )}
        </article>
        <article>
          <h4 onClick={() => toggleAnswer("question2")}>
            <IoIosArrowForward className="arrow-faq" />
            Comment puis-je m'inscrire sur Scribify?
          </h4>
          {isOpen.question2 && (
            <p className="faq-answer">
              L'inscription à Scribify est simple et rapide. Il vous suffit de
              cliquer sur le bouton "S'inscrire" sur notre page d'accueil, de
              renseigner vos informations de base, et vous voilà prêt à explorer
              un univers riche en écriture et en partage.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question3")}>
            <IoIosArrowForward className="arrow-faq" />
            Est-ce que Scribify propose des fonctionnalités d'édition?
          </h4>
          {isOpen.question3 && (
            <p className="faq-answer">
              Oui, Scribify met à votre disposition des outils d'édition
              intuitifs et puissants. Perfectionnez votre travail directement
              sur la plateforme, explorez divers styles d'écriture, et donnez
              vie à vos idées de manière unique.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question4")}>
            <IoIosArrowForward className="arrow-faq" />
            Puis-je protéger mes écrits sur Scribify?
          </h4>
          {isOpen.question4 && (
            <p className="faq-answer">
              Absolument. La sécurité de vos écrits est notre priorité. Scribify
              intègre des mesures de sécurité avancées pour protéger votre
              travail créatif. Consultez notre politique de confidentialité pour
              obtenir des détails approfondis sur nos engagements en matière de
              sécurité.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question5")}>
            <IoIosArrowForward className="arrow-faq" /> Scribify propose-t-il
            des outils d'évaluation?
          </h4>
          {isOpen.question5 && (
            <p className="faq-answer">
              Oui, Scribify favorise l'échange constructif. Exprimez vos
              impressions en laissant des évaluations sur les œuvres des autres
              auteurs. Cette interaction encourage une communauté d'écrivains
              dévoués à l'amélioration mutuelle et à l'exploration constante de
              nouvelles idées.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question6")}>
            <IoIosArrowForward className="arrow-faq" /> Est-ce que Scribify
            organise des concours d'écriture?
          </h4>
          {isOpen.question6 && (
            <p className="faq-answer">
              Scribify pimente votre expérience d'écriture en organisant
              régulièrement des concours stimulants. Plongez dans ces défis
              créatifs, partagez vos talents et découvrez de nouvelles
              opportunités pour élargir votre horizon littéraire.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question7")}>
            <IoIosArrowForward className="arrow-faq" /> Comment puis-je
            contacter le support client?
          </h4>
          {isOpen.question7 && (
            <p className="faq-answer">
              Notre équipe de support dévouée est disponible pour répondre à
              toutes vos questions. Utilisez le formulaire de contact sur notre
              page de support pour obtenir une assistance personnalisée ou
              résoudre tout problème que vous pourriez rencontrer.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question8")}>
            <IoIosArrowForward className="arrow-faq" />
            Scribify est-il gratuit?
          </h4>
          {isOpen.question8 && (
            <p className="faq-answer">
              Scribify propose une version gratuite qui offre des
              fonctionnalités de base pour tous les auteurs aspirants. Pour une
              expérience plus avancée, dépourvue de publicités, nous offrons
              également des abonnements premium pour répondre à vos besoins
              spécifiques.
            </p>
          )}
        </article>
        <img src={lune} alt="faq-fond" className="faq-fond2" />
      </section>
    </main>
  );
};

export default FAQ;
