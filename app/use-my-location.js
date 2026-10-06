'use client';

import { useRef, useState } from 'react';
import { getBrowserLocation } from './browser-location';

export default function useMyLocation(onLocation, setStatus) {
  const pending = useRef(false);
  const [locating, setLocating] = useState(false);

  async function useLocation() {
    if (pending.current) return;
    pending.current = true;
    setLocating(true);
    setStatus('Finding your location…');
    try {
      const location = await getBrowserLocation(navigator.geolocation);
      onLocation(location);
    } catch (error) {
      setStatus(error.message);
    } finally {
      pending.current = false;
      setLocating(false);
    }
  }

  return { locating, useLocation };
}
