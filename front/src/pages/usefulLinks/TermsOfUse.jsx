import React, { useState } from "react";

import "../../assets/styles/book/book.css";
import "../../assets/styles/footer/faq.css";

import lune from "../../assets/images/forms/lune8.png";

import { IoIosArrowForward } from "react-icons/io";

const TermsOfUse = () => {
  const [isOpen, setIsOpen] = useState({
    question1: false,
    question2: false,
    question3: false,
    question4: false,
    question5: false,
    question6: false,
  });

  const toggleAnswer = (question) => {
    setIsOpen({ ...isOpen, [question]: !isOpen[question] });
  };

  return (
    <main className="m-container">
      <section className="faq-section" id="term-section">
        <h2>Mentions Légales</h2>
        <img src={lune} alt="faq-fond" className="term-fond" />
        <article className="faq-article">
          <h4 onClick={() => toggleAnswer("question1")}>
            <IoIosArrowForward className="arrow-faq" />
            Conditions d'utilisation
          </h4>
          {isOpen.question1 && (
            <>
              <p className="faq-answer">
                Veuillez lire attentivement ces conditions d'utilisation
                ("Conditions", "Conditions d'utilisation") avant d'utiliser la
                plateforme Scribify (ci-après dénommée "Scribify"). En accédant
                ou en utilisant Scribify, vous acceptez d'être lié par ces
                Conditions. Si vous n'acceptez pas toutes les conditions
                énoncées ici, veuillez ne pas utiliser Scribify.
              </p>
            </>
          )}
        </article>
        <article>
          <h4 onClick={() => toggleAnswer("question2")}>
            <IoIosArrowForward className="arrow-faq" />
            Compte
          </h4>
          {isOpen.question2 && (
            <p className="faq-answer">
              Vous comprenez que tout le contenu publié sur Scribify, y compris
              mais sans s'y limiter, les textes, les images, les vidéos, les
              commentaires et tout autre matériel ("Contenu"), est la seule
              responsabilité de la personne qui l'a publié. Vous acceptez que
              tout le Contenu auquel vous accédez en utilisant Scribify soit à
              vos propres risques.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question3")}>
            <IoIosArrowForward className="arrow-faq" />
            Utilisation acceptable
          </h4>
          {isOpen.question3 && (
            <p className="faq-answer">
              Vous vous engagez à n'utiliser Scribify qu'à des fins légales et
              conformément à ces Conditions. Vous acceptez de ne pas utiliser
              Scribify de manière à :
              <ol>
                <li>
                  Violer les lois locales, nationales ou internationales
                  applicables.
                </li>
                <li>
                  Enfreindre les droits de propriété intellectuelle de tiers.
                </li>
                <li>
                  Harceler, maltraiter, diffamer, menacer ou violer les droits
                  légaux d'autrui.
                </li>
                <li>
                  Collecter ou suivre les informations personnelles d'autrui.
                </li>
                <li>
                  Transmettre ou propager des virus, des logiciels malveillants
                  ou tout autre code nuisible.
                </li>
              </ol>
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question4")}>
            <IoIosArrowForward className="arrow-faq" />
            Résiliation
          </h4>
          {isOpen.question4 && (
            <p className="faq-answer">
              Nous nous réservons le droit de résilier ou de suspendre votre
              accès à Scribify immédiatement, sans préavis ni responsabilité,
              pour quelque raison que ce soit, y compris sans limitation si vous
              violez les Conditions.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question5")}>
            <IoIosArrowForward className="arrow-faq" />
            Modification
          </h4>
          {isOpen.question5 && (
            <p className="faq-answer">
              Nous nous réservons le droit, à notre seule discrétion, de
              modifier ou de remplacer ces Conditions à tout moment. Si une
              révision est importante, nous essaierons de fournir un avis au
              moins 30 jours avant que les nouvelles conditions n'entrent en
              vigueur. Ce que vous pouvez faire si vous ne les acceptez pas est
              de cesser d'utiliser Scribify.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question6")}>
            <IoIosArrowForward className="arrow-faq" />
            Contactez-nous
          </h4>
          {isOpen.question6 && (
            <p className="faq-answer">
              Si vous avez des questions concernant ces Conditions, veuillez
              nous contacter à l'adresse suivante : "Scribify@gmail.com".
            </p>
          )}
        </article>

        <img src={lune} alt="faq-fond" className="term-fond2" />
      </section>
    </main>
  );
};

export default TermsOfUse;
