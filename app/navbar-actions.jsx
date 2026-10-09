'use client';

import Link from 'next/link';
import styles from './navbar-actions.module.css';

export default function NavbarActions({ searchTarget, onUseLocation, locating }) {
  function focusSearch(event) {
    if (!searchTarget.startsWith('#')) return;
    const field = document.getElementById(searchTarget.slice(1));
    if (field) {
      event.preventDefault();
      field.focus();
      field.scrollIntoView({ block: 'center', behavior: 'auto' });
    }
  }

  return <div className={styles.actions}>
    <Link href={searchTarget} className={styles.search} aria-label="Search for a minyan" onClick={focusSearch}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
    </Link>
    {onUseLocation && <button className={styles.location} type="button" onClick={onUseLocation} disabled={locating} aria-busy={locating}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v4m0 12v4M2 12h4m12 0h4" /></svg>
      {locating ? 'Locating…' : 'Use My Location'}
    </button>}
    <Link href="/log-in" className={styles.login}>Log In</Link>
    <Link href="/sign-up" className={styles.signup}>Sign Up</Link>
  </div>;
}
