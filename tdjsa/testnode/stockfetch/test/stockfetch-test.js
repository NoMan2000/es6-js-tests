import chai from 'chai';
import fs from 'fs';
import sinon from 'sinon';
import Stockfetch from './../src/stockfetch.js';
let expect = chai.expect;

describe("Stockfetch tests", () => {
  
  let stockfetch,
    sandbox;

  beforeEach( () => {
    stockfetch = new Stockfetch();
    sandbox = sinon.sandbox.create();
  });

  afterEach( () => {
    sandbox.restore();
  });

  it('should pass the canary test', () => {
    expect(true).to.be.true;
  });

  it('read should invoke error handler for invalid file', (done) => {
    let onError = (err) => {
      expect(err).to.be.eql('Error reading file: InvalidFile');
      done();
    };

    sandbox.stub(fs, 'readFile', (fileName, callback) => {
      callback(new Error('failed'));
    });
    
    stockfetch.readTickersFile('InvalidFile', onError);
  });

  it('read should invoke processTickers for valid file', (done) => {
    let rawData = 'GOOG\nAAPL\nORCL\NMSFT',
      parsedData = ['GOOG', 'AAPL', 'ORCL', 'MSFT'];

    sandbox.stub(stockfetch, 'parseTickers')
      .withArgs(rawData).returns(parsedData);

    sandbox.stub(stockfetch, 'processTickers', (data) => {
      expect(data).to.be.eql(parsedData);
      done();
    });

    sandbox.stub(fs, 'readFile', (fileName, callback) => {
      callback(null, rawData);
    });

    stockfetch.readTickersFile('tickers.txt');
  });

  it('read should return error if given file is empty', (done) => {
     let onError = (err) => {
       expect(err).to.be.eql('File tickers.txt has invalid content');
       done();
     };

     sandbox.stub(stockfetch, 'parseTickers').withArgs('').returns([]);

     sandbox.stub(fs, 'readFile', (fileName, callback) => {
        callback(null, '');
     });

     stockfetch.readTickersFile('tickers.txt', onError);

  });

  it('parseTickers should return tickers', () => {
     expect(stockfetch.parseTickers("A\nB\nC")).to.be.eql(['A','B','C']);
  });

  it("parseTickers should return empty array for empty content", () => {
     expect(stockfetch.parseTickers('')).to.be.eql([]);
  });

  it('parseTickers should return empty array for white space', () => {
     expect(stockfetch.parseTickers(' ')).to.be.eql([]);
  });

  it("processTickers should call getPrice for each ticker symbol", () => {
      let stockfetchMock = sandbox.mock(stockfetch);
      stockfetchMock.expects('getPrice').withArgs('A');
      stockfetchMock.expects('getPrice').withArgs('B');
      stockfetchMock.expects('getPrice').withArgs('C');

      stockfetch.processTickers(['A','B','C']);
      stockfetchMock.verify();
  });

  it('processResponse should call parsePrice with valid data', () => {
     let dataFunction,
       endFunction,
       response = {
         statusCode: 200,
         on(event, handler) {
           if (event === 'data') { dataFunction = handler; }
           if (event === 'end') { endFunction = handler; }
         }
       },
       parsePriceMock = sandbox.mock(stockfetch)
         .expects('parsePrice').withArgs('GOOG', 'some data');
     stockfetch.processResponse('parsePrice').withArgs('GOOG', response);
    dataFunction('some');
    dataFunction('data');
    endFunction();
    parsePriceMock.verify();
  });

  it('processHttpError should call processError with error details', () => {
    let processErrorMock = sandbox.mock(stockfetch)
      .expects('processError')
      .withArgs('GOOG', '...error code...'),
      error = {
        code: '...error code...'
      };
    stockfetch.processHttpError('GOOG', error);
    processErrorMock.verify();

  });

  let data = "Date,Open,High,Low,Close,Volume,Adj Close\n\
  2015-09-11,619.75,625.780029,617.419983,625.77002,1360900,625.77002\n\
  2015-09-10,613.099976,624.159973,611.429993,621.349976,1900500,621.349976";

  it('parsePrice should update prices', () => {
    stockfetch.parsePrice('GOOG', data);

    expect(stockfetch.prices.GOOG)
      .to.be.eql('625.77002');
  });

  it('parsePrice should call printReport', () => {
    let printReportMock = sandbox.mock(stockfetch).expects('printReport');

    stockfetch.parsePrice('GOOG', data);
    printReportMock.verify();
  });

  it('processError should update errors', () => {
    stockfetch.processError('GOOG', '...oops...');

    expect(stockfetch.errors.GOOG).to.be.eql('...oops...');
  });

  it('processError should call printReport', () => {
    let printReportMock = sandbox.mock(stockfetch).expects('printReport');

    stockfetch.processError('GOOG', '...oops...');
    printReportMock.verify();
  });

});

