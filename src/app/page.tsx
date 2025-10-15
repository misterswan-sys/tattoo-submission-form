"use client";
import { useState } from 'react';

export default function Page() {
  const [msg, setMsg] = useState('');
  async function submit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const res = await fetch('/api/submit', { method:'POST', body:data });
    setMsg(res.ok ? 'Submitted!' : 'Error submitting form');
  }
  return (
    <form onSubmit={submit}>
      <h1>Broken Art Tattoo — Submission Form</h1>
      <input name='name' placeholder='Name' required />
      <input name='email' type='email' placeholder='Email' required />
      <textarea name='description' placeholder='Describe your idea'></textarea>
      <input name='references' type='file' multiple />
      <button type='submit'>Send</button>
      <p>{msg}</p>
    </form>
  );
}