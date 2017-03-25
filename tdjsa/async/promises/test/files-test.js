import chai, { expect } from 'chai';
import chaiPromise from 'chai-as-promised';
import linesCount from './../src/files.js';

chai.use(chaiPromise);

describe('test promises', () => {
  it('should return correct lines count for a valid file', () => {
    let rejectPromise = (err) => {
        console.error(err);
      },
      checkCount = (count) => {
        expect(count).to.be.eql(14);
      };
    return linesCount('src/files.js')
      .then(checkCount)
      .catch(rejectPromise);
  }).timeout(10000);

  it('should eventually return the correct lines', () => {
    return expect(linesCount('src/files.js')).to.eventually.eql(14);
  }).timeout(10000);

  it('should eventually return correct lines count - using no return', (done) => {
    expect(linesCount('src/files.js')).to.eventually.eql(14).notify(done);
  }).timeout(10000);

  it('should report error for an invalid file name', (done) => {
    expect(linesCount('src/flies.js')).to.be.rejected.notify(done);
  }).timeout(10000);

  it('should report error for an invalid file name - using with', (done) => {
    expect(linesCount('src/flies.js'))
      .to.be.rejectedWith('unable to open file src/flies.js')
      .notify(done);
  }).timeout(10000);

});