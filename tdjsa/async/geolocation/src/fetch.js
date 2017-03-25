let fetchLocation = (onSuccess, onError) => {
  let returnLocation = (position) => {
    let location = {
      lat: position.coords.latitude, lon: position.coords.longitude
    };
    onSuccess(location);
  };
  navigator.geolocation.getCurrentPosition(returnLocation, onError);
};

export default fetchLocation;