import chai, { expect } from 'chai';
import chaiPromise from 'chai-as-promised';
import { setLocation } from './../src/locateme.js';

chai.use(chaiPromise);

describe('setLocation test', () => {
  it('should set the URL into location of window', () => {
    let windowStub = {},
      url = 'http://example.com';
    setLocation(windowStub, url);

    expect(windowStub.location).to.be.eql(url);
  });
});