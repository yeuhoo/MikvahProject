import test from 'node:test';
import assert from 'node:assert/strict';

import { getBrowserLocation } from './browser-location.js';

test('returns coordinates from browser location', async () => {
  assert.equal(typeof getBrowserLocation, 'function');
  const location = await getBrowserLocation({ getCurrentPosition(resolve) {
    resolve({ coords: { latitude: 41.74912, longitude: -74.68923 } });
  } });
  assert.equal(location, '41.7491, -74.6892');
});

test('unsupported browsers receive a manual entry fallback', async () => {
  assert.equal(typeof getBrowserLocation, 'function');
  await assert.rejects(getBrowserLocation(null), /enter your neighborhood or city/i);
});

test('denied permission receives an actionable error', async () => {
  assert.equal(typeof getBrowserLocation, 'function');
  await assert.rejects(getBrowserLocation({ getCurrentPosition(resolve, reject) {
    reject({ code: 1 });
  } }), /permission.*enter your neighborhood or city/i);
});

test('location timeout receives a retry fallback', async () => {
  assert.equal(typeof getBrowserLocation, 'function');
  await assert.rejects(getBrowserLocation({ getCurrentPosition(resolve, reject) {
    reject({ code: 3 });
  } }), /try again.*enter your neighborhood or city/i);
});
