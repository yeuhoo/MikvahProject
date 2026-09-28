const now = new Date();
document.getElementById('year').textContent = now.getFullYear();
document.getElementById('civil-date').textContent = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(now);
document.getElementById('hebrew-date').textContent = new Intl.DateTimeFormat('en-US-u-ca-hebrew', { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
const status = document.getElementById('search-status');
function showStatus(message) { status.hidden = false; status.textContent = message; }
document.getElementById('minyan-search').addEventListener('submit', (event) => {
  event.preventDefault();
  showStatus('The minyan directory is coming soon. Live schedules and nearby results are not available yet.');
});
document.getElementById('use-location').addEventListener('click', () => {
  if (!navigator.geolocation) { showStatus('Location is unavailable in this browser. Please enter your neighborhood or city.'); return; }
  const button = document.getElementById('use-location');
  button.disabled = true;
  showStatus('Finding your location…');
  navigator.geolocation.getCurrentPosition((position) => {
    document.getElementById('location').value = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
    button.disabled = false;
    showStatus('Location added. The minyan directory is coming soon; live results are not available yet.');
  }, () => {
    button.disabled = false;
    showStatus('Unable to access your location. Please enter your neighborhood or city.');
  }, { timeout: 10000, maximumAge: 60000 });
});
