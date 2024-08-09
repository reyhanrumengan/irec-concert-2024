"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./form.module.css";

interface FormData {
  email: string;
  fullName: string;
  numberOfPeople: string;
}

const Form = () => {
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    fullName: "",
    numberOfPeople: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Correct Google Forms
    // const formUrl =
    //   "https://docs.google.com/forms/d/e/1FAIpQLScDUyZ-Qp4Z_Rs_pPe1UwbTzGDDFSWaUPHH_ijVdBiBdcyYkA/formResponse";
    // const formBody = new URLSearchParams({
    //   "entry.1780199336": formData.email,
    //   "entry.1378719052": formData.fullName,
    //   "entry.1634956136": formData.numberOfPeople,
    // });

    // Test Google Forms
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSdac20gOdAuHErkH6Waj2vS2SCjK0ubcS-JMttCSbQ48h442g/formResponse";
    const formBody = new URLSearchParams({
      "entry.279040597": formData.email,
      "entry.1140108557": formData.fullName,
      "entry.460987298": formData.numberOfPeople,
    });

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      // Call API route for sending confirmation email
      const emailResponse = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (emailResponse.ok) {
        // setSuccessMessage(
        //   "Thank you for your submission! A confirmation email has been sent."
        // );
        // setIsFormSubmitted(true);
        window.location.href = "/rsvp-response";
      } else {
        const errorData = await emailResponse.json();
        setErrorMessage(
          errorData.message || "Failed to submit form. Please check your data."
        );
      }
      // window.location.href = "/rsvp-response";
    } catch (error) {
      console.error("Error submitting form", error);
      setErrorMessage("An unexpected error occurred. Please check your data.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formContainer}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          placeholder="example@gmail.com"
          required
        />
      </div>
      <div className={styles.formContainer}>
        <label htmlFor="fullName" className={styles.label}>
          Your Full Name:
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={styles.input}
          placeholder="Max Mustermann"
          required
        />
      </div>
      <div className={styles.formContainer}>
        <label htmlFor="numberOfPeople" className={styles.label}>
          How many people are coming to the concert (including yourself)?:
        </label>
        <input
          type="number"
          id="numberOfPeople"
          name="numberOfPeople"
          value={formData.numberOfPeople}
          onChange={handleChange}
          className={styles.input}
          placeholder="2"
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Submit
      </button>

      {/* {isFormSubmitted && (
        <p className={styles.successMessage}>{successMessage}</p>
      )} */}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </form>
  );
};

export default Form;
