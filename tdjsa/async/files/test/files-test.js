import {expect} from 'chai';
import linesCount from './../src/files';

describe('test server-side callback', () => {
  it('should return correct lines count for a valid file', (done) => {
    let callback = (count) => {
      expect(count).to.be.eql(15);
      done();
    };
    linesCount('src/files.js', callback, (message) => {console.error(message);});
  });

  it("should report error for an invalid file name", (done) => {
    let onError = (error) => {
      expect(error).to.be.eql('unable to open file src/flies.js');
      done();
    };
    linesCount('src/flies.js', null, onError);
  });
});