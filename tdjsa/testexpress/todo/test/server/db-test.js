import chai from 'chai';
import db from './../../db/db.js';
const expect = chai.expect;

describe('db tests', () => {

  it('should pass this canary test', () => {
    expect(true).to.be.true;
  });

  it("get should return null connection by default", () => {
    expect(db.get()).to.be.null;
  });

  it("close should set connection to null", () => {
    db.close();
    expect(db.connection).to.be.null;
  });

  it("close should close existing connections", (done) => {
    db.connection = {
      close() {
        done();
      }
    };
    db.close();
    expect(db.connection).to.be.null;
  });

  it('connect should set connection given valid database name', (done) => {
    let callback = (err) => {
      expect(err).to.be.null;
      expect(db.get().databaseName).to.be.eql('todotest');
      db.close();
      done();
    };
    db.connect('mongodb://localhost/todotest', callback);
  });

  it('connect should reject invalid schema', (done) => {
    let callback = (err) => {
      expect(err).to.be.instanceof(Error);
      done();
    };
    db.connect('badschema://localhost/todotest', callback);
  });

});