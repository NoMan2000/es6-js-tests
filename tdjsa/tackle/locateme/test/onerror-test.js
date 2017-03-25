import chai, { expect } from 'chai';
import chaiPromise from 'chai-as-promised';
import {onError} from './../src/locateme.js';
import sinon from 'sinon';

chai.use(chaiPromise);

describe('onError test', () => {
  let sandbox;

  beforeEach( () => {
    sandbox = sinon.sandbox.create();
  });
  afterEach( () => {
    sandbox.restore();
  });

  it('should set the error DOM element', () => {
    let domElement = {innerHTML: ''},
      message = "you're kidding",
      positionError = { message };

    sandbox.stub(document, 'getElementById')
      .withArgs('error')
      .returns(domElement);

    onError(positionError);

    expect(domElement.innerHTML).to.be.eql(message);
  });
});
