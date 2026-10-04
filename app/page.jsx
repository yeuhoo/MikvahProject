"use client";

import { useEffect, useState } from "react";
import MinyanSchedule from "./minyan-schedule";
import ShabbosSection from "./shabbos-section";
import OurShuls from "./our-shuls";
import DafYomi from "./daf-yomi";
import CommunityFooter, { CommunityStatement } from "./community-footer";

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
    <nav aria-label="Main navigation"><a className="active" href="#main">Home</a><a href="#minyan-search">Find a Minyan</a><a href="#our-shuls">Our Shuls</a><a href="#shabbos">Shabbos</a><a href="#daf-yomi">Daf Yomi</a><a href="#about">About</a></nav>
    <a className="header-link" href="#our-shuls">Explore our shuls <span aria-hidden="true">↗</span></a>
  </header>
  <main id="main">
    <section className="minyan-hero" aria-labelledby="hero-title">
      <div className="minyan-intro"><div><p className="eyebrow">NEIGHBORHOOD MINYANIM</p><h1 id="hero-title">Find a Minyan<br />Near You</h1><p className="minyan-description">Find nearby minyanim, discover local shuls, and view prayer schedules<br className="desktop-break" /> throughout your neighborhood.</p></div><aside className="date-panel" aria-label="Current date"><p id="civil-date">{dates.civil}</p><p id="hebrew-date">{dates.hebrew}</p><span>Local calendar date</span></aside></div>
      <form className="minyan-search" id="minyan-search" onSubmit={handleSearch}><div className="search-row flex gap-2.5"><label className="location-field"><span aria-hidden="true">⌕</span><span className="sr-only">Neighborhood or city</span><input id="location" name="location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Enter your neighborhood or city" required /></label><button className="find-button" type="submit">Find Minyanim</button><button className="location-button" id="use-location" onClick={useLocation} disabled={locating} type="button"><span aria-hidden="true">⌖</span> Use My Location</button></div><div className="search-filters"><label><span>DATE</span><select name="day"><option>Today</option><option>Tomorrow</option></select></label><label><span>PRAYER</span><select name="prayer"><option>Shacharis</option><option>Mincha</option><option>Maariv</option></select></label><label><span>DISTANCE</span><select name="distance"><option>Within 2 miles</option><option>Within 5 miles</option><option>Within 10 miles</option></select></label></div><p className="search-status" id="search-status" role="status" hidden={!status}>{status}</p></form>
    </section>
    <MinyanSchedule />
    <ShabbosSection />
    <OurShuls />
    <DafYomi />
    <CommunityStatement />
  </main>
  <CommunityFooter />
</>);
}
