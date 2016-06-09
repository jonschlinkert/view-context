'use strict';

require('mocha');
var assert = require('assert');
var View = require('vinyl-view');
var context = require('./');
var view;

describe('view-context', function() {
  beforeEach(function() {
    view = new View();
    // view.use(context);
  });

  it('should export a function', function() {
    assert.equal(typeof context, 'function');
  });

  it('should create context using the given locals object', function() {
    var ctx = view.context({foo: 'bar'});
    assert.deepEqual(ctx, {foo: 'bar'});
  });

  it('should create context using view.locals', function() {
    view.locals = {foo: 'bar'};
    var ctx = view.context();
    assert.deepEqual(ctx, {foo: 'bar'});
  });

  it('should create context using view.data', function() {
    view.data = {foo: 'bar'};
    var ctx = view.context();
    assert.deepEqual(ctx, {foo: 'bar'});
  });

  it('should use locals over view.locals', function() {
    view.locals = {foo: 'bar'};
    var ctx = view.context({foo: 'baz'});
    assert.deepEqual(ctx, {foo: 'baz'});
  });

  it('should use locals over view.data', function() {
    view.data = {foo: 'bar'};
    var ctx = view.context({foo: 'baz'});
    assert.deepEqual(ctx, {foo: 'baz'});
  });

  it('should use `view.data` over `view.locals`', function() {
    view = new View({data: {foo: 'bar'}, locals: {foo: 'baz'}});
    view.use(context);
    var ctx = view.context();
    assert.deepEqual(ctx, {foo: 'bar'});
  });
});
