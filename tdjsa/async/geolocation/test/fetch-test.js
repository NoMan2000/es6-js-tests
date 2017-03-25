import fetchLocation from './../src/fetch';
import { expect } from 'chai';

describe("fetch location test", () => {
  it("should get lat and lon from fetchLocation", (done) => {
    let onSuccess = (location) => {
      expect(location).to.have.property('lat');
      expect(location).to.have.property('lon');
      done();
    },
      onError = (err) => {
        throw 'not expected';
      };


    fetchLocation(onSuccess, onError);
  }).timeout(10000);
});
