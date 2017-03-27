const createURL = (latitude, longitude) => {
    if (!latitude || !longitude) {
      return '';
    }
    latitude = encodeURIComponent(latitude);
    longitude = encodeURIComponent(longitude);
    return `https://maps.google.com?q=${latitude},${longitude}`;
  },
  setLocation = (window, url) => {
    return window.location = url;
  },
  onError = ({message}, domElement) => {
    domElement = domElement || document.getElementById('error');
    return domElement.innerHTML = message;
  },
  onSuccess = (position) => {
    let latitude = position.coords.latitude,
      longitude = position.coords.longitude;

    return createURL(latitude, longitude)
  },
  locate = () => {
    return navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

export {createURL, setLocation, onError, onSuccess, locate};