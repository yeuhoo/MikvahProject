"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./minyanim.module.css";

const prayers = ["Shacharis", "Mincha", "Maariv", "Shabbos", "Daf Yomi"];
const shuls = [
  { id: 1, name: "Bais Medrash", address: "123 Maple Avenue", distance: 0.4, walk: 8, x: 41, y: 38 },
  { id: 2, name: "Ahavas Torah", address: "456 Cedar Street", distance: 0.6, walk: 12, x: 61, y: 55 },
  { id: 3, name: "Kehillas Shalom", address: "78 Oak Lane", distance: 0.9, walk: 18, x: 28, y: 66 },
  { id: 4, name: "Young Israel", address: "210 Park Road", distance: 1.2, walk: 24, x: 75, y: 28 },
];
const schedules = {
  Shacharis: [{ shul: 1, time: "6:15 AM" }, { shul: 2, time: "6:45 AM" }, { shul: 1, time: "7:00 AM" }, { shul: 3, time: "7:30 AM" }, { shul: 4, time: "8:00 AM" }],
  Mincha: [{ shul: 1, time: "1:30 PM" }, { shul: 2, time: "2:00 PM" }, { shul: 3, time: "5:45 PM" }, { shul: 4, time: "6:00 PM" }],
  Maariv: [{ shul: 1, time: "7:15 PM" }, { shul: 2, time: "8:00 PM" }, { shul: 3, time: "9:00 PM" }, { shul: 4, time: "9:30 PM" }],
  Shabbos: [{ shul: 1, time: "8:30 AM" }, { shul: 2, time: "9:00 AM" }, { shul: 3, time: "9:15 AM" }, { shul: 4, time: "9:30 AM" }],
  "Daf Yomi": [{ shul: 1, time: "5:45 AM" }, { shul: 2, time: "7:30 AM" }, { shul: 3, time: "8:00 PM" }, { shul: 4, time: "8:30 PM" }],
};

