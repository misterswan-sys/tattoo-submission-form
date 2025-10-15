"use client";
import React, { useState } from "react";

export default function TattooSubmissionForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="success-message">
        <h2>Your submission form is on its way!</h2>
        <p>
          We are excited to work with you and create the best tattoo experience
          possible. <br />
          Thanks for trusting <strong>Broken Art!</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <img
        src="/logo.png"
        alt="Broken Art Tattoo Logo"
        className="logo"
      />
      <h1 className="title">BROKEN ART TATTOO — SUBMISSION FORM</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name<span className="required">*</span>
        </label>
        <div className="split">
          <input type="text" placeholder="First" required />
          <input type="text" placeholder="Last" required />
        </div>

        <label>
          Date of Birth<span className="required">*</span>
        </label>
        <input type="date" required />

        <label>
          Phone Number<span className="required">*</span>
        </label>
        <input type="tel" placeholder="(000) 000-0000" required />

        <label>
          Email<span className="required">*</span>
        </label>
        <input type="email" placeholder="example@email.com" required />

        <label>
          Will you be traveling for this appointment?<span className="required">*</span>
        </label>
        <div className="radio">
          <label><input type="radio" name="travel" required /> Yes</label>
          <label><input type="radio" name="travel" /> No</label>
        </div>

        <div className="split">
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State" required />
        </div>

        <label>
          Placement<span className="required">*</span>
        </label>
        <input type="text" placeholder="Ribs, arms, legs, etc." required />

        <label>
          Brief Description<span className="required">*</span>
        </label>
        <textarea placeholder="Please describe your vision or idea" required />

        <label>
          Upload a photo of the area<span className="required">*</span>
        </label>
        <input type="file" accept="image/*" required />

        <label>
          Upload reference images<span className="required">*</span>
        </label>
        <input type="file" accept="image/*" multiple required />

        <label>
          Preferred Days of the Week<span className="required">*</span>
        </label>
        <div className="checkboxes">
          <label><input type="checkbox" /> Tuesday</label>
          <label><input type="checkbox" /> Wednesday</label>
          <label><input type="checkbox" /> Friday</label>
          <label><input type="checkbox" /> Saturday</label>
          <label><input type="checkbox" /> Other</label>
        </div>

        <label>
          How many sessions would you like?<span className="required">*</span>
        </label>
        <input type="text" placeholder="e.g. 2–3" required />

        <h3>BOOKING TERMS</h3>
        <p>A deposit is required for each tattoo booking. Deposits are non-refundable.</p>

        <h3>DESIGN POLICY</h3>
        <p>
          Designs are created for aesthetic and longevity. Artist has final approval.
        </p>

        <h3>RESCHEDULE POLICY</h3>
        <p>
          Lose 100% of deposit if rescheduled within 7 days of appointment.
        </p>

        <label>Additional Questions</label>
        <textarea placeholder="Any other details?" />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
