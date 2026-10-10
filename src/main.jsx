import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowUpRight, CalendarDays, Check, Heart, MapPin, Send } from 'lucide-react';
import './style.css';

const weddingDate = new Date('2026-10-14T11:45:00+05:30');
const eventMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Jamath Samuthaya Mahal, Nadukkadai')}`;
const couple = [
  { side: 'The Groom', names: 'Mahatheer Mansoor, B.E.' },
  { side: 'The Bride', names: 'Nasiha Fathima, B.Sc.' },
];

function Countdown() {
  const getTime = () => {
    const diff = Math.max(0, weddingDate.getTime() - Date.now());
    return [Math.floor(diff / 86400000), Math.floor(diff / 3600000) % 24, Math.floor(diff / 60000) % 60, Math.floor(diff / 1000) % 60];
  };
  const [time, setTime] = useState(getTime);
  useEffect(() => { const timer = setInterval(() => setTime(getTime()), 1000); return () => clearInterval(timer); }, []);
  return <div className="countdown" aria-label="Countdown to the wedding">
    {time.map((n, i) => <div className="count-item" key={i}><span>{String(n).padStart(2, '0')}</span><small>{['Days', 'Hours', 'Minutes', 'Seconds'][i]}</small></div>)}
  </div>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [rsvp, setRsvp] = useState({ name: '', email: '', attending: '', guests: '1', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [scratchRevealed, setScratchRevealed] = useState(false);

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [opened]);

  const onSubmit = (e) => {
    e.preventDefault();
    const responses = JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
    localStorage.setItem('wedding-rsvps', JSON.stringify([...responses, { ...rsvp, submittedAt: new Date().toISOString() }]));
    const subject = encodeURIComponent('Wedding RSVP — Mahatheer & Nasiha');
    const body = encodeURIComponent(`Guest: ${rsvp.name}\nEmail: ${rsvp.email || 'Not provided'}\nResponse: ${rsvp.attending}\nGuests: ${rsvp.guests}\nMessage: ${rsvp.message || '—'}\n\nMehandi: Tuesday, 13 October 2026 at 12:00 p.m., Bride’s home.\nNikah: Wednesday, 14 October 2026 at 11:45 a.m., followed by wedding feast.\nVenue: Jamath Samuthaya Mahal, Nadukkadai`);
    window.location.href = `mailto:anas17122003@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return <>
    <div className={`welcome ${opened ? 'welcome-closed' : ''}`} role="dialog" aria-modal="true" aria-label="Open wedding invitation" aria-hidden={opened}>
      <div className="welcome-glow" />
      <div className="cover-content">
        <div className="cover-kicker">A WEDDING INVITATION</div>
        <button className="envelope-scene" onClick={() => setOpened(true)} aria-label="Tap to open Mahatheer and Nasiha’s wedding invitation">
          <img className="envelope-photo" src="/embossed-envelope-clean.jpeg" alt="White embossed floral wedding envelope with an M and N wax seal"/>
        </button>
        <div className="cover-open-hint">A little love, sealed for you <Heart size={13} fill="currentColor"/></div>
      </div>
    </div>

    <div className={`site ${opened ? 'is-open' : ''}`}>
      <div className="celebration-effects" aria-hidden="true"><span className="effect-heart heart-one">♥</span><span className="effect-butterfly butterfly-one">🦋</span><span className="effect-heart heart-two">♥</span><span className="effect-butterfly butterfly-two">🦋</span><span className="effect-heart heart-three">♥</span></div>

      <main>
        <section className="poster-page" id="home"><div className="poster-frame"><img src="/wedding-invitation-main.jpeg" alt="Wedding invitation for Mahatheer Mansoor, B.E. and Nasiha Fathima, B.Sc."/></div></section>

        <section className="count-section section">
          <div className="count-title reveal"><span className="eyebrow">THE MOMENT IS GETTING CLOSER</span><h2>Counting down to <em>forever</em></h2><div className="hero-rule"><i/><Heart size={12} fill="currentColor"/><i/></div></div>
          <Countdown />
          <div className="date-note reveal"><CalendarDays size={16}/><span>14.10.2026 <b>·</b> 1448 Hijri, Jamathul Awwal Pirai 2</span></div>
        </section>

        <section className="families section" id="families">
          <div className="section-heading reveal"><span className="eyebrow">WITH LOVE FROM OUR FAMILIES</span><h2>Two families, <em>one celebration</em></h2><p>With the blessings of those who raised us, we begin this beautiful new chapter.</p></div>
          <div className="family-grid">{couple.map((p, i) => <article className="family-card reveal" key={p.side}><span className="family-number">0{i+1}</span><div className="family-flower">✳</div><span className="eyebrow">{p.side}</span><h3>{p.names}</h3></article>)}</div>
        </section>

        <section className="schedule section" id="schedule">
          <div className="section-heading reveal"><span className="eyebrow">SAVE THE MOMENT</span><h2>The day <em>unfolds</em></h2><p>We would be honoured to share these moments with you.</p></div>
          <div className="timeline">
            <article className="timeline-item reveal"><span className="timeline-time">12:00 <small>PM</small></span><div className="timeline-dot"/><div><h3>Mehandi function</h3><p>Tuesday, 13 October · Bride’s home</p></div></article>
            <article className="timeline-item reveal"><span className="timeline-time">11:45 <small>AM</small></span><div className="timeline-dot"/><div><h3>Nikah & wedding feast</h3><p>Wednesday, 14 October · Jamath Samuthaya Mahal, Nadukkadai</p></div></article>
          </div>
          <p className="schedule-note reveal">Tuesday 13 & Wednesday 14 October 2026 <span>·</span> Hijri 1448, Jamathul Awwal Pirai 2</p>
        </section>

        <section className="gallery section" aria-label="Scratch to reveal">
          <div className="gallery-title reveal"><span className="eyebrow">A LITTLE SURPRISE</span><h2>Scratch to <em>reveal</em></h2><div className="hero-rule"><i/><Heart size={12} fill="currentColor"/><i/></div></div>
          <button className={`scratch-heart ${scratchRevealed ? 'revealed' : ''}`} onClick={() => setScratchRevealed(true)} aria-label="Tap the heart to reveal the wedding date and time"><svg className="scratch-heart-shape" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 91 13.8 57.2C-7.6 36.4 7.2 7 30 7c9.7 0 16.8 5 20 15 3.2-10 10.3-15 20-15 22.8 0 37.6 29.4 16.2 50.2L50 91Z"/></svg><span className="scratch-glitter"/><span className="scratch-message">{scratchRevealed ? <><b>14 October</b><br/>11:45 AM</> : 'Tap to reveal'}</span></button>
          <p className="gallery-caption">{scratchRevealed ? 'With love, Mahatheer & Nasiha.' : 'A little love, waiting to be discovered.'}</p>
        </section>

        <section className="venue section" id="venue">
          <div className="venue-copy reveal"><span className="eyebrow">WE’LL SAVE YOU A SEAT</span><h2>Meet us <em>there</em></h2><div className="venue-divider"><MapPin size={17}/></div><h3>Jamath Samuthaya Mahal</h3><p>Nadukkadai</p><p className="venue-date">Wednesday, 14 October 2026<br/>Nikah at 11:45 a.m. · followed by feast</p><a className="solid-button" href={eventMap} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={16}/></a></div>
          <div className="venue-gallery reveal" aria-label="Photos of the wedding venue"><img src="/venue-exterior.png" alt="Entrance gate at Jamath Samuthaya Mahal"/><img src="/venue-entrance.png" alt="Wedding entrance at the venue"/><img src="/venue-hall.png" alt="Decorated wedding stage inside the venue"/></div>
          <div className="venue-map reveal"><iframe title="Jamath Samuthaya Mahal map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501533.1897902104!2d78.4965382890625!3d10.870252199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baac1ec99241837%3A0x508ef22d39a2a927!2sNadukkadai%20(Jamat%20Samuthaya%20Mahal)%20Marriage%20Hall!5e0!3m2!1sen!2sin!4v1791619324589!5m2!1sen!2sin" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div>
        </section>

        <section className="rsvp section" id="rsvp">
          <div className="rsvp-copy reveal"><span className="eyebrow">KINDLY REPLY</span><h2>Will you join <em>our day?</em></h2><p>Your presence is a gift. Let us know if we can save a place for you.</p><div className="rsvp-flourish">M <span>&</span> N</div></div>
          <div className="rsvp-panel reveal">{submitted ? <div className="success-state"><div className="success-icon"><Check/></div><h3>Thank you, {rsvp.name}.</h3><p>Your reply is ready in your email app, addressed to anas17122003@gmail.com. Send the email to complete your RSVP.</p><button className="text-link" onClick={() => { setSubmitted(false); setRsvp({ name: '', email: '', attending: '', guests: '1', message: '' }); }}>Send another reply</button></div> : <form onSubmit={onSubmit}><label htmlFor="guest-name">Your name</label><input required id="guest-name" value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} placeholder="Full name"/><label htmlFor="guest-email">Email address <span>(optional)</span></label><input id="guest-email" type="email" value={rsvp.email} onChange={(e) => setRsvp({ ...rsvp, email: e.target.value })} placeholder="you@example.com"/><label htmlFor="attendance">Will you be joining us?</label><select required id="attendance" value={rsvp.attending} onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}><option value="" disabled>Choose a response</option><option>Joyfully accepts</option><option>Regretfully declines</option></select><label htmlFor="guest-count">Number of guests</label><select id="guest-count" value={rsvp.guests} onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}>{[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}</select><label htmlFor="message">A note for the couple <span>(optional)</span></label><textarea id="message" rows="3" value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} placeholder="Write your wishes…"/><button className="solid-button submit-button" type="submit">Send your reply <Send size={15}/></button><p className="form-note">Your email app will open with your reply ready to send.</p></form>}</div>
        </section>

        <section className="closing"><div className="closing-ornament">✳</div><span className="eyebrow">UNTIL WE CELEBRATE</span><h2>With love & <em>gratitude</em></h2><p>We can’t wait to celebrate with you.</p><span className="closing-names">Mahatheer <i>&</i> Nasiha</span></section>
      </main>
      <footer className="footer"><a className="brand" href="#home" onClick={(e) => { e.preventDefault(); go('home'); }}>M <span>&</span> N</a><p>Made with love for 14 · 10 · 2026</p><button onClick={() => go('home')} aria-label="Back to top"><ArrowDown size={16}/></button></footer>
    </div>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
