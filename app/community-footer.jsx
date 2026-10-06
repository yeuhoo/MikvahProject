'use client';

import { useState } from 'react';

const supportText = {
  Accessibility: 'We aim to make this website accessible with keyboard navigation, readable text, and responsive layouts. A full accessibility statement will be added before launch.',
  Privacy: 'This preview has no account or submission system. Location is requested only when you select Use My Location. A full privacy policy will be added before launch.',
  'Add a Shul': 'Shul submissions will be available when the community directory launches.',
  'Update a Schedule': 'Schedule updates will be available when the community directory launches. Please confirm prayer times directly with your shul.',
  Contact: 'Community contact details will be added soon.',
};

export function CommunityStatement() {
  return <section className="community-statement" id="about" aria-labelledby="community-heading">
    <p className="eyebrow">ROOTED IN COMMUNITY</p>
    <h2 id="community-heading">One Kehillah.<br />Many Minyanim.</h2>
    <p className="community-description">Catskills Eruv helps Catskills neighbors discover nearby prayer opportunities and participating shuls—clearly, reliably, and without distraction.</p>
    <ul className="community-values"><li>Local shuls</li><li>Reliable schedules</li><li>Easy discovery</li><li>Community connection</li></ul>
  </section>;
}

export default function CommunityFooter({ standalone = false }) {
  const [info, setInfo] = useState(null);
  return <footer className="community-footer">
    <div className="footer-grid">
      <div className="footer-about"><a className="footer-brand" href={standalone ? "/" : "#main"}><span className="footer-monogram" aria-hidden="true">CE</span><span>Catskills<br /><strong>Eruv</strong></span></a><p>Helping Catskills neighbors find prayer,<br />community, and a place to gather.</p><p className="footer-disclaimer">Sample schedules are not authoritative. Please confirm times with each shul.</p></div>
      <nav aria-label="Explore"><h3>EXPLORE</h3><a href={standalone ? "/minyanim" : "#minyan-search"}>Find a Minyan</a><a href={standalone ? "/#our-shuls" : "#our-shuls"}>Our Shuls</a><a href="/shabbos">Shabbos</a><a href={standalone ? "/#daf-yomi" : "#daf-yomi"}>Daf Yomi</a></nav>
      <nav aria-label="Community"><h3>COMMUNITY</h3><a href={standalone ? "/#about" : "#about"}>About</a>{['Add a Shul', 'Update a Schedule', 'Contact'].map(label => <button key={label} onClick={() => setInfo(label)}>{label}</button>)}</nav>
      <nav aria-label="Support"><h3>SUPPORT</h3>{['Accessibility', 'Privacy'].map(label => <button key={label} onClick={() => setInfo(label)}>{label}</button>)}</nav>
    </div>
    {info && <div className="footer-info" role="status"><div><strong>{info}</strong><p>{supportText[info]}</p></div><button onClick={() => setInfo(null)} aria-label="Close information">×</button></div>}
    <div className="footer-bottom"><span>© Catskills Eruv</span><span>One Community. Many Minyanim. Always Together.</span></div>
  </footer>;
}
