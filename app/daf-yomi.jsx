'use client';

import { useState } from 'react';

export default function DafYomi() {
  const [expanded, setExpanded] = useState(false);
  return <section className="daf-section" id="daf-yomi" aria-labelledby="daf-heading">
    <div className="daf-panel">
      <div className="daf-intro"><p className="eyebrow">TODAY&apos;S DAF YOMI</p><h2 id="daf-heading">A shared page of<br />learning</h2><p className="daf-description">Join a nearby shiur and learn alongside your neighbors.</p><p className="daf-note">DAF DETAILS SHOWN HERE ARE DYNAMIC PLACEHOLDERS.</p></div>
      <dl className="daf-details"><div><dt>MASECHTA</dt><dd>[dynamic]</dd></div><div><dt>DAF</dt><dd>[dynamic]</dd></div></dl>
      <div className="daf-nearby"><p className="daf-label">NEARBY SHIUR</p><h3>Bais Medrash</h3><p className="daf-location">[sample time] · 0.4 mi away</p><button className="schedule-button" aria-expanded={expanded} aria-controls="nearby-shiur-details" onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide Nearby Shiurim' : 'View Nearby Shiurim'}</button></div>
      <div id="nearby-shiur-details" className="daf-expanded" hidden={!expanded}><strong>Bais Medrash · 123 Maple Avenue</strong><p>Daf Yomi · [sample time]. Nearby shiurim and confirmed learning details will be added later.</p></div>
    </div>
  </section>;
}
