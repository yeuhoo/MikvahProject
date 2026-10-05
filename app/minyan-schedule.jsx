'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

const minyanim = [
  { time: '6:15 AM', name: 'Bais Medrash', address: '123 Maple Avenue', distance: '0.4', walk: 8, status: 'next' },
  { time: '6:45 AM', name: 'Ahavas Torah', address: '456 Cedar Street', distance: '0.6', walk: 12, status: 'soon' },
  { time: '7:00 AM', name: 'Bais Medrash', address: '123 Maple Avenue', distance: '0.4', walk: 8 },
  { time: '7:30 AM', name: 'Kehillas Beis El', address: '82 Orchard Lane', distance: '0.9', walk: 18 },
  { time: '8:00 AM', name: 'Ohel Moshe', address: '210 Willow Court', distance: '1.1', walk: 21 },
];

function Icon({ type }) {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{type === 'pin' ? <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></> : <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></>}</svg>;
}

export default function MinyanSchedule() {
  const dialog = useRef(null);
  const [selected, setSelected] = useState(null);
  function showShul(minyan) {
    setSelected(minyan);
    dialog.current.showModal();
  }
  return <section className="schedule" aria-labelledby="schedule-heading">
    <div className="schedule-heading">
      <div><p className="eyebrow">UPCOMING NEAR YOU</p><h2 id="schedule-heading">Today&apos;s Shacharis Minyanim</h2><p className="schedule-summary">Cedar Grove · Today · Within 2 miles · 5 results</p></div>
      <Link className="schedule-all-link" href="/minyanim?prayer=Shacharis">View All Shacharis Minyanim <span aria-hidden="true">→</span></Link>
    </div>
    <ul className="schedule-list" aria-label="Sample Shacharis schedule">
      {minyanim.map((minyan) => <li key={minyan.time} className={`schedule-row ${minyan.status || ''}`}>
        <div className="schedule-time"><span>{minyan.time}</span><small>SAMPLE TIME</small></div>
        <div className="schedule-shul"><h3>{minyan.name}</h3><p>{minyan.address}</p></div>
        <div className="schedule-distance"><span><Icon type="pin" />{minyan.distance} mi</span><span><Icon type="clock" />{minyan.walk} min walk</span></div>
        <div className="schedule-status">{minyan.status && <span className={`schedule-badge ${minyan.status}`}><span aria-hidden="true">{minyan.status === 'next' ? '✓' : '◷'}</span>{minyan.status === 'next' ? 'NEXT MINYAN' : 'STARTING SOON'}</span>}</div>
        <button className="schedule-button" onClick={() => showShul(minyan)} aria-label={`View ${minyan.name}, ${minyan.time}`}>View Shul</button>
      </li>)}
    </ul>
    <div className="schedule-footer"><Link className="schedule-button" href="/minyanim">View All Minyanim <span aria-hidden="true">→</span></Link><p>Times shown are sample application data.</p></div>
    <dialog ref={dialog} className="shul-dialog"><div><p className="eyebrow">SAMPLE SHUL DETAILS</p><h2>{selected?.name}</h2><p>{selected?.address}</p><p>Shacharis · {selected?.time}</p><p className="shul-disclaimer">These are sample details for the homepage preview, not a verified prayer schedule.</p><form method="dialog"><button className="schedule-button">Close</button></form></div></dialog>
  </section>;
}
