import React, { useState } from "react";
import "../../assets/styles/book/book.css";
import "../../assets/styles/footer/faq.css";
import lune from "../../assets/images/forms/lune10.png";
import { IoIosArrowForward } from "react-icons/io";

const Contact = () => {
  const [isOpen, setIsOpen] = useState({
    question1: false,
    question2: false,
    question3: false,
    question4: false,
    question5: false,
  });

  const toggleAnswer = (question) => {
    setIsOpen({ ...isOpen, [question]: !isOpen[question] });
  };

  return (
    <main className="m-container">
      <section className="faq-section" id="contact-section">
        <h2>Contact</h2>
        <img src={lune} alt="faq-fond" className="contact-fond" />
        <article className="faq-article">
          <h4 onClick={() => toggleAnswer("question1")}>
            <IoIosArrowForward className="arrow-faq" />
            Adresse
          </h4>
          {isOpen.question1 && (
            <ul>
              <li>123 Rue de la Poésie,</li>
              <li>75001 Paris,</li>
              <li>France</li>
            </ul>
          )}
        </article>
        <article>
          <h4 onClick={() => toggleAnswer("question2")}>
            <IoIosArrowForward className="arrow-faq" />
            Horaires d'Ouverture
          </h4>
          {isOpen.question2 && (
            <ul>
              <li>Lundi - Vendredi: 9h00 - 18h00</li>
              <li>Samedi - Dimanche: Fermé</li>
            </ul>
          )}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question3")}>
            <IoIosArrowForward className="arrow-faq" />
            Email
          </h4>
          {isOpen.question3 && <p className="faq-answer">Scribify@gmail.com</p>}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question4")}>
            <IoIosArrowForward className="arrow-faq" />
            Téléphone
          </h4>
          {isOpen.question4 && <p className="faq-answer">+33 1 23 45 67 89</p>}
        </article>

        <article>
          <h4 onClick={() => toggleAnswer("question5")}>
            <IoIosArrowForward className="arrow-faq" />
            Carte
          </h4>
          {isOpen.question5 && (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.057969042971!2d2.3470596156751826!3d48.858373280492645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1646128761426!5m2!1sen!2sfr"
              width="95%"
              height="300"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          )}
        </article>
        <img src={lune} alt="faq-fond" className="contact-fond2" />
      </section>
    </main>
  );
};

export default Contact;
