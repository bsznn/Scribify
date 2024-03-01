import React from "react";
import "../../assets/styles/other/other.css";

import panelImg from "../../assets/images/home/concours2.png";
import lune from "../../assets/images/home/lune.png";

const Competition = () => {
  return (
    <main className="panel-container">
      <section className="panel-first">
        <h1 className="panel-h1">Concours</h1>
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
              Explorez nos concours d'écriture en cours et préparez-vous à
              laisser libre cours à votre créativité. Rejoignez la communauté
              Scribify et participez pour avoir la chance de remporter des
              récompenses passionnantes et de voir votre talent d'écrivain
              briller !
            </p>
          </li>
          <li>
            <img src={lune} alt="fond-lune" className="panel-fond-img" />
          </li>
        </ul>
      </section>

      <section className="panel-second">
        <section className="panel">
          <h3>Concours Actuels</h3>
          <article className="panel-content">
            <h4> Concours "Voyage Imaginaire"</h4>
            <ul>
              <li>
                <strong>Du 15 Février 2024 au 31 Mars 2024 </strong>
              </li>

              <li>
                <strong>Thème : </strong> Explorez des mondes imaginaires, créez
                des univers uniques et partagez vos voyages extraordinaires.
              </li>
              <li>
                <strong>Récompenses :</strong>
                <ul>
                  <li>
                    Premier Prix : Certificat d'Excellence Scribify +
                    Publication sur la Page d'Honneur
                  </li>
                  <li>
                    Deuxième Prix : Certificat de Réalisation Scribify + Mise en
                    Avant sur les Réseaux Sociaux
                  </li>
                  <li>
                    Troisième Prix : Certificat de Participation Scribify +
                    Feedback personnalisé
                  </li>
                </ul>
              </li>
            </ul>
          </article>
        </section>

        <section className="panel">
          <h3>Comment participer</h3>
          <article className="panel-content">
            <p>
              <strong>Inscrivez-vous ou Connectez-vous : </strong>Assurez-vous
              d'être un membre de Scribify pour pouvoir participer aux concours.
            </p>
            <p>
              <strong>Créez votre Chef-d'œuvre : </strong>Laissez votre
              imagination s'exprimer en créant une œuvre en accord avec le thème
              du concours.
            </p>
            <p>
              <strong>Soumettez votre Œuvre : </strong>Utilisez la plateforme
              Scribify pour soumettre votre chef-d'œuvre avant la date limite.
            </p>
            <p>
              <strong>Participez et Échangez :</strong> Plongez dans la
              communauté, participez aux discussions et échangez avec d'autres
              écrivains passionnés.
            </p>
          </article>
        </section>
      </section>
    </main>
  );
};

export default Competition;
