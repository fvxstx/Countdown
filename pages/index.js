import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import Head from "next/head";
import styles from "../styles/Home.module.scss";

const NEXT_PUBLIC_SUPABASE_URL = "https://javzxtwtgzhepuzchyde.supabase.co";
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imphdnp4dHd0Z3poZXB1emNoeWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUyMzI2OTAsImV4cCI6MTk3MDgwODY5MH0.upiXI3HDWV4RRmAz4TxKLy09uR_y6diRi_QRci52n50";

const supabaseClient = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function Contador({ timeExact }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  setInterval(() => {
    const dif = timeExact();
    setDays(Math.floor(dif / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((dif / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((dif / 1000 / 60) % 60));
    setSeconds(Math.floor((dif / 1000) % 60));
  }, 1000);
  return (
    <>
      <ul className={styles.contador}>
        <li>
          <p className={styles.p}>Dias</p>
          {days}
        </li>
        :
        <li>
          <p className={styles.p}>Horas</p>
          {hours}
        </li>
        :
        <li>
          <p className={styles.p}>Minutos</p>
          {minutes}
        </li>
        :
        <li>
          <p className={styles.p}>Segundos</p>
          {seconds}
        </li>
      </ul>
    </>
  );
}

function Form({ close }) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  async function handleNewEmail(newEmail) {
    await supabaseClient.from("email").insert([{ email: newEmail }]);
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    handleNewEmail(email);

    const formData = {
      lastEmail: false,
      email,
    };

    fetch("/api/sendgrid", {
      method: "post",
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status === 200) {
        setNome("");
        setEmail("");
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.form__inputT}
        type="text"
        placeholder="Nome"
        name="nome"
        required
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        className={styles.form__inputT}
        type="email"
        placeholder="Email"
        id="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className={styles.form__buttons}>
        <button
          className={styles.form__buttonC}
          onClick={(e) => {
            e.preventDefault();
            close();
          }}
        >
          Cancelar
        </button>
        <button className={styles.form__buttonE} type="submit">
          Enviar
        </button>
      </div>
    </form>
  );
}

function Modal({ show, onClose }) {
  if (show) {
    return (
      <div className={styles.modal}>
        <div className={styles.modal__container}>
          <h1 className={styles.modal__title}>Inscreva-se</h1>
          <p className={styles.modal__p}>
            Digite seu nome e email para ser avisado quando for o dia
          </p>

          <Form close={onClose} />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    sendAllEmails(exactTime());
  }, []);

  function exactTime() {
    const count = "2022-07-24";
    const dateNow = new Date().getTime();
    const dif = Date.parse(count) - dateNow;

    return dif;
  }

  async function attEmail(newEmail) {
    await supabaseClient
      .from("email")
      .update({ sended: true })
      .match({ email: newEmail.email });
  }

  async function sendAllEmails(time) {
    if (time === 1) {
      const { data, error } = await supabaseClient.from("email").select();

      data.map((bEmail) => {
        if (bEmail.sended == false) {
          const formData = {
            email: bEmail.email,
            lastEmail: true,
          };

          fetch("/api/sendgrid", {
            method: "post",
            body: JSON.stringify(formData),
          });

          attEmail(bEmail);
        }
      });
    }
  }

  return (
    <div>
      <Head>
        <title>Countdown</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img src="/images/top-image.svg" alt="top images" />
      <main className={styles.main}>
        <div className={styles.text}>
          <h2 className={styles.title}>READY TO LAUNCH IN...</h2>
          <Contador timeExact={exactTime} />

          <p className={styles.subtitle}>
            Inscreva-se para saber mais sobre o lançamento
          </p>
          <button className={styles.button} onClick={() => setShowModal(true)}>
            Inscreva-se
          </button>
        </div>
        <img src="/images/rocket.svg" alt="Rocket" className={styles.rocket} />
      </main>
      <img
        src="/images/bottom-image.svg"
        alt="top images"
        className={styles.img_bottom}
      />

      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
}
