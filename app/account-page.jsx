'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavbarActions from './navbar-actions';
import CommunityFooter from './community-footer';
import styles from './account-page.module.css';

export default function AccountPage({ signup = false }) {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');

  function previewSubmit(event) {
    event.preventDefault();
    setNotice('Accounts are not available yet. You can continue exploring the website without signing in.');
  }

  return <div className={styles.page}>
    <a className="skip-link" href="#account-main">Skip to content</a>
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="Catskills Eruv home"><span className={styles.monogram} aria-hidden="true">CE</span><span>Catskills<br /><strong>Eruv</strong></span></Link>
      <nav className={styles.navigation} aria-label="Main navigation"><Link href="/">Home</Link><Link href="/minyanim">Find a Minyan</Link><Link href="/#our-shuls">Our Shuls</Link><Link href="/shabbos">Shabbos</Link><Link href="/#daf-yomi">Daf Yomi</Link></nav>
      <NavbarActions searchTarget="/minyanim#location-search" />
    </header>
    <main className={styles.main} id="account-main">
      <aside className={styles.community} aria-labelledby="contributor-title">
        <span className={styles.contributorMark} aria-hidden="true">CE</span>
        <p className={styles.eyebrow}>COMMUNITY CONTRIBUTOR</p>
        <h2 id="contributor-title">Keep community<br />information<br />current.</h2>
        <p className={styles.description}>Contributors help neighbors find trusted, accurate details about local Mikvahs, Shuls, and Minyanim.</p>
        <ul className={styles.benefits}><li>Save work as a draft</li><li>Manage multiple listings</li><li>Every submission is reviewed</li></ul>
      </aside>
      <section className={styles.formPanel} aria-labelledby="account-title">
        <div className={styles.formContent}>
          <h1 id="account-title">{signup ? 'Create an account' : 'Welcome Back'}</h1>
          <p className={styles.intro}>{signup ? 'Join the community to help keep local Mikvah and Shul information up to date.' : 'Log in to manage your Mikvah and Shul listings and keep community information up to date.'}</p>
          <p className={styles.preview}><span aria-hidden="true">ⓘ</span> Preview only. Accounts are not connected yet. Your details are not sent or saved.</p>
          <form onSubmit={previewSubmit}>
            {signup && <label className={styles.field} htmlFor="account-name">Full Name <span>*</span><input id="account-name" type="text" autoComplete="name" placeholder="Your full name" required /></label>}
            <label className={styles.field} htmlFor="account-email">Email Address <span>*</span><input id="account-email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            <label className={styles.field} htmlFor="account-password">Password <span>*</span></label>
            <div className={styles.passwordField}>
              <input id="account-password" type={showPassword ? 'text' : 'password'} autoComplete={signup ? 'new-password' : 'current-password'} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" /><circle cx="12" cy="12" r="3" /></svg></button>
            </div>
            {!signup && <div className={styles.options}><label><input type="checkbox" /> Remember me</label><button type="button" disabled title="Password recovery is not available yet">Forgot Password?</button></div>}
            <button className={styles.submit} type="submit">{signup ? 'Sign Up' : 'Log In'}</button>
            {notice && <p className={styles.notice} role="status">{notice}</p>}
          </form>
          <p className={styles.switchPage}>{signup ? 'Already have an account? ' : 'New to Catskills Eruv? '}<Link href={signup ? '/log-in' : '/sign-up'}>{signup ? 'Log in' : 'Create an account'}</Link></p>
        </div>
      </section>
    </main>
    <CommunityFooter standalone />
  </div>;
}
