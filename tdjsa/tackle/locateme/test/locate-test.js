import chai, { expect } from 'chai';
import chaiPromise from 'chai-as-promised';
import {onSuccess, onError, locate} from './../src/locateme.js';
import sinon from 'sinon';

chai.use(chaiPromise);


/**
 *
 * Mock the dependency and then reverse it.  Not good.
 *
 * describe('locate test', function() {
 *     it('should register handlers with getCurrentPosition', (done) => {
 *
 *       let original = navigator.geolocation.getCurrentPosition;
 *
 *       navigator.geolocation.getCurrentPosition = function(success, error) {
 *         expect(success).to.be.eql(onSuccess);
 *         expect(error).to.be.eql(onError);
 *         done();
 *       };
 *
 *       locate();
 *       navigator.geolocation.getCurrentPosition = original;
 *     });
 *   });
 */



describe('locate test', () => {

  let sandbox;

  beforeEach( () => {
    sandbox = sinon.sandbox.create();
  });
  afterEach( () => {
    sandbox.restore();
  });

  it('should register handlers with getCurrentPosition', () => {
    let getCurrentPositionMock =
      sandbox.mock(navigator.geolocation)
        .expects('getCurrentPosition')
        .withArgs(onSuccess, onError);


    locate();

    getCurrentPositionMock.verify();
  });
});