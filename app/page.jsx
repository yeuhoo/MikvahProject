"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [dates, setDates] = useState({ civil: "", hebrew: "", year: "2026" });
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [locating, setLocating] = useState(false);
  useEffect(() => {
    const now = new Date();
    setDates({
      civil: new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(now),
      hebrew: new Intl.DateTimeFormat("en-US-u-ca-hebrew", { day: "numeric", month: "long", year: "numeric" }).format(now),
      year: String(now.getFullYear()),
    });
  }, []);
  function handleSearch(event) {
    event.preventDefault();
    setStatus("The minyan directory is coming soon. Live schedules and nearby results are not available yet.");
  }
  function useLocation() {
    if (!navigator.geolocation) {
      setStatus("Location is unavailable in this browser. Please enter your neighborhood or city.");
      return;
    }
    setLocating(true);
    setStatus("Finding your location…");
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
      setLocating(false);
      setStatus("Location added. The minyan directory is coming soon; live results are not available yet.");
    }, () => {
      setLocating(false);
      setStatus("Unable to access your location. Please enter your neighborhood or city.");
    }, { timeout: 10000, maximumAge: 60000 });
  }
  return (<>
<a className="skip-link" href="#main">Skip to content</a>
  <div className="topline"><span>A place for tradition. A resource for community.</span><span lang="he" dir="rtl">ב״ה</span></div>
  <header className="header">
    <a className="brand" href="#" aria-label="Mikvah Project home"><span className="brand-mark" aria-hidden="true">≈</span><span>MIKVAH<span className="brand-sub">PROJECT</span></span></a>
    <nav aria-label="Main navigation"><a className="active" href="#main">Home</a><a href="#mikvah">The Mikvah</a><a href="#resources">Community resources</a><a href="#about">About</a></nav>
    <a className="header-link" href="#information">Visitor information <span aria-hidden="true">↗</span></a>
  </header>
  <main id="main">
    <section className="minyan-hero" aria-labelledby="hero-title">
      <div className="minyan-intro"><div><p className="eyebrow">NEIGHBORHOOD MINYANIM</p><h1 id="hero-title">Find a Minyan<br />Near You</h1><p className="minyan-description">Find nearby minyanim, discover local shuls, and view prayer schedules<br className="desktop-break" /> throughout your neighborhood.</p></div><aside className="date-panel" aria-label="Current date"><p id="civil-date">{dates.civil}</p><p id="hebrew-date">{dates.hebrew}</p><span>Local calendar date</span></aside></div>
      <form className="minyan-search" id="minyan-search" onSubmit={handleSearch}><div className="search-row flex gap-2.5"><label className="location-field"><span aria-hidden="true">⌕</span><span className="sr-only">Neighborhood or city</span><input id="location" name="location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Enter your neighborhood or city" required /></label><button className="find-button" type="submit">Find Minyanim</button><button className="location-button" id="use-location" onClick={useLocation} disabled={locating} type="button"><span aria-hidden="true">⌖</span> Use My Location</button></div><div className="search-filters"><label><span>DATE</span><select name="day"><option>Today</option><option>Tomorrow</option></select></label><label><span>PRAYER</span><select name="prayer"><option>Shacharis</option><option>Mincha</option><option>Maariv</option></select></label><label><span>DISTANCE</span><select name="distance"><option>Within 2 miles</option><option>Within 5 miles</option><option>Within 10 miles</option></select></label></div><p className="search-status" id="search-status" role="status" hidden={!status}>{status}</p></form>
    </section>
    <section className="resources section" id="resources" aria-labelledby="resource-title"><div className="section-heading"><div><p className="eyebrow">AT THE HEART OF COMMUNITY</p><h2 id="resource-title">Find what brings you here.</h2></div><p>Information for the moments<br />that matter in Jewish life.</p></div><div className="resource-grid">
      <a className="resource" href="#mikvah"><span className="resource-top">01 <span aria-hidden="true">↗</span></span><h3>Mikvah</h3><p>Discover the tradition and find information for your visit.</p><span className="resource-bottom">Explore the mikvah</span></a>
      <a className="resource" href="https://www.catskillseruv.com/" target="_blank" rel="noopener noreferrer"><span className="resource-top">02 <span aria-hidden="true">↗</span></span><h3>Eruv & local life</h3><p>Explore Catskills eruv information and community resources.</p><span className="resource-bottom">Visit Catskills Eruv · external</span></a>
      <a className="resource" href="#information"><span className="resource-top">03 <span aria-hidden="true">↗</span></span><h3>Plan your visit</h3><p>See what visitor information will be available here.</p><span className="resource-bottom">Visitor information</span></a>
    </div></section>
    <section className="about section" id="mikvah"><div><p className="eyebrow">A CONNECTION THAT CONTINUES</p><h2>Ancient waters.<br /><em>Enduring meaning.</em></h2></div><div className="about-copy"><p className="lead">Mikvah holds a cherished place in Jewish life, connecting generations through a deeply personal tradition.</p><p id="about">The Mikvah Project is taking shape as a welcoming community resource—a place to find clear information about the mikvah and prepare for a visit with confidence.</p><a className="text-link dark" href="#information">Find out more about visiting <span aria-hidden="true">↗</span></a></div></section>
    <section className="information section" id="information"><div><p className="eyebrow">LOOKING AHEAD</p><h2>Your visit starts here.</h2><p>We’re preparing the details to help you plan your visit.</p></div><div className="details"><div><h3>Location & hours</h3><p>Details will be shared when confirmed.</p></div><div><h3>Appointments & contact</h3><p>Booking and contact information are coming soon.</p></div><div><h3>Preparing for your visit</h3><p>Visitor guidance will be added as the project develops.</p></div></div></section>
  </main>
  <footer><a className="brand" href="#"><span className="brand-mark" aria-hidden="true">≈</span><span>MIKVAH<span className="brand-sub">PROJECT</span></span></a><p>Tradition. Connection. Community.</p><span>© <span id="year">{dates.year}</span> Mikvah Project</span></footer>
</>);
}
