/***
 * Excerpted from "Test-Driving JavaScript Applications",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/vsjavas for more book information.
***/
var expect = require('chai').expect;
var isPalindrome = require('../src/palindrome');

describe('palindrome-test', function() {
  it('should pass this canary test', function() {
    expect(true).to.be.true;
  });
  
  it('should return true for argument mom', function() {
    expect(isPalindrome('mom')).to.be.true;
  });
});
