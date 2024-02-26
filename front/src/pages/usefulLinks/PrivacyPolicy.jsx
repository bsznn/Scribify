import React, { useState } from "react";

import "../../assets/styles/book/book.css";
import "../../assets/styles/footer/faq.css";

import lune from "../../assets/images/forms/lune7.png";

import { IoIosArrowForward } from "react-icons/io";

const PrivacyPolicy = () => {
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
      <section className="faq-section" id="privacy-section">
        <h2>Confidentialité</h2>
        <img src={lune} alt="faq-fond" className="privacy-fond" />
        <article className="faq-article">
          <h4 onClick={() => toggleAnswer("question1")}>
            <IoIosArrowForward className="arrow-faq" />
            Politique de confidentialité
          </h4>
          {isOpen.question1 && (
            <>
              <p className="faq-answer">
                La confidentialité des utilisateurs de Scribify est très
                importante pour nous. Cette Politique de confidentialité décrit
                les types d'informations que nous collectons auprès de vous ou
                que vous nous fournissez lorsque vous utilisez notre plateforme
                Scribify (ci-après dénommée "Scribify"), ainsi que notre
                utilisation de ces informations. En utilisant Scribify, vous
                acceptez les pratiques décrites dans cette Politique de
                confidentialité. Veuillez lire attentivement cette Politique de
                confidentialité avant de commencer à utiliser Scribify.
              </p>
            </>
          )}
        </article>
        <article>
          <h4 onClick={() => toggleAnswer("question2")}>
            <IoIosArrowForward className="arrow-faq" />
            Collecte d'informations et utilisation
          </h4>
          {isOpen.question2 && (
            <p className="faq-answer">
              Nous collectons et utilisons plusieurs types d'informations pour
              diverses fins afin de fournir et d'améliorer notre service auprès
              de nos utilisateurs.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question3")}>
            <IoIosArrowForward className="arrow-faq" />
            Informations personnelles
          </h4>
          {isOpen.question3 && (
            <p className="faq-answer">
              Lorsque vous créez un compte Scribify, nous pouvons vous demander
              de fournir certaines informations personnelles identifiables qui
              peuvent être utilisées pour vous contacter ou vous identifier
              ("Informations personnelles"). Les informations personnelles
              peuvent inclure, sans s'y limiter :
              <ol>
                <li>Adresse e-mail</li>
                <li>Nom d'utilisateur</li>
                <li>Mot de passe</li>
              </ol>
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question4")}>
            <IoIosArrowForward className="arrow-faq" /> Données d'utilisation
          </h4>
          {isOpen.question4 && (
            <p className="faq-answer">
              Nous pouvons également collecter des informations sur la manière
              dont vous accédez et utilisez Scribify ("Données d'utilisation").
              Ces données d'utilisation peuvent inclure des informations telles
              que votre adresse IP, le type de navigateur, la version du
              navigateur, les pages de notre service que vous visitez, l'heure
              et la date de votre visite, le temps passé sur ces pages, et
              d'autres statistiques.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question5")}>
            <IoIosArrowForward className="arrow-faq" />
            Cookies
          </h4>
          {isOpen.question5 && (
            <p className="faq-answer">
              Les cookies sont des fichiers avec une petite quantité de données
              qui peuvent inclure un identifiant unique anonyme. Scribify
              utilise des cookies pour collecter des informations et améliorer
              notre service. Vous avez la possibilité de refuser nos cookies si
              vous le souhaitez et de continuer à utiliser notre service.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question6")}>
            <IoIosArrowForward className="arrow-faq" />
            Divulgation des données
          </h4>
          {isOpen.question6 && (
            <p className="faq-answer">
              Scribify peut divulguer vos informations personnelles dans les
              circonstances suivantes :
              <ol>
                <li>Pour se conformer à une obligation légale</li>
                <li>
                  Pour protéger et défendre les droits ou la propriété de
                  Scribify
                </li>
                <li>
                  Pour prévenir ou enquêter sur d'éventuelles violations de nos
                  conditions d'utilisation
                </li>
              </ol>
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question7")}>
            <IoIosArrowForward className="arrow-faq" />
            Sécurité des données
          </h4>
          {isOpen.question7 && (
            <p className="faq-answer">
              La sécurité de vos données est importante pour nous, mais
              n'oubliez pas qu'aucune méthode de transmission sur Internet ou
              méthode de stockage électronique n'est sécurisée à 100 %. Bien que
              nous nous efforcions d'utiliser des moyens commercialement
              acceptables pour protéger vos informations personnelles, nous ne
              pouvons garantir leur sécurité absolue.
            </p>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question8")}>
            <IoIosArrowForward className="arrow-faq" />
            Contactez-nous
          </h4>
          {isOpen.question8 && (
            <p className="faq-answer">
              Si vous avez des questions concernant cette Politique de
              confidentialité, veuillez nous contacter à l'adresse suivante :
              "Scribify@gmail.com".
            </p>
          )}
        </article>
        <img src={lune} alt="faq-fond" className="privacy-fond2" />
      </section>
    </main>
  );
};

export default PrivacyPolicy;
