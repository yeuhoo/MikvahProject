'use client';

import { useState } from 'react';

const shuls = [
  { name: 'Ahavas Torah', address: '456 Cedar Street', distance: '0.6', walk: 12, prayer: 'Mincha', time: '5:40 PM' },
  { name: 'Bais Medrash', address: '123 Maple Avenue', distance: '0.4', walk: 8, prayer: 'Shacharis', time: '7:00 AM' },
  { name: 'Kehillas Beis El', address: '82 Orchard Lane', distance: '0.9', walk: 18, prayer: 'Maariv', time: '8:15 PM' },
];

function DetailIcon({ clock = false }) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{clock ? <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></> : <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>}</svg>;
}

export default function OurShuls() {
  const [notice, setNotice] = useState('');
  const [expanded, setExpanded] = useState(null);
  return <section className="our-shuls" id="our-shuls" aria-labelledby="shuls-heading">
    <div className="shuls-heading"><div><p className="eyebrow">PLACES TO GATHER</p><h2 id="shuls-heading">Our Shuls</h2><p>Participating neighborhood shuls, each with its own community and schedule.</p></div><button className="shuls-link" onClick={() => setNotice('All three preview shuls are shown. More shuls will be added to the directory later.')}>Explore All Shuls <span aria-hidden="true">→</span></button></div>
    <div className="shuls-grid">
      {shuls.map((shul, index) => <article className="shul-card" key={shul.name}>
        <div className="shul-image-placeholder" role="img" aria-label={`Photo placeholder for ${shul.name}`}><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8" cy="8" r="1.5" /><path d="m3 17 5-5 4 4 4-6 5 7" /></svg><span>IMAGE PLACEHOLDER</span></div>
        <div className="shul-card-content"><h3>{shul.name}</h3><p className="shul-address">{shul.address}</p><div className="shul-proximity"><span><DetailIcon />{shul.distance} mi away</span><span><DetailIcon clock />{shul.walk} min walk</span></div>
          <div className="shul-next"><p>NEXT MINYAN · SAMPLE</p><strong>{shul.prayer} · {shul.time}</strong></div>
          <div className="shul-actions"><button className="schedule-button" aria-expanded={expanded === index} aria-controls={`shul-schedule-${index}`} onClick={() => setExpanded(expanded === index ? null : index)}>{expanded === index ? 'Hide Schedule' : 'View Schedule'}</button><button className="shuls-link" onClick={() => setNotice(`Directions for ${shul.name} will be available when its location is confirmed. The address shown is sample data.`)}>Directions <span aria-hidden="true">↗</span></button></div>
          <p id={`shul-schedule-${index}`} className="shul-card-notice" hidden={expanded !== index}>{shul.prayer}: {shul.time} (sample). The full schedule will be added later.</p>
        </div>
      </article>)}
    </div>
    {notice && <p className="shuls-notice" role="status">{notice}</p>}
  </section>;
}