function Icon({ name, ...props }) {
  const paths = {
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    location: <><circle cx="12" cy="12" r="4" /><path d="M12 2v4m0 12v4M2 12h4m12 0h4" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></>,
    route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3" /></>,
  };
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

function Brand({ footer = false }) {
  return <Link href="/" className={styles.brand}><span className={styles.brandMark}>NM</span>{footer ? <span>Neighborhood<br />Minyanim</span> : <span>MIKVAH</span>}</Link>;
}

export default function MinyanFinder({ initialFilters }) {
  const initialLocation = typeof initialFilters.location === "string" && initialFilters.location.trim() ? initialFilters.location.trim() : "Cedar Grove";
  const [location, setLocation] = useState(initialLocation);
  const [area, setArea] = useState(initialLocation);
  const [prayer, setPrayer] = useState(prayers.includes(initialFilters.prayer) ? initialFilters.prayer : "Shacharis");
  const [day, setDay] = useState(initialFilters.day === "Tomorrow" ? "Tomorrow" : "Today");
  const [distance, setDistance] = useState(["Within 5 miles", "Within 10 miles"].includes(initialFilters.distance) ? initialFilters.distance.match(/\d+/)[0] : "2");
  const [time, setTime] = useState("Any time");
  const [selectedKey, setSelectedKey] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const results = schedules[prayer].filter((entry) => {
    const shul = shuls.find((item) => item.id === entry.shul);
    return shul.distance <= Number(distance) && (time === "Any time" || entry.time.endsWith(time === "Morning" ? "AM" : "PM"));
  });
  const selected = results.find((entry) => `${entry.shul}-${entry.time}` === selectedKey) || results[0];
  const selectedShul = selected && shuls.find((shul) => shul.id === selected.shul);

  function useSampleLocation() {
    setLocation("Cedar Grove");
    setArea("Cedar Grove");
    setNotice("Showing Cedar Grove sample results. Live location search is coming soon.");
  }
  function changePrayer(nextPrayer) {
    setPrayer(nextPrayer);
    setSelectedKey(null);
    setDetailsOpen(false);
  }
  function selectEntry(entry, showDetails = false) {
    setSelectedKey(`${entry.shul}-${entry.time}`);
    setDetailsOpen(showDetails);
  }

  return <div className={styles.page}>
    <a className="skip-link" href="#minyan-results">Skip to results</a>
    <header className={styles.header}>
      <Brand />
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/">Home</Link><Link href="/minyanim" aria-current="page">Find a Minyan</Link><Link href="/#resources">Our Shuls</Link>
        <button onClick={() => changePrayer("Shabbos")}>Shabbos</button><button onClick={() => changePrayer("Daf Yomi")}>Daf Yomi</button><Link href="/#about">About</Link>
      </nav>
      <div className={styles.headerActions}><a href="#location-search" aria-label="Search for a minyan"><Icon name="search" /></a><button className={styles.outlineButton} onClick={useSampleLocation}><Icon name="location" />Use My Location</button></div>
    </header>
    <main className={styles.workspace}>
      <section className={styles.sidebar} aria-labelledby="finder-title">
        <div className={styles.intro}><p className={styles.eyebrow}>PRAYER DISCOVERY</p><h1 id="finder-title">Find a Minyan</h1><p>Search nearby schedules and choose the minyan that works for you.</p></div>
        <form className={styles.search} onSubmit={(event) => { event.preventDefault(); setArea(location.trim() || "Cedar Grove"); setNotice("Showing sample schedules for your search. Locations on the map are illustrative."); }}>
          <label className={styles.searchField}><Icon name="search" /><span className="sr-only">Neighborhood or city</span><input id="location-search" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Neighborhood or city" /></label>
          <button className={styles.primaryButton} type="submit">Find Minyanim</button>
        </form>
        <div className={styles.tabs} aria-label="Prayer type">{prayers.map((item) => <button key={item} aria-pressed={prayer === item} className={prayer === item ? styles.activeTab : ""} onClick={() => changePrayer(item)}>{item}</button>)}</div>
        <div className={styles.filters}>
          <label><span>DATE</span><select value={day} onChange={(event) => setDay(event.target.value)}><option>Today</option><option>Tomorrow</option></select></label>
          <label><span>TIME</span><select value={time} onChange={(event) => setTime(event.target.value)}><option>Any time</option><option>Morning</option><option>Afternoon / evening</option></select></label>
          <label><span>DISTANCE</span><select value={distance} onChange={(event) => setDistance(event.target.value)}><option value="1">1 mile</option><option value="2">2 miles</option><option value="5">5 miles</option><option value="10">10 miles</option></select></label>
          <button className={styles.useLocation} onClick={useSampleLocation}><Icon name="location" />Use location</button>
        </div>
        {notice && <p className={styles.notice} role="status">{notice}</p>}
        <div className={styles.resultsHeading}><h2 id="minyan-results" aria-live="polite">{results.length} {prayer} {prayer === "Daf Yomi" ? "classes" : "minyanim"}</h2><span>{area} · {day === "Tomorrow" ? "Tomorrow · " : ""}Sample schedule</span></div>
        <div className={styles.results}>
          {results.map((entry, index) => {
            const shul = shuls.find((item) => item.id === entry.shul);
            const isSelected = selected === entry;
            return <article key={`${entry.shul}-${entry.time}`} className={`${styles.result} ${isSelected ? styles.selectedResult : ""} ${index === 1 ? styles.soonResult : ""}`}>
              <div className={styles.resultTop}><button className={styles.resultSelect} onClick={() => selectEntry(entry)} aria-pressed={isSelected}><span className={styles.time}><strong>{entry.time}</strong><small>SAMPLE TIME</small></span><span className={styles.shul}><strong>{shul.name}</strong><span>{shul.address}</span></span></button>{index < 2 && <span className={`${styles.badge} ${index === 1 ? styles.soonBadge : ""}`}>{index === 0 ? "✓" : <Icon name="clock" width="12" />}<span>{index === 0 ? <>NEXT<br />MINYAN</> : <>STARTING<br />SOON</>}</span></span>}</div>
              <div className={styles.resultBottom}><span><Icon name="pin" />{shul.distance} mi</span><span><Icon name="clock" />{shul.walk} min walk</span><button className={styles.outlineButton} onClick={() => selectEntry(entry, true)}>View Shul</button></div>
            </article>;
          })}
          {!results.length && <p className={styles.empty}>No sample schedules match these filters. Choose another time or prayer.</p>}
        </div>
      </section>
      <section className={styles.map} aria-label="Illustrative neighborhood map">
        <div className={styles.park} aria-hidden="true"><span>CEDAR GROVE<br /><small>COMMUNITY PARK</small></span></div>
        <div className={`${styles.road} ${styles.roadOne}`} /><div className={`${styles.road} ${styles.roadTwo}`} /><div className={`${styles.road} ${styles.roadThree}`} /><div className={`${styles.road} ${styles.roadFour}`} /><div className={`${styles.road} ${styles.roadFive}`} />
        {shuls.filter((shul) => results.some((entry) => entry.shul === shul.id)).map((shul) => <button key={shul.id} className={`${styles.mapPin} ${selectedShul?.id === shul.id ? styles.selectedPin : ""}`} style={{ left: `${shul.x}%`, top: `${shul.y}%` }} aria-label={`Select ${shul.name}`} aria-pressed={selectedShul?.id === shul.id} onClick={() => selectEntry(results.find((entry) => entry.shul === shul.id))}>{shul.id}</button>)}
        {selectedShul && <div className={styles.mapCard} aria-live="polite"><p className={styles.cardEyebrow}>{detailsOpen ? "SHUL DETAILS · SAMPLE" : "SELECTED MINYAN"}</p><div className={styles.cardDetails}><strong className={styles.cardTime}>{selected.time}</strong><div><h2>{selectedShul.name}</h2><p>{selectedShul.address}</p></div></div>{detailsOpen && <p className={styles.detailNote}>{prayer} · {day} · {selectedShul.walk} min walk<br />Sample schedule. Please confirm times with the shul.</p>}<button className={styles.outlineButton} onClick={() => setNotice(`Directions to ${selectedShul.name} will be available when the live map is connected.`)}><Icon name="route" />Directions</button></div>}
        <div className={styles.mapLegend}><span><i />Shul location</span><small>Map is a visual prototype</small></div>
      </section>
    </main>
    <footer className={styles.footer}>
      <div className={styles.footerGrid}><div className={styles.footerAbout}><Brand footer /><p>Helping neighbors find prayer, community,<br />and a place to gather.</p><small>Sample schedules are not authoritative. Please confirm times with each shul.</small></div><div><h2>EXPLORE</h2><Link href="/minyanim">Find a Minyan</Link><Link href="/#resources">Our Shuls</Link><button onClick={() => changePrayer("Shabbos")}>Shabbos</button><button onClick={() => changePrayer("Daf Yomi")}>Daf Yomi</button></div><div><h2>COMMUNITY</h2><Link href="/#about">About</Link><Link href="/#information">Add a Shul</Link><Link href="/#information">Update a Schedule</Link><Link href="/#information">Contact</Link></div><div><h2>SUPPORT</h2><Link href="/#information">Accessibility</Link><Link href="/#information">Privacy</Link></div></div>
      <div className={styles.footerBottom}><span>© Neighborhood Minyanim</span><span>One Community. Many Minyanim. Always Together.</span></div>
    </footer>
  </div>;
}
