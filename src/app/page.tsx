'use client';

import React, { useState } from 'react';

export default function SubmissionForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    traveling: '',
    city: '',
    state: '',
    placement: '',
    description: '',
    days: [] as string[],
    sessions: '',
    areaPhoto: null as File | null,
    referencePhoto: null as File | null,
    questions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        days: checked
          ? [...prev.days, value]
          : prev.days.filter((d) => d !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const upload = async (file: File | null) => {
      if (!file) return null;
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('https://api.anonfiles.com/upload', { method: 'POST', body });
      const data = await res.json();
      return data.status ? data.data.file.url.full : null;
    };

    const areaPhotoUrl = await upload(formData.areaPhoto);
    const referencePhotoUrl = await upload(formData.referencePhoto);

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, areaPhotoUrl, referencePhotoUrl }),
    });

    if (res.ok) setStatus('success');
    else setStatus('error');
  };

  return (
    <main className="form-container">
      <div className="header">
        <img src="/bat-logo.png" alt="Broken Art Tattoo Logo" className="logo" />
        <h1>BROKEN ART TATTOO — SUBMISSION FORM</h1>
      </div>

      {status === 'success' ? (
        <p className="success">
          Your submission form is on its way.<br />
          We are excited to work with you and create the best tattoo experience possible.<br />
          Thanks for trusting Broken Art!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid two-col">
            <label>
              Name*<input name="firstName" placeholder="First" required onChange={handleChange} />
            </label>
            <label>
              <span style={{ visibility: 'hidden' }}>Last</span>
              <input name="lastName" placeholder="Last" required onChange={handleChange} />
            </label>
          </div>

          <label>
            Date of Birth*<input type="date" name="dob" required onChange={handleChange} />
          </label>
          <label>
            Phone Number*<input name="phone" placeholder="(000) 000-0000" required onChange={handleChange} />
          </label>
          <label>
            Email*<input type="email" name="email" placeholder="example@email.com" required onChange={handleChange} />
          </label>

          <fieldset>
            <legend>Will you be traveling for this appointment?*</legend>
            <label><input type="radio" name="traveling" value="Yes" required onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="traveling" value="No" required onChange={handleChange} /> No</label>
          </fieldset>

          <div className="grid two-col">
            <label>
              City<input name="city" onChange={handleChange} />
            </label>
            <label>
              State<input name="state" onChange={handleChange} />
            </label>
          </div>

          <label>
            Placement*<input name="placement" placeholder="Ribs, arms, legs, etc." required onChange={handleChange} />
          </label>

          <label>
            Brief Description*<textarea name="description" placeholder="Describe your vision or idea" required onChange={handleChange} />
          </label>

          <label>
            Upload a photo of the area*<input type="file" name="areaPhoto" required onChange={handleFile} />
          </label>
          <label>
            Upload reference images*<input type="file" name="referencePhoto" required onChange={handleFile} />
          </label>

          <fieldset>
            <legend>Preferred Days of the Week*</legend>
            {['Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Other'].map((day) => (
              <label key={day}>
                <input type="checkbox" value={day} onChange={handleChange} /> {day}
              </label>
            ))}
          </fieldset>

          <label>
            How many sessions would you like?*<input name="sessions" placeholder="e.g. 2-3" required onChange={handleChange} />
          </label>

          <section className="policies">
            <h2>BOOKING TERMS</h2>
            <p>A deposit is required for each tattoo booking. Deposits are non-refundable.</p>
            <h2>DESIGN POLICY</h2>
            <p>Designs are created for aesthetic and longevity. Artist has final approval.</p>
            <h2>RESCHEDULE POLICY</h2>
            <p>Lose 100% of deposit if rescheduled within 7 days of appointment.</p>
          </section>

          <label>
            Additional Questions<textarea name="questions" onChange={handleChange} />
          </label>

          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : 'Submit'}
          </button>

          {status === 'error' && <p className="error">Something went wrong. Please try again.</p>}
        </form>
      )}
    </main>
  );
}
