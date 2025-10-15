"use client";
import React, { useState } from "react";

export default function TattooSubmissionForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      console.error("Error submitting form:", response.statusText);
      alert("Something went wrong — please try again.");
    }
  } catch (error) {
    console.error("Submission failed:", error);
    alert("Error submitting form — please check your connection.");
  }
};

  if (submitted) {
    return (
      <div className="success-message">
        <h2>Your submission form is on its way!</h2>
        <p>
          We are excited to work with you and create the best tattoo experience
          possible. <br />
          Thank you for trusting <strong>Broken Art Tattoo!</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <img src="/batlogosmall.png" alt="Broken Art Tattoo Logo" className="logo" />
      <h1 className="title">Mister Swan — SUBMISSION FORM</h1>

  <div className="intro">
  <p>
    All inquiries are honored and respected. Please be patient if we don’t get back right away.
  </p>
  <p>
    Tattoo minimum is $300. Hourly rate is $300. Full day session – $2000. <br />
    For private, bespoke tattoo sessions in your home: <br />
    Email{" "}
    <a href="mailto:inquire@bespoke.tattoo?subject=Request%20for%20Private%20Tattoo%20Session">
  inquire@bespoke.tattoo
</a>
  </p>
</div>
      <form onSubmit={handleSubmit} method="POST">
  <label>
    Name<span className="required">*</span>
  </label>
  <div className="split">
    <input type="text" name="firstName" placeholder="First" required />
    <input type="text" name="lastName" placeholder="Last" required />
  </div>

  <label>
    Date of Birth<span className="required">*</span>
  </label>
  <input type="date" name="dob" required />

  <label>
    Phone Number<span className="required">*</span>
  </label>
  <input type="tel" name="phone" placeholder="(000) 000-0000" required />

  <label>
    Email<span className="required">*</span>
  </label>
  <input type="email" name="email" placeholder="example@email.com" required />

  <label>
    Will you be traveling for this appointment?<span className="required">*</span>
  </label>
  <div className="radio">
    <label><input type="radio" name="travel" value="Yes" required /> Yes</label>
    <label><input type="radio" name="travel" value="No" /> No</label>
  </div>

  <div className="split">
    <input type="text" name="city" placeholder="City" required />
    <input type="text" name="state" placeholder="State" required />
  </div>

  <label>
    Placement<span className="required">*</span>
  </label>
  <input type="text" name="placement" placeholder="Ribs, arms, legs, etc." required />

  <label>
    Brief Description<span className="required">*</span>
  </label>
  <textarea name="description" placeholder="Please describe your vision or idea" required />

  <label>For Cover-Ups: Upload a photo of the tattoo</label>
  <input type="file" name="coverupPhoto" accept="image/*" />

  <label>Upload reference images</label>
  <input type="file" name="references" accept="image/*" multiple />

  <label>
    Preferred Days of the Week<span className="required">*</span>
  </label>
  <div className="checkboxes">
    <label><input type="checkbox" name="days" value="Monday" /> Monday</label>
    <label><input type="checkbox" name="days" value="Tuesday" /> Tuesday</label>
    <label><input type="checkbox" name="days" value="Wednesday" /> Wednesday</label>
    <label><input type="checkbox" name="days" value="Thursday" /> Thursday</label>
    <label><input type="checkbox" name="days" value="Friday" /> Friday</label>
    <label><input type="checkbox" name="days" value="Saturday" /> Saturday</label>
    <label><input type="checkbox" name="days" value="Sunday" /> Sunday</label>
  </div>

  <label>
    How many sessions would you like?<span className="required">*</span>
  </label>
  <input type="text" name="sessions" placeholder="e.g. 2–3" required />

  <h3>BOOKING TERMS</h3>
  <p>A $100 deposit is required for each session booked. First deposit is a drawing charge and session deposits are applied to your last tattoo session. Deposits are non-refundable.</p>

  <h3>DESIGN POLICY</h3>
  <p>
    Designs are created for aesthetic and longevity. The photo reference that you provide is only used for inspiration and the artist will not copy the work of another artist. Artist has final approval but will work with you to achieve the best results for your tattoo.
  </p>

  <h3>RESCHEDULE POLICY</h3>
  <p>
    Lose 100% of deposit if rescheduled within 2 days of appointment. If you need to reschedule your appointment, you must email within 48 hours. This will ensure your deposit is transferred to a new booking date.
  </p>

  <label>Additional Questions</label>
  <textarea name="questions" placeholder="Any other details?" />

  <button type="submit" className="submit-btn">Submit</button>
</form>
    </div>
  );
}
