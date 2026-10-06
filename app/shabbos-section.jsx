'use client';

import { useState } from 'react';

export default function ShabbosSection() {
  const [expanded, setExpanded] = useState(false);
  return <section className="shabbos-section" id="shabbos" aria-labelledby="shabbos-heading">
    <div className="shabbos-intro">
      <p className="eyebrow">THIS SHABBOS</p>
      <h2 id="shabbos-heading">Parshas [dynamic value]</h2>
      <p className="shabbos-date">[dynamic date] · [Hebrew date]</p>
      <p className="shabbos-description">A quieter rhythm for the seventh day. Review candle lighting and schedules from each participating shul.</p>
      <div className="candle-lighting"><span className="candle-glow" aria-hidden="true">●</span><div><p>CANDLE LIGHTING · LOCAL TIME</p><strong>[dynamic time]</strong></div></div>
      <p className="shabbos-note">PREVIEW VALUES · CONFIRM ALL TIMES WITH YOUR SHUL.</p>
    </div>
    <div className="shabbos-shul">
      <p className="shul-label">PARTICIPATING SHUL</p>
      <h3>AHAVAS TORAH</h3>
      <dl className="shabbos-times">
        <div><dt>Friday</dt><dd>Mincha</dd><dd className="shabbos-time">[sample time]</dd></div>
        <div><dt>Shabbos Morning</dt><dd>Shacharis</dd><dd className="shabbos-time">[sample time]</dd></div>
        <div className="daf-row"><dt>Daf Yomi</dt><dd className="shabbos-time">[sample time]</dd></div>
      </dl>
      <button className="shabbos-schedule-link" aria-expanded={expanded} aria-controls="full-shabbos-schedule" onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide Full Shabbos Schedule' : 'View Full Shabbos Schedule'} <span aria-hidden="true">{expanded ? '↑' : '→'}</span></button>
      <p id="full-shabbos-schedule" className="shabbos-expanded" hidden={!expanded}>The full Shabbos schedule will be available once times are confirmed with the shul. The details above are preview placeholders.</p>
    </div>
  </section>;
}
