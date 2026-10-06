export function getBrowserLocation(geolocation) {
  return new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Location is unavailable in this browser. Please enter your neighborhood or city.'));
      return;
    }
    geolocation.getCurrentPosition(({ coords }) => {
      resolve(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`);
    }, (error) => {
      const message = error.code === 1
        ? 'Location permission was denied. Please allow location access or enter your neighborhood or city.'
        : 'Unable to find your location. Please try again or enter your neighborhood or city.';
      reject(new Error(message));
    }, { timeout: 10000, maximumAge: 60000 });
  });
}
