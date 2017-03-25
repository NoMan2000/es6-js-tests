import chai, { expect } from 'chai';
import chaiPromise from 'chai-as-promised';
import { createURL } from './../src/locateme.js';

chai.use(chaiPromise);

describe('create-url test', () => {
  it('should return a proper url given the lat and lon', () => {
    let latitude = -33.857,
      longitude = 151.215,
      url = createURL(latitude, longitude);
    expect(url).to.be.eql(`https://maps.google.com?q=${latitude},${longitude}`);
  });

  it('should return a proper url given a different lat and long', () => {
    let latitude = 37.826,
      longitude = -122.423,
      url = createURL(latitude, longitude);
    expect(url).to.be.eql(`https://maps.google.com?q=${latitude},${longitude}`);
  });

  it('should return an empty string if latitude is undefined', () => {
    let latitude = undefined,
      longitude = 188.123,
      url = createURL(latitude, longitude);
    expect(url).to.be.eql('');
  });

  it('should return an empty string if longitude is undefined', () => {
    let latitude = -40.243,
      longitude = undefined,
      url = createURL(latitude, longitude);
    expect(url).to.be.eql('');
  });
});