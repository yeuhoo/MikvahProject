import Link from 'next/link';
import styles from './dashboard.module.css';

export const metadata = {
  title: 'My Dashboard | Catskills Eruv',
  description: 'Contributor dashboard preview for Catskills Eruv.',
};

function Icon({ name, size = 18 }) {
  const paths = {
    building: <><path d="m4 21 0-15 8-4 8 4v15M8 21v-8h8v8M9 7v2m6-2v2" /><path d="M12 2v3" /></>,
    listings: <><path d="M3 5 9 3l6 2 6-2v16l-6 2-6-2-6 2V5ZM9 3v16m6-14v16" /></>,
    user: <><circle cx="12" cy="7" r="3" /><path d="M5 21v-3a7 7 0 0 1 14 0v3" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Brand() {
  return <Link className={styles.brand} href="/" aria-label="Catskills Eruv home"><span className={styles.monogram} aria-hidden="true">CE</span><span>Catskills<br />Eruv</span></Link>;
}

function PlaceholderButton({ children, primary = false, plus = false, className = '' }) {
  return <button type="button" disabled title="Not available yet" className={`${styles.button} ${primary ? styles.primary : ''} ${className}`}>{plus && <Icon name="plus" size={16} />}{children}</button>;
}

export default function DashboardPage() {
  return <div className={styles.page}>
    <a className="skip-link" href="#dashboard-main">Skip to content</a>
    <header className={styles.header}>
      <Brand />
      <nav className={styles.navigation} aria-label="Main navigation">
        <Link href="/">Home</Link><Link href="/minyanim">Find a Minyan</Link><button type="button" disabled title="Not available yet">Mikvahs</button><Link href="/#our-shuls">Our Shuls</Link><Link href="/shabbos">Shabbos</Link>
      </nav>
      <div className={styles.headerActions}>
        <Link className={styles.search} href="/minyanim" aria-label="Search for a minyan"><Icon name="search" /></Link>
        <button className={styles.profile} type="button" disabled title="Profile preview only"><span className={styles.avatar}><Icon name="user" size={16} /></span><span>Nam</span><Icon name="chevron" size={13} /></button>
      </div>
    </header>

    <div className={styles.workspace}>
      <aside className={styles.sidebar} aria-label="Contributor portal">
        <p className={styles.sidebarLabel}>CONTRIBUTOR PORTAL</p>
        <nav className={styles.sidebarNav} aria-label="Dashboard navigation">
          <Link href="/dashboard" className={styles.selected} aria-current="page"><Icon name="building" />My Dashboard</Link>
          <button type="button" disabled title="Not available yet"><Icon name="listings" />My Listings</button>
          <button type="button" disabled title="Not available yet"><Icon name="user" />Account Settings</button>
          <button type="button" disabled title="Not available yet" className={styles.sidebarAdd}><Icon name="plus" />Add Listing</button>
        </nav>
      </aside>

      <main className={styles.main} id="dashboard-main">
        <p className={styles.eyebrow}>WELCOME BACK, Nam</p>
        <div className={styles.heading}>
          <div><h1>My Dashboard</h1><p className={styles.description}>Manage your Mikvah and Shul listings and help keep community information accurate.</p></div>
          <div className={styles.addActions}><PlaceholderButton primary plus>Add Mikvah</PlaceholderButton><PlaceholderButton plus>Add Shul</PlaceholderButton></div>
        </div>

        <dl className={styles.stats} aria-label="Listing statistics">
          {['Total Listings', 'Published', 'Pending Review', 'Drafts'].map(label => <div className={styles.stat} key={label}><dt>{label}</dt><dd>00</dd></div>)}
        </dl>

        <section className={styles.listings} aria-labelledby="listings-title">
          <p className={styles.eyebrow}>YOUR CONTRIBUTIONS</p>
          <div className={styles.listingsHeading}><h2 id="listings-title">My Listings</h2><button className={styles.addLink} type="button" disabled title="Not available yet">Add Listing<Icon name="plus" size={16} /></button></div>
          <div className={styles.empty}>
            <span className={styles.emptyIcon}><Icon name="building" size={29} /></span>
            <h3>You Haven&apos;t Added Any Listings Yet</h3>
            <p>Help your community by sharing accurate information about a Mikvah or Shul.</p>
            <div className={styles.emptyActions}><PlaceholderButton primary>Add a Mikvah</PlaceholderButton><PlaceholderButton>Add a Shul</PlaceholderButton></div>
          </div>
        </section>
      </main>
    </div>

    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerAbout}><Brand /><p>Helping Catskills neighbors find prayer,<br />community, and a place to gather.</p><p className={styles.disclaimer}>Sample schedules are not authoritative. Please confirm times with each shul.</p></div>
        <nav aria-label="Explore"><h2>EXPLORE</h2><Link href="/minyanim">Find a Minyan</Link><Link href="/#our-shuls">Our Shuls</Link><Link href="/shabbos">Shabbos</Link><Link href="/#daf-yomi">Daf Yomi</Link></nav>
        <nav aria-label="Community"><h2>COMMUNITY</h2><Link href="/#about">About</Link><button type="button" disabled title="Not available yet">Add a Shul</button><button type="button" disabled title="Not available yet">Add a Mikvah</button><Link href="/dashboard">Contributor Portal</Link></nav>
        <nav aria-label="Support"><h2>SUPPORT</h2><button type="button" disabled title="Not available yet">Accessibility</button><button type="button" disabled title="Not available yet">Privacy</button></nav>
      </div>
      <div className={styles.footerBottom}><span>© Catskills Eruv</span><span>One Community. Many Minyanim. Always Together.</span></div>
    </footer>
  </div>;
}
