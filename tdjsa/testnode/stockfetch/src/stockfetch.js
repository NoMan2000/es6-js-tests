import fs from 'fs';



class Stockfetch {

  constructor(tickers, prices) {
    this.tickersCount = tickers ? tickers.length : 0;
    this.prices = prices || {};
    this.errors = {};
  }

  readTickersFile(filename, onError) {

    let processResponse = (err, data) => {
      if (err) {
        return Stockfetch.throwErrorOnFileRead(onError, filename);
      }
      let tickers = this.parseTickers(data.toString());
      if (!Stockfetch.testValid(tickers)) {
        return Stockfetch.throwErrorOnInvalidTicker(onError, filename);
      }
      return this.processTickers(tickers);
    };

    return fs.readFile(filename, processResponse);

  }

  static testValid(tickers) {
    return Boolean(tickers.length);
  }

  static throwErrorOnInvalidTicker(onError, filename) {
    return onError(`File ${filename} has invalid content`);
  }

  static throwErrorOnFileRead(onError, filename) {
    return onError('Error reading file: ' + filename)
  }

  parseTickers(content) {
    let isInRightFormat = (str) => {
      return str.trim().length !== 0 && str.indexOf(' ') < 0;
    };
    return content.split('\n').filter(isInRightFormat);
  }

  processTickers(tickers){
    this.tickersCount = tickers ? tickers.length : 0;
    if (Array.isArray(tickers)) {
      tickers.forEach( (ticker) => {
        this.getPrice(ticker);
      });
    }
  }

  parsePrice(ticker, data) {
    let price = data.split('\n')[1].split(',').pop();
    this.prices[ticker] = price;
    this.printReport();
  }

  getPrice(ticker) {

  }

  processError(ticker, error) {
    this.errors[ticker] = error;
    this.printReport();
  }

  printReport(){}

  processHttpError(ticker, error) {
    return Stockfetch.processError(ticker, error.code);
  }

  processResponse(symbol, response) {
    if (response.statusCode === 200) {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        return this.parsePrice(symbol, data);
      });
    }
    return Stockfetch.processError(symbol, response.statusCode);
  }
}

export default Stockfetch;