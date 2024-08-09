"use client";

import styles from "./rsvp-response.module.css";
import Link from "next/link";

export default function RSVPResponse() {
  const handleClick = () => {
    window.location.href = "/rsvp";
  };

  return (
    <div className={styles.containerWidth}>
      <div className={styles.rsvpContainer}>
        <div className={styles.rsvp}>
          <p className={styles.pageTitle}>RSVP</p>
          <div className={styles.text}>
            <p>Thank you for your RSVP!</p>
          </div>
          <div className={styles.text}>
            <p>See you at the event!</p>
            <p>
              For more information, please check{" "}
              <Link href="/about" className={styles.link}>
                HERE
              </Link>
              .
            </p>
          </div>
          <div>
            <button className={styles.button} onClick={handleClick}>
              Click here to make another RSVP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
