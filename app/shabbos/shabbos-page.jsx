'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import CommunityFooter from '../community-footer';
import shell from '../minyanim/minyanim.module.css';
import styles from './shabbos.module.css';
import NavbarActions from '../navbar-actions';
import useMyLocation from '../use-my-location';

const shuls = [
  { name: 'Ahavas Torah', address: '456 Cedar Street', daf: true },
  { name: 'Bais Medrash', address: '123 Maple Avenue', daf: false },
  { name: 'Kehillas Beis El', address: '82 Orchard Lane', daf: true },
];
const prayers = ['Friday Mincha', 'Shacharis', 'Daf Yomi', 'Mincha', 'Maariv'];

export default function ShabbosPage() {
  const dialog = useRef(null);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState('');
  const { locating, useLocation } = useMyLocation((coordinates) => {
    setNotice(`Location added: ${coordinates}. Shabbos schedules and candle-lighting times remain sample placeholders until verified local data is connected.`);
  }, setNotice);

  function viewShul(shul) {
    setSelected(shul);
    dialog.current.showModal();
  }

  return <div className={`${shell.page} ${styles.page}`}>
    <a className="skip-link" href="#shabbos-main">Skip to content</a>
    <header className={shell.header}>
      <Link href="/" className={shell.brand}><span className={shell.brandMark} aria-hidden="true">CE</span><span>Catskills<br /><strong>Eruv</strong></span></Link>
      <nav className={shell.nav} aria-label="Main navigation">
        <Link href="/">Home</Link><Link href="/minyanim">Find a Minyan</Link><Link href="/#our-shuls">Our Shuls</Link><Link href="/shabbos" aria-current="page">Shabbos</Link><Link href="/#daf-yomi">Daf Yomi</Link><Link href="/#about">About</Link>
      </nav>
      <NavbarActions searchTarget="/minyanim#location-search" onUseLocation={useLocation} locating={locating} />
    </header>
    <main id="shabbos-main">
      <section className={styles.hero} aria-labelledby="shabbos-title">
        <div className={styles.intro}><p className={styles.eyebrow}>THE SEVENTH DAY</p><h1 id="shabbos-title">This Shabbos</h1><p className={styles.description}>Find candle lighting and congregation-specific schedules throughout the neighborhood.</p><p className={styles.preview}>ALL RELIGIOUS DATES AND TIMES SHOWN ARE DYNAMIC PLACEHOLDERS.</p></div>
        <aside className={styles.calendar} aria-label="This Shabbos dates and candle lighting"><p className={styles.label}>PARSHAS</p><h2>[dynamic value]</h2><p className={styles.date}>[dynamic date]<br />[Hebrew date]</p><div className={`candle-lighting ${styles.candle}`}><span className="candle-glow" aria-hidden="true">●</span><div><p>CANDLE LIGHTING</p><strong>[dynamic local time]</strong></div></div></aside>
      </section>
      {notice && <p className={styles.notice} role="status">{notice}</p>}
      <section className={styles.schedules} aria-labelledby="participating-title">
        <p className={styles.eyebrow}>NEIGHBORHOOD SCHEDULES</p><h2 id="participating-title">Participating Shuls</h2><p className={styles.summary}>Each schedule is maintained separately. Please confirm times with the congregation.</p>
        <div className={styles.tableScroll} tabIndex="0" role="region" aria-label="Participating shuls Shabbos schedules">
          <table className={styles.table}><thead><tr><th scope="col">Shul</th>{prayers.map(prayer => <th key={prayer} scope="col">{prayer}</th>)}<th scope="col"><span className="sr-only">Shul details</span></th></tr></thead><tbody>{shuls.map(shul => <tr key={shul.name}><th scope="row"><strong>{shul.name}</strong><small>{shul.address}, Catskills, NY</small></th>{prayers.map(prayer => <td key={prayer}><span>{prayer === 'Daf Yomi' && !shul.daf ? '—' : '[sample]'}</span><small>Sample</small></td>)}<td><button className={shell.outlineButton} aria-label={`View ${shul.name}`} onClick={() => viewShul(shul)}>View Shul</button></td></tr>)}</tbody></table>
        </div>
        <aside className={styles.localNote}><div><h3>A note about local times</h3><p>Candle lighting and prayer times vary by location and congregation. Catskills Eruv will use verified data sources and shul-provided schedules in production.</p></div><Link href="/minyanim" className={shell.outlineButton}>Find a Weekday Minyan</Link></aside>
      </section>
    </main>
    <CommunityFooter standalone />
    <dialog ref={dialog} className="shul-dialog" aria-labelledby="shabbos-shul-title"><h2 id="shabbos-shul-title">{selected?.name}</h2><p>{selected?.address}, Catskills, NY</p><p className="shul-disclaimer">Shabbos schedules shown here are sample placeholders. Please confirm all times directly with the congregation.</p><form method="dialog"><button className={shell.outlineButton}>Close</button></form></dialog>
  </div>;
}
