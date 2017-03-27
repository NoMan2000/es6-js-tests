import * as locate from './../src/locateme.js';
import * as sinon from 'sinon';

describe('onSuccess test', () => {

  let sandbox;

  beforeEach( () => {
    sandbox = sinon.sandbox.create();
  });

  afterEach( () => {
    sandbox.restore();
  });
  /**
   *  var createURLSpy = sandbox.spy(window, 'createURL');

   var position = { coords: { latitude: 40.41, longitude: -105.55 }};

   onSuccess(position);

   expect(createURLSpy).to.have.been.calledWith(40.41, -105.55);
   */
  it('should call createURL with latitude and longitude', () => {
    debugger;
    let createURLSpy = sandbox.spy(locate, 'onSuccess'),
      position = { coords: { latitude: 40.41, longitude: -105.55 }};
    locate.onSuccess(position);

    expect(createURLSpy).to.have.been.calledWith(position);
  });

  it('should call setLocation with URL returned by createURL', () => {

    let url = 'http://www.example.com',
      setLocationSpy,
      position = { coords: { latitude: 40.41, longitude: -105.55 }};
    sandbox.stub(locate, 'createURL')
      .returns(url);
    setLocationSpy = sandbox.spy(locate, 'onSuccess');

    locate.onSuccess(position);

    expect(setLocationSpy).to.have.been.calledWith(position);
  });
});