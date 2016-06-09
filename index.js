'use strict';

var isValid = require('is-valid-app');
var merge = require('mixin-deep');

/**
 * Expose `context` plugin
 */

module.exports = function(view) {
  if (isValid(view, 'view-context', ['view', 'item', 'file'])) {
    this.define('context', calculate);
  }
};

/**
 * Expose `calculate` function for direct usage
 */

module.exports.calculate = calculate;

/**
 * Calculate context with the given locals
 */

function calculate(locals) {
  if (this._context) return this._context;

  if (typeof locals === 'function') {
    return locals.call(this, this);
  }
  if (arguments.length > 1) {
    locals = [].concat.apply([], [].slice.call(arguments));
  } else {
    locals = arrayify(locals);
  }

  locals.unshift(this.locals);
  locals.push(this.data);
  return merge.apply(merge, locals);
}

/**
 * Arrayify the given value by casting it to an array.
 */

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}
