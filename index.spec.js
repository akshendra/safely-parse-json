
const { expect } = require('chai');
const s = require('./index');


describe('checkString', function () {
  it('should return the value as it is, if not string', function () {
    const value = {
      one: 'one',
    };
    const result = s(value);
    expect(result).to.deep.equal(value);
  });

  it('should return with error when not a string', function () {
    const value = {
      one: 'one',
    };
    const result = s(value, {
      returnError: true,
    });
    expect(result.value).to.deep.equal(value);
    expect(result.error).to.be.an('error');
    expect(result.error.message).to.deep.equal('Value given is not string');
  });

  it('should return with null when not a string, but value should be null', function () {
    const value = {
      one: 'one',
    };
    const result = s(value, {
      returnError: true,
      nullOnError: true,
    });
    expect(result.value).to.be.null; // eslint-disable-line
    expect(result.error).to.be.an('error');
    expect(result.error.message).to.deep.equal('Value given is not string');
  });

  it('should not check for string, thus throwing error', function () {
    const value = {
      one: 'one',
    };
    const result = s(value, {
      checkString: false,
    });

    expect(result).to.deep.equal(value);
  });

  it('should return error that it was not able to parse object', function () {
    const value = {
      one: 'one',
    };
    const result = s(value, {
      checkString: false,
      returnError: true,
    });


    expect(result.value).to.deep.equal(value);
    expect(result.error).to.be.an('error');
    expect(result.error.message).to.deep.equal('Unexpected token o in JSON at position 1');
  });

  it('should return null as value, because it was no able to parse', function () {
    const value = {
      one: 'one',
    };
    const result = s(value, {
      checkString: false,
      nullOnError: true,
    });

    expect(result).to.be.null; // eslint-disable-line
  });

  it('should parse successfully', function () {
    const value = '{ "one": "one" }';
    const result = s(value);
    expect(result).to.deep.equal({
      one: 'one',
    });
  });

  it('should not be able to parse', function () {
    const value = '{ one: "one" }';
    const result = s(value);
    expect(result).to.deep.equal('{ one: "one" }');
  });

  it('should return the error that it was not able to parse', function () {
    const value = '{ one: "one" }';
    const result = s(value, {
      returnError: true,
    });
    expect(result.value).to.deep.equal('{ one: "one" }');
    expect(result.error).to.be.an('error');
    expect(result.error.message).to.deep.equal('Unexpected token o in JSON at position 2');
  });

  it('should nullify when it is not able to parse', function () {
    const value = '{ one: "one" }';
    const result = s(value, {
      returnError: true,
      nullOnError: true,
    });
    expect(result.value).to.be.null; // eslint-disable-line
    expect(result.error).to.be.an('error');
    expect(result.error.message).to.deep.equal('Unexpected token o in JSON at position 2');
  });
});

