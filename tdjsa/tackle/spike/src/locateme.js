let locate = () => {
  navigator.geolocation.getCurrentPosition( (position) => {
    let latitude = position.coords.latitude,
      longitude = position.coords.longitude,
      url = 'http://maps.google.com/?q=' +
        encodeURIComponent(latitude) +
        encodeURIComponent(longitude);
    window.location.assign(url);
  }, () => {
      document.getElementById('error').innerHTML = 'unable to get your location';
    }

  );
};

export default locate;