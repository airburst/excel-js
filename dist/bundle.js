(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _functionfoundry = require('functionfoundry');

var functions = _interopRequireWildcard(_functionfoundry);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//import {compiler} from 'formulafoundry';
//console.log(compiler);

var expressions = ['ABS(-1.1)', 'LOWER("TEXT ") + ABS(-2)', 'SUM(2, 5)'];

(function () {
    // Create set of functions
    var functionList = '',
        i = 1;
    for (var key in functions) {
        window[key] = functions[key];
        functionList += '<code>[' + i++ + '] ' + key + '</code></br>';
    }

    var output = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = expressions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var e = _step.value;

            output += '<code>' + e + ' = ' + eval(e) + '</code></br>';
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    document.getElementById('debug').innerHTML = output + '<h3>Functions</h3>' + functionList;
})();

},{"functionfoundry":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// Copyright 2015 Peter W Moresi

// Returns true when the value is a finite number.
function ISNUMBER(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

// Copyright 2015 Peter W Moresi

// List of errors in the spreadsheet system

function FFError(message) {
  this.name = "NotImplementedError";
  this.message = message || "";
}

FFError.prototype = Error.prototype;
FFError.prototype.toString = function () {
  return this.message;
};

var nil = new FFError('#NULL!');
var div0 = new FFError('#DIV/0!');
var value = new FFError('#VALUE!');
var ref = new FFError('#REF!');
var name = new FFError('#NAME?');
var num = new FFError('#NUM!');
var na = new FFError('#N/A!');
var error$1 = new FFError('#ERROR!');
var data = new FFError('#GETTING_DATA!');
var missing = new FFError('#MISSING!');
var unknown = new FFError('#UNKNOWN!');
var error$2 = {
  nil: nil,
  div0: div0,
  value: value,
  ref: ref,
  name: name,
  num: num,
  na: na,
  error: error$1,
  data: data,
  missing: missing,
  unknown: unknown
};

// ABS computes absolute value of a number
function ABS(value) {

  // Return `#VALUE!` if not number
  if (!ISNUMBER(value)) {
    return error$2.value;
  }

  // Use built-in Math.abs
  return Math.abs(value);
}

// ACOS computes the inverse cosine of a number
function ACOS(value) {

  // Return `#VALUE!` if not number
  if (!ISNUMBER(value)) {
    return error$2.value;
  }

  // Use built-in Math.acos
  return Math.acos(value);
}

// ADD calculates the sum of two numbers.
function ADD() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  // Return `#NA!` if 2 arguments are not provided.
  if (values.length !== 2) {
    return error$2.na;
  }

  // decompose values into a and b.
  var a = values[0];
  var b = values[1];

  // Return `#VALUE!` if either a or b is not a number.

  if (!ISNUMBER(a) || !ISNUMBER(b)) {
    return error$2.value;
  }

  // Return the sum.
  return a + b;
}

// AND reduces list of truthy values into true or false value
function AND() {
  for (var _len2 = arguments.length, criteria = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    criteria[_key2] = arguments[_key2];
  }

  // Reduce criteria into boolean value.
  return criteria.reduce(function (acc, item) {

    // return `#VALUE!` if not true, false, 1 or 0
    if (item !== true && item !== false && item !== 1 && item !== 0) {
      return error$2.value;
    }

    // Once `#VALUE!` is found then always return `#VALUE!`
    if (acc === error$2.value) return error$2.value;

    // Once `false` is found always return `false`
    if (acc === false) return false;

    // Return the current value whether true or false
    return item === true || item === 1;
  });
}

// Copyright 2015 Peter W Moresi

// FLATTEN converts a nested array into a flattened array. It only supports one
// level of nesting.
function FLATTEN(ref) {
  return ref.reduce(function (a, b) {
    return a.concat(b);
  }, []);
}

// SUM a given list of `numbers`
function SUM() {
  for (var _len3 = arguments.length, numbers = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    numbers[_key3] = arguments[_key3];
  }

  return FLATTEN(FLATTEN(numbers)).reduce(function (a, b) {
    if (typeof b !== 'number') {
      return error$2.value;
    }
    return a + b;
  });
}

// ISERR returns true when the value is an error (except `#NA!`) or when then
// value is a number which is NaN or [-]Infinity.
function ISERR(value) {
  return value !== error$2.na && value.constructor.name === 'Error' || typeof value === 'number' && (Number.isNaN(value) || !Number.isFinite(value));
}

// ISERROR returns true when the value is an error.
function ISERROR(value) {
  return ISERR(value) || value === error$2.na;
}

// AVERAGE computes sum of items divided by number of items
function AVERAGE() {

  // compute sum all of the items.
  var sum = SUM.apply(undefined, arguments);

  // return sum when computed error.
  if (ISERROR(sum)) {
    return sum;
  }

  // return sum divided by item count
  return sum / arguments.length;
}

// BIN2DEC converts binary string into decimal value
function BIN2DEC(value) {
  var valueAsString;

  if (typeof value === "string") {
    valueAsString = value;
  } else if (typeof value !== "undefined") {
    valueAsString = value.toString();
  } else {
    return error$2.NA;
  }

  if (valueAsString.length > 10) return error$2.NUM;

  // we subtract 512 when the leading number is 0.
  if (valueAsString.length === 10 && valueAsString[0] === '1') {
    return parseInt(valueAsString.substring(1), 2) - 512;
  }

  // Convert binary number to decimal with built-in facility
  return parseInt(valueAsString, 2);
};

// Copyright 2015 Peter W Moresi

// Shared constants
var d1900 = new Date(1900, 0, 1);
var JulianOffset = 2415019;
var SecondsInHour = 3600;
var SecondsInDay = 86400;
var MilliSecondsInDay = 86400000;
var DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var DayNames3 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var MonthNames3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var AM = "AM";
var AM1 = "A";
var PM = "PM";
var PM1 = "P";
var τ = 6.28318530717958;
var MaxCols = 16384;
var SeparatorChar = ",";
var DecimalChar = ".";
var DefaultCurrency = "$";
var AllowedColors = {
  BLACK: "#000000",
  BLUE: "#0000FF",
  CYAN: "#00FFFF",
  GREEN: "#00FF00",
  MAGENTA: "#FF00FF",
  RED: "#FF0000",
  WHITE: "#FFFFFF",
  YELLOW: "#FFFF00"
};

// CELLINDEX computes the index for row and column in a 2 dimensional array.
function CELLINDEX(row, col) {
  // Multiple row by maximum columns plus the col.
  return Math.floor(row * MaxCols + col);
}

// Copyright 2015 Peter W Moresi

// UNIQUE reduces an `array` into an array without duplicate values.
function UNIQUE(array) {
  return array.reduce(function (p, c) {
    if (p.indexOf(c) < 0) p.push(c);
    return p;
  }, []);
}

// CHANGED computes the list of keys that are different between two objects.
function CHANGED(a, b) {

  // Compute the keys in object a and b.
  var keysA = Object.keys(a),
      keysB = Object.keys(b);

  // Find the unique set of properties comparing a to b and b to a.
  return UNIQUE(keysA.filter(function (n) {
    return a[n] !== b[n];
  }).concat(keysB.filter(function (n) {
    return a[n] !== b[n];
  })));
}

// CHOOSE accepts an index and a list of items. It returns the item that corresponds to the index.
function CHOOSE(index) {

  // Return `#NA!` if index or items are not provided.
  if (!index || arguments.length - 1 === 0) {
    return error$2.na;
  }

  // Return `#VALUE!` if index is less than 1 or greater than 254.
  if (index < 1 || index > 254) {
    return error$2.value;
  }

  // Return `#VALUE!` if number of items is less than index.
  if (arguments.length - 1 < index) {
    return error$2.value;
  }

  // Return the item.
  return arguments.length <= index - 1 + 1 ? undefined : arguments[index - 1 + 1];
}

// Copyright 2015 Peter W Moresi

// ISBLANK returns true when the value is undefined or null.
function ISBLANK(value) {
  return typeof value === 'undefined' || value === null;
};

// Copyright 2015 Peter W Moresi

// SELECT fields from object
function SELECT(fields, body) {
  // non-json
  if (!body || 'object' != (typeof body === "undefined" ? "undefined" : _typeof(body))) return;

  // check for fields
  if (!fields) return;

  // split
  if ('string' == typeof fields) fields = fields.split(/ *, */);

  // fields array
  if (Array.isArray(body)) {
    return body.map(function (obj) {
      return fields.reduce(function (ret, key) {
        ret[key] = obj[key];
        return ret;
      }, {});
    });

    return;
  }

  // fields object
  return fields.reduce(function (ret, key) {
    ret[key] = body[key];
    return ret;
  }, {});
}

// CLEAN accepts an object and remove properties that are blank.
function CLEAN(obj) {
  // Compute keys where value is non blank.
  var keys = Object.keys(obj).filter(function (n) {
    return !ISBLANK(obj[n]);
  });

  // Compute object with only non-blank keys.
  return SELECT(keys, obj);
}

// CODE accepts text and optionally index (default 1) returning the character code.
function CODE() {
  var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var index = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

  if (index < 1) return error$2.na;
  if (text.length < index) return error$2.value;
  return text.charCodeAt(index - 1);
}

// Copyright 2015 Peter W Moresi

// ISTEXT returns true when the value is a string.
function ISTEXT(value) {
  return 'string' === typeof value;
};

// ISREF returns true when the value is a reference.
function ISREF(value) {
  if (!value) return false;
  return value.isRef === true;
}

// Convert letter to number (e.g A -> 0)
function COLUMNNUMBER(column) {

  if (!ISTEXT(column)) {
    return error$2.value;
  }

  // see toColumn for rant on why this is sensible even though it is illogical.
  var s = 0,
      secondPass;

  if (column.length > 0) {

    s = column.charCodeAt(0) - 'A'.charCodeAt(0);

    for (var i = 1; i < column.length; i++) {
      // compensate for spreadsheet column naming
      s += 1;
      s *= 26;
      s += column.charCodeAt(i) - 'A'.charCodeAt(0);
      secondPass = true;
    }

    return s;
  }

  return error$2.value;
}

// COLUMN return the column number that corresponds to the reference.
function COLUMN(value) {

  // Return `#VALUE!` when the value is not a reference.
  if (!ISREF(value)) {
    return error$2.value;
  }

  // Run the COLUMNNUMBER and convert to base 1.
  return COLUMNNUMBER(value.column) + 1;
}

// Convert index to letter (e.g 0 -> A)
function COLUMNLETTER(index) {

  if (!ISNUMBER(index)) {
    return error$2.value;
  }

  // The column is determined by applying a modified Hexavigesimal algorithm.
  // Normally BA follows Z but spreadsheets count wrong and nobody cares.

  // Instead they do it in a way that makes sense to most people but
  // is mathmatically incorrect. So AA follows Z which in the base 10
  // system is like saying 01 follows 9.

  // In the least significant digit
  // A..Z is 0..25

  // For the second to nth significant digit
  // A..Z is 1..26

  var converted = "",
      secondPass = false,
      remainder,
      value = Math.abs(index);

  do {
    remainder = value % 26;

    if (secondPass) {
      remainder--;
    }

    converted = String.fromCharCode(remainder + 'A'.charCodeAt(0)) + converted;
    value = Math.floor((value - remainder) / 26);

    secondPass = true;
  } while (value > 0);

  return converted;
}

// Copyright 2015 Peter W Moresi

// CONCATENATE reduces a list of values into a single string.
function CONCATENATE() {
  for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    values[_key4] = arguments[_key4];
  }

  // Combine into a single string value
  return values.reduce(function (acc, item) {
    return "" + acc + item;
  });
}

// Copyright 2015 Peter W Moresi

// COND accepts conditions and returns the even value after the first odd
// value that is true. If no odd value is true then it returns the last odd
// value when present.
//
// SYNTAX( cond1, result_if_true [, cond2, result_if_true, default_result] )
function COND() {
  for (var _len5 = arguments.length, cases = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    cases[_key5] = arguments[_key5];
  }

  var found = false;

  // Reduce all cases into a value.
  return cases.reduce(function (acc, item, index) {

    // Return previously found result
    if (found === true) return acc;

    // Handle last item
    if (index === cases.length - 1) {
      // There is no last item.
      if (index % 2 === 1) return;

      // return the last item
      return item;
    }

    // Check if condition is true
    if (index % 2 === 0 && item === true) {
      found = true;
      // return the found item
      return cases[index + 1];
    }

    return acc;
  }, undefined);
}

// Copyright 2015 Peter W Moresi

// ISARRAY returns true when the value is an aray.
function ISARRAY(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

// Copyright 2015 Peter W Moresi

// EQ compares two values and returns a boolean value.
function EQ(a, b) {
  // String comparisions are case-insensitive
  if (typeof a === "string" && typeof b === "string") {
    return a.toLowerCase() === b.toLowerCase();
  } else {
    return a === b;
  }
}

// INT returns true when a needle is found in a lookup.
function IN(needle, lookup) {

  // Return `#NA!` when the needle and lookup are blank.
  if (ISBLANK(needle) && ISBLANK(lookup)) {
    return error$2.na;
  }

  // Return `#NA!` when the lookup is not an array.
  if (!ISARRAY(lookup)) {
    return error$2.na;
  }

  // Return true when some of the values match the needle.
  return lookup.some(function (n) {
    return EQ(n, needle);
  });
}

// ALIAS CONTAINS
var CONTAINS = IN;

// COS returns the cosine of a value.
function COS(value) {

  // Return `#VALUE!` when value is not a number.
  if (!ISNUMBER(value)) {
    return error$2.value;
  }

  return Math.cos(value);
}

// Copyright 2015 Peter W Moresi

// ISDATE returns true when the `value` is a JavaScript date object.
function ISDATE(value) {
  return value && Object.prototype.toString.call(value) == '[object Date]';
};

// SERIAL convert a date object into a serial number.
function SERIAL(date) {
  // Credit: https://github.com/sutoiku/formula.js/
  if (!ISDATE(date)) {
    return error$2.na;
  }
  var diff = Math.ceil((date - d1900) / MilliSecondsInDay);
  return diff + (diff > 59 ? 2 : 1);
}

// DATE returns a serial number given a year, month and day.
function DATE(year, month, day) {
  return SERIAL(new Date(year, month - 1, day));
}

// PARSEDATE converts a value into a Date object.
function PARSEDATE(val) {

  /* *******************
  Extracted from Social Calc
   convert_date_julian_to_gregorian(juliandate)
   ymd->{}
  .year
  .month
  .day
   From: http://aa.usno.navy.mil/faq/docs/JD_Formula.html
  Uses: Fliegel, H. F. and van Flandern, T. C. (1968). Communications of the ACM, Vol. 11, No. 10 (October, 1968).
  Translated from the FORTRAN
   ************************* */
  function convert_date_julian_to_gregorian(juliandate) {

    var L, N, I, J, K;

    L = juliandate + 68569;
    N = Math.floor(4 * L / 146097);
    L = L - Math.floor((146097 * N + 3) / 4);
    I = Math.floor(4000 * (L + 1) / 1461001);
    L = L - Math.floor(1461 * I / 4) + 31;
    J = Math.floor(80 * L / 2447);
    K = L - Math.floor(2447 * J / 80);
    L = Math.floor(J / 11);
    J = J + 2 - 12 * L;
    I = 100 * (N - 49) + I + L;

    return new Date(I, J - 1, K);
  }

  if (val instanceof Error) {
    return val;
  } else if (typeof val === 'number') {
    // val is assumed to be serial number.
    return convert_date_julian_to_gregorian(Math.floor(val + JulianOffset));
  } else if (typeof val === 'string') {
    var timestamp = Date.parse(val);
    if (isNaN(timestamp)) {
      return error$2.value;
    }
    return new Date(timestamp);
  }

  return error$2.value;
}

// DATEVALUE parses a date string and returns a serial number.
function DATEVALUE(d) {
  return SERIAL(PARSEDATE(d));
}

// DATEDIF return the difference between two dates given a start date, end date and unit.
function DATEDIF(start_date, end_date, unit) {
  var second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7;
  start_date = PARSEDATE(start_date), end_date = PARSEDATE(end_date);

  var timediff = end_date - start_date;
  if (isNaN(timediff)) return NaN;

  switch (unit) {
    case "Y":
      return end_date.getFullYear() - start_date.getFullYear();
    case "M":
      return end_date.getFullYear() * 12 + end_date.getMonth() - (start_date.getFullYear() * 12 + start_date.getMonth());
    case "W":
      return Math.floor(timediff / week);
    case "D":
      return Math.floor(timediff / day);
    case "MD":
      return end_date.getDate() - start_date.getDate();
    case "YM":
      return end_date.getMonth() - start_date.getMonth();
    case "YD":
      return new Error("NOT IMPLEMENTED");
    default:
      return undefined;
  }
}

// PARSEBOOL converts a truthy value into a boolean value.
function PARSEBOOL(val) {

  if (val instanceof Error) {
    return val;
  } else if (typeof val === 'boolean') {
    return val;
  } else if (typeof val === 'number') {
    return val !== 0;
  } else if (typeof val === 'string') {
    var up = val.toUpperCase();
    if (up === 'TRUE' || up === 'FALSE') {
      return up === 'TRUE';
    }
  }

  return error$2.value;
}

function DAYS360(start_date, end_date, method) {
  method = PARSEBOOL(method);
  start_date = PARSEDATE(start_date);
  end_date = PARSEDATE(end_date);

  if (start_date instanceof Error) {
    return start_date;
  }
  if (end_date instanceof Error) {
    return end_date;
  }
  if (method instanceof Error) {
    return method;
  }
  var sm = start_date.getMonth();
  var em = end_date.getMonth();
  var sd, ed;
  if (method) {
    sd = start_date.getDate() === 31 ? 30 : start_date.getDate();
    ed = end_date.getDate() === 31 ? 30 : end_date.getDate();
  } else {
    var smd = new Date(start_date.getFullYear(), sm + 1, 0).getDate();
    var emd = new Date(end_date.getFullYear(), em + 1, 0).getDate();
    sd = start_date.getDate() === smd ? 30 : start_date.getDate();
    if (end_date.getDate() === emd) {
      if (sd < 30) {
        em++;
        ed = 1;
      } else {
        ed = 30;
      }
    } else {
      ed = end_date.getDate();
    }
  }
  return 360 * (end_date.getFullYear() - start_date.getFullYear()) + 30 * (em - sm) + (ed - sd);
}

// Copyright 2015 Peter W Moresi

// REPT creates string by repeating text a given number of times.
function REPT(text, number) {
  var r = '';
  for (var i = 0; i < number; i++) {
    r += text;
  }
  return r;
}

// based on https://github.com/sutoiku/formula.js/blob/mast../src/engineering.js
function DEC2BIN(input, places) {

  // exit if input is an error
  if (input instanceof Error) {
    return number;
  }

  // cast input to number
  var number = parseInt(input);

  if (Number.isNaN(number)) {
    return error$2.value;
  }

  // Return error.if number is not decimal, is lower than -512, or is greater than 511
  if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) {
    return error$2.num;
  }

  // Ignore places and return a 10-character binary number if number is negative
  if (number < 0) {
    return '1' + REPT('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
  }

  // Convert decimal number to binary
  var result = parseInt(number, 10).toString(2);

  // Return binary number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error.if places is nonnumeric
    if (isNaN(places)) {
      return error$2.value;
    }

    // Return error.if places is negative
    if (places < 0) {
      return error$2.num;
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return places >= result.length ? REPT('0', places - result.length) + result : error$2.num;
  }
}

// Copyright 2015 Peter W Moresi

function DIFF(a, b) {
  var keysA = Object.keys(a),
      keysB = Object.keys(b),
      InA = keysB.filter(function (n) {
    return keysA.indexOf(n) > -1;
  }),
      NotInA = keysB.filter(function (n) {
    return keysA.indexOf(n) === -1;
  }),
      NotInB = keysA.filter(function (n) {
    return keysB.indexOf(n) === -1;
  }),
      Diff = InA.filter(function (n) {
    return a[n] !== b[n];
  });

  return {
    unique_left: NotInA,
    unique_right: NotInB,
    diff: Diff.reduce(function (x, y) {
      var diff = {};
      diff[y] = { left: a[y], right: b[y] };
      return Object.assign({}, x, diff);
    }, {})
  };
}

// DIVIDE calculates the product of two numbers.
function DIVIDE() {
  for (var _len6 = arguments.length, values = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    values[_key6] = arguments[_key6];
  }

  // Return `#NA!` if 2 arguments are not provided.
  if (values.length !== 2) {
    return error$2.na;
  }

  // decompose values into a and b.
  var a = values[0];
  var b = values[1];

  // You cannot divide a number by 0.

  if (b === 0) {
    return error$2.div0;
  }

  // Return `#VALUE!` if either a or b is not a number.
  if (!ISNUMBER(a) || !ISNUMBER(b)) {
    return error$2.value;
  }

  // Return the product
  return a / b;
}

// Exact compares two values and only returns true if they meet strict equivalence.
var EXACT = function EXACT(a, b) {
  return a === b;
};

// Copyright 2015 Peter W Moresi

// FILTER limits a range based on arrays of boolean values.
function FILTER(range) {
  for (var _len7 = arguments.length, filters = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    filters[_key7 - 1] = arguments[_key7];
  }

  // A filter is an array of true/false values.
  // The filter may be for rows or for columns but not both.
  // A array filter may only filter a range that covers a single row or a single column.

  function makeFilter() {
    return function (value, index) {
      return filters.reduce(function (previousValue, currentValue) {
        if (previousValue === false) {
          return false;
        } else {
          return currentValue[index];
        }
      }, true);
    };
  }

  return range.filter(makeFilter());
}

// FIND searches for text within a string
function FIND(find_text) {
  var within_text = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  var position = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];


  // Find the position of the text
  position = within_text.indexOf(find_text, position - 1);

  // If found return the position as base 1.
  return position === -1 ? error$2.value : position + 1;
}

function GT(a, b) {
  if (ISREF(a) && ISREF(b)) {
    return error$2.na;
  } else if (ISARRAY(a) && ISARRAY(b)) {
    return error$2.na;
  } else if (ISREF(a) || ISARRAY(a)) {
    return a.map(function (d) {
      return d > b;
    });
  } else if (ISREF(b) || ISARRAY(b)) {
    return b.map(function (d) {
      return d > a;
    });
  } else {
    return a > b;
  }
}

function GTE(a, b) {
  if (ISREF(a) && ISREF(b)) {
    return error.na;
  } else if (ISARRAY(a) && ISARRAY(b)) {
    return error.na;
  } else if (ISREF(a) || ISARRAY(a)) {
    return a.map(function (d) {
      return d >= b;
    });
  } else if (ISREF(b) || ISARRAY(b)) {
    return b.map(function (d) {
      return d >= a;
    });
  } else {
    return a >= b;
  }
}

// Copyright 2015 Peter W Moresi

// credit to http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
// rfc4122 version 4 compliant solution

// Generate a globally unique identifier
function GUID() {
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
  return guid;
};

// HLOOKUP searches for a needle across the rows.
function HLOOKUP(needle, table) {
  var index = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
  var exactmatch = arguments[3];

  if (typeof needle === "undefined" || ISBLANK(needle)) {
    return null;
  }

  if (index > table.length) {
    return error$2.ref;
  }

  var needleLower = (needle + '').toLowerCase(),
      row = table[0];

  for (var i = 0; i < row.length; i++) {

    if (exactmatch && row[i] === needle || row[i] == needle || typeof row[i] === "string" && row[i].toLowerCase().indexOf(needleLower) != -1) {
      return table[index - 1][i];
    }
  }

  return error$2.na;
}

// IF returns second argument if true, other it returns the third argument.
function IF(value, value_if_true, value_if_false) {
  return value || typeof value === 'string' && value.toLowerCase() === 'true' ? value_if_true : value_if_false;
}

// IFBLANK return the `value` if non-blank, otherwise it returns `value_if_blank`.
function IFBLANK(value, value_if_blank) {
  return ISBLANK(value) ? value_if_blank : value;
}

// ISEMPTY returns true when the value is blank, is an empty array or when it
// is an empty string.
function ISEMPTY(value) {
  return ISBLANK(value) || ISARRAY(value) && value.length === 0 || ISTEXT(value) && value === '';
};

// IFBLANK return the `value` if empty, otherwise it returns `value_if_empty`.
function IFEMPTY(value, value_if_empty) {
  return ISEMPTY(value) ? value_if_empty : value;
}

// IFBLANK return the `value` if error, otherwise it returns `value_if_error`.
function IFERROR(value) {
  var value_if_error = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  return ISERROR(value) ? value_if_error : value;
}

// IFBLANK return the `value` if `#NA!`, otherwise it returns `value_if_na`.
function IFNA(value, value_if_na) {
  return value === error$2.na ? value_if_na : value;
}

// INDEX2COL computes the row given a cell index
function INDEX2ROW(index) {
  return Math.floor(index / MaxCols);
}

// INDEX2COL computes the column given a cell index
function INDEX2COL(index) {
  return index - INDEX2ROW(index) * MaxCols;
}

// Copyright 2015 Peter W Moresi

// ISFUNCTION returns true when `value` is a function.
function ISFUNCTION(value) {
  return value && Object.prototype.toString.call(value) == '[object Function]';
};

// REF accepts top and bottom and returns a reference object. It encapsulates a cell or a range.
function REF(top, bottom) {

  // The index must be a number
  if (!ISNUMBER(top) && !ISFUNCTION(top)) {
    return error$2.value;
  }

  if (ISBLANK(bottom)) {
    bottom = top;
  }

  var getTop = function getTop() {
    return ISFUNCTION(top) ? top() : top;
  };
  var getBottom = function getBottom() {
    return ISFUNCTION(bottom) ? bottom() : bottom;
  };

  return {

    get isRef() {
      return true;
    },

    get top() {
      return getTop();
    },

    get bottom() {
      return getBottom();
    },

    // Returns row (rowIndex plus 1)
    get row() {
      return INDEX2ROW(getTop()) + 1;
    },

    // Returns rowIndex (base 0)
    get rowIndex() {
      return INDEX2ROW(getTop());
    },

    // Returns column letter
    get column() {
      return COLUMNLETTER(INDEX2COL(getTop()));
    },

    // Returns column index
    get columnIndex() {
      return INDEX2COL(getTop());
    },

    // Returns row (rowIndex plus 1)
    get bottomRow() {
      return INDEX2ROW(getBottom()) + 1;
    },

    // Returns rowIndex (base 0)
    get bottomRowIndex() {
      return INDEX2ROW(getBottom());
    },

    // Returns column letter
    get bottomColumn() {
      return COLUMNLETTER(INDEX2COL(getBottom()));
    },

    // Returns column index
    get bottomColumnIndex() {
      return INDEX2COL(getBottom());
    },

    // The cell id puts the whole table into a single dimension. It simply needs to be between the topLeft and the bottomRight to qualify.
    hit: function hit(index) {

      // Return `#NA!` when index is negative.
      if (index < 0) return error$2.na;

      // Check if value is inside range from top to bottom, inclusive.
      return index >= getTop() && index <= getBottom();
    },


    get size() {
      return 1 + (getBottom() - getTop());
    },

    // Return array with every cell index
    get cells() {
      return Array.apply(getTop(), Array(1 + (getBottom() - getTop()))).map(function (x, y) {
        return y + getTop();
      });
    },

    // Return array with every row
    get rows() {
      return UNIQUE(Array.apply(getTop(), Array(1 + (getBottom() - getTop()))).map(function (x, y) {
        return INDEX2ROW(y + getTop());
      }));
    }

  };
}

// Returns a cell indirection
function INDIRECT(ref) {
  return REF(ref);
}

// Copyright 2015 Peter W Moresi

// ISEMAIL returns true when the `value` matches the regex.
function ISEMAIL(value) {
  // credit to http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};

// Copyright 2015 Peter W Moresi

// ISEVEN returns true when the value is even.
function ISEVEN(value) {
  return !(Math.floor(Math.abs(value)) & 1);
}

// ISNA returns true when the value is `#NA!`
function ISNA(value) {
  return value === error$2.na;
}

// Copyright 2015 Peter W Moresi

// ISODD returns true when the value is odd.
function ISODD(value) {
  return !!(Math.floor(Math.abs(value)) & 1);
}

// Copyright 2015 Peter W Moresi

// ISURL returns true when the value matches the regex for a uniform resource locator.
function ISURL(str) {
  // credit: http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(str);
}

// LEN returns the size of a string or array.
function LEN(text) {
  if (arguments.length === 0) {
    return error$2.error;
  }

  if (typeof text === 'string') {
    return text.length;
  }

  if (text.length) {
    return text.length;
  }

  return error$2.value;
};

// Copyright 2015 Peter W Moresi

// LOOKUP find a value in an array.
function LOOKUP() {
  var lookup_value, lookup_array, lookup_vector, results_vector;
  if (arguments.length === 2) {
    // array form
    var wide = false;

    lookup_value = arguments[0].valueOf();
    lookup_array = arguments[1];

    for (var i = 0; i < lookup_array.length; i++) {
      if (typeof lookup_array[i] !== 'undefined' && lookup_value === lookup_array[i].valueOf()) {
        return lookup_array[i];
      }
    }
  } else if (arguments.length === 3) {
    // vector form`
    lookup_value = arguments[0].valueOf();
    lookup_vector = arguments[1];
    results_vector = arguments[2];

    for (var i = 0; i < lookup_vector.length; i++) {
      if (typeof lookup_vector[i] !== 'undefined' && lookup_value === lookup_vector[i].valueOf()) {
        return results_vector[i];
      }
    }
  }

  return error.na;
}

// LOWER converts `value` to lower case
function LOWER(value) {
  if (!ISTEXT(value)) return error$2.value;
  return value.toLowerCase();
}

// LT compares two values and returns true when a is less than b.
function LT(a, b) {
  if (ISREF(a) && ISREF(b)) {
    return error.na;
  } else if (ISARRAY(a) && ISARRAY(b)) {
    return error.na;
  } else if (ISREF(a) || ISARRAY(a)) {
    return a.map(function (d) {
      return d < b;
    });
  } else if (ISREF(b) || ISARRAY(b)) {
    return b.map(function (d) {
      return d < a;
    });
  } else {
    return a < b;
  }
}

// LT compares two values and returns true when a is less than or equal to b.
function LTE(a, b) {
  if (ISREF(a) && ISREF(b)) {
    return error.na;
  } else if (ISARRAY(a) && ISARRAY(b)) {
    return error.na;
  } else if (ISREF(a) || ISARRAY(a)) {
    return a.map(function (d) {
      return d <= b;
    });
  } else if (ISREF(b) || ISARRAY(b)) {
    return b.map(function (d) {
      return d <= a;
    });
  } else {
    return a <= b;
  }
}

// MIN returns the smallest number from a `list`.
function MIN() {
  for (var _len8 = arguments.length, list = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    list[_key8] = arguments[_key8];
  }

  return FLATTEN(list).reduce(function (min, next) {
    if (ISNUMBER(next)) {
      return Math.min(min, next);
    }

    return min;
  }, Number.POSITIVE_INFINITY);
}

// MAX returns the largest number from a `list`.
function MAX() {
  for (var _len9 = arguments.length, list = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    list[_key9] = arguments[_key9];
  }

  return FLATTEN(list).reduce(function (max, next) {
    if (ISNUMBER(next)) {
      return Math.max(max, next);
    }

    return max;
  }, Number.NEGATIVE_INFINITY);
}

// MULTIPLY calculates the product of two numbers.
function MULTIPLY() {
  for (var _len10 = arguments.length, values = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    values[_key10] = arguments[_key10];
  }

  // Return `#NA!` if 2 arguments are not provided.
  if (values.length !== 2) {
    return error$2.na;
  }

  // decompose values into a and b.
  var a = values[0];
  var b = values[1];

  // Return `#VALUE!` if either a or b is not a number.

  if (!ISNUMBER(a) || !ISNUMBER(b)) {
    return error$2.value;
  }

  // Return the product
  return a * b;
}

// N converts a `value` to a number. It supports numbers, true, false and dates.
function N(value) {

  // Pass numbers and errors back out.
  if (ISNUMBER(value) || ISERROR(value)) {
    return value;
  }

  // Convert dates to serial number.
  if (value instanceof Date) {
    return SERIAL(value);
  }

  // Convert true to 1
  if (value === true) {
    return 1;
  }

  // Convert false to 0
  if (value === false) {
    return 0;
  }

  // Return 0 in all other cases.
  return 0;
}

// Convert a text value into a number value.
function NUMBERVALUE(text, decimal_separator, group_separator) {
  decimal_separator = decimal_separator || '.';
  group_separator = group_separator || ',';

  // Return `#VALUE!` when text is empty
  if (ISEMPTY(text)) {
    return error$2.value;
  }

  // Return the value when it is already a number.
  if (ISNUMBER(text)) {
    return text;
  }

  var foundDecimal = false,
      len = text.length - 1;

  return text.split('').reduce(function (acc, item, index) {
    if (acc === error$2.value) {
      return error$2.value;
    } else if (len === index) {
      if (item === '%') {
        return +acc / 100;
      }
      return +acc.concat(item);
    } else if (item === decimal_separator) {
      if (foundDecimal) return error$2.value;
      foundDecimal = true;
      return acc.concat('.');
    } else if (item === group_separator) {
      return acc;
      // check if between 0 and 9 ascii codes
    } else if (item.charCodeAt(0) < 48 || item.charCodeAt(0) > 57) {
        return error$2.value;
      }

    return acc.concat(item);
  });
};

// NE returns true when a is not equal to b.
function NE(a, b) {
  return !EQ(a, b);
}

// NOT negates a `value`
function NOT(value) {
  return value !== true && value !== false && value !== 1 && value !== 0 ? error$2.value : !value;
}

// OCT2DEC converts a octal value into a decimal value.
function OCT2DEC(octalNumber) {
  // Credits: Based on implementation found in https://gist.github.com/ghalimi/4525876#file-oct2dec-js
  // Return error.when number passed in is not octal or has more than 10 digits
  if (!/^[0-7]{1,10}$/.test(octalNumber)) return error$2.num;

  // Convert octal number to decimal number
  var nonNegativeDecimalNumber = parseInt(octalNumber, 8);

  // Returns the corresponding decimal number
  // Two's Complement Decimal Range: -(2^N-1) to (2^N-1 - 1) where N=30 (N = number of bits) and ^ means raised to the power of
  // 2^N-1 = 2^(30 - 1) = 2^29 = 536870912
  // 2^N-1 - 1 = 536870912 - 1 = 536870911
  // 2^N = 2^30 = 1073741824
  // Two's Complement Decimal Range: [-536870912,536870911]
  // Largest octal number allowed: 7777777777 which in decimal is 1073741823 = 2^N - 1
  // Case 1: Negative Range
  //  if nonNegativeDecimalNumber >= 2^N-1, then return (nonNegativeNumber - 2^N)
  //  Smallest Number: 2^N-1 - 2^N = 2^N-1 - 2*2^N-1 = 2^N-1 * (1 - 2) = 2^N-1 * (-1) = -2^N-1
  //  Largest Number: (2^N - 1) - (2^N) = (2^N - 2^N) - 1 = -1
  //  Range: [-2^N-1, -1] = [-536870912, -1]
  //
  // Smallest octal number allowed: 0 which in decimal is 0
  // Case 2: Non-Negative Range
  //   Range: [0, 2^N-1 - 1] = [0, 536870911]

  return nonNegativeDecimalNumber >= 536870912 ? nonNegativeDecimalNumber - 1073741824 : nonNegativeDecimalNumber;
}

// Copyright 2015 Peter W Moresi

// OR returns true when any of the criter is true or 1.
function OR() {
  for (var _len11 = arguments.length, criteria = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    criteria[_key11] = arguments[_key11];
  }

  return criteria.reduce(function (acc, item) {
    if (acc === true) return true;
    return item === true || item === 1;
  }, false);
}

// PI returns half the universal circle constant
function PI() {
  return τ / 2;
}

// PMT returns a loan payment
function PMT(rate, periods, present) {
  var future = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
  var type = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];


  if (!ISNUMBER(rate) || !ISNUMBER(periods)) {
    return error$2.value;
  }

  if (rate === 0) {
    return -((present + future) / periods);
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      return -((future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate));
    } else {
      return -(future * rate / (term - 1) + present * rate / (1 - 1 / term));
    }
  }
};

// POWER computes the power of a value and nth degree.
function POWER() {
  for (var _len12 = arguments.length, values = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
    values[_key12] = arguments[_key12];
  }

  // Return `#NA!` if 2 arguments are not provided.
  if (values.length !== 2) {
    return error$2.na;
  }

  // decompose values into a and b.
  var val = values[0];
  var nth = values[1];

  // Return `#VALUE!` if either a or b is not a number.

  if (!ISNUMBER(val) || !ISNUMBER(nth)) {
    return error$2.value;
  }

  // Compute the power of val to the nth.
  return Math.pow(val, nth);
}

// REPLACE returns a new string after replacing with `new_text`.
function REPLACE(text, position, length, new_text) {

  if (ISERROR(position) || ISERROR(length) || typeof text !== 'string' || typeof new_text !== 'string') {
    return error$2.value;
  }
  return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length);
}

// RIGHT pulls a given number of character from the right side of `text`.
function RIGHT(text, number) {

  if (ISBLANK(text)) {
    return '';
  }

  if (!N(+number)) {
    return text;
  }

  return text.substring(text.length - number);
}

// Copyright 2015 Peter W Moresi

// CONVERT a number to a fixed precision.
function ROUND(number, precision) {
  return +number.toFixed(precision);
}

// Copyright 2015 Peter W Moresi

// ROUNDUP converts a number to a fixed precision by rounding up.
function ROUNDUP(number, precision) {
  var factors = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];
  var factor = factors[precision];
  if (number > 0) {
    return Math.ceil(number * factor) / factor;
  } else {
    return Math.floor(number * factor) / factor;
  }
}

// SEARCH finds text using wildcards ?, *, ~?, and ~*.
function SEARCH(find_text, within_text, position) {
  if (!within_text) {
    return null;
  }
  position = typeof position === 'undefined' ? 1 : position;

  // The SEARCH function translated the find_text into a regex.
  var find_exp = find_text.replace(/([^~])\?/g, '$1.') // convert ? into .
  .replace(/([^~])\*/g, '$1.*') // convert * into .*
  .replace(/([~])\?/g, '\\?') // convert ~? into \?
  .replace(/([~])\*/g, '\\*'); // convert ~* into \*

  position = new RegExp(find_exp, "i").exec(within_text);

  if (position) {
    return position.index + 1;
  }
  return error$2.value;
}

// SIN calculates the sinine of a value.
function SIN(value) {

  if (!ISNUMBER(value)) {
    return error$2.value;
  }

  return Math.sin(value);
}

// SORT a reference or an array.
//
// The criteria may use 1 of several forms:
//
// SORT(reference(reference: Array, ...criteria : List<string>)
// SORT(reference(reference: Range, ...criteria : List<string>)
//
// The List<function> will be reduced into a single function.
//
// The list<string> will also be reduced into a single function which
// interprets the strings as pairs. The odd items are fields and the
// even ones are direction (ASC|DESC).
function SORT(ref) {
  for (var _len13 = arguments.length, criteria = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
    criteria[_key13 - 1] = arguments[_key13];
  }

  // reduce the criteria array into a function
  var makeComparer = function makeComparer() {
    return function (a, b) {
      var result = 0;
      for (var i = 0; i < criteria.length; i + 2) {
        var field = typeof criteria[i] === 'string' ? criteria[i] : criteria[i] - 1,
            order = criteria[i + 1];

        if (a[field] < b[field]) {
          return order ? -1 : 1;
        } else {
          return order ? 1 : -1;
        }
      }

      return result;
    };
  };

  if (ISREF(ref) || Array.isArray(ref)) {
    return ref.sort(makeComparer());
  }

  return error$2.na;
}

// Copyright 2015 Peter W Moresi

// SPLIT `text` given a `delimiter`.
function SPLIT(text, delimiter) {
  return text.split(delimiter);
}

// Copyright 2015 Peter W Moresi

// SUBSTITUTE `old_text` with `new_text` a given number of occurrences in `text`.
function SUBSTITUTE(text, old_text, new_text, occurrence) {
  if (!text || !old_text || !new_text) {
    return text;
  } else if (occurrence === undefined) {
    return text.replace(new RegExp(old_text, 'g'), new_text);
  } else {
    var index = 0;
    var i = 0;
    while (text.indexOf(old_text, index) > 0) {
      index = text.indexOf(old_text, index + 1);
      i++;
      if (i === occurrence) {
        return text.substring(0, index) + new_text + text.substring(index + old_text.length);
      }
    }
  }
}

// SUBTRACT calculates the difference of two numbers.
function SUBTRACT() {
  for (var _len14 = arguments.length, values = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
    values[_key14] = arguments[_key14];
  }

  // Return `#NA!` if 2 arguments are not provided.
  if (values.length !== 2) {
    return error$2.na;
  }

  // decompose values into a and b.
  var a = values[0];
  var b = values[1];

  // Return `#VALUE!` if either a or b is not a number.

  if (!ISNUMBER(a) || !ISNUMBER(b)) {
    return error$2.value;
  }

  // Return the difference.
  return a - b;
}

// TAN computes the tagent of a value.
function TAN(value) {

  if (!ISNUMBER(value)) {
    return error$2.value;
  }

  return Math.tan(value);
}

// TAU returns the universal circle constant
function TAU() {
  return τ;
}

var FormatNumber = {};

FormatNumber.format_definitions = {}; // Parsed formats are stored here globally

// Other constants

FormatNumber.commands = {
  copy: 1, color: 2, integer_placeholder: 3, fraction_placeholder: 4, decimal: 5,
  currency: 6, general: 7, separator: 8, date: 9, comparison: 10, section: 11, style: 12
};

/* *******************

result = FormatNumber.formatNumberWithFormat = function(rawvalue, format_string, currency_char)

************************* */

FormatNumber.formatNumberWithFormat = function (rawvalue, format_string, currency_char) {

  var scfn = FormatNumber;

  var op, operandstr, fromend, cval, operandstrlc;
  var startval, estartval;
  var hrs, mins, secs, ehrs, emins, esecs, ampmstr, ymd;
  var minOK, mpos, mspos;
  var result = '';
  var format;
  var section, gotcomparison, compop, compval, cpos, oppos;
  var sectioninfo;
  var i, decimalscale, scaledvalue, strvalue, strparts, integervalue, fractionvalue;
  var integerdigits2, integerpos, fractionpos, textcolor, textstyle, separatorchar, decimalchar;
  var value; // working copy to change sign, etc.

  rawvalue = rawvalue - 0; // make sure a number
  value = rawvalue;
  if (!isFinite(value)) return 'NaN';

  var negativevalue = value < 0 ? 1 : 0; // determine sign, etc.
  if (negativevalue) value = -value;
  var zerovalue = value == 0 ? 1 : 0;

  currency_char = currency_char || DefaultCurrency;

  FormatNumber.parse_format_string(scfn.format_definitions, format_string); // make sure format is parsed
  //console.log("format_string", format_string, format)
  format = scfn.format_definitions[format_string]; // Get format structure
  //console.log("format", format)

  if (!format) throw 'Format not parsed error.';

  section = format.sectioninfo.length - 1; // get number of sections - 1

  // has comparisons - determine which section
  if (format.hascomparison) {
    section = 0; // set to which section we will use
    gotcomparison = 0; // this section has no comparison
    for (cpos = 0;; cpos++) {
      // scan for comparisons
      op = format.operators[cpos];
      operandstr = format.operands[cpos]; // get next operator and operand

      // at end with no match
      if (!op) {
        // if comparison but no match
        if (gotcomparison) {
          format_string = 'General'; // use default of General
          scfn.parse_format_string(scfn.format_definitions, format_string);
          format = scfn.format_definitions[format_string];
          section = 0;
        }
        break; // if no comparision, matches on this section
      }
      // end of section
      if (op == scfn.commands.section) {
        if (!gotcomparison) {
          // no comparison, so it's a match
          break;
        }
        gotcomparison = 0;
        section++; // check out next one
        continue;
      }
      // found a comparison - do we meet it?
      if (op == scfn.commands.comparison) {
        i = operandstr.indexOf(':');
        compop = operandstr.substring(0, i);
        compval = operandstr.substring(i + 1) - 0;
        if (compop == '<' && rawvalue < compval || compop == '<=' && rawvalue <= compval || compop == '=' && rawvalue == compval || compop == '<>' && rawvalue != compval || compop == '>=' && rawvalue >= compval || compop == '>' && rawvalue > compval) {
          break;
        }
        gotcomparison = 1;
      }
    }
  }
  // more than one section (separated by ";")
  else if (section > 0) {
      // two sections
      if (section == 1) {
        if (negativevalue) {
          negativevalue = 0; // sign will provided by section, not automatically
          section = 1; // use second section for negative values
        } else {
            section = 0; // use first for all others
          }
      }
      // three sections
      else if (section == 2) {
          if (negativevalue) {
            negativevalue = 0; // sign will provided by section, not automatically
            section = 1; // use second section for negative values
          } else if (zerovalue) {
              section = 2; // use third section for zero values
            } else {
                section = 0; // use first for positive
              }
        }
    }

  sectioninfo = format.sectioninfo[section]; // look at values for our section

  if (sectioninfo.commas > 0) {
    // scale by thousands
    for (i = 0; i < sectioninfo.commas; i++) {
      value /= 1000;
    }
  }
  if (sectioninfo.percent > 0) {
    // do percent scaling
    for (i = 0; i < sectioninfo.percent; i++) {
      value *= 100;
    }
  }

  decimalscale = 1; // cut down to required number of decimal digits
  for (i = 0; i < sectioninfo.fractiondigits; i++) {
    decimalscale *= 10;
  }
  scaledvalue = Math.floor(value * decimalscale + 0.5);
  scaledvalue = scaledvalue / decimalscale;

  if (typeof scaledvalue != 'number') return 'NaN';
  if (!isFinite(scaledvalue)) return 'NaN';

  strvalue = scaledvalue + ''; // convert to string (Number.toFixed doesn't do all we need)

  //   strvalue = value.toFixed(sectioninfo.fractiondigits); // cut down to required number of decimal digits
  // and convert to string

  if (scaledvalue == 0 && (sectioninfo.fractiondigits || sectioninfo.integerdigits)) {
    negativevalue = 0; // no "-0" unless using multiple sections or General
  }

  //console.log(rawvalue+'')

  // converted to scientific notation
  if (strvalue.indexOf('e') >= 0) {
    return rawvalue + ''; // Just return plain converted raw value
  }

  strparts = strvalue.match(/^\+{0,1}(\d*)(?:\.(\d*)){0,1}$/); // get integer and fraction parts
  if (!strparts) return 'NaN'; // if not a number
  integervalue = strparts[1];
  if (!integervalue || integervalue == '0') integervalue = '';
  fractionvalue = strparts[2];
  if (!fractionvalue) fractionvalue = '';

  // there are date placeholders
  if (sectioninfo.hasdate) {
    //console.log('hasdate')
    // bad date
    if (rawvalue < 0) {
      return '??-???-?? ??:??:??';
    }
    startval = (rawvalue - Math.floor(rawvalue)) * SecondsInDay; // get date/time parts
    estartval = rawvalue * SecondsInDay; // do elapsed time version, too
    hrs = Math.floor(startval / SecondsInHour);
    ehrs = Math.floor(estartval / SecondsInHour);
    startval = startval - hrs * SecondsInHour;
    mins = Math.floor(startval / 60);
    emins = Math.floor(estartval / 60);
    secs = startval - mins * 60;
    decimalscale = 1; // round appropriately depending if there is ss.0
    for (i = 0; i < sectioninfo.fractiondigits; i++) {
      decimalscale *= 10;
    }
    secs = Math.floor(secs * decimalscale + 0.5);
    secs = secs / decimalscale;
    esecs = Math.floor(estartval * decimalscale + 0.5);
    esecs = esecs / decimalscale;
    if (secs >= 60) {
      // handle round up into next second, minute, etc.
      secs = 0;
      mins++;emins++;
      if (mins >= 60) {
        mins = 0;
        hrs++;ehrs++;
        if (hrs >= 24) {
          hrs = 0;
          rawvalue++;
        }
      }
    }
    fractionvalue = secs - Math.floor(secs) + ''; // for "hh:mm:ss.000"
    fractionvalue = fractionvalue.substring(2); // skip "0."

    ymd = PARSEDATE(rawvalue);
    ymd = {
      year: ymd.getFullYear(),
      month: ymd.getMonth() + 1,
      day: ymd.getDate()
    };

    minOK = 0; // says "m" can be minutes if true
    mspos = sectioninfo.sectionstart; // m scan position in ops
    for (;; mspos++) {
      // scan for "m" and "mm" to see if any minutes fields, and am/pm
      op = format.operators[mspos];
      operandstr = format.operands[mspos]; // get next operator and operand
      if (!op) break; // don't go past end
      if (op == scfn.commands.section) break;
      if (op == scfn.commands.date) {
        if ((operandstr.toLowerCase() == 'am/pm' || operandstr.toLowerCase() == 'a/p') && !ampmstr) {
          if (hrs >= 12) {
            hrs -= 12;
            ampmstr = operandstr.toLowerCase() == 'a/p' ? PM1 : PM; // "P" : "PM";
          } else {
              ampmstr = operandstr.toLowerCase() == 'a/p' ? AM1 : AM; // "A" : "AM";
            }
          if (operandstr.indexOf(ampmstr) < 0) ampmstr = ampmstr.toLowerCase(); // have case match case in format
        }
        if (minOK && (operandstr == 'm' || operandstr == 'mm')) {
          format.operands[mspos] += 'in'; // turn into "min" or "mmin"
        }
        if (operandstr.charAt(0) == 'h') {
          minOK = 1; // m following h or hh or [h] is minutes not months
        } else {
            minOK = 0;
          }
      } else if (op != scfn.commands.copy) {
        // copying chars can be between h and m
        minOK = 0;
      }
    }
    minOK = 0;
    for (--mspos;; mspos--) {
      // scan other way for s after m
      op = format.operators[mspos];
      operandstr = format.operands[mspos]; // get next operator and operand
      if (!op) break; // don't go past end
      if (op == scfn.commands.section) break;
      if (op == scfn.commands.date) {
        if (minOK && (operandstr == 'm' || operandstr == 'mm')) {
          format.operands[mspos] += 'in'; // turn into "min" or "mmin"
        }
        if (operandstr == 'ss') {
          minOK = 1; // m before ss is minutes not months
        } else {
            minOK = 0;
          }
      } else if (op != scfn.commands.copy) {
        // copying chars can be between ss and m
        minOK = 0;
      }
    }
  }

  integerdigits2 = 0; // init counters, etc.
  integerpos = 0;
  fractionpos = 0;
  textcolor = '';
  textstyle = '';
  separatorchar = SeparatorChar;
  if (separatorchar.indexOf(' ') >= 0) separatorchar = separatorchar.replace(/ /g, ' ');
  decimalchar = DecimalChar;
  if (decimalchar.indexOf(' ') >= 0) decimalchar = decimalchar.replace(/ /g, ' ');

  oppos = sectioninfo.sectionstart;

  while (op = format.operators[oppos]) {
    // execute format
    operandstr = format.operands[oppos++]; // get next operator and operand

    if (op == scfn.commands.copy) {
      // put char in result
      result += operandstr;
    } else if (op == scfn.commands.color) {
      // set color
      textcolor = operandstr;
    } else if (op == scfn.commands.style) {
      // set style
      textstyle = operandstr;
    } else if (op == scfn.commands.integer_placeholder) {
      // insert number part
      if (negativevalue) {
        result += '-';
        negativevalue = 0;
      }
      integerdigits2++;
      if (integerdigits2 == 1) {
        // first one
        if (integervalue.length > sectioninfo.integerdigits) {
          // see if integer wider than field
          for (; integerpos < integervalue.length - sectioninfo.integerdigits; integerpos++) {
            result += integervalue.charAt(integerpos);
            if (sectioninfo.thousandssep) {
              // see if this is a separator position
              fromend = integervalue.length - integerpos - 1;
              if (fromend > 2 && fromend % 3 == 0) {
                result += separatorchar;
              }
            }
          }
        }
      }
      if (integervalue.length < sectioninfo.integerdigits && integerdigits2 <= sectioninfo.integerdigits - integervalue.length) {
        // field is wider than value
        if (operandstr == '0' || operandstr == '?') {
          // fill with appropriate characters
          result += operandstr == '0' ? '0' : ' ';
          if (sectioninfo.thousandssep) {
            // see if this is a separator position
            fromend = sectioninfo.integerdigits - integerdigits2;
            if (fromend > 2 && fromend % 3 == 0) {
              result += separatorchar;
            }
          }
        }
      } else {
        // normal integer digit - add it
        result += integervalue.charAt(integerpos);
        if (sectioninfo.thousandssep) {
          // see if this is a separator position
          fromend = integervalue.length - integerpos - 1;
          if (fromend > 2 && fromend % 3 == 0) {
            result += separatorchar;
          }
        }
        integerpos++;
      }
    } else if (op == scfn.commands.fraction_placeholder) {
      // add fraction part of number
      if (fractionpos >= fractionvalue.length) {
        if (operandstr == '0' || operandstr == '?') {
          result += operandstr == '0' ? '0' : ' ';
        }
      } else {
        result += fractionvalue.charAt(fractionpos);
      }
      fractionpos++;
    } else if (op == scfn.commands.decimal) {
      // decimal point
      if (negativevalue) {
        result += '-';
        negativevalue = 0;
      }
      result += decimalchar;
    } else if (op == scfn.commands.currency) {
      // currency symbol
      if (negativevalue) {
        result += '-';
        negativevalue = 0;
      }
      result += operandstr;
    } else if (op == scfn.commands.general) {
      // insert "General" conversion

      // *** Cut down number of significant digits to avoid floating point artifacts:

      if (value != 0) {
        // only if non-zero
        var factor = Math.floor(Math.LOG10E * Math.log(value)); // get integer magnitude as a power of 10
        factor = Math.pow(10, 13 - factor); // turn into scaling factor
        value = Math.floor(factor * value + 0.5) / factor; // scale positive value, round, undo scaling
        if (!isFinite(value)) return 'NaN';
      }
      if (negativevalue) {
        result += '-';
      }
      strvalue = value + ''; // convert original value to string
      if (strvalue.indexOf('e') >= 0) {
        // converted to scientific notation
        result += strvalue;
        continue;
      }
      strparts = strvalue.match(/^\+{0,1}(\d*)(?:\.(\d*)){0,1}$/); // get integer and fraction parts
      integervalue = strparts[1];
      if (!integervalue || integervalue == '0') integervalue = '';
      fractionvalue = strparts[2];
      if (!fractionvalue) fractionvalue = '';
      integerpos = 0;
      fractionpos = 0;
      if (integervalue.length) {
        for (; integerpos < integervalue.length; integerpos++) {
          result += integervalue.charAt(integerpos);
          if (sectioninfo.thousandssep) {
            // see if this is a separator position
            fromend = integervalue.length - integerpos - 1;
            if (fromend > 2 && fromend % 3 == 0) {
              result += separatorchar;
            }
          }
        }
      } else {
        result += '0';
      }
      if (fractionvalue.length) {
        result += decimalchar;
        for (; fractionpos < fractionvalue.length; fractionpos++) {
          result += fractionvalue.charAt(fractionpos);
        }
      }
    } else if (op == scfn.commands.date) {
      // date placeholder
      operandstrlc = operandstr.toLowerCase();
      if (operandstrlc == 'y' || operandstrlc == 'yy') {
        result += (ymd.year + '').substring(2);
      } else if (operandstrlc == 'yyyy') {
        result += ymd.year + '';
      } else if (operandstrlc == 'd') {
        result += ymd.day + '';
      } else if (operandstrlc == 'dd') {
        cval = 1000 + ymd.day;
        result += (cval + '').substr(2);
      } else if (operandstrlc == 'ddd') {
        cval = Math.floor(rawvalue + 6) % 7;
        result += DayNames3[cval];
      } else if (operandstrlc == 'dddd') {
        cval = Math.floor(rawvalue + 6) % 7;
        result += DayNames[cval];
      } else if (operandstrlc == 'm') {
        result += ymd.month + '';
      } else if (operandstrlc == 'mm') {
        cval = 1000 + ymd.month;
        result += (cval + '').substr(2);
      } else if (operandstrlc == 'mmm') {
        result += MonthNames3[ymd.month - 1];
      } else if (operandstrlc == 'mmmm') {
        result += MonthNames[ymd.month - 1];
      } else if (operandstrlc == 'mmmmm') {
        result += MonthNames[ymd.month - 1].charAt(0);
      } else if (operandstrlc == 'h') {
        result += hrs + '';
      } else if (operandstrlc == 'h]') {
        result += ehrs + '';
      } else if (operandstrlc == 'mmin') {
        cval = 1000 + mins + '';
        result += cval.substr(2);
      } else if (operandstrlc == 'mm]') {
        if (emins < 100) {
          cval = 1000 + emins + '';
          result += cval.substr(2);
        } else {
          result += emins + '';
        }
      } else if (operandstrlc == 'min') {
        result += mins + '';
      } else if (operandstrlc == 'm]') {
        result += emins + '';
      } else if (operandstrlc == 'hh') {
        cval = 1000 + hrs + '';
        result += cval.substr(2);
      } else if (operandstrlc == 's') {
        cval = Math.floor(secs);
        result += cval + '';
      } else if (operandstrlc == 'ss') {
        cval = 1000 + Math.floor(secs) + '';
        result += cval.substr(2);
      } else if (operandstrlc == 'am/pm' || operandstrlc == 'a/p') {
        result += ampmstr;
      } else if (operandstrlc == 'ss]') {
        if (esecs < 100) {
          cval = 1000 + Math.floor(esecs) + '';
          result += cval.substr(2);
        } else {
          cval = Math.floor(esecs);
          result += cval + '';
        }
      }
    } else if (op == scfn.commands.section) {
      // end of section
      break;
    } else if (op == scfn.commands.comparison) {
      // ignore
      continue;
    } else {
      result += '!! Parse error.!!';
    }
  }

  if (textcolor) {
    result = '<span style="color:' + textcolor + ';">' + result + '</span>';
  }
  if (textstyle) {
    result = '<span style="' + textstyle + ';">' + result + '</span>';
  }

  //console.log(result)

  return result;
};

/* *******************

FormatNumber.parse_format_string(format_defs, format_string)

Takes a format string (e.g., "#,##0.00_);(#,##0.00)") and fills in format_defs with the parsed info

format_defs
["#,##0.0"]->{} - elements in the hash are one hash for each format
.operators->[] - array of operators from parsing the format string (each a number)
.operands->[] - array of corresponding operators (each usually a string)
.sectioninfo->[] - one hash for each section of the format
.start
.integerdigits
.fractiondigits
.commas
.percent
.thousandssep
.hasdates
.hascomparison - true if any section has [<100], etc.

************************* */

FormatNumber.parse_format_string = function (format_defs, format_string) {

  var scfn = FormatNumber;

  var format, section, sectioninfo;
  var integerpart = 1; // start out in integer part
  var lastwasinteger; // last char was an integer placeholder
  var lastwasslash; // last char was a backslash - escaping following character
  var lastwasasterisk; // repeat next char
  var lastwasunderscore; // last char was _ which picks up following char for width
  var inquote, quotestr; // processing a quoted string
  var inbracket, bracketstr, bracketdata; // processing a bracketed string
  var ingeneral, gpos; // checks for characters "General"
  var ampmstr, part; // checks for characters "A/P" and "AM/PM"
  var indate; // keeps track of date/time placeholders
  var chpos; // character position being looked at
  var ch; // character being looked at

  if (format_defs[format_string]) return; // already defined - nothing to do

  format = { operators: [], operands: [], sectioninfo: [{}] }; // create info structure for this format
  format_defs[format_string] = format; // add to other format definitions

  section = 0; // start with section 0
  sectioninfo = format.sectioninfo[section]; // get reference to info for current section
  sectioninfo.sectionstart = 0; // position in operands that starts this section
  sectioninfo.integerdigits = 0; // number of integer-part placeholders
  sectioninfo.fractiondigits = 0; // fraction placeholders
  sectioninfo.commas = 0; // commas encountered, to handle scaling
  sectioninfo.percent = 0; // times to scale by 100

  for (chpos = 0; chpos < format_string.length; chpos++) {
    // parse
    ch = format_string.charAt(chpos); // get next char to examine
    if (inquote) {
      if (ch == '"') {
        inquote = 0;
        format.operators.push(scfn.commands.copy);
        format.operands.push(quotestr);
        continue;
      }
      quotestr += ch;
      continue;
    }
    if (inbracket) {
      if (ch == ']') {
        inbracket = 0;
        bracketdata = FormatNumber.parse_format_bracket(bracketstr);
        if (bracketdata.operator == scfn.commands.separator) {
          sectioninfo.thousandssep = 1; // explicit [,]
          continue;
        }
        if (bracketdata.operator == scfn.commands.date) {
          sectioninfo.hasdate = 1;
        }
        if (bracketdata.operator == scfn.commands.comparison) {
          format.hascomparison = 1;
        }
        format.operators.push(bracketdata.operator);
        format.operands.push(bracketdata.operand);
        continue;
      }
      bracketstr += ch;
      continue;
    }

    if (lastwasslash) {
      format.operators.push(scfn.commands.copy);
      format.operands.push(ch);
      lastwasslash = false;
      continue;
    }

    if (lastwasasterisk) {
      format.operators.push(scfn.commands.copy);
      format.operands.push(ch + ch + ch + ch + ch); // do 5 of them since no real tabs
      lastwasasterisk = false;
      continue;
    }

    if (lastwasunderscore) {
      format.operators.push(scfn.commands.copy);
      format.operands.push(' ');
      lastwasunderscore = false;
      continue;
    }

    if (ingeneral) {
      if ('general'.charAt(ingeneral) == ch.toLowerCase()) {
        ingeneral++;
        if (ingeneral == 7) {
          format.operators.push(scfn.commands.general);
          format.operands.push(ch);
          ingeneral = 0;
        }
        continue;
      }
      ingeneral = 0;
    }

    // last char was part of a date placeholder
    if (indate) {
      //console.log('foo')
      if (indate.charAt(0) == ch) {
        // another of the same char
        indate += ch; // accumulate it
        continue;
      }
      format.operators.push(scfn.commands.date); // something else, save date info
      format.operands.push(indate);
      sectioninfo.hasdate = 1;
      indate = '';
    }
    if (ampmstr) {
      ampmstr += ch;
      part = ampmstr.toLowerCase();
      if (part != 'am/pm'.substring(0, part.length) && part != 'a/p'.substring(0, part.length)) {
        ampstr = '';
      } else if (part == 'am/pm' || part == 'a/p') {
        format.operators.push(scfn.commands.date);
        format.operands.push(ampmstr);
        ampmstr = '';
      }
      continue;
    }
    if (ch == '#' || ch == '0' || ch == '?') {
      // placeholder
      if (integerpart) {
        sectioninfo.integerdigits++;
        if (sectioninfo.commas) {
          // comma inside of integer placeholders
          sectioninfo.thousandssep = 1; // any number is thousands separator
          sectioninfo.commas = 0; // reset count of "thousand" factors
        }
        lastwasinteger = 1;
        format.operators.push(scfn.commands.integer_placeholder);
        format.operands.push(ch);
      } else {
        sectioninfo.fractiondigits++;
        format.operators.push(scfn.commands.fraction_placeholder);
        format.operands.push(ch);
      }
    } else if (ch == '.') {
      lastwasinteger = 0;
      format.operators.push(scfn.commands.decimal);
      format.operands.push(ch);
      integerpart = 0;
    } else if (ch === '$') {
      lastwasinteger = 0;
      format.operators.push(scfn.commands.currency);
      format.operands.push(ch);
    } else if (ch == ',') {
      if (lastwasinteger) {
        sectioninfo.commas++;
      } else {
        format.operators.push(scfn.commands.copy);
        format.operands.push(ch);
      }
    } else if (ch == '%') {
      lastwasinteger = 0;
      sectioninfo.percent++;
      format.operators.push(scfn.commands.copy);
      format.operands.push(ch);
    } else if (ch == '"') {
      lastwasinteger = 0;
      inquote = 1;
      quotestr = '';
    } else if (ch == '[') {
      lastwasinteger = 0;
      inbracket = 1;
      bracketstr = '';
    } else if (ch == '\\') {
      lastwasslash = 1;
      lastwasinteger = 0;
    } else if (ch == '*') {
      lastwasasterisk = 1;
      lastwasinteger = 0;
    } else if (ch == '_') {
      lastwasunderscore = 1;
      lastwasinteger = 0;
    } else if (ch == ';') {
      section++; // start next section
      format.sectioninfo[section] = {}; // create a new section
      sectioninfo = format.sectioninfo[section]; // get reference to info for current section
      sectioninfo.sectionstart = 1 + format.operators.length; // remember where it starts
      sectioninfo.integerdigits = 0; // number of integer-part placeholders
      sectioninfo.fractiondigits = 0; // fraction placeholders
      sectioninfo.commas = 0; // commas encountered, to handle scaling
      sectioninfo.percent = 0; // times to scale by 100
      integerpart = 1; // reset for new section
      lastwasinteger = 0;
      format.operators.push(scfn.commands.section);
      format.operands.push(ch);
    } else if (ch.toLowerCase() == 'g') {
      ingeneral = 1;
      lastwasinteger = 0;
    } else if (ch.toLowerCase() == 'a') {
      ampmstr = ch;
      lastwasinteger = 0;
    } else if ('dmyhHs'.indexOf(ch) >= 0) {
      //console.log('foo')
      indate = ch;
    } else {
      lastwasinteger = 0;
      format.operators.push(scfn.commands.copy);
      format.operands.push(ch);
    }
  }

  // last char was part of unsaved date placeholder
  if (indate) {
    format.operators.push(scfn.commands.date);
    format.operands.push(indate);
    sectioninfo.hasdate = 1;
  }

  return;
};

/* *******************

bracketdata = FormatNumber.parse_format_bracket(bracketstr)

Takes a bracket contents (e.g., "RED", ">10") and returns an operator and operand

bracketdata->{}
.operator
.operand

************************* */

FormatNumber.parse_format_bracket = function (bracketstr) {

  var scfn = FormatNumber;

  var bracketdata = {};
  var parts;

  // currency
  if (bracketstr.charAt(0) == '$') {
    bracketdata.operator = scfn.commands.currency;
    parts = bracketstr.match(/^\$(.+?)(\-.+?){0,1}$/);
    if (parts) {
      bracketdata.operand = parts[1] || DefaultCurrency || '$';
    } else {
      bracketdata.operand = bracketstr.substring(1) || DefaultCurrency || '$';
    }
  } else if (bracketstr == '?$') {
    bracketdata.operator = scfn.commands.currency;
    bracketdata.operand = '[?$]';
  } else if (AllowedColors[bracketstr.toUpperCase()]) {
    bracketdata.operator = scfn.commands.color;
    bracketdata.operand = AllowedColors[bracketstr.toUpperCase()];
  } else if (parts = bracketstr.match(/^style=([^']*)$/)) {
    // [style=...]
    bracketdata.operator = scfn.commands.style;
    bracketdata.operand = parts[1];
  } else if (bracketstr == ',') {
    bracketdata.operator = scfn.commands.separator;
    bracketdata.operand = bracketstr;
  } else if (AllowedDates[bracketstr.toUpperCase()]) {
    bracketdata.operator = scfn.commands.date;
    bracketdata.operand = AllowedDates[bracketstr.toUpperCase()];
  } else if (parts = bracketstr.match(/^[<>=]/)) {
    // comparison operator
    parts = bracketstr.match(/^([<>=]+)(.+)$/); // split operator and value
    bracketdata.operator = scfn.commands.comparison;
    bracketdata.operand = parts[1] + ':' + parts[2];
  } else {
    // unknown bracket
    bracketdata.operator = scfn.commands.copy;
    bracketdata.operand = '[' + bracketstr + ']';
  }

  return bracketdata;
};

function TEXT(value, format, currency_char) {
  return FormatNumber.formatNumberWithFormat(value, format, currency_char);
}

// TRIMS returns a string without whitespace at the beginning or end.
function TRIM(text) {
  if (typeof text !== 'string') {
    return error$2.value;
  }
  return text.trim();
}

// Copyright 2015 Peter W Moresi

// UPPER converts a string to upper case
function UPPER(string) {
  return string.toUpperCase();
}

// VLOOKUP find a needle in a table searching vertically.
function VLOOKUP(needle) {
  var table = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var index = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
  var exactmatch = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];


  if (ISERROR(needle) || ISBLANK(needle)) {
    return needle;
  }

  for (var i = 0; i < table.length; i++) {
    var row = table[i];

    if (index > row.length) {
      return error$2.ref;
    }

    if (exactmatch && row[0] === needle || row[0] == needle || typeof row[0] === "string" && row[0].toLowerCase().indexOf(needle.toLowerCase()) != -1) {
      return index < row.length + 1 ? row[index - 1] : row[0];
    }
  }

  return error$2.na;
}

// XOR computes the exclusive or for a given set of `values`.
function XOR() {
  for (var _len15 = arguments.length, values = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
    values[_key15] = arguments[_key15];
  }

  return !!(FLATTEN(values).reduce(function (a, b) {
    if (b) {
      return a + 1;
    }
    return a;
  }, 0) & 1);
}

exports.ABS = ABS;
exports.ACOS = ACOS;
exports.ADD = ADD;
exports.AND = AND;
exports.AVERAGE = AVERAGE;
exports.BIN2DEC = BIN2DEC;
exports.CELLINDEX = CELLINDEX;
exports.CHANGED = CHANGED;
exports.CHOOSE = CHOOSE;
exports.CLEAN = CLEAN;
exports.CODE = CODE;
exports.COLUMN = COLUMN;
exports.COLUMNLETTER = COLUMNLETTER;
exports.COLUMNNUMBER = COLUMNNUMBER;
exports.CONCATENATE = CONCATENATE;
exports.COND = COND;
exports.CONTAINS = CONTAINS;
exports.COS = COS;
exports.DATE = DATE;
exports.DATEVALUE = DATEVALUE;
exports.DATEDIF = DATEDIF;
exports.DAYS360 = DAYS360;
exports.DEC2BIN = DEC2BIN;
exports.DIFF = DIFF;
exports.DIVIDE = DIVIDE;
exports.EQ = EQ;
exports.EXACT = EXACT;
exports.FILTER = FILTER;
exports.FIND = FIND;
exports.FLATTEN = FLATTEN;
exports.GT = GT;
exports.GTE = GTE;
exports.GUID = GUID;
exports.HLOOKUP = HLOOKUP;
exports.IF = IF;
exports.IFBLANK = IFBLANK;
exports.IFEMPTY = IFEMPTY;
exports.IFERROR = IFERROR;
exports.IFNA = IFNA;
exports.IN = IN;
exports.INDEX2COL = INDEX2COL;
exports.INDEX2ROW = INDEX2ROW;
exports.INDIRECT = INDIRECT;
exports.ISARRAY = ISARRAY;
exports.ISBLANK = ISBLANK;
exports.ISDATE = ISDATE;
exports.ISEMAIL = ISEMAIL;
exports.ISEMPTY = ISEMPTY;
exports.ISERROR = ISERROR;
exports.ISEVEN = ISEVEN;
exports.ISFUNCTION = ISFUNCTION;
exports.ISNA = ISNA;
exports.ISNUMBER = ISNUMBER;
exports.ISODD = ISODD;
exports.ISREF = ISREF;
exports.ISTEXT = ISTEXT;
exports.ISURL = ISURL;
exports.LEN = LEN;
exports.LOOKUP = LOOKUP;
exports.LOWER = LOWER;
exports.LT = LT;
exports.LTE = LTE;
exports.MIN = MIN;
exports.MAX = MAX;
exports.MULTIPLY = MULTIPLY;
exports.N = N;
exports.NUMBERVALUE = NUMBERVALUE;
exports.NE = NE;
exports.NOT = NOT;
exports.OCT2DEC = OCT2DEC;
exports.OR = OR;
exports.PARSEBOOL = PARSEBOOL;
exports.PARSEDATE = PARSEDATE;
exports.PI = PI;
exports.PMT = PMT;
exports.POWER = POWER;
exports.REF = REF;
exports.REPLACE = REPLACE;
exports.REPT = REPT;
exports.RIGHT = RIGHT;
exports.ROUND = ROUND;
exports.ROUNDUP = ROUNDUP;
exports.SEARCH = SEARCH;
exports.SELECT = SELECT;
exports.SERIAL = SERIAL;
exports.SIN = SIN;
exports.SORT = SORT;
exports.SPLIT = SPLIT;
exports.SUBSTITUTE = SUBSTITUTE;
exports.SUBTRACT = SUBTRACT;
exports.SUM = SUM;
exports.TAN = TAN;
exports.TAU = TAU;
exports.TEXT = TEXT;
exports.TRIM = TRIM;
exports.UNIQUE = UNIQUE;
exports.UPPER = UPPER;
exports.VLOOKUP = VLOOKUP;
exports.XOR = XOR;


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9mdW5jdGlvbmZvdW5kcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztJQUFZLFM7Ozs7Ozs7QUFJWixJQUFJLGNBQWMsQ0FDZCxXQURjLEVBRWQsMEJBRmMsRUFHZCxXQUhjLENBQWxCOztBQU1BLENBQUMsWUFBVzs7QUFFUixRQUFJLGVBQWUsRUFBbkI7UUFDSSxJQUFJLENBRFI7QUFFQSxTQUFLLElBQUksR0FBVCxJQUFnQixTQUFoQixFQUEyQjtBQUN2QixlQUFPLEdBQVAsSUFBYyxVQUFVLEdBQVYsQ0FBZDtBQUNBLHdCQUFnQixZQUFZLEdBQVosR0FBa0IsSUFBbEIsR0FBeUIsR0FBekIsR0FBK0IsY0FBL0M7QUFDSDs7QUFFRCxRQUFJLFNBQVMsRUFBYjtBQVRRO0FBQUE7QUFBQTs7QUFBQTtBQVVSLDZCQUFjLFdBQWQsOEhBQTJCO0FBQUEsZ0JBQWxCLENBQWtCOztBQUN2QixzQkFBVSxXQUFXLENBQVgsR0FBZSxLQUFmLEdBQXVCLEtBQUssQ0FBTCxDQUF2QixHQUFpQyxjQUEzQztBQUNIO0FBWk87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFjUixhQUFTLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUMsU0FBakMsR0FBNkMsU0FDekMsb0JBRHlDLEdBQ2xCLFlBRDNCO0FBRUgsQ0FoQkQ7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBmdW5jdGlvbnMgZnJvbSAnZnVuY3Rpb25mb3VuZHJ5JztcclxuLy9pbXBvcnQge2NvbXBpbGVyfSBmcm9tICdmb3JtdWxhZm91bmRyeSc7XHJcbi8vY29uc29sZS5sb2coY29tcGlsZXIpO1xyXG5cclxubGV0IGV4cHJlc3Npb25zID0gW1xyXG4gICAgJ0FCUygtMS4xKScsXHJcbiAgICAnTE9XRVIoXCJURVhUIFwiKSArIEFCUygtMiknLFxyXG4gICAgJ1NVTSgyLCA1KSdcclxuXTtcclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAgIC8vIENyZWF0ZSBzZXQgb2YgZnVuY3Rpb25zXHJcbiAgICBsZXQgZnVuY3Rpb25MaXN0ID0gJycsXHJcbiAgICAgICAgaSA9IDE7XHJcbiAgICBmb3IgKGxldCBrZXkgaW4gZnVuY3Rpb25zKSB7XHJcbiAgICAgICAgd2luZG93W2tleV0gPSBmdW5jdGlvbnNba2V5XTtcclxuICAgICAgICBmdW5jdGlvbkxpc3QgKz0gJzxjb2RlPlsnICsgaSsrICsgJ10gJyArIGtleSArICc8L2NvZGU+PC9icj4nO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBvdXRwdXQgPSAnJztcclxuICAgIGZvciAobGV0IGUgb2YgZXhwcmVzc2lvbnMpIHtcclxuICAgICAgICBvdXRwdXQgKz0gJzxjb2RlPicgKyBlICsgJyA9ICcgKyBldmFsKGUpICsgJzwvY29kZT48L2JyPic7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlYnVnJykuaW5uZXJIVE1MID0gb3V0cHV0ICsgXHJcbiAgICAgICAgJzxoMz5GdW5jdGlvbnM8L2gzPicgKyBmdW5jdGlvbkxpc3Q7XHJcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG4vLyBDb3B5cmlnaHQgMjAxNSBQZXRlciBXIE1vcmVzaVxuXG4vLyBSZXR1cm5zIHRydWUgd2hlbiB0aGUgdmFsdWUgaXMgYSBmaW5pdGUgbnVtYmVyLlxuZnVuY3Rpb24gSVNOVU1CRVIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKSAmJiBpc0Zpbml0ZSh2YWx1ZSk7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIExpc3Qgb2YgZXJyb3JzIGluIHRoZSBzcHJlYWRzaGVldCBzeXN0ZW1cblxuZnVuY3Rpb24gRkZFcnJvcihtZXNzYWdlKSB7XG4gIHRoaXMubmFtZSA9IFwiTm90SW1wbGVtZW50ZWRFcnJvclwiO1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IFwiXCI7XG59XG5cbkZGRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuRkZFcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm1lc3NhZ2U7XG59O1xuXG52YXIgbmlsID0gbmV3IEZGRXJyb3IoJyNOVUxMIScpO1xudmFyIGRpdjAgPSBuZXcgRkZFcnJvcignI0RJVi8wIScpO1xudmFyIHZhbHVlID0gbmV3IEZGRXJyb3IoJyNWQUxVRSEnKTtcbnZhciByZWYgPSBuZXcgRkZFcnJvcignI1JFRiEnKTtcbnZhciBuYW1lID0gbmV3IEZGRXJyb3IoJyNOQU1FPycpO1xudmFyIG51bSA9IG5ldyBGRkVycm9yKCcjTlVNIScpO1xudmFyIG5hID0gbmV3IEZGRXJyb3IoJyNOL0EhJyk7XG52YXIgZXJyb3IkMSA9IG5ldyBGRkVycm9yKCcjRVJST1IhJyk7XG52YXIgZGF0YSA9IG5ldyBGRkVycm9yKCcjR0VUVElOR19EQVRBIScpO1xudmFyIG1pc3NpbmcgPSBuZXcgRkZFcnJvcignI01JU1NJTkchJyk7XG52YXIgdW5rbm93biA9IG5ldyBGRkVycm9yKCcjVU5LTk9XTiEnKTtcbnZhciBlcnJvciQyID0ge1xuICBuaWw6IG5pbCxcbiAgZGl2MDogZGl2MCxcbiAgdmFsdWU6IHZhbHVlLFxuICByZWY6IHJlZixcbiAgbmFtZTogbmFtZSxcbiAgbnVtOiBudW0sXG4gIG5hOiBuYSxcbiAgZXJyb3I6IGVycm9yJDEsXG4gIGRhdGE6IGRhdGEsXG4gIG1pc3Npbmc6IG1pc3NpbmcsXG4gIHVua25vd246IHVua25vd25cbn07XG5cbi8vIEFCUyBjb21wdXRlcyBhYnNvbHV0ZSB2YWx1ZSBvZiBhIG51bWJlclxuZnVuY3Rpb24gQUJTKHZhbHVlKSB7XG5cbiAgLy8gUmV0dXJuIGAjVkFMVUUhYCBpZiBub3QgbnVtYmVyXG4gIGlmICghSVNOVU1CRVIodmFsdWUpKSB7XG4gICAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gIH1cblxuICAvLyBVc2UgYnVpbHQtaW4gTWF0aC5hYnNcbiAgcmV0dXJuIE1hdGguYWJzKHZhbHVlKTtcbn1cblxuLy8gQUNPUyBjb21wdXRlcyB0aGUgaW52ZXJzZSBjb3NpbmUgb2YgYSBudW1iZXJcbmZ1bmN0aW9uIEFDT1ModmFsdWUpIHtcblxuICAvLyBSZXR1cm4gYCNWQUxVRSFgIGlmIG5vdCBudW1iZXJcbiAgaWYgKCFJU05VTUJFUih2YWx1ZSkpIHtcbiAgICByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbiAgfVxuXG4gIC8vIFVzZSBidWlsdC1pbiBNYXRoLmFjb3NcbiAgcmV0dXJuIE1hdGguYWNvcyh2YWx1ZSk7XG59XG5cbi8vIEFERCBjYWxjdWxhdGVzIHRoZSBzdW0gb2YgdHdvIG51bWJlcnMuXG5mdW5jdGlvbiBBREQoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCB2YWx1ZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICB2YWx1ZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICAvLyBSZXR1cm4gYCNOQSFgIGlmIDIgYXJndW1lbnRzIGFyZSBub3QgcHJvdmlkZWQuXG4gIGlmICh2YWx1ZXMubGVuZ3RoICE9PSAyKSB7XG4gICAgcmV0dXJuIGVycm9yJDIubmE7XG4gIH1cblxuICAvLyBkZWNvbXBvc2UgdmFsdWVzIGludG8gYSBhbmQgYi5cbiAgdmFyIGEgPSB2YWx1ZXNbMF07XG4gIHZhciBiID0gdmFsdWVzWzFdO1xuXG4gIC8vIFJldHVybiBgI1ZBTFVFIWAgaWYgZWl0aGVyIGEgb3IgYiBpcyBub3QgYSBudW1iZXIuXG5cbiAgaWYgKCFJU05VTUJFUihhKSB8fCAhSVNOVU1CRVIoYikpIHtcbiAgICByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgc3VtLlxuICByZXR1cm4gYSArIGI7XG59XG5cbi8vIEFORCByZWR1Y2VzIGxpc3Qgb2YgdHJ1dGh5IHZhbHVlcyBpbnRvIHRydWUgb3IgZmFsc2UgdmFsdWVcbmZ1bmN0aW9uIEFORCgpIHtcbiAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBjcml0ZXJpYSA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgY3JpdGVyaWFbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgfVxuXG4gIC8vIFJlZHVjZSBjcml0ZXJpYSBpbnRvIGJvb2xlYW4gdmFsdWUuXG4gIHJldHVybiBjcml0ZXJpYS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgaXRlbSkge1xuXG4gICAgLy8gcmV0dXJuIGAjVkFMVUUhYCBpZiBub3QgdHJ1ZSwgZmFsc2UsIDEgb3IgMFxuICAgIGlmIChpdGVtICE9PSB0cnVlICYmIGl0ZW0gIT09IGZhbHNlICYmIGl0ZW0gIT09IDEgJiYgaXRlbSAhPT0gMCkge1xuICAgICAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gICAgfVxuXG4gICAgLy8gT25jZSBgI1ZBTFVFIWAgaXMgZm91bmQgdGhlbiBhbHdheXMgcmV0dXJuIGAjVkFMVUUhYFxuICAgIGlmIChhY2MgPT09IGVycm9yJDIudmFsdWUpIHJldHVybiBlcnJvciQyLnZhbHVlO1xuXG4gICAgLy8gT25jZSBgZmFsc2VgIGlzIGZvdW5kIGFsd2F5cyByZXR1cm4gYGZhbHNlYFxuICAgIGlmIChhY2MgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgdmFsdWUgd2hldGhlciB0cnVlIG9yIGZhbHNlXG4gICAgcmV0dXJuIGl0ZW0gPT09IHRydWUgfHwgaXRlbSA9PT0gMTtcbiAgfSk7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIEZMQVRURU4gY29udmVydHMgYSBuZXN0ZWQgYXJyYXkgaW50byBhIGZsYXR0ZW5lZCBhcnJheS4gSXQgb25seSBzdXBwb3J0cyBvbmVcbi8vIGxldmVsIG9mIG5lc3RpbmcuXG5mdW5jdGlvbiBGTEFUVEVOKHJlZikge1xuICByZXR1cm4gcmVmLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgfSwgW10pO1xufVxuXG4vLyBTVU0gYSBnaXZlbiBsaXN0IG9mIGBudW1iZXJzYFxuZnVuY3Rpb24gU1VNKCkge1xuICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIG51bWJlcnMgPSBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgIG51bWJlcnNbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgfVxuXG4gIHJldHVybiBGTEFUVEVOKEZMQVRURU4obnVtYmVycykpLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIGlmICh0eXBlb2YgYiAhPT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBlcnJvciQyLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gYSArIGI7XG4gIH0pO1xufVxuXG4vLyBJU0VSUiByZXR1cm5zIHRydWUgd2hlbiB0aGUgdmFsdWUgaXMgYW4gZXJyb3IgKGV4Y2VwdCBgI05BIWApIG9yIHdoZW4gdGhlblxuLy8gdmFsdWUgaXMgYSBudW1iZXIgd2hpY2ggaXMgTmFOIG9yIFstXUluZmluaXR5LlxuZnVuY3Rpb24gSVNFUlIodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBlcnJvciQyLm5hICYmIHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdFcnJvcicgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAoTnVtYmVyLmlzTmFOKHZhbHVlKSB8fCAhTnVtYmVyLmlzRmluaXRlKHZhbHVlKSk7XG59XG5cbi8vIElTRVJST1IgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHZhbHVlIGlzIGFuIGVycm9yLlxuZnVuY3Rpb24gSVNFUlJPUih2YWx1ZSkge1xuICByZXR1cm4gSVNFUlIodmFsdWUpIHx8IHZhbHVlID09PSBlcnJvciQyLm5hO1xufVxuXG4vLyBBVkVSQUdFIGNvbXB1dGVzIHN1bSBvZiBpdGVtcyBkaXZpZGVkIGJ5IG51bWJlciBvZiBpdGVtc1xuZnVuY3Rpb24gQVZFUkFHRSgpIHtcblxuICAvLyBjb21wdXRlIHN1bSBhbGwgb2YgdGhlIGl0ZW1zLlxuICB2YXIgc3VtID0gU1VNLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcblxuICAvLyByZXR1cm4gc3VtIHdoZW4gY29tcHV0ZWQgZXJyb3IuXG4gIGlmIChJU0VSUk9SKHN1bSkpIHtcbiAgICByZXR1cm4gc3VtO1xuICB9XG5cbiAgLy8gcmV0dXJuIHN1bSBkaXZpZGVkIGJ5IGl0ZW0gY291bnRcbiAgcmV0dXJuIHN1bSAvIGFyZ3VtZW50cy5sZW5ndGg7XG59XG5cbi8vIEJJTjJERUMgY29udmVydHMgYmluYXJ5IHN0cmluZyBpbnRvIGRlY2ltYWwgdmFsdWVcbmZ1bmN0aW9uIEJJTjJERUModmFsdWUpIHtcbiAgdmFyIHZhbHVlQXNTdHJpbmc7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHZhbHVlQXNTdHJpbmcgPSB2YWx1ZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YWx1ZUFzU3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZXJyb3IkMi5OQTtcbiAgfVxuXG4gIGlmICh2YWx1ZUFzU3RyaW5nLmxlbmd0aCA+IDEwKSByZXR1cm4gZXJyb3IkMi5OVU07XG5cbiAgLy8gd2Ugc3VidHJhY3QgNTEyIHdoZW4gdGhlIGxlYWRpbmcgbnVtYmVyIGlzIDAuXG4gIGlmICh2YWx1ZUFzU3RyaW5nLmxlbmd0aCA9PT0gMTAgJiYgdmFsdWVBc1N0cmluZ1swXSA9PT0gJzEnKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlQXNTdHJpbmcuc3Vic3RyaW5nKDEpLCAyKSAtIDUxMjtcbiAgfVxuXG4gIC8vIENvbnZlcnQgYmluYXJ5IG51bWJlciB0byBkZWNpbWFsIHdpdGggYnVpbHQtaW4gZmFjaWxpdHlcbiAgcmV0dXJuIHBhcnNlSW50KHZhbHVlQXNTdHJpbmcsIDIpO1xufTtcblxuLy8gQ29weXJpZ2h0IDIwMTUgUGV0ZXIgVyBNb3Jlc2lcblxuLy8gU2hhcmVkIGNvbnN0YW50c1xudmFyIGQxOTAwID0gbmV3IERhdGUoMTkwMCwgMCwgMSk7XG52YXIgSnVsaWFuT2Zmc2V0ID0gMjQxNTAxOTtcbnZhciBTZWNvbmRzSW5Ib3VyID0gMzYwMDtcbnZhciBTZWNvbmRzSW5EYXkgPSA4NjQwMDtcbnZhciBNaWxsaVNlY29uZHNJbkRheSA9IDg2NDAwMDAwO1xudmFyIERheU5hbWVzID0gW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl07XG52YXIgRGF5TmFtZXMzID0gW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdO1xudmFyIE1vbnRoTmFtZXMgPSBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXTtcbnZhciBNb250aE5hbWVzMyA9IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXTtcbnZhciBBTSA9IFwiQU1cIjtcbnZhciBBTTEgPSBcIkFcIjtcbnZhciBQTSA9IFwiUE1cIjtcbnZhciBQTTEgPSBcIlBcIjtcbnZhciDPhCA9IDYuMjgzMTg1MzA3MTc5NTg7XG52YXIgTWF4Q29scyA9IDE2Mzg0O1xudmFyIFNlcGFyYXRvckNoYXIgPSBcIixcIjtcbnZhciBEZWNpbWFsQ2hhciA9IFwiLlwiO1xudmFyIERlZmF1bHRDdXJyZW5jeSA9IFwiJFwiO1xudmFyIEFsbG93ZWRDb2xvcnMgPSB7XG4gIEJMQUNLOiBcIiMwMDAwMDBcIixcbiAgQkxVRTogXCIjMDAwMEZGXCIsXG4gIENZQU46IFwiIzAwRkZGRlwiLFxuICBHUkVFTjogXCIjMDBGRjAwXCIsXG4gIE1BR0VOVEE6IFwiI0ZGMDBGRlwiLFxuICBSRUQ6IFwiI0ZGMDAwMFwiLFxuICBXSElURTogXCIjRkZGRkZGXCIsXG4gIFlFTExPVzogXCIjRkZGRjAwXCJcbn07XG5cbi8vIENFTExJTkRFWCBjb21wdXRlcyB0aGUgaW5kZXggZm9yIHJvdyBhbmQgY29sdW1uIGluIGEgMiBkaW1lbnNpb25hbCBhcnJheS5cbmZ1bmN0aW9uIENFTExJTkRFWChyb3csIGNvbCkge1xuICAvLyBNdWx0aXBsZSByb3cgYnkgbWF4aW11bSBjb2x1bW5zIHBsdXMgdGhlIGNvbC5cbiAgcmV0dXJuIE1hdGguZmxvb3Iocm93ICogTWF4Q29scyArIGNvbCk7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIFVOSVFVRSByZWR1Y2VzIGFuIGBhcnJheWAgaW50byBhbiBhcnJheSB3aXRob3V0IGR1cGxpY2F0ZSB2YWx1ZXMuXG5mdW5jdGlvbiBVTklRVUUoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5LnJlZHVjZShmdW5jdGlvbiAocCwgYykge1xuICAgIGlmIChwLmluZGV4T2YoYykgPCAwKSBwLnB1c2goYyk7XG4gICAgcmV0dXJuIHA7XG4gIH0sIFtdKTtcbn1cblxuLy8gQ0hBTkdFRCBjb21wdXRlcyB0aGUgbGlzdCBvZiBrZXlzIHRoYXQgYXJlIGRpZmZlcmVudCBiZXR3ZWVuIHR3byBvYmplY3RzLlxuZnVuY3Rpb24gQ0hBTkdFRChhLCBiKSB7XG5cbiAgLy8gQ29tcHV0ZSB0aGUga2V5cyBpbiBvYmplY3QgYSBhbmQgYi5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMoYSksXG4gICAgICBrZXlzQiA9IE9iamVjdC5rZXlzKGIpO1xuXG4gIC8vIEZpbmQgdGhlIHVuaXF1ZSBzZXQgb2YgcHJvcGVydGllcyBjb21wYXJpbmcgYSB0byBiIGFuZCBiIHRvIGEuXG4gIHJldHVybiBVTklRVUUoa2V5c0EuZmlsdGVyKGZ1bmN0aW9uIChuKSB7XG4gICAgcmV0dXJuIGFbbl0gIT09IGJbbl07XG4gIH0pLmNvbmNhdChrZXlzQi5maWx0ZXIoZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4gYVtuXSAhPT0gYltuXTtcbiAgfSkpKTtcbn1cblxuLy8gQ0hPT1NFIGFjY2VwdHMgYW4gaW5kZXggYW5kIGEgbGlzdCBvZiBpdGVtcy4gSXQgcmV0dXJucyB0aGUgaXRlbSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBpbmRleC5cbmZ1bmN0aW9uIENIT09TRShpbmRleCkge1xuXG4gIC8vIFJldHVybiBgI05BIWAgaWYgaW5kZXggb3IgaXRlbXMgYXJlIG5vdCBwcm92aWRlZC5cbiAgaWYgKCFpbmRleCB8fCBhcmd1bWVudHMubGVuZ3RoIC0gMSA9PT0gMCkge1xuICAgIHJldHVybiBlcnJvciQyLm5hO1xuICB9XG5cbiAgLy8gUmV0dXJuIGAjVkFMVUUhYCBpZiBpbmRleCBpcyBsZXNzIHRoYW4gMSBvciBncmVhdGVyIHRoYW4gMjU0LlxuICBpZiAoaW5kZXggPCAxIHx8IGluZGV4ID4gMjU0KSB7XG4gICAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gIH1cblxuICAvLyBSZXR1cm4gYCNWQUxVRSFgIGlmIG51bWJlciBvZiBpdGVtcyBpcyBsZXNzIHRoYW4gaW5kZXguXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIC0gMSA8IGluZGV4KSB7XG4gICAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIGl0ZW0uXG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDw9IGluZGV4IC0gMSArIDEgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbaW5kZXggLSAxICsgMV07XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIElTQkxBTksgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCBvciBudWxsLlxuZnVuY3Rpb24gSVNCTEFOSyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZSA9PT0gbnVsbDtcbn07XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIFNFTEVDVCBmaWVsZHMgZnJvbSBvYmplY3RcbmZ1bmN0aW9uIFNFTEVDVChmaWVsZHMsIGJvZHkpIHtcbiAgLy8gbm9uLWpzb25cbiAgaWYgKCFib2R5IHx8ICdvYmplY3QnICE9ICh0eXBlb2YgYm9keSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGJvZHkpKSkgcmV0dXJuO1xuXG4gIC8vIGNoZWNrIGZvciBmaWVsZHNcbiAgaWYgKCFmaWVsZHMpIHJldHVybjtcblxuICAvLyBzcGxpdFxuICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGZpZWxkcykgZmllbGRzID0gZmllbGRzLnNwbGl0KC8gKiwgKi8pO1xuXG4gIC8vIGZpZWxkcyBhcnJheVxuICBpZiAoQXJyYXkuaXNBcnJheShib2R5KSkge1xuICAgIHJldHVybiBib2R5Lm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gZmllbGRzLnJlZHVjZShmdW5jdGlvbiAocmV0LCBrZXkpIHtcbiAgICAgICAgcmV0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0sIHt9KTtcbiAgICB9KTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGZpZWxkcyBvYmplY3RcbiAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24gKHJldCwga2V5KSB7XG4gICAgcmV0W2tleV0gPSBib2R5W2tleV07XG4gICAgcmV0dXJuIHJldDtcbiAgfSwge30pO1xufVxuXG4vLyBDTEVBTiBhY2NlcHRzIGFuIG9iamVjdCBhbmQgcmVtb3ZlIHByb3BlcnRpZXMgdGhhdCBhcmUgYmxhbmsuXG5mdW5jdGlvbiBDTEVBTihvYmopIHtcbiAgLy8gQ29tcHV0ZSBrZXlzIHdoZXJlIHZhbHVlIGlzIG5vbiBibGFuay5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopLmZpbHRlcihmdW5jdGlvbiAobikge1xuICAgIHJldHVybiAhSVNCTEFOSyhvYmpbbl0pO1xuICB9KTtcblxuICAvLyBDb21wdXRlIG9iamVjdCB3aXRoIG9ubHkgbm9uLWJsYW5rIGtleXMuXG4gIHJldHVybiBTRUxFQ1Qoa2V5cywgb2JqKTtcbn1cblxuLy8gQ09ERSBhY2NlcHRzIHRleHQgYW5kIG9wdGlvbmFsbHkgaW5kZXggKGRlZmF1bHQgMSkgcmV0dXJuaW5nIHRoZSBjaGFyYWN0ZXIgY29kZS5cbmZ1bmN0aW9uIENPREUoKSB7XG4gIHZhciB0ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gJycgOiBhcmd1bWVudHNbMF07XG4gIHZhciBpbmRleCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IDEgOiBhcmd1bWVudHNbMV07XG5cbiAgaWYgKGluZGV4IDwgMSkgcmV0dXJuIGVycm9yJDIubmE7XG4gIGlmICh0ZXh0Lmxlbmd0aCA8IGluZGV4KSByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbiAgcmV0dXJuIHRleHQuY2hhckNvZGVBdChpbmRleCAtIDEpO1xufVxuXG4vLyBDb3B5cmlnaHQgMjAxNSBQZXRlciBXIE1vcmVzaVxuXG4vLyBJU1RFWFQgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuZnVuY3Rpb24gSVNURVhUKHZhbHVlKSB7XG4gIHJldHVybiAnc3RyaW5nJyA9PT0gdHlwZW9mIHZhbHVlO1xufTtcblxuLy8gSVNSRUYgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHZhbHVlIGlzIGEgcmVmZXJlbmNlLlxuZnVuY3Rpb24gSVNSRUYodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdmFsdWUuaXNSZWYgPT09IHRydWU7XG59XG5cbi8vIENvbnZlcnQgbGV0dGVyIHRvIG51bWJlciAoZS5nIEEgLT4gMClcbmZ1bmN0aW9uIENPTFVNTk5VTUJFUihjb2x1bW4pIHtcblxuICBpZiAoIUlTVEVYVChjb2x1bW4pKSB7XG4gICAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gIH1cblxuICAvLyBzZWUgdG9Db2x1bW4gZm9yIHJhbnQgb24gd2h5IHRoaXMgaXMgc2Vuc2libGUgZXZlbiB0aG91Z2ggaXQgaXMgaWxsb2dpY2FsLlxuICB2YXIgcyA9IDAsXG4gICAgICBzZWNvbmRQYXNzO1xuXG4gIGlmIChjb2x1bW4ubGVuZ3RoID4gMCkge1xuXG4gICAgcyA9IGNvbHVtbi5jaGFyQ29kZUF0KDApIC0gJ0EnLmNoYXJDb2RlQXQoMCk7XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGNvbHVtbi5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gY29tcGVuc2F0ZSBmb3Igc3ByZWFkc2hlZXQgY29sdW1uIG5hbWluZ1xuICAgICAgcyArPSAxO1xuICAgICAgcyAqPSAyNjtcbiAgICAgIHMgKz0gY29sdW1uLmNoYXJDb2RlQXQoaSkgLSAnQScuY2hhckNvZGVBdCgwKTtcbiAgICAgIHNlY29uZFBhc3MgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBzO1xuICB9XG5cbiAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG59XG5cbi8vIENPTFVNTiByZXR1cm4gdGhlIGNvbHVtbiBudW1iZXIgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgcmVmZXJlbmNlLlxuZnVuY3Rpb24gQ09MVU1OKHZhbHVlKSB7XG5cbiAgLy8gUmV0dXJuIGAjVkFMVUUhYCB3aGVuIHRoZSB2YWx1ZSBpcyBub3QgYSByZWZlcmVuY2UuXG4gIGlmICghSVNSRUYodmFsdWUpKSB7XG4gICAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gIH1cblxuICAvLyBSdW4gdGhlIENPTFVNTk5VTUJFUiBhbmQgY29udmVydCB0byBiYXNlIDEuXG4gIHJldHVybiBDT0xVTU5OVU1CRVIodmFsdWUuY29sdW1uKSArIDE7XG59XG5cbi8vIENvbnZlcnQgaW5kZXggdG8gbGV0dGVyIChlLmcgMCAtPiBBKVxuZnVuY3Rpb24gQ09MVU1OTEVUVEVSKGluZGV4KSB7XG5cbiAgaWYgKCFJU05VTUJFUihpbmRleCkpIHtcbiAgICByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbiAgfVxuXG4gIC8vIFRoZSBjb2x1bW4gaXMgZGV0ZXJtaW5lZCBieSBhcHBseWluZyBhIG1vZGlmaWVkIEhleGF2aWdlc2ltYWwgYWxnb3JpdGhtLlxuICAvLyBOb3JtYWxseSBCQSBmb2xsb3dzIFogYnV0IHNwcmVhZHNoZWV0cyBjb3VudCB3cm9uZyBhbmQgbm9ib2R5IGNhcmVzLlxuXG4gIC8vIEluc3RlYWQgdGhleSBkbyBpdCBpbiBhIHdheSB0aGF0IG1ha2VzIHNlbnNlIHRvIG1vc3QgcGVvcGxlIGJ1dFxuICAvLyBpcyBtYXRobWF0aWNhbGx5IGluY29ycmVjdC4gU28gQUEgZm9sbG93cyBaIHdoaWNoIGluIHRoZSBiYXNlIDEwXG4gIC8vIHN5c3RlbSBpcyBsaWtlIHNheWluZyAwMSBmb2xsb3dzIDkuXG5cbiAgLy8gSW4gdGhlIGxlYXN0IHNpZ25pZmljYW50IGRpZ2l0XG4gIC8vIEEuLlogaXMgMC4uMjVcblxuICAvLyBGb3IgdGhlIHNlY29uZCB0byBudGggc2lnbmlmaWNhbnQgZGlnaXRcbiAgLy8gQS4uWiBpcyAxLi4yNlxuXG4gIHZhciBjb252ZXJ0ZWQgPSBcIlwiLFxuICAgICAgc2Vjb25kUGFzcyA9IGZhbHNlLFxuICAgICAgcmVtYWluZGVyLFxuICAgICAgdmFsdWUgPSBNYXRoLmFicyhpbmRleCk7XG5cbiAgZG8ge1xuICAgIHJlbWFpbmRlciA9IHZhbHVlICUgMjY7XG5cbiAgICBpZiAoc2Vjb25kUGFzcykge1xuICAgICAgcmVtYWluZGVyLS07XG4gICAgfVxuXG4gICAgY29udmVydGVkID0gU3RyaW5nLmZyb21DaGFyQ29kZShyZW1haW5kZXIgKyAnQScuY2hhckNvZGVBdCgwKSkgKyBjb252ZXJ0ZWQ7XG4gICAgdmFsdWUgPSBNYXRoLmZsb29yKCh2YWx1ZSAtIHJlbWFpbmRlcikgLyAyNik7XG5cbiAgICBzZWNvbmRQYXNzID0gdHJ1ZTtcbiAgfSB3aGlsZSAodmFsdWUgPiAwKTtcblxuICByZXR1cm4gY29udmVydGVkO1xufVxuXG4vLyBDb3B5cmlnaHQgMjAxNSBQZXRlciBXIE1vcmVzaVxuXG4vLyBDT05DQVRFTkFURSByZWR1Y2VzIGEgbGlzdCBvZiB2YWx1ZXMgaW50byBhIHNpbmdsZSBzdHJpbmcuXG5mdW5jdGlvbiBDT05DQVRFTkFURSgpIHtcbiAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCB2YWx1ZXMgPSBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgIHZhbHVlc1tfa2V5NF0gPSBhcmd1bWVudHNbX2tleTRdO1xuICB9XG5cbiAgLy8gQ29tYmluZSBpbnRvIGEgc2luZ2xlIHN0cmluZyB2YWx1ZVxuICByZXR1cm4gdmFsdWVzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBpdGVtKSB7XG4gICAgcmV0dXJuIFwiXCIgKyBhY2MgKyBpdGVtO1xuICB9KTtcbn1cblxuLy8gQ29weXJpZ2h0IDIwMTUgUGV0ZXIgVyBNb3Jlc2lcblxuLy8gQ09ORCBhY2NlcHRzIGNvbmRpdGlvbnMgYW5kIHJldHVybnMgdGhlIGV2ZW4gdmFsdWUgYWZ0ZXIgdGhlIGZpcnN0IG9kZFxuLy8gdmFsdWUgdGhhdCBpcyB0cnVlLiBJZiBubyBvZGQgdmFsdWUgaXMgdHJ1ZSB0aGVuIGl0IHJldHVybnMgdGhlIGxhc3Qgb2RkXG4vLyB2YWx1ZSB3aGVuIHByZXNlbnQuXG4vL1xuLy8gU1lOVEFYKCBjb25kMSwgcmVzdWx0X2lmX3RydWUgWywgY29uZDIsIHJlc3VsdF9pZl90cnVlLCBkZWZhdWx0X3Jlc3VsdF0gKVxuZnVuY3Rpb24gQ09ORCgpIHtcbiAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBjYXNlcyA9IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgY2FzZXNbX2tleTVdID0gYXJndW1lbnRzW19rZXk1XTtcbiAgfVxuXG4gIHZhciBmb3VuZCA9IGZhbHNlO1xuXG4gIC8vIFJlZHVjZSBhbGwgY2FzZXMgaW50byBhIHZhbHVlLlxuICByZXR1cm4gY2FzZXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGl0ZW0sIGluZGV4KSB7XG5cbiAgICAvLyBSZXR1cm4gcHJldmlvdXNseSBmb3VuZCByZXN1bHRcbiAgICBpZiAoZm91bmQgPT09IHRydWUpIHJldHVybiBhY2M7XG5cbiAgICAvLyBIYW5kbGUgbGFzdCBpdGVtXG4gICAgaWYgKGluZGV4ID09PSBjYXNlcy5sZW5ndGggLSAxKSB7XG4gICAgICAvLyBUaGVyZSBpcyBubyBsYXN0IGl0ZW0uXG4gICAgICBpZiAoaW5kZXggJSAyID09PSAxKSByZXR1cm47XG5cbiAgICAgIC8vIHJldHVybiB0aGUgbGFzdCBpdGVtXG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiBjb25kaXRpb24gaXMgdHJ1ZVxuICAgIGlmIChpbmRleCAlIDIgPT09IDAgJiYgaXRlbSA9PT0gdHJ1ZSkge1xuICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgLy8gcmV0dXJuIHRoZSBmb3VuZCBpdGVtXG4gICAgICByZXR1cm4gY2FzZXNbaW5kZXggKyAxXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjO1xuICB9LCB1bmRlZmluZWQpO1xufVxuXG4vLyBDb3B5cmlnaHQgMjAxNSBQZXRlciBXIE1vcmVzaVxuXG4vLyBJU0FSUkFZIHJldHVybnMgdHJ1ZSB3aGVuIHRoZSB2YWx1ZSBpcyBhbiBhcmF5LlxuZnVuY3Rpb24gSVNBUlJBWSh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLy8gQ29weXJpZ2h0IDIwMTUgUGV0ZXIgVyBNb3Jlc2lcblxuLy8gRVEgY29tcGFyZXMgdHdvIHZhbHVlcyBhbmQgcmV0dXJucyBhIGJvb2xlYW4gdmFsdWUuXG5mdW5jdGlvbiBFUShhLCBiKSB7XG4gIC8vIFN0cmluZyBjb21wYXJpc2lvbnMgYXJlIGNhc2UtaW5zZW5zaXRpdmVcbiAgaWYgKHR5cGVvZiBhID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBiID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGEudG9Mb3dlckNhc2UoKSA9PT0gYi50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhID09PSBiO1xuICB9XG59XG5cbi8vIElOVCByZXR1cm5zIHRydWUgd2hlbiBhIG5lZWRsZSBpcyBmb3VuZCBpbiBhIGxvb2t1cC5cbmZ1bmN0aW9uIElOKG5lZWRsZSwgbG9va3VwKSB7XG5cbiAgLy8gUmV0dXJuIGAjTkEhYCB3aGVuIHRoZSBuZWVkbGUgYW5kIGxvb2t1cCBhcmUgYmxhbmsuXG4gIGlmIChJU0JMQU5LKG5lZWRsZSkgJiYgSVNCTEFOSyhsb29rdXApKSB7XG4gICAgcmV0dXJuIGVycm9yJDIubmE7XG4gIH1cblxuICAvLyBSZXR1cm4gYCNOQSFgIHdoZW4gdGhlIGxvb2t1cCBpcyBub3QgYW4gYXJyYXkuXG4gIGlmICghSVNBUlJBWShsb29rdXApKSB7XG4gICAgcmV0dXJuIGVycm9yJDIubmE7XG4gIH1cblxuICAvLyBSZXR1cm4gdHJ1ZSB3aGVuIHNvbWUgb2YgdGhlIHZhbHVlcyBtYXRjaCB0aGUgbmVlZGxlLlxuICByZXR1cm4gbG9va3VwLnNvbWUoZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4gRVEobiwgbmVlZGxlKTtcbiAgfSk7XG59XG5cbi8vIEFMSUFTIENPTlRBSU5TXG52YXIgQ09OVEFJTlMgPSBJTjtcblxuLy8gQ09TIHJldHVybnMgdGhlIGNvc2luZSBvZiBhIHZhbHVlLlxuZnVuY3Rpb24gQ09TKHZhbHVlKSB7XG5cbiAgLy8gUmV0dXJuIGAjVkFMVUUhYCB3aGVuIHZhbHVlIGlzIG5vdCBhIG51bWJlci5cbiAgaWYgKCFJU05VTUJFUih2YWx1ZSkpIHtcbiAgICByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLmNvcyh2YWx1ZSk7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIElTREFURSByZXR1cm5zIHRydWUgd2hlbiB0aGUgYHZhbHVlYCBpcyBhIEphdmFTY3JpcHQgZGF0ZSBvYmplY3QuXG5mdW5jdGlvbiBJU0RBVEUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gJ1tvYmplY3QgRGF0ZV0nO1xufTtcblxuLy8gU0VSSUFMIGNvbnZlcnQgYSBkYXRlIG9iamVjdCBpbnRvIGEgc2VyaWFsIG51bWJlci5cbmZ1bmN0aW9uIFNFUklBTChkYXRlKSB7XG4gIC8vIENyZWRpdDogaHR0cHM6Ly9naXRodWIuY29tL3N1dG9pa3UvZm9ybXVsYS5qcy9cbiAgaWYgKCFJU0RBVEUoZGF0ZSkpIHtcbiAgICByZXR1cm4gZXJyb3IkMi5uYTtcbiAgfVxuICB2YXIgZGlmZiA9IE1hdGguY2VpbCgoZGF0ZSAtIGQxOTAwKSAvIE1pbGxpU2Vjb25kc0luRGF5KTtcbiAgcmV0dXJuIGRpZmYgKyAoZGlmZiA+IDU5ID8gMiA6IDEpO1xufVxuXG4vLyBEQVRFIHJldHVybnMgYSBzZXJpYWwgbnVtYmVyIGdpdmVuIGEgeWVhciwgbW9udGggYW5kIGRheS5cbmZ1bmN0aW9uIERBVEUoeWVhciwgbW9udGgsIGRheSkge1xuICByZXR1cm4gU0VSSUFMKG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KSk7XG59XG5cbi8vIFBBUlNFREFURSBjb252ZXJ0cyBhIHZhbHVlIGludG8gYSBEYXRlIG9iamVjdC5cbmZ1bmN0aW9uIFBBUlNFREFURSh2YWwpIHtcblxuICAvKiAqKioqKioqKioqKioqKioqKioqXG4gIEV4dHJhY3RlZCBmcm9tIFNvY2lhbCBDYWxjXG4gICBjb252ZXJ0X2RhdGVfanVsaWFuX3RvX2dyZWdvcmlhbihqdWxpYW5kYXRlKVxuICAgeW1kLT57fVxuICAueWVhclxuICAubW9udGhcbiAgLmRheVxuICAgRnJvbTogaHR0cDovL2FhLnVzbm8ubmF2eS5taWwvZmFxL2RvY3MvSkRfRm9ybXVsYS5odG1sXG4gIFVzZXM6IEZsaWVnZWwsIEguIEYuIGFuZCB2YW4gRmxhbmRlcm4sIFQuIEMuICgxOTY4KS4gQ29tbXVuaWNhdGlvbnMgb2YgdGhlIEFDTSwgVm9sLiAxMSwgTm8uIDEwIChPY3RvYmVyLCAxOTY4KS5cbiAgVHJhbnNsYXRlZCBmcm9tIHRoZSBGT1JUUkFOXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4gIGZ1bmN0aW9uIGNvbnZlcnRfZGF0ZV9qdWxpYW5fdG9fZ3JlZ29yaWFuKGp1bGlhbmRhdGUpIHtcblxuICAgIHZhciBMLCBOLCBJLCBKLCBLO1xuXG4gICAgTCA9IGp1bGlhbmRhdGUgKyA2ODU2OTtcbiAgICBOID0gTWF0aC5mbG9vcig0ICogTCAvIDE0NjA5Nyk7XG4gICAgTCA9IEwgLSBNYXRoLmZsb29yKCgxNDYwOTcgKiBOICsgMykgLyA0KTtcbiAgICBJID0gTWF0aC5mbG9vcig0MDAwICogKEwgKyAxKSAvIDE0NjEwMDEpO1xuICAgIEwgPSBMIC0gTWF0aC5mbG9vcigxNDYxICogSSAvIDQpICsgMzE7XG4gICAgSiA9IE1hdGguZmxvb3IoODAgKiBMIC8gMjQ0Nyk7XG4gICAgSyA9IEwgLSBNYXRoLmZsb29yKDI0NDcgKiBKIC8gODApO1xuICAgIEwgPSBNYXRoLmZsb29yKEogLyAxMSk7XG4gICAgSiA9IEogKyAyIC0gMTIgKiBMO1xuICAgIEkgPSAxMDAgKiAoTiAtIDQ5KSArIEkgKyBMO1xuXG4gICAgcmV0dXJuIG5ldyBEYXRlKEksIEogLSAxLCBLKTtcbiAgfVxuXG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIHJldHVybiB2YWw7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyB2YWwgaXMgYXNzdW1lZCB0byBiZSBzZXJpYWwgbnVtYmVyLlxuICAgIHJldHVybiBjb252ZXJ0X2RhdGVfanVsaWFuX3RvX2dyZWdvcmlhbihNYXRoLmZsb29yKHZhbCArIEp1bGlhbk9mZnNldCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIHRpbWVzdGFtcCA9IERhdGUucGFyc2UodmFsKTtcbiAgICBpZiAoaXNOYU4odGltZXN0YW1wKSkge1xuICAgICAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXApO1xuICB9XG5cbiAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG59XG5cbi8vIERBVEVWQUxVRSBwYXJzZXMgYSBkYXRlIHN0cmluZyBhbmQgcmV0dXJucyBhIHNlcmlhbCBudW1iZXIuXG5mdW5jdGlvbiBEQVRFVkFMVUUoZCkge1xuICByZXR1cm4gU0VSSUFMKFBBUlNFREFURShkKSk7XG59XG5cbi8vIERBVEVESUYgcmV0dXJuIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIGRhdGVzIGdpdmVuIGEgc3RhcnQgZGF0ZSwgZW5kIGRhdGUgYW5kIHVuaXQuXG5mdW5jdGlvbiBEQVRFRElGKHN0YXJ0X2RhdGUsIGVuZF9kYXRlLCB1bml0KSB7XG4gIHZhciBzZWNvbmQgPSAxMDAwLFxuICAgICAgbWludXRlID0gc2Vjb25kICogNjAsXG4gICAgICBob3VyID0gbWludXRlICogNjAsXG4gICAgICBkYXkgPSBob3VyICogMjQsXG4gICAgICB3ZWVrID0gZGF5ICogNztcbiAgc3RhcnRfZGF0ZSA9IFBBUlNFREFURShzdGFydF9kYXRlKSwgZW5kX2RhdGUgPSBQQVJTRURBVEUoZW5kX2RhdGUpO1xuXG4gIHZhciB0aW1lZGlmZiA9IGVuZF9kYXRlIC0gc3RhcnRfZGF0ZTtcbiAgaWYgKGlzTmFOKHRpbWVkaWZmKSkgcmV0dXJuIE5hTjtcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlIFwiWVwiOlxuICAgICAgcmV0dXJuIGVuZF9kYXRlLmdldEZ1bGxZZWFyKCkgLSBzdGFydF9kYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgY2FzZSBcIk1cIjpcbiAgICAgIHJldHVybiBlbmRfZGF0ZS5nZXRGdWxsWWVhcigpICogMTIgKyBlbmRfZGF0ZS5nZXRNb250aCgpIC0gKHN0YXJ0X2RhdGUuZ2V0RnVsbFllYXIoKSAqIDEyICsgc3RhcnRfZGF0ZS5nZXRNb250aCgpKTtcbiAgICBjYXNlIFwiV1wiOlxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGltZWRpZmYgLyB3ZWVrKTtcbiAgICBjYXNlIFwiRFwiOlxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGltZWRpZmYgLyBkYXkpO1xuICAgIGNhc2UgXCJNRFwiOlxuICAgICAgcmV0dXJuIGVuZF9kYXRlLmdldERhdGUoKSAtIHN0YXJ0X2RhdGUuZ2V0RGF0ZSgpO1xuICAgIGNhc2UgXCJZTVwiOlxuICAgICAgcmV0dXJuIGVuZF9kYXRlLmdldE1vbnRoKCkgLSBzdGFydF9kYXRlLmdldE1vbnRoKCk7XG4gICAgY2FzZSBcIllEXCI6XG4gICAgICByZXR1cm4gbmV3IEVycm9yKFwiTk9UIElNUExFTUVOVEVEXCIpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8vIFBBUlNFQk9PTCBjb252ZXJ0cyBhIHRydXRoeSB2YWx1ZSBpbnRvIGEgYm9vbGVhbiB2YWx1ZS5cbmZ1bmN0aW9uIFBBUlNFQk9PTCh2YWwpIHtcblxuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB2YWw7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsICE9PSAwO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIHVwID0gdmFsLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKHVwID09PSAnVFJVRScgfHwgdXAgPT09ICdGQUxTRScpIHtcbiAgICAgIHJldHVybiB1cCA9PT0gJ1RSVUUnO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlcnJvciQyLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBEQVlTMzYwKHN0YXJ0X2RhdGUsIGVuZF9kYXRlLCBtZXRob2QpIHtcbiAgbWV0aG9kID0gUEFSU0VCT09MKG1ldGhvZCk7XG4gIHN0YXJ0X2RhdGUgPSBQQVJTRURBVEUoc3RhcnRfZGF0ZSk7XG4gIGVuZF9kYXRlID0gUEFSU0VEQVRFKGVuZF9kYXRlKTtcblxuICBpZiAoc3RhcnRfZGF0ZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgcmV0dXJuIHN0YXJ0X2RhdGU7XG4gIH1cbiAgaWYgKGVuZF9kYXRlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gZW5kX2RhdGU7XG4gIH1cbiAgaWYgKG1ldGhvZCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgcmV0dXJuIG1ldGhvZDtcbiAgfVxuICB2YXIgc20gPSBzdGFydF9kYXRlLmdldE1vbnRoKCk7XG4gIHZhciBlbSA9IGVuZF9kYXRlLmdldE1vbnRoKCk7XG4gIHZhciBzZCwgZWQ7XG4gIGlmIChtZXRob2QpIHtcbiAgICBzZCA9IHN0YXJ0X2RhdGUuZ2V0RGF0ZSgpID09PSAzMSA/IDMwIDogc3RhcnRfZGF0ZS5nZXREYXRlKCk7XG4gICAgZWQgPSBlbmRfZGF0ZS5nZXREYXRlKCkgPT09IDMxID8gMzAgOiBlbmRfZGF0ZS5nZXREYXRlKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNtZCA9IG5ldyBEYXRlKHN0YXJ0X2RhdGUuZ2V0RnVsbFllYXIoKSwgc20gKyAxLCAwKS5nZXREYXRlKCk7XG4gICAgdmFyIGVtZCA9IG5ldyBEYXRlKGVuZF9kYXRlLmdldEZ1bGxZZWFyKCksIGVtICsgMSwgMCkuZ2V0RGF0ZSgpO1xuICAgIHNkID0gc3RhcnRfZGF0ZS5nZXREYXRlKCkgPT09IHNtZCA/IDMwIDogc3RhcnRfZGF0ZS5nZXREYXRlKCk7XG4gICAgaWYgKGVuZF9kYXRlLmdldERhdGUoKSA9PT0gZW1kKSB7XG4gICAgICBpZiAoc2QgPCAzMCkge1xuICAgICAgICBlbSsrO1xuICAgICAgICBlZCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlZCA9IDMwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlZCA9IGVuZF9kYXRlLmdldERhdGUoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIDM2MCAqIChlbmRfZGF0ZS5nZXRGdWxsWWVhcigpIC0gc3RhcnRfZGF0ZS5nZXRGdWxsWWVhcigpKSArIDMwICogKGVtIC0gc20pICsgKGVkIC0gc2QpO1xufVxuXG4vLyBDb3B5cmlnaHQgMjAxNSBQZXRlciBXIE1vcmVzaVxuXG4vLyBSRVBUIGNyZWF0ZXMgc3RyaW5nIGJ5IHJlcGVhdGluZyB0ZXh0IGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzLlxuZnVuY3Rpb24gUkVQVCh0ZXh0LCBudW1iZXIpIHtcbiAgdmFyIHIgPSAnJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXI7IGkrKykge1xuICAgIHIgKz0gdGV4dDtcbiAgfVxuICByZXR1cm4gcjtcbn1cblxuLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3N1dG9pa3UvZm9ybXVsYS5qcy9ibG9iL21hc3QuLi9zcmMvZW5naW5lZXJpbmcuanNcbmZ1bmN0aW9uIERFQzJCSU4oaW5wdXQsIHBsYWNlcykge1xuXG4gIC8vIGV4aXQgaWYgaW5wdXQgaXMgYW4gZXJyb3JcbiAgaWYgKGlucHV0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gbnVtYmVyO1xuICB9XG5cbiAgLy8gY2FzdCBpbnB1dCB0byBudW1iZXJcbiAgdmFyIG51bWJlciA9IHBhcnNlSW50KGlucHV0KTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKG51bWJlcikpIHtcbiAgICByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbiAgfVxuXG4gIC8vIFJldHVybiBlcnJvci5pZiBudW1iZXIgaXMgbm90IGRlY2ltYWwsIGlzIGxvd2VyIHRoYW4gLTUxMiwgb3IgaXMgZ3JlYXRlciB0aGFuIDUxMVxuICBpZiAoIS9eLT9bMC05XXsxLDN9JC8udGVzdChudW1iZXIpIHx8IG51bWJlciA8IC01MTIgfHwgbnVtYmVyID4gNTExKSB7XG4gICAgcmV0dXJuIGVycm9yJDIubnVtO1xuICB9XG5cbiAgLy8gSWdub3JlIHBsYWNlcyBhbmQgcmV0dXJuIGEgMTAtY2hhcmFjdGVyIGJpbmFyeSBudW1iZXIgaWYgbnVtYmVyIGlzIG5lZ2F0aXZlXG4gIGlmIChudW1iZXIgPCAwKSB7XG4gICAgcmV0dXJuICcxJyArIFJFUFQoJzAnLCA5IC0gKDUxMiArIG51bWJlcikudG9TdHJpbmcoMikubGVuZ3RoKSArICg1MTIgKyBudW1iZXIpLnRvU3RyaW5nKDIpO1xuICB9XG5cbiAgLy8gQ29udmVydCBkZWNpbWFsIG51bWJlciB0byBiaW5hcnlcbiAgdmFyIHJlc3VsdCA9IHBhcnNlSW50KG51bWJlciwgMTApLnRvU3RyaW5nKDIpO1xuXG4gIC8vIFJldHVybiBiaW5hcnkgbnVtYmVyIHVzaW5nIHRoZSBtaW5pbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIG5lY2Vzc2FyeSBpZiBwbGFjZXMgaXMgdW5kZWZpbmVkXG4gIGlmICh0eXBlb2YgcGxhY2VzID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gUmV0dXJuIGVycm9yLmlmIHBsYWNlcyBpcyBub25udW1lcmljXG4gICAgaWYgKGlzTmFOKHBsYWNlcykpIHtcbiAgICAgIHJldHVybiBlcnJvciQyLnZhbHVlO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBlcnJvci5pZiBwbGFjZXMgaXMgbmVnYXRpdmVcbiAgICBpZiAocGxhY2VzIDwgMCkge1xuICAgICAgcmV0dXJuIGVycm9yJDIubnVtO1xuICAgIH1cblxuICAgIC8vIFRydW5jYXRlIHBsYWNlcyBpbiBjYXNlIGl0IGlzIG5vdCBhbiBpbnRlZ2VyXG4gICAgcGxhY2VzID0gTWF0aC5mbG9vcihwbGFjZXMpO1xuXG4gICAgLy8gUGFkIHJldHVybiB2YWx1ZSB3aXRoIGxlYWRpbmcgMHMgKHplcm9zKSBpZiBuZWNlc3NhcnkgKHVzaW5nIFVuZGVyc2NvcmUuc3RyaW5nKVxuICAgIHJldHVybiBwbGFjZXMgPj0gcmVzdWx0Lmxlbmd0aCA/IFJFUFQoJzAnLCBwbGFjZXMgLSByZXN1bHQubGVuZ3RoKSArIHJlc3VsdCA6IGVycm9yJDIubnVtO1xuICB9XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbmZ1bmN0aW9uIERJRkYoYSwgYikge1xuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhhKSxcbiAgICAgIGtleXNCID0gT2JqZWN0LmtleXMoYiksXG4gICAgICBJbkEgPSBrZXlzQi5maWx0ZXIoZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4ga2V5c0EuaW5kZXhPZihuKSA+IC0xO1xuICB9KSxcbiAgICAgIE5vdEluQSA9IGtleXNCLmZpbHRlcihmdW5jdGlvbiAobikge1xuICAgIHJldHVybiBrZXlzQS5pbmRleE9mKG4pID09PSAtMTtcbiAgfSksXG4gICAgICBOb3RJbkIgPSBrZXlzQS5maWx0ZXIoZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4ga2V5c0IuaW5kZXhPZihuKSA9PT0gLTE7XG4gIH0pLFxuICAgICAgRGlmZiA9IEluQS5maWx0ZXIoZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4gYVtuXSAhPT0gYltuXTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICB1bmlxdWVfbGVmdDogTm90SW5BLFxuICAgIHVuaXF1ZV9yaWdodDogTm90SW5CLFxuICAgIGRpZmY6IERpZmYucmVkdWNlKGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICB2YXIgZGlmZiA9IHt9O1xuICAgICAgZGlmZlt5XSA9IHsgbGVmdDogYVt5XSwgcmlnaHQ6IGJbeV0gfTtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB4LCBkaWZmKTtcbiAgICB9LCB7fSlcbiAgfTtcbn1cblxuLy8gRElWSURFIGNhbGN1bGF0ZXMgdGhlIHByb2R1Y3Qgb2YgdHdvIG51bWJlcnMuXG5mdW5jdGlvbiBESVZJREUoKSB7XG4gIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbjYpLCBfa2V5NiA9IDA7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICB2YWx1ZXNbX2tleTZdID0gYXJndW1lbnRzW19rZXk2XTtcbiAgfVxuXG4gIC8vIFJldHVybiBgI05BIWAgaWYgMiBhcmd1bWVudHMgYXJlIG5vdCBwcm92aWRlZC5cbiAgaWYgKHZhbHVlcy5sZW5ndGggIT09IDIpIHtcbiAgICByZXR1cm4gZXJyb3IkMi5uYTtcbiAgfVxuXG4gIC8vIGRlY29tcG9zZSB2YWx1ZXMgaW50byBhIGFuZCBiLlxuICB2YXIgYSA9IHZhbHVlc1swXTtcbiAgdmFyIGIgPSB2YWx1ZXNbMV07XG5cbiAgLy8gWW91IGNhbm5vdCBkaXZpZGUgYSBudW1iZXIgYnkgMC5cblxuICBpZiAoYiA9PT0gMCkge1xuICAgIHJldHVybiBlcnJvciQyLmRpdjA7XG4gIH1cblxuICAvLyBSZXR1cm4gYCNWQUxVRSFgIGlmIGVpdGhlciBhIG9yIGIgaXMgbm90IGEgbnVtYmVyLlxuICBpZiAoIUlTTlVNQkVSKGEpIHx8ICFJU05VTUJFUihiKSkge1xuICAgIHJldHVybiBlcnJvciQyLnZhbHVlO1xuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBwcm9kdWN0XG4gIHJldHVybiBhIC8gYjtcbn1cblxuLy8gRXhhY3QgY29tcGFyZXMgdHdvIHZhbHVlcyBhbmQgb25seSByZXR1cm5zIHRydWUgaWYgdGhleSBtZWV0IHN0cmljdCBlcXVpdmFsZW5jZS5cbnZhciBFWEFDVCA9IGZ1bmN0aW9uIEVYQUNUKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59O1xuXG4vLyBDb3B5cmlnaHQgMjAxNSBQZXRlciBXIE1vcmVzaVxuXG4vLyBGSUxURVIgbGltaXRzIGEgcmFuZ2UgYmFzZWQgb24gYXJyYXlzIG9mIGJvb2xlYW4gdmFsdWVzLlxuZnVuY3Rpb24gRklMVEVSKHJhbmdlKSB7XG4gIGZvciAodmFyIF9sZW43ID0gYXJndW1lbnRzLmxlbmd0aCwgZmlsdGVycyA9IEFycmF5KF9sZW43ID4gMSA/IF9sZW43IC0gMSA6IDApLCBfa2V5NyA9IDE7IF9rZXk3IDwgX2xlbjc7IF9rZXk3KyspIHtcbiAgICBmaWx0ZXJzW19rZXk3IC0gMV0gPSBhcmd1bWVudHNbX2tleTddO1xuICB9XG5cbiAgLy8gQSBmaWx0ZXIgaXMgYW4gYXJyYXkgb2YgdHJ1ZS9mYWxzZSB2YWx1ZXMuXG4gIC8vIFRoZSBmaWx0ZXIgbWF5IGJlIGZvciByb3dzIG9yIGZvciBjb2x1bW5zIGJ1dCBub3QgYm90aC5cbiAgLy8gQSBhcnJheSBmaWx0ZXIgbWF5IG9ubHkgZmlsdGVyIGEgcmFuZ2UgdGhhdCBjb3ZlcnMgYSBzaW5nbGUgcm93IG9yIGEgc2luZ2xlIGNvbHVtbi5cblxuICBmdW5jdGlvbiBtYWtlRmlsdGVyKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XG4gICAgICByZXR1cm4gZmlsdGVycy5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZVtpbmRleF07XG4gICAgICAgIH1cbiAgICAgIH0sIHRydWUpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gcmFuZ2UuZmlsdGVyKG1ha2VGaWx0ZXIoKSk7XG59XG5cbi8vIEZJTkQgc2VhcmNoZXMgZm9yIHRleHQgd2l0aGluIGEgc3RyaW5nXG5mdW5jdGlvbiBGSU5EKGZpbmRfdGV4dCkge1xuICB2YXIgd2l0aGluX3RleHQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyAnJyA6IGFyZ3VtZW50c1sxXTtcbiAgdmFyIHBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gMSA6IGFyZ3VtZW50c1syXTtcblxuXG4gIC8vIEZpbmQgdGhlIHBvc2l0aW9uIG9mIHRoZSB0ZXh0XG4gIHBvc2l0aW9uID0gd2l0aGluX3RleHQuaW5kZXhPZihmaW5kX3RleHQsIHBvc2l0aW9uIC0gMSk7XG5cbiAgLy8gSWYgZm91bmQgcmV0dXJuIHRoZSBwb3NpdGlvbiBhcyBiYXNlIDEuXG4gIHJldHVybiBwb3NpdGlvbiA9PT0gLTEgPyBlcnJvciQyLnZhbHVlIDogcG9zaXRpb24gKyAxO1xufVxuXG5mdW5jdGlvbiBHVChhLCBiKSB7XG4gIGlmIChJU1JFRihhKSAmJiBJU1JFRihiKSkge1xuICAgIHJldHVybiBlcnJvciQyLm5hO1xuICB9IGVsc2UgaWYgKElTQVJSQVkoYSkgJiYgSVNBUlJBWShiKSkge1xuICAgIHJldHVybiBlcnJvciQyLm5hO1xuICB9IGVsc2UgaWYgKElTUkVGKGEpIHx8IElTQVJSQVkoYSkpIHtcbiAgICByZXR1cm4gYS5tYXAoZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBkID4gYjtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChJU1JFRihiKSB8fCBJU0FSUkFZKGIpKSB7XG4gICAgcmV0dXJuIGIubWFwKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZCA+IGE7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGEgPiBiO1xuICB9XG59XG5cbmZ1bmN0aW9uIEdURShhLCBiKSB7XG4gIGlmIChJU1JFRihhKSAmJiBJU1JFRihiKSkge1xuICAgIHJldHVybiBlcnJvci5uYTtcbiAgfSBlbHNlIGlmIChJU0FSUkFZKGEpICYmIElTQVJSQVkoYikpIHtcbiAgICByZXR1cm4gZXJyb3IubmE7XG4gIH0gZWxzZSBpZiAoSVNSRUYoYSkgfHwgSVNBUlJBWShhKSkge1xuICAgIHJldHVybiBhLm1hcChmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGQgPj0gYjtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChJU1JFRihiKSB8fCBJU0FSUkFZKGIpKSB7XG4gICAgcmV0dXJuIGIubWFwKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZCA+PSBhO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhID49IGI7XG4gIH1cbn1cblxuLy8gQ29weXJpZ2h0IDIwMTUgUGV0ZXIgVyBNb3Jlc2lcblxuLy8gY3JlZGl0IHRvIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2NyZWF0ZS1ndWlkLXV1aWQtaW4tamF2YXNjcmlwdFxuLy8gcmZjNDEyMiB2ZXJzaW9uIDQgY29tcGxpYW50IHNvbHV0aW9uXG5cbi8vIEdlbmVyYXRlIGEgZ2xvYmFsbHkgdW5pcXVlIGlkZW50aWZpZXJcbmZ1bmN0aW9uIEdVSUQoKSB7XG4gIHZhciBndWlkID0gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xuICAgIHZhciByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMCxcbiAgICAgICAgdiA9IGMgPT0gJ3gnID8gciA6IHIgJiAweDMgfCAweDg7XG4gICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICB9KTtcbiAgcmV0dXJuIGd1aWQ7XG59O1xuXG4vLyBITE9PS1VQIHNlYXJjaGVzIGZvciBhIG5lZWRsZSBhY3Jvc3MgdGhlIHJvd3MuXG5mdW5jdGlvbiBITE9PS1VQKG5lZWRsZSwgdGFibGUpIHtcbiAgdmFyIGluZGV4ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gMSA6IGFyZ3VtZW50c1syXTtcbiAgdmFyIGV4YWN0bWF0Y2ggPSBhcmd1bWVudHNbM107XG5cbiAgaWYgKHR5cGVvZiBuZWVkbGUgPT09IFwidW5kZWZpbmVkXCIgfHwgSVNCTEFOSyhuZWVkbGUpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoaW5kZXggPiB0YWJsZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZXJyb3IkMi5yZWY7XG4gIH1cblxuICB2YXIgbmVlZGxlTG93ZXIgPSAobmVlZGxlICsgJycpLnRvTG93ZXJDYXNlKCksXG4gICAgICByb3cgPSB0YWJsZVswXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdy5sZW5ndGg7IGkrKykge1xuXG4gICAgaWYgKGV4YWN0bWF0Y2ggJiYgcm93W2ldID09PSBuZWVkbGUgfHwgcm93W2ldID09IG5lZWRsZSB8fCB0eXBlb2Ygcm93W2ldID09PSBcInN0cmluZ1wiICYmIHJvd1tpXS50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlTG93ZXIpICE9IC0xKSB7XG4gICAgICByZXR1cm4gdGFibGVbaW5kZXggLSAxXVtpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZXJyb3IkMi5uYTtcbn1cblxuLy8gSUYgcmV0dXJucyBzZWNvbmQgYXJndW1lbnQgaWYgdHJ1ZSwgb3RoZXIgaXQgcmV0dXJucyB0aGUgdGhpcmQgYXJndW1lbnQuXG5mdW5jdGlvbiBJRih2YWx1ZSwgdmFsdWVfaWZfdHJ1ZSwgdmFsdWVfaWZfZmFsc2UpIHtcbiAgcmV0dXJuIHZhbHVlIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnID8gdmFsdWVfaWZfdHJ1ZSA6IHZhbHVlX2lmX2ZhbHNlO1xufVxuXG4vLyBJRkJMQU5LIHJldHVybiB0aGUgYHZhbHVlYCBpZiBub24tYmxhbmssIG90aGVyd2lzZSBpdCByZXR1cm5zIGB2YWx1ZV9pZl9ibGFua2AuXG5mdW5jdGlvbiBJRkJMQU5LKHZhbHVlLCB2YWx1ZV9pZl9ibGFuaykge1xuICByZXR1cm4gSVNCTEFOSyh2YWx1ZSkgPyB2YWx1ZV9pZl9ibGFuayA6IHZhbHVlO1xufVxuXG4vLyBJU0VNUFRZIHJldHVybnMgdHJ1ZSB3aGVuIHRoZSB2YWx1ZSBpcyBibGFuaywgaXMgYW4gZW1wdHkgYXJyYXkgb3Igd2hlbiBpdFxuLy8gaXMgYW4gZW1wdHkgc3RyaW5nLlxuZnVuY3Rpb24gSVNFTVBUWSh2YWx1ZSkge1xuICByZXR1cm4gSVNCTEFOSyh2YWx1ZSkgfHwgSVNBUlJBWSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwIHx8IElTVEVYVCh2YWx1ZSkgJiYgdmFsdWUgPT09ICcnO1xufTtcblxuLy8gSUZCTEFOSyByZXR1cm4gdGhlIGB2YWx1ZWAgaWYgZW1wdHksIG90aGVyd2lzZSBpdCByZXR1cm5zIGB2YWx1ZV9pZl9lbXB0eWAuXG5mdW5jdGlvbiBJRkVNUFRZKHZhbHVlLCB2YWx1ZV9pZl9lbXB0eSkge1xuICByZXR1cm4gSVNFTVBUWSh2YWx1ZSkgPyB2YWx1ZV9pZl9lbXB0eSA6IHZhbHVlO1xufVxuXG4vLyBJRkJMQU5LIHJldHVybiB0aGUgYHZhbHVlYCBpZiBlcnJvciwgb3RoZXJ3aXNlIGl0IHJldHVybnMgYHZhbHVlX2lmX2Vycm9yYC5cbmZ1bmN0aW9uIElGRVJST1IodmFsdWUpIHtcbiAgdmFyIHZhbHVlX2lmX2Vycm9yID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1sxXTtcblxuICByZXR1cm4gSVNFUlJPUih2YWx1ZSkgPyB2YWx1ZV9pZl9lcnJvciA6IHZhbHVlO1xufVxuXG4vLyBJRkJMQU5LIHJldHVybiB0aGUgYHZhbHVlYCBpZiBgI05BIWAsIG90aGVyd2lzZSBpdCByZXR1cm5zIGB2YWx1ZV9pZl9uYWAuXG5mdW5jdGlvbiBJRk5BKHZhbHVlLCB2YWx1ZV9pZl9uYSkge1xuICByZXR1cm4gdmFsdWUgPT09IGVycm9yJDIubmEgPyB2YWx1ZV9pZl9uYSA6IHZhbHVlO1xufVxuXG4vLyBJTkRFWDJDT0wgY29tcHV0ZXMgdGhlIHJvdyBnaXZlbiBhIGNlbGwgaW5kZXhcbmZ1bmN0aW9uIElOREVYMlJPVyhpbmRleCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihpbmRleCAvIE1heENvbHMpO1xufVxuXG4vLyBJTkRFWDJDT0wgY29tcHV0ZXMgdGhlIGNvbHVtbiBnaXZlbiBhIGNlbGwgaW5kZXhcbmZ1bmN0aW9uIElOREVYMkNPTChpbmRleCkge1xuICByZXR1cm4gaW5kZXggLSBJTkRFWDJST1coaW5kZXgpICogTWF4Q29scztcbn1cblxuLy8gQ29weXJpZ2h0IDIwMTUgUGV0ZXIgVyBNb3Jlc2lcblxuLy8gSVNGVU5DVElPTiByZXR1cm5zIHRydWUgd2hlbiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24uXG5mdW5jdGlvbiBJU0ZVTkNUSU9OKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG4vLyBSRUYgYWNjZXB0cyB0b3AgYW5kIGJvdHRvbSBhbmQgcmV0dXJucyBhIHJlZmVyZW5jZSBvYmplY3QuIEl0IGVuY2Fwc3VsYXRlcyBhIGNlbGwgb3IgYSByYW5nZS5cbmZ1bmN0aW9uIFJFRih0b3AsIGJvdHRvbSkge1xuXG4gIC8vIFRoZSBpbmRleCBtdXN0IGJlIGEgbnVtYmVyXG4gIGlmICghSVNOVU1CRVIodG9wKSAmJiAhSVNGVU5DVElPTih0b3ApKSB7XG4gICAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gIH1cblxuICBpZiAoSVNCTEFOSyhib3R0b20pKSB7XG4gICAgYm90dG9tID0gdG9wO1xuICB9XG5cbiAgdmFyIGdldFRvcCA9IGZ1bmN0aW9uIGdldFRvcCgpIHtcbiAgICByZXR1cm4gSVNGVU5DVElPTih0b3ApID8gdG9wKCkgOiB0b3A7XG4gIH07XG4gIHZhciBnZXRCb3R0b20gPSBmdW5jdGlvbiBnZXRCb3R0b20oKSB7XG4gICAgcmV0dXJuIElTRlVOQ1RJT04oYm90dG9tKSA/IGJvdHRvbSgpIDogYm90dG9tO1xuICB9O1xuXG4gIHJldHVybiB7XG5cbiAgICBnZXQgaXNSZWYoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgZ2V0IHRvcCgpIHtcbiAgICAgIHJldHVybiBnZXRUb3AoKTtcbiAgICB9LFxuXG4gICAgZ2V0IGJvdHRvbSgpIHtcbiAgICAgIHJldHVybiBnZXRCb3R0b20oKTtcbiAgICB9LFxuXG4gICAgLy8gUmV0dXJucyByb3cgKHJvd0luZGV4IHBsdXMgMSlcbiAgICBnZXQgcm93KCkge1xuICAgICAgcmV0dXJuIElOREVYMlJPVyhnZXRUb3AoKSkgKyAxO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm5zIHJvd0luZGV4IChiYXNlIDApXG4gICAgZ2V0IHJvd0luZGV4KCkge1xuICAgICAgcmV0dXJuIElOREVYMlJPVyhnZXRUb3AoKSk7XG4gICAgfSxcblxuICAgIC8vIFJldHVybnMgY29sdW1uIGxldHRlclxuICAgIGdldCBjb2x1bW4oKSB7XG4gICAgICByZXR1cm4gQ09MVU1OTEVUVEVSKElOREVYMkNPTChnZXRUb3AoKSkpO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm5zIGNvbHVtbiBpbmRleFxuICAgIGdldCBjb2x1bW5JbmRleCgpIHtcbiAgICAgIHJldHVybiBJTkRFWDJDT0woZ2V0VG9wKCkpO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm5zIHJvdyAocm93SW5kZXggcGx1cyAxKVxuICAgIGdldCBib3R0b21Sb3coKSB7XG4gICAgICByZXR1cm4gSU5ERVgyUk9XKGdldEJvdHRvbSgpKSArIDE7XG4gICAgfSxcblxuICAgIC8vIFJldHVybnMgcm93SW5kZXggKGJhc2UgMClcbiAgICBnZXQgYm90dG9tUm93SW5kZXgoKSB7XG4gICAgICByZXR1cm4gSU5ERVgyUk9XKGdldEJvdHRvbSgpKTtcbiAgICB9LFxuXG4gICAgLy8gUmV0dXJucyBjb2x1bW4gbGV0dGVyXG4gICAgZ2V0IGJvdHRvbUNvbHVtbigpIHtcbiAgICAgIHJldHVybiBDT0xVTU5MRVRURVIoSU5ERVgyQ09MKGdldEJvdHRvbSgpKSk7XG4gICAgfSxcblxuICAgIC8vIFJldHVybnMgY29sdW1uIGluZGV4XG4gICAgZ2V0IGJvdHRvbUNvbHVtbkluZGV4KCkge1xuICAgICAgcmV0dXJuIElOREVYMkNPTChnZXRCb3R0b20oKSk7XG4gICAgfSxcblxuICAgIC8vIFRoZSBjZWxsIGlkIHB1dHMgdGhlIHdob2xlIHRhYmxlIGludG8gYSBzaW5nbGUgZGltZW5zaW9uLiBJdCBzaW1wbHkgbmVlZHMgdG8gYmUgYmV0d2VlbiB0aGUgdG9wTGVmdCBhbmQgdGhlIGJvdHRvbVJpZ2h0IHRvIHF1YWxpZnkuXG4gICAgaGl0OiBmdW5jdGlvbiBoaXQoaW5kZXgpIHtcblxuICAgICAgLy8gUmV0dXJuIGAjTkEhYCB3aGVuIGluZGV4IGlzIG5lZ2F0aXZlLlxuICAgICAgaWYgKGluZGV4IDwgMCkgcmV0dXJuIGVycm9yJDIubmE7XG5cbiAgICAgIC8vIENoZWNrIGlmIHZhbHVlIGlzIGluc2lkZSByYW5nZSBmcm9tIHRvcCB0byBib3R0b20sIGluY2x1c2l2ZS5cbiAgICAgIHJldHVybiBpbmRleCA+PSBnZXRUb3AoKSAmJiBpbmRleCA8PSBnZXRCb3R0b20oKTtcbiAgICB9LFxuXG5cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiAxICsgKGdldEJvdHRvbSgpIC0gZ2V0VG9wKCkpO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm4gYXJyYXkgd2l0aCBldmVyeSBjZWxsIGluZGV4XG4gICAgZ2V0IGNlbGxzKCkge1xuICAgICAgcmV0dXJuIEFycmF5LmFwcGx5KGdldFRvcCgpLCBBcnJheSgxICsgKGdldEJvdHRvbSgpIC0gZ2V0VG9wKCkpKSkubWFwKGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiB5ICsgZ2V0VG9wKCk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gUmV0dXJuIGFycmF5IHdpdGggZXZlcnkgcm93XG4gICAgZ2V0IHJvd3MoKSB7XG4gICAgICByZXR1cm4gVU5JUVVFKEFycmF5LmFwcGx5KGdldFRvcCgpLCBBcnJheSgxICsgKGdldEJvdHRvbSgpIC0gZ2V0VG9wKCkpKSkubWFwKGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiBJTkRFWDJST1coeSArIGdldFRvcCgpKTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgfTtcbn1cblxuLy8gUmV0dXJucyBhIGNlbGwgaW5kaXJlY3Rpb25cbmZ1bmN0aW9uIElORElSRUNUKHJlZikge1xuICByZXR1cm4gUkVGKHJlZik7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIElTRU1BSUwgcmV0dXJucyB0cnVlIHdoZW4gdGhlIGB2YWx1ZWAgbWF0Y2hlcyB0aGUgcmVnZXguXG5mdW5jdGlvbiBJU0VNQUlMKHZhbHVlKSB7XG4gIC8vIGNyZWRpdCB0byBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ2MTU1L3ZhbGlkYXRlLWVtYWlsLWFkZHJlc3MtaW4tamF2YXNjcmlwdFxuICB2YXIgcmUgPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuICByZXR1cm4gcmUudGVzdCh2YWx1ZSk7XG59O1xuXG4vLyBDb3B5cmlnaHQgMjAxNSBQZXRlciBXIE1vcmVzaVxuXG4vLyBJU0VWRU4gcmV0dXJucyB0cnVlIHdoZW4gdGhlIHZhbHVlIGlzIGV2ZW4uXG5mdW5jdGlvbiBJU0VWRU4odmFsdWUpIHtcbiAgcmV0dXJuICEoTWF0aC5mbG9vcihNYXRoLmFicyh2YWx1ZSkpICYgMSk7XG59XG5cbi8vIElTTkEgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHZhbHVlIGlzIGAjTkEhYFxuZnVuY3Rpb24gSVNOQSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IGVycm9yJDIubmE7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIElTT0REIHJldHVybnMgdHJ1ZSB3aGVuIHRoZSB2YWx1ZSBpcyBvZGQuXG5mdW5jdGlvbiBJU09ERCh2YWx1ZSkge1xuICByZXR1cm4gISEoTWF0aC5mbG9vcihNYXRoLmFicyh2YWx1ZSkpICYgMSk7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIElTVVJMIHJldHVybnMgdHJ1ZSB3aGVuIHRoZSB2YWx1ZSBtYXRjaGVzIHRoZSByZWdleCBmb3IgYSB1bmlmb3JtIHJlc291cmNlIGxvY2F0b3IuXG5mdW5jdGlvbiBJU1VSTChzdHIpIHtcbiAgLy8gY3JlZGl0OiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU3MTcwOTMvY2hlY2staWYtYS1qYXZhc2NyaXB0LXN0cmluZy1pcy1hbi11cmxcbiAgdmFyIHBhdHRlcm4gPSBuZXcgUmVnRXhwKCdeKGh0dHBzPzpcXFxcL1xcXFwvKT8nICsgLy8gcHJvdG9jb2xcbiAgJygoKFthLXpcXFxcZF0oW2EtelxcXFxkLV0qW2EtelxcXFxkXSkqKVxcXFwuPykrW2Etel17Mix9fCcgKyAvLyBkb21haW4gbmFtZVxuICAnKChcXFxcZHsxLDN9XFxcXC4pezN9XFxcXGR7MSwzfSkpJyArIC8vIE9SIGlwICh2NCkgYWRkcmVzc1xuICAnKFxcXFw6XFxcXGQrKT8oXFxcXC9bLWEtelxcXFxkJV8ufitdKikqJyArIC8vIHBvcnQgYW5kIHBhdGhcbiAgJyhcXFxcP1s7JmEtelxcXFxkJV8ufis9LV0qKT8nICsgLy8gcXVlcnkgc3RyaW5nXG4gICcoXFxcXCNbLWEtelxcXFxkX10qKT8kJywgJ2knKTsgLy8gZnJhZ21lbnQgbG9jYXRvclxuICByZXR1cm4gcGF0dGVybi50ZXN0KHN0cik7XG59XG5cbi8vIExFTiByZXR1cm5zIHRoZSBzaXplIG9mIGEgc3RyaW5nIG9yIGFycmF5LlxuZnVuY3Rpb24gTEVOKHRleHQpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZXJyb3IkMi5lcnJvcjtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdGV4dC5sZW5ndGg7XG4gIH1cblxuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gdGV4dC5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbn07XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIExPT0tVUCBmaW5kIGEgdmFsdWUgaW4gYW4gYXJyYXkuXG5mdW5jdGlvbiBMT09LVVAoKSB7XG4gIHZhciBsb29rdXBfdmFsdWUsIGxvb2t1cF9hcnJheSwgbG9va3VwX3ZlY3RvciwgcmVzdWx0c192ZWN0b3I7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgLy8gYXJyYXkgZm9ybVxuICAgIHZhciB3aWRlID0gZmFsc2U7XG5cbiAgICBsb29rdXBfdmFsdWUgPSBhcmd1bWVudHNbMF0udmFsdWVPZigpO1xuICAgIGxvb2t1cF9hcnJheSA9IGFyZ3VtZW50c1sxXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9va3VwX2FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodHlwZW9mIGxvb2t1cF9hcnJheVtpXSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9va3VwX3ZhbHVlID09PSBsb29rdXBfYXJyYXlbaV0udmFsdWVPZigpKSB7XG4gICAgICAgIHJldHVybiBsb29rdXBfYXJyYXlbaV07XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAvLyB2ZWN0b3IgZm9ybWBcbiAgICBsb29rdXBfdmFsdWUgPSBhcmd1bWVudHNbMF0udmFsdWVPZigpO1xuICAgIGxvb2t1cF92ZWN0b3IgPSBhcmd1bWVudHNbMV07XG4gICAgcmVzdWx0c192ZWN0b3IgPSBhcmd1bWVudHNbMl07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvb2t1cF92ZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0eXBlb2YgbG9va3VwX3ZlY3RvcltpXSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9va3VwX3ZhbHVlID09PSBsb29rdXBfdmVjdG9yW2ldLnZhbHVlT2YoKSkge1xuICAgICAgICByZXR1cm4gcmVzdWx0c192ZWN0b3JbaV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVycm9yLm5hO1xufVxuXG4vLyBMT1dFUiBjb252ZXJ0cyBgdmFsdWVgIHRvIGxvd2VyIGNhc2VcbmZ1bmN0aW9uIExPV0VSKHZhbHVlKSB7XG4gIGlmICghSVNURVhUKHZhbHVlKSkgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gIHJldHVybiB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xufVxuXG4vLyBMVCBjb21wYXJlcyB0d28gdmFsdWVzIGFuZCByZXR1cm5zIHRydWUgd2hlbiBhIGlzIGxlc3MgdGhhbiBiLlxuZnVuY3Rpb24gTFQoYSwgYikge1xuICBpZiAoSVNSRUYoYSkgJiYgSVNSRUYoYikpIHtcbiAgICByZXR1cm4gZXJyb3IubmE7XG4gIH0gZWxzZSBpZiAoSVNBUlJBWShhKSAmJiBJU0FSUkFZKGIpKSB7XG4gICAgcmV0dXJuIGVycm9yLm5hO1xuICB9IGVsc2UgaWYgKElTUkVGKGEpIHx8IElTQVJSQVkoYSkpIHtcbiAgICByZXR1cm4gYS5tYXAoZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBkIDwgYjtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChJU1JFRihiKSB8fCBJU0FSUkFZKGIpKSB7XG4gICAgcmV0dXJuIGIubWFwKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZCA8IGE7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGEgPCBiO1xuICB9XG59XG5cbi8vIExUIGNvbXBhcmVzIHR3byB2YWx1ZXMgYW5kIHJldHVybnMgdHJ1ZSB3aGVuIGEgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGIuXG5mdW5jdGlvbiBMVEUoYSwgYikge1xuICBpZiAoSVNSRUYoYSkgJiYgSVNSRUYoYikpIHtcbiAgICByZXR1cm4gZXJyb3IubmE7XG4gIH0gZWxzZSBpZiAoSVNBUlJBWShhKSAmJiBJU0FSUkFZKGIpKSB7XG4gICAgcmV0dXJuIGVycm9yLm5hO1xuICB9IGVsc2UgaWYgKElTUkVGKGEpIHx8IElTQVJSQVkoYSkpIHtcbiAgICByZXR1cm4gYS5tYXAoZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBkIDw9IGI7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoSVNSRUYoYikgfHwgSVNBUlJBWShiKSkge1xuICAgIHJldHVybiBiLm1hcChmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGQgPD0gYTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYSA8PSBiO1xuICB9XG59XG5cbi8vIE1JTiByZXR1cm5zIHRoZSBzbWFsbGVzdCBudW1iZXIgZnJvbSBhIGBsaXN0YC5cbmZ1bmN0aW9uIE1JTigpIHtcbiAgZm9yICh2YXIgX2xlbjggPSBhcmd1bWVudHMubGVuZ3RoLCBsaXN0ID0gQXJyYXkoX2xlbjgpLCBfa2V5OCA9IDA7IF9rZXk4IDwgX2xlbjg7IF9rZXk4KyspIHtcbiAgICBsaXN0W19rZXk4XSA9IGFyZ3VtZW50c1tfa2V5OF07XG4gIH1cblxuICByZXR1cm4gRkxBVFRFTihsaXN0KS5yZWR1Y2UoZnVuY3Rpb24gKG1pbiwgbmV4dCkge1xuICAgIGlmIChJU05VTUJFUihuZXh0KSkge1xuICAgICAgcmV0dXJuIE1hdGgubWluKG1pbiwgbmV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1pbjtcbiAgfSwgTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKTtcbn1cblxuLy8gTUFYIHJldHVybnMgdGhlIGxhcmdlc3QgbnVtYmVyIGZyb20gYSBgbGlzdGAuXG5mdW5jdGlvbiBNQVgoKSB7XG4gIGZvciAodmFyIF9sZW45ID0gYXJndW1lbnRzLmxlbmd0aCwgbGlzdCA9IEFycmF5KF9sZW45KSwgX2tleTkgPSAwOyBfa2V5OSA8IF9sZW45OyBfa2V5OSsrKSB7XG4gICAgbGlzdFtfa2V5OV0gPSBhcmd1bWVudHNbX2tleTldO1xuICB9XG5cbiAgcmV0dXJuIEZMQVRURU4obGlzdCkucmVkdWNlKGZ1bmN0aW9uIChtYXgsIG5leHQpIHtcbiAgICBpZiAoSVNOVU1CRVIobmV4dCkpIHtcbiAgICAgIHJldHVybiBNYXRoLm1heChtYXgsIG5leHQpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXg7XG4gIH0sIE51bWJlci5ORUdBVElWRV9JTkZJTklUWSk7XG59XG5cbi8vIE1VTFRJUExZIGNhbGN1bGF0ZXMgdGhlIHByb2R1Y3Qgb2YgdHdvIG51bWJlcnMuXG5mdW5jdGlvbiBNVUxUSVBMWSgpIHtcbiAgZm9yICh2YXIgX2xlbjEwID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbjEwKSwgX2tleTEwID0gMDsgX2tleTEwIDwgX2xlbjEwOyBfa2V5MTArKykge1xuICAgIHZhbHVlc1tfa2V5MTBdID0gYXJndW1lbnRzW19rZXkxMF07XG4gIH1cblxuICAvLyBSZXR1cm4gYCNOQSFgIGlmIDIgYXJndW1lbnRzIGFyZSBub3QgcHJvdmlkZWQuXG4gIGlmICh2YWx1ZXMubGVuZ3RoICE9PSAyKSB7XG4gICAgcmV0dXJuIGVycm9yJDIubmE7XG4gIH1cblxuICAvLyBkZWNvbXBvc2UgdmFsdWVzIGludG8gYSBhbmQgYi5cbiAgdmFyIGEgPSB2YWx1ZXNbMF07XG4gIHZhciBiID0gdmFsdWVzWzFdO1xuXG4gIC8vIFJldHVybiBgI1ZBTFVFIWAgaWYgZWl0aGVyIGEgb3IgYiBpcyBub3QgYSBudW1iZXIuXG5cbiAgaWYgKCFJU05VTUJFUihhKSB8fCAhSVNOVU1CRVIoYikpIHtcbiAgICByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgcHJvZHVjdFxuICByZXR1cm4gYSAqIGI7XG59XG5cbi8vIE4gY29udmVydHMgYSBgdmFsdWVgIHRvIGEgbnVtYmVyLiBJdCBzdXBwb3J0cyBudW1iZXJzLCB0cnVlLCBmYWxzZSBhbmQgZGF0ZXMuXG5mdW5jdGlvbiBOKHZhbHVlKSB7XG5cbiAgLy8gUGFzcyBudW1iZXJzIGFuZCBlcnJvcnMgYmFjayBvdXQuXG4gIGlmIChJU05VTUJFUih2YWx1ZSkgfHwgSVNFUlJPUih2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvLyBDb252ZXJ0IGRhdGVzIHRvIHNlcmlhbCBudW1iZXIuXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gU0VSSUFMKHZhbHVlKTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdHJ1ZSB0byAxXG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgLy8gQ29udmVydCBmYWxzZSB0byAwXG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8vIFJldHVybiAwIGluIGFsbCBvdGhlciBjYXNlcy5cbiAgcmV0dXJuIDA7XG59XG5cbi8vIENvbnZlcnQgYSB0ZXh0IHZhbHVlIGludG8gYSBudW1iZXIgdmFsdWUuXG5mdW5jdGlvbiBOVU1CRVJWQUxVRSh0ZXh0LCBkZWNpbWFsX3NlcGFyYXRvciwgZ3JvdXBfc2VwYXJhdG9yKSB7XG4gIGRlY2ltYWxfc2VwYXJhdG9yID0gZGVjaW1hbF9zZXBhcmF0b3IgfHwgJy4nO1xuICBncm91cF9zZXBhcmF0b3IgPSBncm91cF9zZXBhcmF0b3IgfHwgJywnO1xuXG4gIC8vIFJldHVybiBgI1ZBTFVFIWAgd2hlbiB0ZXh0IGlzIGVtcHR5XG4gIGlmIChJU0VNUFRZKHRleHQpKSB7XG4gICAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHZhbHVlIHdoZW4gaXQgaXMgYWxyZWFkeSBhIG51bWJlci5cbiAgaWYgKElTTlVNQkVSKHRleHQpKSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICB2YXIgZm91bmREZWNpbWFsID0gZmFsc2UsXG4gICAgICBsZW4gPSB0ZXh0Lmxlbmd0aCAtIDE7XG5cbiAgcmV0dXJuIHRleHQuc3BsaXQoJycpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBpdGVtLCBpbmRleCkge1xuICAgIGlmIChhY2MgPT09IGVycm9yJDIudmFsdWUpIHtcbiAgICAgIHJldHVybiBlcnJvciQyLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAobGVuID09PSBpbmRleCkge1xuICAgICAgaWYgKGl0ZW0gPT09ICclJykge1xuICAgICAgICByZXR1cm4gK2FjYyAvIDEwMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiArYWNjLmNvbmNhdChpdGVtKTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0gPT09IGRlY2ltYWxfc2VwYXJhdG9yKSB7XG4gICAgICBpZiAoZm91bmREZWNpbWFsKSByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbiAgICAgIGZvdW5kRGVjaW1hbCA9IHRydWU7XG4gICAgICByZXR1cm4gYWNjLmNvbmNhdCgnLicpO1xuICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gZ3JvdXBfc2VwYXJhdG9yKSB7XG4gICAgICByZXR1cm4gYWNjO1xuICAgICAgLy8gY2hlY2sgaWYgYmV0d2VlbiAwIGFuZCA5IGFzY2lpIGNvZGVzXG4gICAgfSBlbHNlIGlmIChpdGVtLmNoYXJDb2RlQXQoMCkgPCA0OCB8fCBpdGVtLmNoYXJDb2RlQXQoMCkgPiA1Nykge1xuICAgICAgICByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbiAgICAgIH1cblxuICAgIHJldHVybiBhY2MuY29uY2F0KGl0ZW0pO1xuICB9KTtcbn07XG5cbi8vIE5FIHJldHVybnMgdHJ1ZSB3aGVuIGEgaXMgbm90IGVxdWFsIHRvIGIuXG5mdW5jdGlvbiBORShhLCBiKSB7XG4gIHJldHVybiAhRVEoYSwgYik7XG59XG5cbi8vIE5PVCBuZWdhdGVzIGEgYHZhbHVlYFxuZnVuY3Rpb24gTk9UKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdHJ1ZSAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgdmFsdWUgIT09IDEgJiYgdmFsdWUgIT09IDAgPyBlcnJvciQyLnZhbHVlIDogIXZhbHVlO1xufVxuXG4vLyBPQ1QyREVDIGNvbnZlcnRzIGEgb2N0YWwgdmFsdWUgaW50byBhIGRlY2ltYWwgdmFsdWUuXG5mdW5jdGlvbiBPQ1QyREVDKG9jdGFsTnVtYmVyKSB7XG4gIC8vIENyZWRpdHM6IEJhc2VkIG9uIGltcGxlbWVudGF0aW9uIGZvdW5kIGluIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2doYWxpbWkvNDUyNTg3NiNmaWxlLW9jdDJkZWMtanNcbiAgLy8gUmV0dXJuIGVycm9yLndoZW4gbnVtYmVyIHBhc3NlZCBpbiBpcyBub3Qgb2N0YWwgb3IgaGFzIG1vcmUgdGhhbiAxMCBkaWdpdHNcbiAgaWYgKCEvXlswLTddezEsMTB9JC8udGVzdChvY3RhbE51bWJlcikpIHJldHVybiBlcnJvciQyLm51bTtcblxuICAvLyBDb252ZXJ0IG9jdGFsIG51bWJlciB0byBkZWNpbWFsIG51bWJlclxuICB2YXIgbm9uTmVnYXRpdmVEZWNpbWFsTnVtYmVyID0gcGFyc2VJbnQob2N0YWxOdW1iZXIsIDgpO1xuXG4gIC8vIFJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgZGVjaW1hbCBudW1iZXJcbiAgLy8gVHdvJ3MgQ29tcGxlbWVudCBEZWNpbWFsIFJhbmdlOiAtKDJeTi0xKSB0byAoMl5OLTEgLSAxKSB3aGVyZSBOPTMwIChOID0gbnVtYmVyIG9mIGJpdHMpIGFuZCBeIG1lYW5zIHJhaXNlZCB0byB0aGUgcG93ZXIgb2ZcbiAgLy8gMl5OLTEgPSAyXigzMCAtIDEpID0gMl4yOSA9IDUzNjg3MDkxMlxuICAvLyAyXk4tMSAtIDEgPSA1MzY4NzA5MTIgLSAxID0gNTM2ODcwOTExXG4gIC8vIDJeTiA9IDJeMzAgPSAxMDczNzQxODI0XG4gIC8vIFR3bydzIENvbXBsZW1lbnQgRGVjaW1hbCBSYW5nZTogWy01MzY4NzA5MTIsNTM2ODcwOTExXVxuICAvLyBMYXJnZXN0IG9jdGFsIG51bWJlciBhbGxvd2VkOiA3Nzc3Nzc3Nzc3IHdoaWNoIGluIGRlY2ltYWwgaXMgMTA3Mzc0MTgyMyA9IDJeTiAtIDFcbiAgLy8gQ2FzZSAxOiBOZWdhdGl2ZSBSYW5nZVxuICAvLyAgaWYgbm9uTmVnYXRpdmVEZWNpbWFsTnVtYmVyID49IDJeTi0xLCB0aGVuIHJldHVybiAobm9uTmVnYXRpdmVOdW1iZXIgLSAyXk4pXG4gIC8vICBTbWFsbGVzdCBOdW1iZXI6IDJeTi0xIC0gMl5OID0gMl5OLTEgLSAyKjJeTi0xID0gMl5OLTEgKiAoMSAtIDIpID0gMl5OLTEgKiAoLTEpID0gLTJeTi0xXG4gIC8vICBMYXJnZXN0IE51bWJlcjogKDJeTiAtIDEpIC0gKDJeTikgPSAoMl5OIC0gMl5OKSAtIDEgPSAtMVxuICAvLyAgUmFuZ2U6IFstMl5OLTEsIC0xXSA9IFstNTM2ODcwOTEyLCAtMV1cbiAgLy9cbiAgLy8gU21hbGxlc3Qgb2N0YWwgbnVtYmVyIGFsbG93ZWQ6IDAgd2hpY2ggaW4gZGVjaW1hbCBpcyAwXG4gIC8vIENhc2UgMjogTm9uLU5lZ2F0aXZlIFJhbmdlXG4gIC8vICAgUmFuZ2U6IFswLCAyXk4tMSAtIDFdID0gWzAsIDUzNjg3MDkxMV1cblxuICByZXR1cm4gbm9uTmVnYXRpdmVEZWNpbWFsTnVtYmVyID49IDUzNjg3MDkxMiA/IG5vbk5lZ2F0aXZlRGVjaW1hbE51bWJlciAtIDEwNzM3NDE4MjQgOiBub25OZWdhdGl2ZURlY2ltYWxOdW1iZXI7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIE9SIHJldHVybnMgdHJ1ZSB3aGVuIGFueSBvZiB0aGUgY3JpdGVyIGlzIHRydWUgb3IgMS5cbmZ1bmN0aW9uIE9SKCkge1xuICBmb3IgKHZhciBfbGVuMTEgPSBhcmd1bWVudHMubGVuZ3RoLCBjcml0ZXJpYSA9IEFycmF5KF9sZW4xMSksIF9rZXkxMSA9IDA7IF9rZXkxMSA8IF9sZW4xMTsgX2tleTExKyspIHtcbiAgICBjcml0ZXJpYVtfa2V5MTFdID0gYXJndW1lbnRzW19rZXkxMV07XG4gIH1cblxuICByZXR1cm4gY3JpdGVyaWEucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGl0ZW0pIHtcbiAgICBpZiAoYWNjID09PSB0cnVlKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gaXRlbSA9PT0gdHJ1ZSB8fCBpdGVtID09PSAxO1xuICB9LCBmYWxzZSk7XG59XG5cbi8vIFBJIHJldHVybnMgaGFsZiB0aGUgdW5pdmVyc2FsIGNpcmNsZSBjb25zdGFudFxuZnVuY3Rpb24gUEkoKSB7XG4gIHJldHVybiDPhCAvIDI7XG59XG5cbi8vIFBNVCByZXR1cm5zIGEgbG9hbiBwYXltZW50XG5mdW5jdGlvbiBQTVQocmF0ZSwgcGVyaW9kcywgcHJlc2VudCkge1xuICB2YXIgZnV0dXJlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAzIHx8IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkID8gMCA6IGFyZ3VtZW50c1szXTtcbiAgdmFyIHR5cGUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDQgfHwgYXJndW1lbnRzWzRdID09PSB1bmRlZmluZWQgPyAwIDogYXJndW1lbnRzWzRdO1xuXG5cbiAgaWYgKCFJU05VTUJFUihyYXRlKSB8fCAhSVNOVU1CRVIocGVyaW9kcykpIHtcbiAgICByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbiAgfVxuXG4gIGlmIChyYXRlID09PSAwKSB7XG4gICAgcmV0dXJuIC0oKHByZXNlbnQgKyBmdXR1cmUpIC8gcGVyaW9kcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRlcm0gPSBNYXRoLnBvdygxICsgcmF0ZSwgcGVyaW9kcyk7XG4gICAgaWYgKHR5cGUgPT09IDEpIHtcbiAgICAgIHJldHVybiAtKChmdXR1cmUgKiByYXRlIC8gKHRlcm0gLSAxKSArIHByZXNlbnQgKiByYXRlIC8gKDEgLSAxIC8gdGVybSkpIC8gKDEgKyByYXRlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAtKGZ1dHVyZSAqIHJhdGUgLyAodGVybSAtIDEpICsgcHJlc2VudCAqIHJhdGUgLyAoMSAtIDEgLyB0ZXJtKSk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBQT1dFUiBjb21wdXRlcyB0aGUgcG93ZXIgb2YgYSB2YWx1ZSBhbmQgbnRoIGRlZ3JlZS5cbmZ1bmN0aW9uIFBPV0VSKCkge1xuICBmb3IgKHZhciBfbGVuMTIgPSBhcmd1bWVudHMubGVuZ3RoLCB2YWx1ZXMgPSBBcnJheShfbGVuMTIpLCBfa2V5MTIgPSAwOyBfa2V5MTIgPCBfbGVuMTI7IF9rZXkxMisrKSB7XG4gICAgdmFsdWVzW19rZXkxMl0gPSBhcmd1bWVudHNbX2tleTEyXTtcbiAgfVxuXG4gIC8vIFJldHVybiBgI05BIWAgaWYgMiBhcmd1bWVudHMgYXJlIG5vdCBwcm92aWRlZC5cbiAgaWYgKHZhbHVlcy5sZW5ndGggIT09IDIpIHtcbiAgICByZXR1cm4gZXJyb3IkMi5uYTtcbiAgfVxuXG4gIC8vIGRlY29tcG9zZSB2YWx1ZXMgaW50byBhIGFuZCBiLlxuICB2YXIgdmFsID0gdmFsdWVzWzBdO1xuICB2YXIgbnRoID0gdmFsdWVzWzFdO1xuXG4gIC8vIFJldHVybiBgI1ZBTFVFIWAgaWYgZWl0aGVyIGEgb3IgYiBpcyBub3QgYSBudW1iZXIuXG5cbiAgaWYgKCFJU05VTUJFUih2YWwpIHx8ICFJU05VTUJFUihudGgpKSB7XG4gICAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gIH1cblxuICAvLyBDb21wdXRlIHRoZSBwb3dlciBvZiB2YWwgdG8gdGhlIG50aC5cbiAgcmV0dXJuIE1hdGgucG93KHZhbCwgbnRoKTtcbn1cblxuLy8gUkVQTEFDRSByZXR1cm5zIGEgbmV3IHN0cmluZyBhZnRlciByZXBsYWNpbmcgd2l0aCBgbmV3X3RleHRgLlxuZnVuY3Rpb24gUkVQTEFDRSh0ZXh0LCBwb3NpdGlvbiwgbGVuZ3RoLCBuZXdfdGV4dCkge1xuXG4gIGlmIChJU0VSUk9SKHBvc2l0aW9uKSB8fCBJU0VSUk9SKGxlbmd0aCkgfHwgdHlwZW9mIHRleHQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBuZXdfdGV4dCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZXJyb3IkMi52YWx1ZTtcbiAgfVxuICByZXR1cm4gdGV4dC5zdWJzdHIoMCwgcG9zaXRpb24gLSAxKSArIG5ld190ZXh0ICsgdGV4dC5zdWJzdHIocG9zaXRpb24gLSAxICsgbGVuZ3RoKTtcbn1cblxuLy8gUklHSFQgcHVsbHMgYSBnaXZlbiBudW1iZXIgb2YgY2hhcmFjdGVyIGZyb20gdGhlIHJpZ2h0IHNpZGUgb2YgYHRleHRgLlxuZnVuY3Rpb24gUklHSFQodGV4dCwgbnVtYmVyKSB7XG5cbiAgaWYgKElTQkxBTksodGV4dCkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoIU4oK251bWJlcikpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHJldHVybiB0ZXh0LnN1YnN0cmluZyh0ZXh0Lmxlbmd0aCAtIG51bWJlcik7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIENPTlZFUlQgYSBudW1iZXIgdG8gYSBmaXhlZCBwcmVjaXNpb24uXG5mdW5jdGlvbiBST1VORChudW1iZXIsIHByZWNpc2lvbikge1xuICByZXR1cm4gK251bWJlci50b0ZpeGVkKHByZWNpc2lvbik7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIFJPVU5EVVAgY29udmVydHMgYSBudW1iZXIgdG8gYSBmaXhlZCBwcmVjaXNpb24gYnkgcm91bmRpbmcgdXAuXG5mdW5jdGlvbiBST1VORFVQKG51bWJlciwgcHJlY2lzaW9uKSB7XG4gIHZhciBmYWN0b3JzID0gWzEsIDEwLCAxMDAsIDEwMDAsIDEwMDAwLCAxMDAwMDAsIDEwMDAwMDAsIDEwMDAwMDAwLCAxMDAwMDAwMDAsIDEwMDAwMDAwMDBdO1xuICB2YXIgZmFjdG9yID0gZmFjdG9yc1twcmVjaXNpb25dO1xuICBpZiAobnVtYmVyID4gMCkge1xuICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyICogZmFjdG9yKSAvIGZhY3RvcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIgKiBmYWN0b3IpIC8gZmFjdG9yO1xuICB9XG59XG5cbi8vIFNFQVJDSCBmaW5kcyB0ZXh0IHVzaW5nIHdpbGRjYXJkcyA/LCAqLCB+PywgYW5kIH4qLlxuZnVuY3Rpb24gU0VBUkNIKGZpbmRfdGV4dCwgd2l0aGluX3RleHQsIHBvc2l0aW9uKSB7XG4gIGlmICghd2l0aGluX3RleHQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBwb3NpdGlvbiA9IHR5cGVvZiBwb3NpdGlvbiA9PT0gJ3VuZGVmaW5lZCcgPyAxIDogcG9zaXRpb247XG5cbiAgLy8gVGhlIFNFQVJDSCBmdW5jdGlvbiB0cmFuc2xhdGVkIHRoZSBmaW5kX3RleHQgaW50byBhIHJlZ2V4LlxuICB2YXIgZmluZF9leHAgPSBmaW5kX3RleHQucmVwbGFjZSgvKFtefl0pXFw/L2csICckMS4nKSAvLyBjb252ZXJ0ID8gaW50byAuXG4gIC5yZXBsYWNlKC8oW15+XSlcXCovZywgJyQxLionKSAvLyBjb252ZXJ0ICogaW50byAuKlxuICAucmVwbGFjZSgvKFt+XSlcXD8vZywgJ1xcXFw/JykgLy8gY29udmVydCB+PyBpbnRvIFxcP1xuICAucmVwbGFjZSgvKFt+XSlcXCovZywgJ1xcXFwqJyk7IC8vIGNvbnZlcnQgfiogaW50byBcXCpcblxuICBwb3NpdGlvbiA9IG5ldyBSZWdFeHAoZmluZF9leHAsIFwiaVwiKS5leGVjKHdpdGhpbl90ZXh0KTtcblxuICBpZiAocG9zaXRpb24pIHtcbiAgICByZXR1cm4gcG9zaXRpb24uaW5kZXggKyAxO1xuICB9XG4gIHJldHVybiBlcnJvciQyLnZhbHVlO1xufVxuXG4vLyBTSU4gY2FsY3VsYXRlcyB0aGUgc2luaW5lIG9mIGEgdmFsdWUuXG5mdW5jdGlvbiBTSU4odmFsdWUpIHtcblxuICBpZiAoIUlTTlVNQkVSKHZhbHVlKSkge1xuICAgIHJldHVybiBlcnJvciQyLnZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguc2luKHZhbHVlKTtcbn1cblxuLy8gU09SVCBhIHJlZmVyZW5jZSBvciBhbiBhcnJheS5cbi8vXG4vLyBUaGUgY3JpdGVyaWEgbWF5IHVzZSAxIG9mIHNldmVyYWwgZm9ybXM6XG4vL1xuLy8gU09SVChyZWZlcmVuY2UocmVmZXJlbmNlOiBBcnJheSwgLi4uY3JpdGVyaWEgOiBMaXN0PHN0cmluZz4pXG4vLyBTT1JUKHJlZmVyZW5jZShyZWZlcmVuY2U6IFJhbmdlLCAuLi5jcml0ZXJpYSA6IExpc3Q8c3RyaW5nPilcbi8vXG4vLyBUaGUgTGlzdDxmdW5jdGlvbj4gd2lsbCBiZSByZWR1Y2VkIGludG8gYSBzaW5nbGUgZnVuY3Rpb24uXG4vL1xuLy8gVGhlIGxpc3Q8c3RyaW5nPiB3aWxsIGFsc28gYmUgcmVkdWNlZCBpbnRvIGEgc2luZ2xlIGZ1bmN0aW9uIHdoaWNoXG4vLyBpbnRlcnByZXRzIHRoZSBzdHJpbmdzIGFzIHBhaXJzLiBUaGUgb2RkIGl0ZW1zIGFyZSBmaWVsZHMgYW5kIHRoZVxuLy8gZXZlbiBvbmVzIGFyZSBkaXJlY3Rpb24gKEFTQ3xERVNDKS5cbmZ1bmN0aW9uIFNPUlQocmVmKSB7XG4gIGZvciAodmFyIF9sZW4xMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGNyaXRlcmlhID0gQXJyYXkoX2xlbjEzID4gMSA/IF9sZW4xMyAtIDEgOiAwKSwgX2tleTEzID0gMTsgX2tleTEzIDwgX2xlbjEzOyBfa2V5MTMrKykge1xuICAgIGNyaXRlcmlhW19rZXkxMyAtIDFdID0gYXJndW1lbnRzW19rZXkxM107XG4gIH1cblxuICAvLyByZWR1Y2UgdGhlIGNyaXRlcmlhIGFycmF5IGludG8gYSBmdW5jdGlvblxuICB2YXIgbWFrZUNvbXBhcmVyID0gZnVuY3Rpb24gbWFrZUNvbXBhcmVyKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNyaXRlcmlhLmxlbmd0aDsgaSArIDIpIHtcbiAgICAgICAgdmFyIGZpZWxkID0gdHlwZW9mIGNyaXRlcmlhW2ldID09PSAnc3RyaW5nJyA/IGNyaXRlcmlhW2ldIDogY3JpdGVyaWFbaV0gLSAxLFxuICAgICAgICAgICAgb3JkZXIgPSBjcml0ZXJpYVtpICsgMV07XG5cbiAgICAgICAgaWYgKGFbZmllbGRdIDwgYltmaWVsZF0pIHtcbiAgICAgICAgICByZXR1cm4gb3JkZXIgPyAtMSA6IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9yZGVyID8gMSA6IC0xO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICBpZiAoSVNSRUYocmVmKSB8fCBBcnJheS5pc0FycmF5KHJlZikpIHtcbiAgICByZXR1cm4gcmVmLnNvcnQobWFrZUNvbXBhcmVyKCkpO1xuICB9XG5cbiAgcmV0dXJuIGVycm9yJDIubmE7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIFNQTElUIGB0ZXh0YCBnaXZlbiBhIGBkZWxpbWl0ZXJgLlxuZnVuY3Rpb24gU1BMSVQodGV4dCwgZGVsaW1pdGVyKSB7XG4gIHJldHVybiB0ZXh0LnNwbGl0KGRlbGltaXRlcik7XG59XG5cbi8vIENvcHlyaWdodCAyMDE1IFBldGVyIFcgTW9yZXNpXG5cbi8vIFNVQlNUSVRVVEUgYG9sZF90ZXh0YCB3aXRoIGBuZXdfdGV4dGAgYSBnaXZlbiBudW1iZXIgb2Ygb2NjdXJyZW5jZXMgaW4gYHRleHRgLlxuZnVuY3Rpb24gU1VCU1RJVFVURSh0ZXh0LCBvbGRfdGV4dCwgbmV3X3RleHQsIG9jY3VycmVuY2UpIHtcbiAgaWYgKCF0ZXh0IHx8ICFvbGRfdGV4dCB8fCAhbmV3X3RleHQpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfSBlbHNlIGlmIChvY2N1cnJlbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAob2xkX3RleHQsICdnJyksIG5ld190ZXh0KTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAodGV4dC5pbmRleE9mKG9sZF90ZXh0LCBpbmRleCkgPiAwKSB7XG4gICAgICBpbmRleCA9IHRleHQuaW5kZXhPZihvbGRfdGV4dCwgaW5kZXggKyAxKTtcbiAgICAgIGkrKztcbiAgICAgIGlmIChpID09PSBvY2N1cnJlbmNlKSB7XG4gICAgICAgIHJldHVybiB0ZXh0LnN1YnN0cmluZygwLCBpbmRleCkgKyBuZXdfdGV4dCArIHRleHQuc3Vic3RyaW5nKGluZGV4ICsgb2xkX3RleHQubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gU1VCVFJBQ1QgY2FsY3VsYXRlcyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gbnVtYmVycy5cbmZ1bmN0aW9uIFNVQlRSQUNUKCkge1xuICBmb3IgKHZhciBfbGVuMTQgPSBhcmd1bWVudHMubGVuZ3RoLCB2YWx1ZXMgPSBBcnJheShfbGVuMTQpLCBfa2V5MTQgPSAwOyBfa2V5MTQgPCBfbGVuMTQ7IF9rZXkxNCsrKSB7XG4gICAgdmFsdWVzW19rZXkxNF0gPSBhcmd1bWVudHNbX2tleTE0XTtcbiAgfVxuXG4gIC8vIFJldHVybiBgI05BIWAgaWYgMiBhcmd1bWVudHMgYXJlIG5vdCBwcm92aWRlZC5cbiAgaWYgKHZhbHVlcy5sZW5ndGggIT09IDIpIHtcbiAgICByZXR1cm4gZXJyb3IkMi5uYTtcbiAgfVxuXG4gIC8vIGRlY29tcG9zZSB2YWx1ZXMgaW50byBhIGFuZCBiLlxuICB2YXIgYSA9IHZhbHVlc1swXTtcbiAgdmFyIGIgPSB2YWx1ZXNbMV07XG5cbiAgLy8gUmV0dXJuIGAjVkFMVUUhYCBpZiBlaXRoZXIgYSBvciBiIGlzIG5vdCBhIG51bWJlci5cblxuICBpZiAoIUlTTlVNQkVSKGEpIHx8ICFJU05VTUJFUihiKSkge1xuICAgIHJldHVybiBlcnJvciQyLnZhbHVlO1xuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBkaWZmZXJlbmNlLlxuICByZXR1cm4gYSAtIGI7XG59XG5cbi8vIFRBTiBjb21wdXRlcyB0aGUgdGFnZW50IG9mIGEgdmFsdWUuXG5mdW5jdGlvbiBUQU4odmFsdWUpIHtcblxuICBpZiAoIUlTTlVNQkVSKHZhbHVlKSkge1xuICAgIHJldHVybiBlcnJvciQyLnZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIE1hdGgudGFuKHZhbHVlKTtcbn1cblxuLy8gVEFVIHJldHVybnMgdGhlIHVuaXZlcnNhbCBjaXJjbGUgY29uc3RhbnRcbmZ1bmN0aW9uIFRBVSgpIHtcbiAgcmV0dXJuIM+EO1xufVxuXG52YXIgRm9ybWF0TnVtYmVyID0ge307XG5cbkZvcm1hdE51bWJlci5mb3JtYXRfZGVmaW5pdGlvbnMgPSB7fTsgLy8gUGFyc2VkIGZvcm1hdHMgYXJlIHN0b3JlZCBoZXJlIGdsb2JhbGx5XG5cbi8vIE90aGVyIGNvbnN0YW50c1xuXG5Gb3JtYXROdW1iZXIuY29tbWFuZHMgPSB7XG4gIGNvcHk6IDEsIGNvbG9yOiAyLCBpbnRlZ2VyX3BsYWNlaG9sZGVyOiAzLCBmcmFjdGlvbl9wbGFjZWhvbGRlcjogNCwgZGVjaW1hbDogNSxcbiAgY3VycmVuY3k6IDYsIGdlbmVyYWw6IDcsIHNlcGFyYXRvcjogOCwgZGF0ZTogOSwgY29tcGFyaXNvbjogMTAsIHNlY3Rpb246IDExLCBzdHlsZTogMTJcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKipcblxucmVzdWx0ID0gRm9ybWF0TnVtYmVyLmZvcm1hdE51bWJlcldpdGhGb3JtYXQgPSBmdW5jdGlvbihyYXd2YWx1ZSwgZm9ybWF0X3N0cmluZywgY3VycmVuY3lfY2hhcilcblxuKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5Gb3JtYXROdW1iZXIuZm9ybWF0TnVtYmVyV2l0aEZvcm1hdCA9IGZ1bmN0aW9uIChyYXd2YWx1ZSwgZm9ybWF0X3N0cmluZywgY3VycmVuY3lfY2hhcikge1xuXG4gIHZhciBzY2ZuID0gRm9ybWF0TnVtYmVyO1xuXG4gIHZhciBvcCwgb3BlcmFuZHN0ciwgZnJvbWVuZCwgY3ZhbCwgb3BlcmFuZHN0cmxjO1xuICB2YXIgc3RhcnR2YWwsIGVzdGFydHZhbDtcbiAgdmFyIGhycywgbWlucywgc2VjcywgZWhycywgZW1pbnMsIGVzZWNzLCBhbXBtc3RyLCB5bWQ7XG4gIHZhciBtaW5PSywgbXBvcywgbXNwb3M7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIGZvcm1hdDtcbiAgdmFyIHNlY3Rpb24sIGdvdGNvbXBhcmlzb24sIGNvbXBvcCwgY29tcHZhbCwgY3Bvcywgb3Bwb3M7XG4gIHZhciBzZWN0aW9uaW5mbztcbiAgdmFyIGksIGRlY2ltYWxzY2FsZSwgc2NhbGVkdmFsdWUsIHN0cnZhbHVlLCBzdHJwYXJ0cywgaW50ZWdlcnZhbHVlLCBmcmFjdGlvbnZhbHVlO1xuICB2YXIgaW50ZWdlcmRpZ2l0czIsIGludGVnZXJwb3MsIGZyYWN0aW9ucG9zLCB0ZXh0Y29sb3IsIHRleHRzdHlsZSwgc2VwYXJhdG9yY2hhciwgZGVjaW1hbGNoYXI7XG4gIHZhciB2YWx1ZTsgLy8gd29ya2luZyBjb3B5IHRvIGNoYW5nZSBzaWduLCBldGMuXG5cbiAgcmF3dmFsdWUgPSByYXd2YWx1ZSAtIDA7IC8vIG1ha2Ugc3VyZSBhIG51bWJlclxuICB2YWx1ZSA9IHJhd3ZhbHVlO1xuICBpZiAoIWlzRmluaXRlKHZhbHVlKSkgcmV0dXJuICdOYU4nO1xuXG4gIHZhciBuZWdhdGl2ZXZhbHVlID0gdmFsdWUgPCAwID8gMSA6IDA7IC8vIGRldGVybWluZSBzaWduLCBldGMuXG4gIGlmIChuZWdhdGl2ZXZhbHVlKSB2YWx1ZSA9IC12YWx1ZTtcbiAgdmFyIHplcm92YWx1ZSA9IHZhbHVlID09IDAgPyAxIDogMDtcblxuICBjdXJyZW5jeV9jaGFyID0gY3VycmVuY3lfY2hhciB8fCBEZWZhdWx0Q3VycmVuY3k7XG5cbiAgRm9ybWF0TnVtYmVyLnBhcnNlX2Zvcm1hdF9zdHJpbmcoc2Nmbi5mb3JtYXRfZGVmaW5pdGlvbnMsIGZvcm1hdF9zdHJpbmcpOyAvLyBtYWtlIHN1cmUgZm9ybWF0IGlzIHBhcnNlZFxuICAvL2NvbnNvbGUubG9nKFwiZm9ybWF0X3N0cmluZ1wiLCBmb3JtYXRfc3RyaW5nLCBmb3JtYXQpXG4gIGZvcm1hdCA9IHNjZm4uZm9ybWF0X2RlZmluaXRpb25zW2Zvcm1hdF9zdHJpbmddOyAvLyBHZXQgZm9ybWF0IHN0cnVjdHVyZVxuICAvL2NvbnNvbGUubG9nKFwiZm9ybWF0XCIsIGZvcm1hdClcblxuICBpZiAoIWZvcm1hdCkgdGhyb3cgJ0Zvcm1hdCBub3QgcGFyc2VkIGVycm9yLic7XG5cbiAgc2VjdGlvbiA9IGZvcm1hdC5zZWN0aW9uaW5mby5sZW5ndGggLSAxOyAvLyBnZXQgbnVtYmVyIG9mIHNlY3Rpb25zIC0gMVxuXG4gIC8vIGhhcyBjb21wYXJpc29ucyAtIGRldGVybWluZSB3aGljaCBzZWN0aW9uXG4gIGlmIChmb3JtYXQuaGFzY29tcGFyaXNvbikge1xuICAgIHNlY3Rpb24gPSAwOyAvLyBzZXQgdG8gd2hpY2ggc2VjdGlvbiB3ZSB3aWxsIHVzZVxuICAgIGdvdGNvbXBhcmlzb24gPSAwOyAvLyB0aGlzIHNlY3Rpb24gaGFzIG5vIGNvbXBhcmlzb25cbiAgICBmb3IgKGNwb3MgPSAwOzsgY3BvcysrKSB7XG4gICAgICAvLyBzY2FuIGZvciBjb21wYXJpc29uc1xuICAgICAgb3AgPSBmb3JtYXQub3BlcmF0b3JzW2Nwb3NdO1xuICAgICAgb3BlcmFuZHN0ciA9IGZvcm1hdC5vcGVyYW5kc1tjcG9zXTsgLy8gZ2V0IG5leHQgb3BlcmF0b3IgYW5kIG9wZXJhbmRcblxuICAgICAgLy8gYXQgZW5kIHdpdGggbm8gbWF0Y2hcbiAgICAgIGlmICghb3ApIHtcbiAgICAgICAgLy8gaWYgY29tcGFyaXNvbiBidXQgbm8gbWF0Y2hcbiAgICAgICAgaWYgKGdvdGNvbXBhcmlzb24pIHtcbiAgICAgICAgICBmb3JtYXRfc3RyaW5nID0gJ0dlbmVyYWwnOyAvLyB1c2UgZGVmYXVsdCBvZiBHZW5lcmFsXG4gICAgICAgICAgc2Nmbi5wYXJzZV9mb3JtYXRfc3RyaW5nKHNjZm4uZm9ybWF0X2RlZmluaXRpb25zLCBmb3JtYXRfc3RyaW5nKTtcbiAgICAgICAgICBmb3JtYXQgPSBzY2ZuLmZvcm1hdF9kZWZpbml0aW9uc1tmb3JtYXRfc3RyaW5nXTtcbiAgICAgICAgICBzZWN0aW9uID0gMDtcbiAgICAgICAgfVxuICAgICAgICBicmVhazsgLy8gaWYgbm8gY29tcGFyaXNpb24sIG1hdGNoZXMgb24gdGhpcyBzZWN0aW9uXG4gICAgICB9XG4gICAgICAvLyBlbmQgb2Ygc2VjdGlvblxuICAgICAgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuc2VjdGlvbikge1xuICAgICAgICBpZiAoIWdvdGNvbXBhcmlzb24pIHtcbiAgICAgICAgICAvLyBubyBjb21wYXJpc29uLCBzbyBpdCdzIGEgbWF0Y2hcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBnb3Rjb21wYXJpc29uID0gMDtcbiAgICAgICAgc2VjdGlvbisrOyAvLyBjaGVjayBvdXQgbmV4dCBvbmVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvLyBmb3VuZCBhIGNvbXBhcmlzb24gLSBkbyB3ZSBtZWV0IGl0P1xuICAgICAgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuY29tcGFyaXNvbikge1xuICAgICAgICBpID0gb3BlcmFuZHN0ci5pbmRleE9mKCc6Jyk7XG4gICAgICAgIGNvbXBvcCA9IG9wZXJhbmRzdHIuc3Vic3RyaW5nKDAsIGkpO1xuICAgICAgICBjb21wdmFsID0gb3BlcmFuZHN0ci5zdWJzdHJpbmcoaSArIDEpIC0gMDtcbiAgICAgICAgaWYgKGNvbXBvcCA9PSAnPCcgJiYgcmF3dmFsdWUgPCBjb21wdmFsIHx8IGNvbXBvcCA9PSAnPD0nICYmIHJhd3ZhbHVlIDw9IGNvbXB2YWwgfHwgY29tcG9wID09ICc9JyAmJiByYXd2YWx1ZSA9PSBjb21wdmFsIHx8IGNvbXBvcCA9PSAnPD4nICYmIHJhd3ZhbHVlICE9IGNvbXB2YWwgfHwgY29tcG9wID09ICc+PScgJiYgcmF3dmFsdWUgPj0gY29tcHZhbCB8fCBjb21wb3AgPT0gJz4nICYmIHJhd3ZhbHVlID4gY29tcHZhbCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGdvdGNvbXBhcmlzb24gPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBtb3JlIHRoYW4gb25lIHNlY3Rpb24gKHNlcGFyYXRlZCBieSBcIjtcIilcbiAgZWxzZSBpZiAoc2VjdGlvbiA+IDApIHtcbiAgICAgIC8vIHR3byBzZWN0aW9uc1xuICAgICAgaWYgKHNlY3Rpb24gPT0gMSkge1xuICAgICAgICBpZiAobmVnYXRpdmV2YWx1ZSkge1xuICAgICAgICAgIG5lZ2F0aXZldmFsdWUgPSAwOyAvLyBzaWduIHdpbGwgcHJvdmlkZWQgYnkgc2VjdGlvbiwgbm90IGF1dG9tYXRpY2FsbHlcbiAgICAgICAgICBzZWN0aW9uID0gMTsgLy8gdXNlIHNlY29uZCBzZWN0aW9uIGZvciBuZWdhdGl2ZSB2YWx1ZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlY3Rpb24gPSAwOyAvLyB1c2UgZmlyc3QgZm9yIGFsbCBvdGhlcnNcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyB0aHJlZSBzZWN0aW9uc1xuICAgICAgZWxzZSBpZiAoc2VjdGlvbiA9PSAyKSB7XG4gICAgICAgICAgaWYgKG5lZ2F0aXZldmFsdWUpIHtcbiAgICAgICAgICAgIG5lZ2F0aXZldmFsdWUgPSAwOyAvLyBzaWduIHdpbGwgcHJvdmlkZWQgYnkgc2VjdGlvbiwgbm90IGF1dG9tYXRpY2FsbHlcbiAgICAgICAgICAgIHNlY3Rpb24gPSAxOyAvLyB1c2Ugc2Vjb25kIHNlY3Rpb24gZm9yIG5lZ2F0aXZlIHZhbHVlc1xuICAgICAgICAgIH0gZWxzZSBpZiAoemVyb3ZhbHVlKSB7XG4gICAgICAgICAgICAgIHNlY3Rpb24gPSAyOyAvLyB1c2UgdGhpcmQgc2VjdGlvbiBmb3IgemVybyB2YWx1ZXNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbiA9IDA7IC8vIHVzZSBmaXJzdCBmb3IgcG9zaXRpdmVcbiAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gIHNlY3Rpb25pbmZvID0gZm9ybWF0LnNlY3Rpb25pbmZvW3NlY3Rpb25dOyAvLyBsb29rIGF0IHZhbHVlcyBmb3Igb3VyIHNlY3Rpb25cblxuICBpZiAoc2VjdGlvbmluZm8uY29tbWFzID4gMCkge1xuICAgIC8vIHNjYWxlIGJ5IHRob3VzYW5kc1xuICAgIGZvciAoaSA9IDA7IGkgPCBzZWN0aW9uaW5mby5jb21tYXM7IGkrKykge1xuICAgICAgdmFsdWUgLz0gMTAwMDtcbiAgICB9XG4gIH1cbiAgaWYgKHNlY3Rpb25pbmZvLnBlcmNlbnQgPiAwKSB7XG4gICAgLy8gZG8gcGVyY2VudCBzY2FsaW5nXG4gICAgZm9yIChpID0gMDsgaSA8IHNlY3Rpb25pbmZvLnBlcmNlbnQ7IGkrKykge1xuICAgICAgdmFsdWUgKj0gMTAwO1xuICAgIH1cbiAgfVxuXG4gIGRlY2ltYWxzY2FsZSA9IDE7IC8vIGN1dCBkb3duIHRvIHJlcXVpcmVkIG51bWJlciBvZiBkZWNpbWFsIGRpZ2l0c1xuICBmb3IgKGkgPSAwOyBpIDwgc2VjdGlvbmluZm8uZnJhY3Rpb25kaWdpdHM7IGkrKykge1xuICAgIGRlY2ltYWxzY2FsZSAqPSAxMDtcbiAgfVxuICBzY2FsZWR2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUgKiBkZWNpbWFsc2NhbGUgKyAwLjUpO1xuICBzY2FsZWR2YWx1ZSA9IHNjYWxlZHZhbHVlIC8gZGVjaW1hbHNjYWxlO1xuXG4gIGlmICh0eXBlb2Ygc2NhbGVkdmFsdWUgIT0gJ251bWJlcicpIHJldHVybiAnTmFOJztcbiAgaWYgKCFpc0Zpbml0ZShzY2FsZWR2YWx1ZSkpIHJldHVybiAnTmFOJztcblxuICBzdHJ2YWx1ZSA9IHNjYWxlZHZhbHVlICsgJyc7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIChOdW1iZXIudG9GaXhlZCBkb2Vzbid0IGRvIGFsbCB3ZSBuZWVkKVxuXG4gIC8vICAgc3RydmFsdWUgPSB2YWx1ZS50b0ZpeGVkKHNlY3Rpb25pbmZvLmZyYWN0aW9uZGlnaXRzKTsgLy8gY3V0IGRvd24gdG8gcmVxdWlyZWQgbnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzXG4gIC8vIGFuZCBjb252ZXJ0IHRvIHN0cmluZ1xuXG4gIGlmIChzY2FsZWR2YWx1ZSA9PSAwICYmIChzZWN0aW9uaW5mby5mcmFjdGlvbmRpZ2l0cyB8fCBzZWN0aW9uaW5mby5pbnRlZ2VyZGlnaXRzKSkge1xuICAgIG5lZ2F0aXZldmFsdWUgPSAwOyAvLyBubyBcIi0wXCIgdW5sZXNzIHVzaW5nIG11bHRpcGxlIHNlY3Rpb25zIG9yIEdlbmVyYWxcbiAgfVxuXG4gIC8vY29uc29sZS5sb2cocmF3dmFsdWUrJycpXG5cbiAgLy8gY29udmVydGVkIHRvIHNjaWVudGlmaWMgbm90YXRpb25cbiAgaWYgKHN0cnZhbHVlLmluZGV4T2YoJ2UnKSA+PSAwKSB7XG4gICAgcmV0dXJuIHJhd3ZhbHVlICsgJyc7IC8vIEp1c3QgcmV0dXJuIHBsYWluIGNvbnZlcnRlZCByYXcgdmFsdWVcbiAgfVxuXG4gIHN0cnBhcnRzID0gc3RydmFsdWUubWF0Y2goL15cXCt7MCwxfShcXGQqKSg/OlxcLihcXGQqKSl7MCwxfSQvKTsgLy8gZ2V0IGludGVnZXIgYW5kIGZyYWN0aW9uIHBhcnRzXG4gIGlmICghc3RycGFydHMpIHJldHVybiAnTmFOJzsgLy8gaWYgbm90IGEgbnVtYmVyXG4gIGludGVnZXJ2YWx1ZSA9IHN0cnBhcnRzWzFdO1xuICBpZiAoIWludGVnZXJ2YWx1ZSB8fCBpbnRlZ2VydmFsdWUgPT0gJzAnKSBpbnRlZ2VydmFsdWUgPSAnJztcbiAgZnJhY3Rpb252YWx1ZSA9IHN0cnBhcnRzWzJdO1xuICBpZiAoIWZyYWN0aW9udmFsdWUpIGZyYWN0aW9udmFsdWUgPSAnJztcblxuICAvLyB0aGVyZSBhcmUgZGF0ZSBwbGFjZWhvbGRlcnNcbiAgaWYgKHNlY3Rpb25pbmZvLmhhc2RhdGUpIHtcbiAgICAvL2NvbnNvbGUubG9nKCdoYXNkYXRlJylcbiAgICAvLyBiYWQgZGF0ZVxuICAgIGlmIChyYXd2YWx1ZSA8IDApIHtcbiAgICAgIHJldHVybiAnPz8tPz8/LT8/ID8/Oj8/Oj8/JztcbiAgICB9XG4gICAgc3RhcnR2YWwgPSAocmF3dmFsdWUgLSBNYXRoLmZsb29yKHJhd3ZhbHVlKSkgKiBTZWNvbmRzSW5EYXk7IC8vIGdldCBkYXRlL3RpbWUgcGFydHNcbiAgICBlc3RhcnR2YWwgPSByYXd2YWx1ZSAqIFNlY29uZHNJbkRheTsgLy8gZG8gZWxhcHNlZCB0aW1lIHZlcnNpb24sIHRvb1xuICAgIGhycyA9IE1hdGguZmxvb3Ioc3RhcnR2YWwgLyBTZWNvbmRzSW5Ib3VyKTtcbiAgICBlaHJzID0gTWF0aC5mbG9vcihlc3RhcnR2YWwgLyBTZWNvbmRzSW5Ib3VyKTtcbiAgICBzdGFydHZhbCA9IHN0YXJ0dmFsIC0gaHJzICogU2Vjb25kc0luSG91cjtcbiAgICBtaW5zID0gTWF0aC5mbG9vcihzdGFydHZhbCAvIDYwKTtcbiAgICBlbWlucyA9IE1hdGguZmxvb3IoZXN0YXJ0dmFsIC8gNjApO1xuICAgIHNlY3MgPSBzdGFydHZhbCAtIG1pbnMgKiA2MDtcbiAgICBkZWNpbWFsc2NhbGUgPSAxOyAvLyByb3VuZCBhcHByb3ByaWF0ZWx5IGRlcGVuZGluZyBpZiB0aGVyZSBpcyBzcy4wXG4gICAgZm9yIChpID0gMDsgaSA8IHNlY3Rpb25pbmZvLmZyYWN0aW9uZGlnaXRzOyBpKyspIHtcbiAgICAgIGRlY2ltYWxzY2FsZSAqPSAxMDtcbiAgICB9XG4gICAgc2VjcyA9IE1hdGguZmxvb3Ioc2VjcyAqIGRlY2ltYWxzY2FsZSArIDAuNSk7XG4gICAgc2VjcyA9IHNlY3MgLyBkZWNpbWFsc2NhbGU7XG4gICAgZXNlY3MgPSBNYXRoLmZsb29yKGVzdGFydHZhbCAqIGRlY2ltYWxzY2FsZSArIDAuNSk7XG4gICAgZXNlY3MgPSBlc2VjcyAvIGRlY2ltYWxzY2FsZTtcbiAgICBpZiAoc2VjcyA+PSA2MCkge1xuICAgICAgLy8gaGFuZGxlIHJvdW5kIHVwIGludG8gbmV4dCBzZWNvbmQsIG1pbnV0ZSwgZXRjLlxuICAgICAgc2VjcyA9IDA7XG4gICAgICBtaW5zKys7ZW1pbnMrKztcbiAgICAgIGlmIChtaW5zID49IDYwKSB7XG4gICAgICAgIG1pbnMgPSAwO1xuICAgICAgICBocnMrKztlaHJzKys7XG4gICAgICAgIGlmIChocnMgPj0gMjQpIHtcbiAgICAgICAgICBocnMgPSAwO1xuICAgICAgICAgIHJhd3ZhbHVlKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZnJhY3Rpb252YWx1ZSA9IHNlY3MgLSBNYXRoLmZsb29yKHNlY3MpICsgJyc7IC8vIGZvciBcImhoOm1tOnNzLjAwMFwiXG4gICAgZnJhY3Rpb252YWx1ZSA9IGZyYWN0aW9udmFsdWUuc3Vic3RyaW5nKDIpOyAvLyBza2lwIFwiMC5cIlxuXG4gICAgeW1kID0gUEFSU0VEQVRFKHJhd3ZhbHVlKTtcbiAgICB5bWQgPSB7XG4gICAgICB5ZWFyOiB5bWQuZ2V0RnVsbFllYXIoKSxcbiAgICAgIG1vbnRoOiB5bWQuZ2V0TW9udGgoKSArIDEsXG4gICAgICBkYXk6IHltZC5nZXREYXRlKClcbiAgICB9O1xuXG4gICAgbWluT0sgPSAwOyAvLyBzYXlzIFwibVwiIGNhbiBiZSBtaW51dGVzIGlmIHRydWVcbiAgICBtc3BvcyA9IHNlY3Rpb25pbmZvLnNlY3Rpb25zdGFydDsgLy8gbSBzY2FuIHBvc2l0aW9uIGluIG9wc1xuICAgIGZvciAoOzsgbXNwb3MrKykge1xuICAgICAgLy8gc2NhbiBmb3IgXCJtXCIgYW5kIFwibW1cIiB0byBzZWUgaWYgYW55IG1pbnV0ZXMgZmllbGRzLCBhbmQgYW0vcG1cbiAgICAgIG9wID0gZm9ybWF0Lm9wZXJhdG9yc1ttc3Bvc107XG4gICAgICBvcGVyYW5kc3RyID0gZm9ybWF0Lm9wZXJhbmRzW21zcG9zXTsgLy8gZ2V0IG5leHQgb3BlcmF0b3IgYW5kIG9wZXJhbmRcbiAgICAgIGlmICghb3ApIGJyZWFrOyAvLyBkb24ndCBnbyBwYXN0IGVuZFxuICAgICAgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuc2VjdGlvbikgYnJlYWs7XG4gICAgICBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5kYXRlKSB7XG4gICAgICAgIGlmICgob3BlcmFuZHN0ci50b0xvd2VyQ2FzZSgpID09ICdhbS9wbScgfHwgb3BlcmFuZHN0ci50b0xvd2VyQ2FzZSgpID09ICdhL3AnKSAmJiAhYW1wbXN0cikge1xuICAgICAgICAgIGlmIChocnMgPj0gMTIpIHtcbiAgICAgICAgICAgIGhycyAtPSAxMjtcbiAgICAgICAgICAgIGFtcG1zdHIgPSBvcGVyYW5kc3RyLnRvTG93ZXJDYXNlKCkgPT0gJ2EvcCcgPyBQTTEgOiBQTTsgLy8gXCJQXCIgOiBcIlBNXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYW1wbXN0ciA9IG9wZXJhbmRzdHIudG9Mb3dlckNhc2UoKSA9PSAnYS9wJyA/IEFNMSA6IEFNOyAvLyBcIkFcIiA6IFwiQU1cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob3BlcmFuZHN0ci5pbmRleE9mKGFtcG1zdHIpIDwgMCkgYW1wbXN0ciA9IGFtcG1zdHIudG9Mb3dlckNhc2UoKTsgLy8gaGF2ZSBjYXNlIG1hdGNoIGNhc2UgaW4gZm9ybWF0XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1pbk9LICYmIChvcGVyYW5kc3RyID09ICdtJyB8fCBvcGVyYW5kc3RyID09ICdtbScpKSB7XG4gICAgICAgICAgZm9ybWF0Lm9wZXJhbmRzW21zcG9zXSArPSAnaW4nOyAvLyB0dXJuIGludG8gXCJtaW5cIiBvciBcIm1taW5cIlxuICAgICAgICB9XG4gICAgICAgIGlmIChvcGVyYW5kc3RyLmNoYXJBdCgwKSA9PSAnaCcpIHtcbiAgICAgICAgICBtaW5PSyA9IDE7IC8vIG0gZm9sbG93aW5nIGggb3IgaGggb3IgW2hdIGlzIG1pbnV0ZXMgbm90IG1vbnRoc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWluT0sgPSAwO1xuICAgICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3AgIT0gc2Nmbi5jb21tYW5kcy5jb3B5KSB7XG4gICAgICAgIC8vIGNvcHlpbmcgY2hhcnMgY2FuIGJlIGJldHdlZW4gaCBhbmQgbVxuICAgICAgICBtaW5PSyA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIG1pbk9LID0gMDtcbiAgICBmb3IgKC0tbXNwb3M7OyBtc3Bvcy0tKSB7XG4gICAgICAvLyBzY2FuIG90aGVyIHdheSBmb3IgcyBhZnRlciBtXG4gICAgICBvcCA9IGZvcm1hdC5vcGVyYXRvcnNbbXNwb3NdO1xuICAgICAgb3BlcmFuZHN0ciA9IGZvcm1hdC5vcGVyYW5kc1ttc3Bvc107IC8vIGdldCBuZXh0IG9wZXJhdG9yIGFuZCBvcGVyYW5kXG4gICAgICBpZiAoIW9wKSBicmVhazsgLy8gZG9uJ3QgZ28gcGFzdCBlbmRcbiAgICAgIGlmIChvcCA9PSBzY2ZuLmNvbW1hbmRzLnNlY3Rpb24pIGJyZWFrO1xuICAgICAgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuZGF0ZSkge1xuICAgICAgICBpZiAobWluT0sgJiYgKG9wZXJhbmRzdHIgPT0gJ20nIHx8IG9wZXJhbmRzdHIgPT0gJ21tJykpIHtcbiAgICAgICAgICBmb3JtYXQub3BlcmFuZHNbbXNwb3NdICs9ICdpbic7IC8vIHR1cm4gaW50byBcIm1pblwiIG9yIFwibW1pblwiXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wZXJhbmRzdHIgPT0gJ3NzJykge1xuICAgICAgICAgIG1pbk9LID0gMTsgLy8gbSBiZWZvcmUgc3MgaXMgbWludXRlcyBub3QgbW9udGhzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtaW5PSyA9IDA7XG4gICAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcCAhPSBzY2ZuLmNvbW1hbmRzLmNvcHkpIHtcbiAgICAgICAgLy8gY29weWluZyBjaGFycyBjYW4gYmUgYmV0d2VlbiBzcyBhbmQgbVxuICAgICAgICBtaW5PSyA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW50ZWdlcmRpZ2l0czIgPSAwOyAvLyBpbml0IGNvdW50ZXJzLCBldGMuXG4gIGludGVnZXJwb3MgPSAwO1xuICBmcmFjdGlvbnBvcyA9IDA7XG4gIHRleHRjb2xvciA9ICcnO1xuICB0ZXh0c3R5bGUgPSAnJztcbiAgc2VwYXJhdG9yY2hhciA9IFNlcGFyYXRvckNoYXI7XG4gIGlmIChzZXBhcmF0b3JjaGFyLmluZGV4T2YoJyAnKSA+PSAwKSBzZXBhcmF0b3JjaGFyID0gc2VwYXJhdG9yY2hhci5yZXBsYWNlKC8gL2csICcgJyk7XG4gIGRlY2ltYWxjaGFyID0gRGVjaW1hbENoYXI7XG4gIGlmIChkZWNpbWFsY2hhci5pbmRleE9mKCcgJykgPj0gMCkgZGVjaW1hbGNoYXIgPSBkZWNpbWFsY2hhci5yZXBsYWNlKC8gL2csICcgJyk7XG5cbiAgb3Bwb3MgPSBzZWN0aW9uaW5mby5zZWN0aW9uc3RhcnQ7XG5cbiAgd2hpbGUgKG9wID0gZm9ybWF0Lm9wZXJhdG9yc1tvcHBvc10pIHtcbiAgICAvLyBleGVjdXRlIGZvcm1hdFxuICAgIG9wZXJhbmRzdHIgPSBmb3JtYXQub3BlcmFuZHNbb3Bwb3MrK107IC8vIGdldCBuZXh0IG9wZXJhdG9yIGFuZCBvcGVyYW5kXG5cbiAgICBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5jb3B5KSB7XG4gICAgICAvLyBwdXQgY2hhciBpbiByZXN1bHRcbiAgICAgIHJlc3VsdCArPSBvcGVyYW5kc3RyO1xuICAgIH0gZWxzZSBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5jb2xvcikge1xuICAgICAgLy8gc2V0IGNvbG9yXG4gICAgICB0ZXh0Y29sb3IgPSBvcGVyYW5kc3RyO1xuICAgIH0gZWxzZSBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5zdHlsZSkge1xuICAgICAgLy8gc2V0IHN0eWxlXG4gICAgICB0ZXh0c3R5bGUgPSBvcGVyYW5kc3RyO1xuICAgIH0gZWxzZSBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5pbnRlZ2VyX3BsYWNlaG9sZGVyKSB7XG4gICAgICAvLyBpbnNlcnQgbnVtYmVyIHBhcnRcbiAgICAgIGlmIChuZWdhdGl2ZXZhbHVlKSB7XG4gICAgICAgIHJlc3VsdCArPSAnLSc7XG4gICAgICAgIG5lZ2F0aXZldmFsdWUgPSAwO1xuICAgICAgfVxuICAgICAgaW50ZWdlcmRpZ2l0czIrKztcbiAgICAgIGlmIChpbnRlZ2VyZGlnaXRzMiA9PSAxKSB7XG4gICAgICAgIC8vIGZpcnN0IG9uZVxuICAgICAgICBpZiAoaW50ZWdlcnZhbHVlLmxlbmd0aCA+IHNlY3Rpb25pbmZvLmludGVnZXJkaWdpdHMpIHtcbiAgICAgICAgICAvLyBzZWUgaWYgaW50ZWdlciB3aWRlciB0aGFuIGZpZWxkXG4gICAgICAgICAgZm9yICg7IGludGVnZXJwb3MgPCBpbnRlZ2VydmFsdWUubGVuZ3RoIC0gc2VjdGlvbmluZm8uaW50ZWdlcmRpZ2l0czsgaW50ZWdlcnBvcysrKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gaW50ZWdlcnZhbHVlLmNoYXJBdChpbnRlZ2VycG9zKTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uaW5mby50aG91c2FuZHNzZXApIHtcbiAgICAgICAgICAgICAgLy8gc2VlIGlmIHRoaXMgaXMgYSBzZXBhcmF0b3IgcG9zaXRpb25cbiAgICAgICAgICAgICAgZnJvbWVuZCA9IGludGVnZXJ2YWx1ZS5sZW5ndGggLSBpbnRlZ2VycG9zIC0gMTtcbiAgICAgICAgICAgICAgaWYgKGZyb21lbmQgPiAyICYmIGZyb21lbmQgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gc2VwYXJhdG9yY2hhcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGludGVnZXJ2YWx1ZS5sZW5ndGggPCBzZWN0aW9uaW5mby5pbnRlZ2VyZGlnaXRzICYmIGludGVnZXJkaWdpdHMyIDw9IHNlY3Rpb25pbmZvLmludGVnZXJkaWdpdHMgLSBpbnRlZ2VydmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIC8vIGZpZWxkIGlzIHdpZGVyIHRoYW4gdmFsdWVcbiAgICAgICAgaWYgKG9wZXJhbmRzdHIgPT0gJzAnIHx8IG9wZXJhbmRzdHIgPT0gJz8nKSB7XG4gICAgICAgICAgLy8gZmlsbCB3aXRoIGFwcHJvcHJpYXRlIGNoYXJhY3RlcnNcbiAgICAgICAgICByZXN1bHQgKz0gb3BlcmFuZHN0ciA9PSAnMCcgPyAnMCcgOiAnICc7XG4gICAgICAgICAgaWYgKHNlY3Rpb25pbmZvLnRob3VzYW5kc3NlcCkge1xuICAgICAgICAgICAgLy8gc2VlIGlmIHRoaXMgaXMgYSBzZXBhcmF0b3IgcG9zaXRpb25cbiAgICAgICAgICAgIGZyb21lbmQgPSBzZWN0aW9uaW5mby5pbnRlZ2VyZGlnaXRzIC0gaW50ZWdlcmRpZ2l0czI7XG4gICAgICAgICAgICBpZiAoZnJvbWVuZCA+IDIgJiYgZnJvbWVuZCAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICByZXN1bHQgKz0gc2VwYXJhdG9yY2hhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vcm1hbCBpbnRlZ2VyIGRpZ2l0IC0gYWRkIGl0XG4gICAgICAgIHJlc3VsdCArPSBpbnRlZ2VydmFsdWUuY2hhckF0KGludGVnZXJwb3MpO1xuICAgICAgICBpZiAoc2VjdGlvbmluZm8udGhvdXNhbmRzc2VwKSB7XG4gICAgICAgICAgLy8gc2VlIGlmIHRoaXMgaXMgYSBzZXBhcmF0b3IgcG9zaXRpb25cbiAgICAgICAgICBmcm9tZW5kID0gaW50ZWdlcnZhbHVlLmxlbmd0aCAtIGludGVnZXJwb3MgLSAxO1xuICAgICAgICAgIGlmIChmcm9tZW5kID4gMiAmJiBmcm9tZW5kICUgMyA9PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gc2VwYXJhdG9yY2hhcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW50ZWdlcnBvcysrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5mcmFjdGlvbl9wbGFjZWhvbGRlcikge1xuICAgICAgLy8gYWRkIGZyYWN0aW9uIHBhcnQgb2YgbnVtYmVyXG4gICAgICBpZiAoZnJhY3Rpb25wb3MgPj0gZnJhY3Rpb252YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG9wZXJhbmRzdHIgPT0gJzAnIHx8IG9wZXJhbmRzdHIgPT0gJz8nKSB7XG4gICAgICAgICAgcmVzdWx0ICs9IG9wZXJhbmRzdHIgPT0gJzAnID8gJzAnIDogJyAnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgKz0gZnJhY3Rpb252YWx1ZS5jaGFyQXQoZnJhY3Rpb25wb3MpO1xuICAgICAgfVxuICAgICAgZnJhY3Rpb25wb3MrKztcbiAgICB9IGVsc2UgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuZGVjaW1hbCkge1xuICAgICAgLy8gZGVjaW1hbCBwb2ludFxuICAgICAgaWYgKG5lZ2F0aXZldmFsdWUpIHtcbiAgICAgICAgcmVzdWx0ICs9ICctJztcbiAgICAgICAgbmVnYXRpdmV2YWx1ZSA9IDA7XG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gZGVjaW1hbGNoYXI7XG4gICAgfSBlbHNlIGlmIChvcCA9PSBzY2ZuLmNvbW1hbmRzLmN1cnJlbmN5KSB7XG4gICAgICAvLyBjdXJyZW5jeSBzeW1ib2xcbiAgICAgIGlmIChuZWdhdGl2ZXZhbHVlKSB7XG4gICAgICAgIHJlc3VsdCArPSAnLSc7XG4gICAgICAgIG5lZ2F0aXZldmFsdWUgPSAwO1xuICAgICAgfVxuICAgICAgcmVzdWx0ICs9IG9wZXJhbmRzdHI7XG4gICAgfSBlbHNlIGlmIChvcCA9PSBzY2ZuLmNvbW1hbmRzLmdlbmVyYWwpIHtcbiAgICAgIC8vIGluc2VydCBcIkdlbmVyYWxcIiBjb252ZXJzaW9uXG5cbiAgICAgIC8vICoqKiBDdXQgZG93biBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IGFydGlmYWN0czpcblxuICAgICAgaWYgKHZhbHVlICE9IDApIHtcbiAgICAgICAgLy8gb25seSBpZiBub24temVyb1xuICAgICAgICB2YXIgZmFjdG9yID0gTWF0aC5mbG9vcihNYXRoLkxPRzEwRSAqIE1hdGgubG9nKHZhbHVlKSk7IC8vIGdldCBpbnRlZ2VyIG1hZ25pdHVkZSBhcyBhIHBvd2VyIG9mIDEwXG4gICAgICAgIGZhY3RvciA9IE1hdGgucG93KDEwLCAxMyAtIGZhY3Rvcik7IC8vIHR1cm4gaW50byBzY2FsaW5nIGZhY3RvclxuICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IoZmFjdG9yICogdmFsdWUgKyAwLjUpIC8gZmFjdG9yOyAvLyBzY2FsZSBwb3NpdGl2ZSB2YWx1ZSwgcm91bmQsIHVuZG8gc2NhbGluZ1xuICAgICAgICBpZiAoIWlzRmluaXRlKHZhbHVlKSkgcmV0dXJuICdOYU4nO1xuICAgICAgfVxuICAgICAgaWYgKG5lZ2F0aXZldmFsdWUpIHtcbiAgICAgICAgcmVzdWx0ICs9ICctJztcbiAgICAgIH1cbiAgICAgIHN0cnZhbHVlID0gdmFsdWUgKyAnJzsgLy8gY29udmVydCBvcmlnaW5hbCB2YWx1ZSB0byBzdHJpbmdcbiAgICAgIGlmIChzdHJ2YWx1ZS5pbmRleE9mKCdlJykgPj0gMCkge1xuICAgICAgICAvLyBjb252ZXJ0ZWQgdG8gc2NpZW50aWZpYyBub3RhdGlvblxuICAgICAgICByZXN1bHQgKz0gc3RydmFsdWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgc3RycGFydHMgPSBzdHJ2YWx1ZS5tYXRjaCgvXlxcK3swLDF9KFxcZCopKD86XFwuKFxcZCopKXswLDF9JC8pOyAvLyBnZXQgaW50ZWdlciBhbmQgZnJhY3Rpb24gcGFydHNcbiAgICAgIGludGVnZXJ2YWx1ZSA9IHN0cnBhcnRzWzFdO1xuICAgICAgaWYgKCFpbnRlZ2VydmFsdWUgfHwgaW50ZWdlcnZhbHVlID09ICcwJykgaW50ZWdlcnZhbHVlID0gJyc7XG4gICAgICBmcmFjdGlvbnZhbHVlID0gc3RycGFydHNbMl07XG4gICAgICBpZiAoIWZyYWN0aW9udmFsdWUpIGZyYWN0aW9udmFsdWUgPSAnJztcbiAgICAgIGludGVnZXJwb3MgPSAwO1xuICAgICAgZnJhY3Rpb25wb3MgPSAwO1xuICAgICAgaWYgKGludGVnZXJ2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgZm9yICg7IGludGVnZXJwb3MgPCBpbnRlZ2VydmFsdWUubGVuZ3RoOyBpbnRlZ2VycG9zKyspIHtcbiAgICAgICAgICByZXN1bHQgKz0gaW50ZWdlcnZhbHVlLmNoYXJBdChpbnRlZ2VycG9zKTtcbiAgICAgICAgICBpZiAoc2VjdGlvbmluZm8udGhvdXNhbmRzc2VwKSB7XG4gICAgICAgICAgICAvLyBzZWUgaWYgdGhpcyBpcyBhIHNlcGFyYXRvciBwb3NpdGlvblxuICAgICAgICAgICAgZnJvbWVuZCA9IGludGVnZXJ2YWx1ZS5sZW5ndGggLSBpbnRlZ2VycG9zIC0gMTtcbiAgICAgICAgICAgIGlmIChmcm9tZW5kID4gMiAmJiBmcm9tZW5kICUgMyA9PSAwKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCArPSBzZXBhcmF0b3JjaGFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ICs9ICcwJztcbiAgICAgIH1cbiAgICAgIGlmIChmcmFjdGlvbnZhbHVlLmxlbmd0aCkge1xuICAgICAgICByZXN1bHQgKz0gZGVjaW1hbGNoYXI7XG4gICAgICAgIGZvciAoOyBmcmFjdGlvbnBvcyA8IGZyYWN0aW9udmFsdWUubGVuZ3RoOyBmcmFjdGlvbnBvcysrKSB7XG4gICAgICAgICAgcmVzdWx0ICs9IGZyYWN0aW9udmFsdWUuY2hhckF0KGZyYWN0aW9ucG9zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5kYXRlKSB7XG4gICAgICAvLyBkYXRlIHBsYWNlaG9sZGVyXG4gICAgICBvcGVyYW5kc3RybGMgPSBvcGVyYW5kc3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAob3BlcmFuZHN0cmxjID09ICd5JyB8fCBvcGVyYW5kc3RybGMgPT0gJ3l5Jykge1xuICAgICAgICByZXN1bHQgKz0gKHltZC55ZWFyICsgJycpLnN1YnN0cmluZygyKTtcbiAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09ICd5eXl5Jykge1xuICAgICAgICByZXN1bHQgKz0geW1kLnllYXIgKyAnJztcbiAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09ICdkJykge1xuICAgICAgICByZXN1bHQgKz0geW1kLmRheSArICcnO1xuICAgICAgfSBlbHNlIGlmIChvcGVyYW5kc3RybGMgPT0gJ2RkJykge1xuICAgICAgICBjdmFsID0gMTAwMCArIHltZC5kYXk7XG4gICAgICAgIHJlc3VsdCArPSAoY3ZhbCArICcnKS5zdWJzdHIoMik7XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSAnZGRkJykge1xuICAgICAgICBjdmFsID0gTWF0aC5mbG9vcihyYXd2YWx1ZSArIDYpICUgNztcbiAgICAgICAgcmVzdWx0ICs9IERheU5hbWVzM1tjdmFsXTtcbiAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09ICdkZGRkJykge1xuICAgICAgICBjdmFsID0gTWF0aC5mbG9vcihyYXd2YWx1ZSArIDYpICUgNztcbiAgICAgICAgcmVzdWx0ICs9IERheU5hbWVzW2N2YWxdO1xuICAgICAgfSBlbHNlIGlmIChvcGVyYW5kc3RybGMgPT0gJ20nKSB7XG4gICAgICAgIHJlc3VsdCArPSB5bWQubW9udGggKyAnJztcbiAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09ICdtbScpIHtcbiAgICAgICAgY3ZhbCA9IDEwMDAgKyB5bWQubW9udGg7XG4gICAgICAgIHJlc3VsdCArPSAoY3ZhbCArICcnKS5zdWJzdHIoMik7XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSAnbW1tJykge1xuICAgICAgICByZXN1bHQgKz0gTW9udGhOYW1lczNbeW1kLm1vbnRoIC0gMV07XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSAnbW1tbScpIHtcbiAgICAgICAgcmVzdWx0ICs9IE1vbnRoTmFtZXNbeW1kLm1vbnRoIC0gMV07XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSAnbW1tbW0nKSB7XG4gICAgICAgIHJlc3VsdCArPSBNb250aE5hbWVzW3ltZC5tb250aCAtIDFdLmNoYXJBdCgwKTtcbiAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09ICdoJykge1xuICAgICAgICByZXN1bHQgKz0gaHJzICsgJyc7XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSAnaF0nKSB7XG4gICAgICAgIHJlc3VsdCArPSBlaHJzICsgJyc7XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSAnbW1pbicpIHtcbiAgICAgICAgY3ZhbCA9IDEwMDAgKyBtaW5zICsgJyc7XG4gICAgICAgIHJlc3VsdCArPSBjdmFsLnN1YnN0cigyKTtcbiAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09ICdtbV0nKSB7XG4gICAgICAgIGlmIChlbWlucyA8IDEwMCkge1xuICAgICAgICAgIGN2YWwgPSAxMDAwICsgZW1pbnMgKyAnJztcbiAgICAgICAgICByZXN1bHQgKz0gY3ZhbC5zdWJzdHIoMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0ICs9IGVtaW5zICsgJyc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09ICdtaW4nKSB7XG4gICAgICAgIHJlc3VsdCArPSBtaW5zICsgJyc7XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSAnbV0nKSB7XG4gICAgICAgIHJlc3VsdCArPSBlbWlucyArICcnO1xuICAgICAgfSBlbHNlIGlmIChvcGVyYW5kc3RybGMgPT0gJ2hoJykge1xuICAgICAgICBjdmFsID0gMTAwMCArIGhycyArICcnO1xuICAgICAgICByZXN1bHQgKz0gY3ZhbC5zdWJzdHIoMik7XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSAncycpIHtcbiAgICAgICAgY3ZhbCA9IE1hdGguZmxvb3Ioc2Vjcyk7XG4gICAgICAgIHJlc3VsdCArPSBjdmFsICsgJyc7XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSAnc3MnKSB7XG4gICAgICAgIGN2YWwgPSAxMDAwICsgTWF0aC5mbG9vcihzZWNzKSArICcnO1xuICAgICAgICByZXN1bHQgKz0gY3ZhbC5zdWJzdHIoMik7XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSAnYW0vcG0nIHx8IG9wZXJhbmRzdHJsYyA9PSAnYS9wJykge1xuICAgICAgICByZXN1bHQgKz0gYW1wbXN0cjtcbiAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09ICdzc10nKSB7XG4gICAgICAgIGlmIChlc2VjcyA8IDEwMCkge1xuICAgICAgICAgIGN2YWwgPSAxMDAwICsgTWF0aC5mbG9vcihlc2VjcykgKyAnJztcbiAgICAgICAgICByZXN1bHQgKz0gY3ZhbC5zdWJzdHIoMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3ZhbCA9IE1hdGguZmxvb3IoZXNlY3MpO1xuICAgICAgICAgIHJlc3VsdCArPSBjdmFsICsgJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuc2VjdGlvbikge1xuICAgICAgLy8gZW5kIG9mIHNlY3Rpb25cbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5jb21wYXJpc29uKSB7XG4gICAgICAvLyBpZ25vcmVcbiAgICAgIGNvbnRpbnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgKz0gJyEhIFBhcnNlIGVycm9yLiEhJztcbiAgICB9XG4gIH1cblxuICBpZiAodGV4dGNvbG9yKSB7XG4gICAgcmVzdWx0ID0gJzxzcGFuIHN0eWxlPVwiY29sb3I6JyArIHRleHRjb2xvciArICc7XCI+JyArIHJlc3VsdCArICc8L3NwYW4+JztcbiAgfVxuICBpZiAodGV4dHN0eWxlKSB7XG4gICAgcmVzdWx0ID0gJzxzcGFuIHN0eWxlPVwiJyArIHRleHRzdHlsZSArICc7XCI+JyArIHJlc3VsdCArICc8L3NwYW4+JztcbiAgfVxuXG4gIC8vY29uc29sZS5sb2cocmVzdWx0KVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqXG5cbkZvcm1hdE51bWJlci5wYXJzZV9mb3JtYXRfc3RyaW5nKGZvcm1hdF9kZWZzLCBmb3JtYXRfc3RyaW5nKVxuXG5UYWtlcyBhIGZvcm1hdCBzdHJpbmcgKGUuZy4sIFwiIywjIzAuMDBfKTsoIywjIzAuMDApXCIpIGFuZCBmaWxscyBpbiBmb3JtYXRfZGVmcyB3aXRoIHRoZSBwYXJzZWQgaW5mb1xuXG5mb3JtYXRfZGVmc1xuW1wiIywjIzAuMFwiXS0+e30gLSBlbGVtZW50cyBpbiB0aGUgaGFzaCBhcmUgb25lIGhhc2ggZm9yIGVhY2ggZm9ybWF0XG4ub3BlcmF0b3JzLT5bXSAtIGFycmF5IG9mIG9wZXJhdG9ycyBmcm9tIHBhcnNpbmcgdGhlIGZvcm1hdCBzdHJpbmcgKGVhY2ggYSBudW1iZXIpXG4ub3BlcmFuZHMtPltdIC0gYXJyYXkgb2YgY29ycmVzcG9uZGluZyBvcGVyYXRvcnMgKGVhY2ggdXN1YWxseSBhIHN0cmluZylcbi5zZWN0aW9uaW5mby0+W10gLSBvbmUgaGFzaCBmb3IgZWFjaCBzZWN0aW9uIG9mIHRoZSBmb3JtYXRcbi5zdGFydFxuLmludGVnZXJkaWdpdHNcbi5mcmFjdGlvbmRpZ2l0c1xuLmNvbW1hc1xuLnBlcmNlbnRcbi50aG91c2FuZHNzZXBcbi5oYXNkYXRlc1xuLmhhc2NvbXBhcmlzb24gLSB0cnVlIGlmIGFueSBzZWN0aW9uIGhhcyBbPDEwMF0sIGV0Yy5cblxuKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5Gb3JtYXROdW1iZXIucGFyc2VfZm9ybWF0X3N0cmluZyA9IGZ1bmN0aW9uIChmb3JtYXRfZGVmcywgZm9ybWF0X3N0cmluZykge1xuXG4gIHZhciBzY2ZuID0gRm9ybWF0TnVtYmVyO1xuXG4gIHZhciBmb3JtYXQsIHNlY3Rpb24sIHNlY3Rpb25pbmZvO1xuICB2YXIgaW50ZWdlcnBhcnQgPSAxOyAvLyBzdGFydCBvdXQgaW4gaW50ZWdlciBwYXJ0XG4gIHZhciBsYXN0d2FzaW50ZWdlcjsgLy8gbGFzdCBjaGFyIHdhcyBhbiBpbnRlZ2VyIHBsYWNlaG9sZGVyXG4gIHZhciBsYXN0d2Fzc2xhc2g7IC8vIGxhc3QgY2hhciB3YXMgYSBiYWNrc2xhc2ggLSBlc2NhcGluZyBmb2xsb3dpbmcgY2hhcmFjdGVyXG4gIHZhciBsYXN0d2FzYXN0ZXJpc2s7IC8vIHJlcGVhdCBuZXh0IGNoYXJcbiAgdmFyIGxhc3R3YXN1bmRlcnNjb3JlOyAvLyBsYXN0IGNoYXIgd2FzIF8gd2hpY2ggcGlja3MgdXAgZm9sbG93aW5nIGNoYXIgZm9yIHdpZHRoXG4gIHZhciBpbnF1b3RlLCBxdW90ZXN0cjsgLy8gcHJvY2Vzc2luZyBhIHF1b3RlZCBzdHJpbmdcbiAgdmFyIGluYnJhY2tldCwgYnJhY2tldHN0ciwgYnJhY2tldGRhdGE7IC8vIHByb2Nlc3NpbmcgYSBicmFja2V0ZWQgc3RyaW5nXG4gIHZhciBpbmdlbmVyYWwsIGdwb3M7IC8vIGNoZWNrcyBmb3IgY2hhcmFjdGVycyBcIkdlbmVyYWxcIlxuICB2YXIgYW1wbXN0ciwgcGFydDsgLy8gY2hlY2tzIGZvciBjaGFyYWN0ZXJzIFwiQS9QXCIgYW5kIFwiQU0vUE1cIlxuICB2YXIgaW5kYXRlOyAvLyBrZWVwcyB0cmFjayBvZiBkYXRlL3RpbWUgcGxhY2Vob2xkZXJzXG4gIHZhciBjaHBvczsgLy8gY2hhcmFjdGVyIHBvc2l0aW9uIGJlaW5nIGxvb2tlZCBhdFxuICB2YXIgY2g7IC8vIGNoYXJhY3RlciBiZWluZyBsb29rZWQgYXRcblxuICBpZiAoZm9ybWF0X2RlZnNbZm9ybWF0X3N0cmluZ10pIHJldHVybjsgLy8gYWxyZWFkeSBkZWZpbmVkIC0gbm90aGluZyB0byBkb1xuXG4gIGZvcm1hdCA9IHsgb3BlcmF0b3JzOiBbXSwgb3BlcmFuZHM6IFtdLCBzZWN0aW9uaW5mbzogW3t9XSB9OyAvLyBjcmVhdGUgaW5mbyBzdHJ1Y3R1cmUgZm9yIHRoaXMgZm9ybWF0XG4gIGZvcm1hdF9kZWZzW2Zvcm1hdF9zdHJpbmddID0gZm9ybWF0OyAvLyBhZGQgdG8gb3RoZXIgZm9ybWF0IGRlZmluaXRpb25zXG5cbiAgc2VjdGlvbiA9IDA7IC8vIHN0YXJ0IHdpdGggc2VjdGlvbiAwXG4gIHNlY3Rpb25pbmZvID0gZm9ybWF0LnNlY3Rpb25pbmZvW3NlY3Rpb25dOyAvLyBnZXQgcmVmZXJlbmNlIHRvIGluZm8gZm9yIGN1cnJlbnQgc2VjdGlvblxuICBzZWN0aW9uaW5mby5zZWN0aW9uc3RhcnQgPSAwOyAvLyBwb3NpdGlvbiBpbiBvcGVyYW5kcyB0aGF0IHN0YXJ0cyB0aGlzIHNlY3Rpb25cbiAgc2VjdGlvbmluZm8uaW50ZWdlcmRpZ2l0cyA9IDA7IC8vIG51bWJlciBvZiBpbnRlZ2VyLXBhcnQgcGxhY2Vob2xkZXJzXG4gIHNlY3Rpb25pbmZvLmZyYWN0aW9uZGlnaXRzID0gMDsgLy8gZnJhY3Rpb24gcGxhY2Vob2xkZXJzXG4gIHNlY3Rpb25pbmZvLmNvbW1hcyA9IDA7IC8vIGNvbW1hcyBlbmNvdW50ZXJlZCwgdG8gaGFuZGxlIHNjYWxpbmdcbiAgc2VjdGlvbmluZm8ucGVyY2VudCA9IDA7IC8vIHRpbWVzIHRvIHNjYWxlIGJ5IDEwMFxuXG4gIGZvciAoY2hwb3MgPSAwOyBjaHBvcyA8IGZvcm1hdF9zdHJpbmcubGVuZ3RoOyBjaHBvcysrKSB7XG4gICAgLy8gcGFyc2VcbiAgICBjaCA9IGZvcm1hdF9zdHJpbmcuY2hhckF0KGNocG9zKTsgLy8gZ2V0IG5leHQgY2hhciB0byBleGFtaW5lXG4gICAgaWYgKGlucXVvdGUpIHtcbiAgICAgIGlmIChjaCA9PSAnXCInKSB7XG4gICAgICAgIGlucXVvdGUgPSAwO1xuICAgICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5jb3B5KTtcbiAgICAgICAgZm9ybWF0Lm9wZXJhbmRzLnB1c2gocXVvdGVzdHIpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHF1b3Rlc3RyICs9IGNoO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChpbmJyYWNrZXQpIHtcbiAgICAgIGlmIChjaCA9PSAnXScpIHtcbiAgICAgICAgaW5icmFja2V0ID0gMDtcbiAgICAgICAgYnJhY2tldGRhdGEgPSBGb3JtYXROdW1iZXIucGFyc2VfZm9ybWF0X2JyYWNrZXQoYnJhY2tldHN0cik7XG4gICAgICAgIGlmIChicmFja2V0ZGF0YS5vcGVyYXRvciA9PSBzY2ZuLmNvbW1hbmRzLnNlcGFyYXRvcikge1xuICAgICAgICAgIHNlY3Rpb25pbmZvLnRob3VzYW5kc3NlcCA9IDE7IC8vIGV4cGxpY2l0IFssXVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChicmFja2V0ZGF0YS5vcGVyYXRvciA9PSBzY2ZuLmNvbW1hbmRzLmRhdGUpIHtcbiAgICAgICAgICBzZWN0aW9uaW5mby5oYXNkYXRlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnJhY2tldGRhdGEub3BlcmF0b3IgPT0gc2Nmbi5jb21tYW5kcy5jb21wYXJpc29uKSB7XG4gICAgICAgICAgZm9ybWF0Lmhhc2NvbXBhcmlzb24gPSAxO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdC5vcGVyYXRvcnMucHVzaChicmFja2V0ZGF0YS5vcGVyYXRvcik7XG4gICAgICAgIGZvcm1hdC5vcGVyYW5kcy5wdXNoKGJyYWNrZXRkYXRhLm9wZXJhbmQpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyYWNrZXRzdHIgKz0gY2g7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobGFzdHdhc3NsYXNoKSB7XG4gICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5jb3B5KTtcbiAgICAgIGZvcm1hdC5vcGVyYW5kcy5wdXNoKGNoKTtcbiAgICAgIGxhc3R3YXNzbGFzaCA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGxhc3R3YXNhc3Rlcmlzaykge1xuICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuY29weSk7XG4gICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChjaCArIGNoICsgY2ggKyBjaCArIGNoKTsgLy8gZG8gNSBvZiB0aGVtIHNpbmNlIG5vIHJlYWwgdGFic1xuICAgICAgbGFzdHdhc2FzdGVyaXNrID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobGFzdHdhc3VuZGVyc2NvcmUpIHtcbiAgICAgIGZvcm1hdC5vcGVyYXRvcnMucHVzaChzY2ZuLmNvbW1hbmRzLmNvcHkpO1xuICAgICAgZm9ybWF0Lm9wZXJhbmRzLnB1c2goJyAnKTtcbiAgICAgIGxhc3R3YXN1bmRlcnNjb3JlID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoaW5nZW5lcmFsKSB7XG4gICAgICBpZiAoJ2dlbmVyYWwnLmNoYXJBdChpbmdlbmVyYWwpID09IGNoLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgaW5nZW5lcmFsKys7XG4gICAgICAgIGlmIChpbmdlbmVyYWwgPT0gNykge1xuICAgICAgICAgIGZvcm1hdC5vcGVyYXRvcnMucHVzaChzY2ZuLmNvbW1hbmRzLmdlbmVyYWwpO1xuICAgICAgICAgIGZvcm1hdC5vcGVyYW5kcy5wdXNoKGNoKTtcbiAgICAgICAgICBpbmdlbmVyYWwgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaW5nZW5lcmFsID0gMDtcbiAgICB9XG5cbiAgICAvLyBsYXN0IGNoYXIgd2FzIHBhcnQgb2YgYSBkYXRlIHBsYWNlaG9sZGVyXG4gICAgaWYgKGluZGF0ZSkge1xuICAgICAgLy9jb25zb2xlLmxvZygnZm9vJylcbiAgICAgIGlmIChpbmRhdGUuY2hhckF0KDApID09IGNoKSB7XG4gICAgICAgIC8vIGFub3RoZXIgb2YgdGhlIHNhbWUgY2hhclxuICAgICAgICBpbmRhdGUgKz0gY2g7IC8vIGFjY3VtdWxhdGUgaXRcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5kYXRlKTsgLy8gc29tZXRoaW5nIGVsc2UsIHNhdmUgZGF0ZSBpbmZvXG4gICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChpbmRhdGUpO1xuICAgICAgc2VjdGlvbmluZm8uaGFzZGF0ZSA9IDE7XG4gICAgICBpbmRhdGUgPSAnJztcbiAgICB9XG4gICAgaWYgKGFtcG1zdHIpIHtcbiAgICAgIGFtcG1zdHIgKz0gY2g7XG4gICAgICBwYXJ0ID0gYW1wbXN0ci50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKHBhcnQgIT0gJ2FtL3BtJy5zdWJzdHJpbmcoMCwgcGFydC5sZW5ndGgpICYmIHBhcnQgIT0gJ2EvcCcuc3Vic3RyaW5nKDAsIHBhcnQubGVuZ3RoKSkge1xuICAgICAgICBhbXBzdHIgPSAnJztcbiAgICAgIH0gZWxzZSBpZiAocGFydCA9PSAnYW0vcG0nIHx8IHBhcnQgPT0gJ2EvcCcpIHtcbiAgICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuZGF0ZSk7XG4gICAgICAgIGZvcm1hdC5vcGVyYW5kcy5wdXNoKGFtcG1zdHIpO1xuICAgICAgICBhbXBtc3RyID0gJyc7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGNoID09ICcjJyB8fCBjaCA9PSAnMCcgfHwgY2ggPT0gJz8nKSB7XG4gICAgICAvLyBwbGFjZWhvbGRlclxuICAgICAgaWYgKGludGVnZXJwYXJ0KSB7XG4gICAgICAgIHNlY3Rpb25pbmZvLmludGVnZXJkaWdpdHMrKztcbiAgICAgICAgaWYgKHNlY3Rpb25pbmZvLmNvbW1hcykge1xuICAgICAgICAgIC8vIGNvbW1hIGluc2lkZSBvZiBpbnRlZ2VyIHBsYWNlaG9sZGVyc1xuICAgICAgICAgIHNlY3Rpb25pbmZvLnRob3VzYW5kc3NlcCA9IDE7IC8vIGFueSBudW1iZXIgaXMgdGhvdXNhbmRzIHNlcGFyYXRvclxuICAgICAgICAgIHNlY3Rpb25pbmZvLmNvbW1hcyA9IDA7IC8vIHJlc2V0IGNvdW50IG9mIFwidGhvdXNhbmRcIiBmYWN0b3JzXG4gICAgICAgIH1cbiAgICAgICAgbGFzdHdhc2ludGVnZXIgPSAxO1xuICAgICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5pbnRlZ2VyX3BsYWNlaG9sZGVyKTtcbiAgICAgICAgZm9ybWF0Lm9wZXJhbmRzLnB1c2goY2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VjdGlvbmluZm8uZnJhY3Rpb25kaWdpdHMrKztcbiAgICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuZnJhY3Rpb25fcGxhY2Vob2xkZXIpO1xuICAgICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChjaCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjaCA9PSAnLicpIHtcbiAgICAgIGxhc3R3YXNpbnRlZ2VyID0gMDtcbiAgICAgIGZvcm1hdC5vcGVyYXRvcnMucHVzaChzY2ZuLmNvbW1hbmRzLmRlY2ltYWwpO1xuICAgICAgZm9ybWF0Lm9wZXJhbmRzLnB1c2goY2gpO1xuICAgICAgaW50ZWdlcnBhcnQgPSAwO1xuICAgIH0gZWxzZSBpZiAoY2ggPT09ICckJykge1xuICAgICAgbGFzdHdhc2ludGVnZXIgPSAwO1xuICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuY3VycmVuY3kpO1xuICAgICAgZm9ybWF0Lm9wZXJhbmRzLnB1c2goY2gpO1xuICAgIH0gZWxzZSBpZiAoY2ggPT0gJywnKSB7XG4gICAgICBpZiAobGFzdHdhc2ludGVnZXIpIHtcbiAgICAgICAgc2VjdGlvbmluZm8uY29tbWFzKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5jb3B5KTtcbiAgICAgICAgZm9ybWF0Lm9wZXJhbmRzLnB1c2goY2gpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2ggPT0gJyUnKSB7XG4gICAgICBsYXN0d2FzaW50ZWdlciA9IDA7XG4gICAgICBzZWN0aW9uaW5mby5wZXJjZW50Kys7XG4gICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5jb3B5KTtcbiAgICAgIGZvcm1hdC5vcGVyYW5kcy5wdXNoKGNoKTtcbiAgICB9IGVsc2UgaWYgKGNoID09ICdcIicpIHtcbiAgICAgIGxhc3R3YXNpbnRlZ2VyID0gMDtcbiAgICAgIGlucXVvdGUgPSAxO1xuICAgICAgcXVvdGVzdHIgPSAnJztcbiAgICB9IGVsc2UgaWYgKGNoID09ICdbJykge1xuICAgICAgbGFzdHdhc2ludGVnZXIgPSAwO1xuICAgICAgaW5icmFja2V0ID0gMTtcbiAgICAgIGJyYWNrZXRzdHIgPSAnJztcbiAgICB9IGVsc2UgaWYgKGNoID09ICdcXFxcJykge1xuICAgICAgbGFzdHdhc3NsYXNoID0gMTtcbiAgICAgIGxhc3R3YXNpbnRlZ2VyID0gMDtcbiAgICB9IGVsc2UgaWYgKGNoID09ICcqJykge1xuICAgICAgbGFzdHdhc2FzdGVyaXNrID0gMTtcbiAgICAgIGxhc3R3YXNpbnRlZ2VyID0gMDtcbiAgICB9IGVsc2UgaWYgKGNoID09ICdfJykge1xuICAgICAgbGFzdHdhc3VuZGVyc2NvcmUgPSAxO1xuICAgICAgbGFzdHdhc2ludGVnZXIgPSAwO1xuICAgIH0gZWxzZSBpZiAoY2ggPT0gJzsnKSB7XG4gICAgICBzZWN0aW9uKys7IC8vIHN0YXJ0IG5leHQgc2VjdGlvblxuICAgICAgZm9ybWF0LnNlY3Rpb25pbmZvW3NlY3Rpb25dID0ge307IC8vIGNyZWF0ZSBhIG5ldyBzZWN0aW9uXG4gICAgICBzZWN0aW9uaW5mbyA9IGZvcm1hdC5zZWN0aW9uaW5mb1tzZWN0aW9uXTsgLy8gZ2V0IHJlZmVyZW5jZSB0byBpbmZvIGZvciBjdXJyZW50IHNlY3Rpb25cbiAgICAgIHNlY3Rpb25pbmZvLnNlY3Rpb25zdGFydCA9IDEgKyBmb3JtYXQub3BlcmF0b3JzLmxlbmd0aDsgLy8gcmVtZW1iZXIgd2hlcmUgaXQgc3RhcnRzXG4gICAgICBzZWN0aW9uaW5mby5pbnRlZ2VyZGlnaXRzID0gMDsgLy8gbnVtYmVyIG9mIGludGVnZXItcGFydCBwbGFjZWhvbGRlcnNcbiAgICAgIHNlY3Rpb25pbmZvLmZyYWN0aW9uZGlnaXRzID0gMDsgLy8gZnJhY3Rpb24gcGxhY2Vob2xkZXJzXG4gICAgICBzZWN0aW9uaW5mby5jb21tYXMgPSAwOyAvLyBjb21tYXMgZW5jb3VudGVyZWQsIHRvIGhhbmRsZSBzY2FsaW5nXG4gICAgICBzZWN0aW9uaW5mby5wZXJjZW50ID0gMDsgLy8gdGltZXMgdG8gc2NhbGUgYnkgMTAwXG4gICAgICBpbnRlZ2VycGFydCA9IDE7IC8vIHJlc2V0IGZvciBuZXcgc2VjdGlvblxuICAgICAgbGFzdHdhc2ludGVnZXIgPSAwO1xuICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuc2VjdGlvbik7XG4gICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChjaCk7XG4gICAgfSBlbHNlIGlmIChjaC50b0xvd2VyQ2FzZSgpID09ICdnJykge1xuICAgICAgaW5nZW5lcmFsID0gMTtcbiAgICAgIGxhc3R3YXNpbnRlZ2VyID0gMDtcbiAgICB9IGVsc2UgaWYgKGNoLnRvTG93ZXJDYXNlKCkgPT0gJ2EnKSB7XG4gICAgICBhbXBtc3RyID0gY2g7XG4gICAgICBsYXN0d2FzaW50ZWdlciA9IDA7XG4gICAgfSBlbHNlIGlmICgnZG15aEhzJy5pbmRleE9mKGNoKSA+PSAwKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdmb28nKVxuICAgICAgaW5kYXRlID0gY2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3R3YXNpbnRlZ2VyID0gMDtcbiAgICAgIGZvcm1hdC5vcGVyYXRvcnMucHVzaChzY2ZuLmNvbW1hbmRzLmNvcHkpO1xuICAgICAgZm9ybWF0Lm9wZXJhbmRzLnB1c2goY2gpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGxhc3QgY2hhciB3YXMgcGFydCBvZiB1bnNhdmVkIGRhdGUgcGxhY2Vob2xkZXJcbiAgaWYgKGluZGF0ZSkge1xuICAgIGZvcm1hdC5vcGVyYXRvcnMucHVzaChzY2ZuLmNvbW1hbmRzLmRhdGUpO1xuICAgIGZvcm1hdC5vcGVyYW5kcy5wdXNoKGluZGF0ZSk7XG4gICAgc2VjdGlvbmluZm8uaGFzZGF0ZSA9IDE7XG4gIH1cblxuICByZXR1cm47XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqXG5cbmJyYWNrZXRkYXRhID0gRm9ybWF0TnVtYmVyLnBhcnNlX2Zvcm1hdF9icmFja2V0KGJyYWNrZXRzdHIpXG5cblRha2VzIGEgYnJhY2tldCBjb250ZW50cyAoZS5nLiwgXCJSRURcIiwgXCI+MTBcIikgYW5kIHJldHVybnMgYW4gb3BlcmF0b3IgYW5kIG9wZXJhbmRcblxuYnJhY2tldGRhdGEtPnt9XG4ub3BlcmF0b3Jcbi5vcGVyYW5kXG5cbioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuRm9ybWF0TnVtYmVyLnBhcnNlX2Zvcm1hdF9icmFja2V0ID0gZnVuY3Rpb24gKGJyYWNrZXRzdHIpIHtcblxuICB2YXIgc2NmbiA9IEZvcm1hdE51bWJlcjtcblxuICB2YXIgYnJhY2tldGRhdGEgPSB7fTtcbiAgdmFyIHBhcnRzO1xuXG4gIC8vIGN1cnJlbmN5XG4gIGlmIChicmFja2V0c3RyLmNoYXJBdCgwKSA9PSAnJCcpIHtcbiAgICBicmFja2V0ZGF0YS5vcGVyYXRvciA9IHNjZm4uY29tbWFuZHMuY3VycmVuY3k7XG4gICAgcGFydHMgPSBicmFja2V0c3RyLm1hdGNoKC9eXFwkKC4rPykoXFwtLis/KXswLDF9JC8pO1xuICAgIGlmIChwYXJ0cykge1xuICAgICAgYnJhY2tldGRhdGEub3BlcmFuZCA9IHBhcnRzWzFdIHx8IERlZmF1bHRDdXJyZW5jeSB8fCAnJCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyYWNrZXRkYXRhLm9wZXJhbmQgPSBicmFja2V0c3RyLnN1YnN0cmluZygxKSB8fCBEZWZhdWx0Q3VycmVuY3kgfHwgJyQnO1xuICAgIH1cbiAgfSBlbHNlIGlmIChicmFja2V0c3RyID09ICc/JCcpIHtcbiAgICBicmFja2V0ZGF0YS5vcGVyYXRvciA9IHNjZm4uY29tbWFuZHMuY3VycmVuY3k7XG4gICAgYnJhY2tldGRhdGEub3BlcmFuZCA9ICdbPyRdJztcbiAgfSBlbHNlIGlmIChBbGxvd2VkQ29sb3JzW2JyYWNrZXRzdHIudG9VcHBlckNhc2UoKV0pIHtcbiAgICBicmFja2V0ZGF0YS5vcGVyYXRvciA9IHNjZm4uY29tbWFuZHMuY29sb3I7XG4gICAgYnJhY2tldGRhdGEub3BlcmFuZCA9IEFsbG93ZWRDb2xvcnNbYnJhY2tldHN0ci50b1VwcGVyQ2FzZSgpXTtcbiAgfSBlbHNlIGlmIChwYXJ0cyA9IGJyYWNrZXRzdHIubWF0Y2goL15zdHlsZT0oW14nXSopJC8pKSB7XG4gICAgLy8gW3N0eWxlPS4uLl1cbiAgICBicmFja2V0ZGF0YS5vcGVyYXRvciA9IHNjZm4uY29tbWFuZHMuc3R5bGU7XG4gICAgYnJhY2tldGRhdGEub3BlcmFuZCA9IHBhcnRzWzFdO1xuICB9IGVsc2UgaWYgKGJyYWNrZXRzdHIgPT0gJywnKSB7XG4gICAgYnJhY2tldGRhdGEub3BlcmF0b3IgPSBzY2ZuLmNvbW1hbmRzLnNlcGFyYXRvcjtcbiAgICBicmFja2V0ZGF0YS5vcGVyYW5kID0gYnJhY2tldHN0cjtcbiAgfSBlbHNlIGlmIChBbGxvd2VkRGF0ZXNbYnJhY2tldHN0ci50b1VwcGVyQ2FzZSgpXSkge1xuICAgIGJyYWNrZXRkYXRhLm9wZXJhdG9yID0gc2Nmbi5jb21tYW5kcy5kYXRlO1xuICAgIGJyYWNrZXRkYXRhLm9wZXJhbmQgPSBBbGxvd2VkRGF0ZXNbYnJhY2tldHN0ci50b1VwcGVyQ2FzZSgpXTtcbiAgfSBlbHNlIGlmIChwYXJ0cyA9IGJyYWNrZXRzdHIubWF0Y2goL15bPD49XS8pKSB7XG4gICAgLy8gY29tcGFyaXNvbiBvcGVyYXRvclxuICAgIHBhcnRzID0gYnJhY2tldHN0ci5tYXRjaCgvXihbPD49XSspKC4rKSQvKTsgLy8gc3BsaXQgb3BlcmF0b3IgYW5kIHZhbHVlXG4gICAgYnJhY2tldGRhdGEub3BlcmF0b3IgPSBzY2ZuLmNvbW1hbmRzLmNvbXBhcmlzb247XG4gICAgYnJhY2tldGRhdGEub3BlcmFuZCA9IHBhcnRzWzFdICsgJzonICsgcGFydHNbMl07XG4gIH0gZWxzZSB7XG4gICAgLy8gdW5rbm93biBicmFja2V0XG4gICAgYnJhY2tldGRhdGEub3BlcmF0b3IgPSBzY2ZuLmNvbW1hbmRzLmNvcHk7XG4gICAgYnJhY2tldGRhdGEub3BlcmFuZCA9ICdbJyArIGJyYWNrZXRzdHIgKyAnXSc7XG4gIH1cblxuICByZXR1cm4gYnJhY2tldGRhdGE7XG59O1xuXG5mdW5jdGlvbiBURVhUKHZhbHVlLCBmb3JtYXQsIGN1cnJlbmN5X2NoYXIpIHtcbiAgcmV0dXJuIEZvcm1hdE51bWJlci5mb3JtYXROdW1iZXJXaXRoRm9ybWF0KHZhbHVlLCBmb3JtYXQsIGN1cnJlbmN5X2NoYXIpO1xufVxuXG4vLyBUUklNUyByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgd2hpdGVzcGFjZSBhdCB0aGUgYmVnaW5uaW5nIG9yIGVuZC5cbmZ1bmN0aW9uIFRSSU0odGV4dCkge1xuICBpZiAodHlwZW9mIHRleHQgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGVycm9yJDIudmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRleHQudHJpbSgpO1xufVxuXG4vLyBDb3B5cmlnaHQgMjAxNSBQZXRlciBXIE1vcmVzaVxuXG4vLyBVUFBFUiBjb252ZXJ0cyBhIHN0cmluZyB0byB1cHBlciBjYXNlXG5mdW5jdGlvbiBVUFBFUihzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy50b1VwcGVyQ2FzZSgpO1xufVxuXG4vLyBWTE9PS1VQIGZpbmQgYSBuZWVkbGUgaW4gYSB0YWJsZSBzZWFyY2hpbmcgdmVydGljYWxseS5cbmZ1bmN0aW9uIFZMT09LVVAobmVlZGxlKSB7XG4gIHZhciB0YWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IFtdIDogYXJndW1lbnRzWzFdO1xuICB2YXIgaW5kZXggPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyAxIDogYXJndW1lbnRzWzJdO1xuICB2YXIgZXhhY3RtYXRjaCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogYXJndW1lbnRzWzNdO1xuXG5cbiAgaWYgKElTRVJST1IobmVlZGxlKSB8fCBJU0JMQU5LKG5lZWRsZSkpIHtcbiAgICByZXR1cm4gbmVlZGxlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZS5sZW5ndGg7IGkrKykge1xuICAgIHZhciByb3cgPSB0YWJsZVtpXTtcblxuICAgIGlmIChpbmRleCA+IHJvdy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBlcnJvciQyLnJlZjtcbiAgICB9XG5cbiAgICBpZiAoZXhhY3RtYXRjaCAmJiByb3dbMF0gPT09IG5lZWRsZSB8fCByb3dbMF0gPT0gbmVlZGxlIHx8IHR5cGVvZiByb3dbMF0gPT09IFwic3RyaW5nXCIgJiYgcm93WzBdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgIT0gLTEpIHtcbiAgICAgIHJldHVybiBpbmRleCA8IHJvdy5sZW5ndGggKyAxID8gcm93W2luZGV4IC0gMV0gOiByb3dbMF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVycm9yJDIubmE7XG59XG5cbi8vIFhPUiBjb21wdXRlcyB0aGUgZXhjbHVzaXZlIG9yIGZvciBhIGdpdmVuIHNldCBvZiBgdmFsdWVzYC5cbmZ1bmN0aW9uIFhPUigpIHtcbiAgZm9yICh2YXIgX2xlbjE1ID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbjE1KSwgX2tleTE1ID0gMDsgX2tleTE1IDwgX2xlbjE1OyBfa2V5MTUrKykge1xuICAgIHZhbHVlc1tfa2V5MTVdID0gYXJndW1lbnRzW19rZXkxNV07XG4gIH1cblxuICByZXR1cm4gISEoRkxBVFRFTih2YWx1ZXMpLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIGlmIChiKSB7XG4gICAgICByZXR1cm4gYSArIDE7XG4gICAgfVxuICAgIHJldHVybiBhO1xuICB9LCAwKSAmIDEpO1xufVxuXG5leHBvcnRzLkFCUyA9IEFCUztcbmV4cG9ydHMuQUNPUyA9IEFDT1M7XG5leHBvcnRzLkFERCA9IEFERDtcbmV4cG9ydHMuQU5EID0gQU5EO1xuZXhwb3J0cy5BVkVSQUdFID0gQVZFUkFHRTtcbmV4cG9ydHMuQklOMkRFQyA9IEJJTjJERUM7XG5leHBvcnRzLkNFTExJTkRFWCA9IENFTExJTkRFWDtcbmV4cG9ydHMuQ0hBTkdFRCA9IENIQU5HRUQ7XG5leHBvcnRzLkNIT09TRSA9IENIT09TRTtcbmV4cG9ydHMuQ0xFQU4gPSBDTEVBTjtcbmV4cG9ydHMuQ09ERSA9IENPREU7XG5leHBvcnRzLkNPTFVNTiA9IENPTFVNTjtcbmV4cG9ydHMuQ09MVU1OTEVUVEVSID0gQ09MVU1OTEVUVEVSO1xuZXhwb3J0cy5DT0xVTU5OVU1CRVIgPSBDT0xVTU5OVU1CRVI7XG5leHBvcnRzLkNPTkNBVEVOQVRFID0gQ09OQ0FURU5BVEU7XG5leHBvcnRzLkNPTkQgPSBDT05EO1xuZXhwb3J0cy5DT05UQUlOUyA9IENPTlRBSU5TO1xuZXhwb3J0cy5DT1MgPSBDT1M7XG5leHBvcnRzLkRBVEUgPSBEQVRFO1xuZXhwb3J0cy5EQVRFVkFMVUUgPSBEQVRFVkFMVUU7XG5leHBvcnRzLkRBVEVESUYgPSBEQVRFRElGO1xuZXhwb3J0cy5EQVlTMzYwID0gREFZUzM2MDtcbmV4cG9ydHMuREVDMkJJTiA9IERFQzJCSU47XG5leHBvcnRzLkRJRkYgPSBESUZGO1xuZXhwb3J0cy5ESVZJREUgPSBESVZJREU7XG5leHBvcnRzLkVRID0gRVE7XG5leHBvcnRzLkVYQUNUID0gRVhBQ1Q7XG5leHBvcnRzLkZJTFRFUiA9IEZJTFRFUjtcbmV4cG9ydHMuRklORCA9IEZJTkQ7XG5leHBvcnRzLkZMQVRURU4gPSBGTEFUVEVOO1xuZXhwb3J0cy5HVCA9IEdUO1xuZXhwb3J0cy5HVEUgPSBHVEU7XG5leHBvcnRzLkdVSUQgPSBHVUlEO1xuZXhwb3J0cy5ITE9PS1VQID0gSExPT0tVUDtcbmV4cG9ydHMuSUYgPSBJRjtcbmV4cG9ydHMuSUZCTEFOSyA9IElGQkxBTks7XG5leHBvcnRzLklGRU1QVFkgPSBJRkVNUFRZO1xuZXhwb3J0cy5JRkVSUk9SID0gSUZFUlJPUjtcbmV4cG9ydHMuSUZOQSA9IElGTkE7XG5leHBvcnRzLklOID0gSU47XG5leHBvcnRzLklOREVYMkNPTCA9IElOREVYMkNPTDtcbmV4cG9ydHMuSU5ERVgyUk9XID0gSU5ERVgyUk9XO1xuZXhwb3J0cy5JTkRJUkVDVCA9IElORElSRUNUO1xuZXhwb3J0cy5JU0FSUkFZID0gSVNBUlJBWTtcbmV4cG9ydHMuSVNCTEFOSyA9IElTQkxBTks7XG5leHBvcnRzLklTREFURSA9IElTREFURTtcbmV4cG9ydHMuSVNFTUFJTCA9IElTRU1BSUw7XG5leHBvcnRzLklTRU1QVFkgPSBJU0VNUFRZO1xuZXhwb3J0cy5JU0VSUk9SID0gSVNFUlJPUjtcbmV4cG9ydHMuSVNFVkVOID0gSVNFVkVOO1xuZXhwb3J0cy5JU0ZVTkNUSU9OID0gSVNGVU5DVElPTjtcbmV4cG9ydHMuSVNOQSA9IElTTkE7XG5leHBvcnRzLklTTlVNQkVSID0gSVNOVU1CRVI7XG5leHBvcnRzLklTT0REID0gSVNPREQ7XG5leHBvcnRzLklTUkVGID0gSVNSRUY7XG5leHBvcnRzLklTVEVYVCA9IElTVEVYVDtcbmV4cG9ydHMuSVNVUkwgPSBJU1VSTDtcbmV4cG9ydHMuTEVOID0gTEVOO1xuZXhwb3J0cy5MT09LVVAgPSBMT09LVVA7XG5leHBvcnRzLkxPV0VSID0gTE9XRVI7XG5leHBvcnRzLkxUID0gTFQ7XG5leHBvcnRzLkxURSA9IExURTtcbmV4cG9ydHMuTUlOID0gTUlOO1xuZXhwb3J0cy5NQVggPSBNQVg7XG5leHBvcnRzLk1VTFRJUExZID0gTVVMVElQTFk7XG5leHBvcnRzLk4gPSBOO1xuZXhwb3J0cy5OVU1CRVJWQUxVRSA9IE5VTUJFUlZBTFVFO1xuZXhwb3J0cy5ORSA9IE5FO1xuZXhwb3J0cy5OT1QgPSBOT1Q7XG5leHBvcnRzLk9DVDJERUMgPSBPQ1QyREVDO1xuZXhwb3J0cy5PUiA9IE9SO1xuZXhwb3J0cy5QQVJTRUJPT0wgPSBQQVJTRUJPT0w7XG5leHBvcnRzLlBBUlNFREFURSA9IFBBUlNFREFURTtcbmV4cG9ydHMuUEkgPSBQSTtcbmV4cG9ydHMuUE1UID0gUE1UO1xuZXhwb3J0cy5QT1dFUiA9IFBPV0VSO1xuZXhwb3J0cy5SRUYgPSBSRUY7XG5leHBvcnRzLlJFUExBQ0UgPSBSRVBMQUNFO1xuZXhwb3J0cy5SRVBUID0gUkVQVDtcbmV4cG9ydHMuUklHSFQgPSBSSUdIVDtcbmV4cG9ydHMuUk9VTkQgPSBST1VORDtcbmV4cG9ydHMuUk9VTkRVUCA9IFJPVU5EVVA7XG5leHBvcnRzLlNFQVJDSCA9IFNFQVJDSDtcbmV4cG9ydHMuU0VMRUNUID0gU0VMRUNUO1xuZXhwb3J0cy5TRVJJQUwgPSBTRVJJQUw7XG5leHBvcnRzLlNJTiA9IFNJTjtcbmV4cG9ydHMuU09SVCA9IFNPUlQ7XG5leHBvcnRzLlNQTElUID0gU1BMSVQ7XG5leHBvcnRzLlNVQlNUSVRVVEUgPSBTVUJTVElUVVRFO1xuZXhwb3J0cy5TVUJUUkFDVCA9IFNVQlRSQUNUO1xuZXhwb3J0cy5TVU0gPSBTVU07XG5leHBvcnRzLlRBTiA9IFRBTjtcbmV4cG9ydHMuVEFVID0gVEFVO1xuZXhwb3J0cy5URVhUID0gVEVYVDtcbmV4cG9ydHMuVFJJTSA9IFRSSU07XG5leHBvcnRzLlVOSVFVRSA9IFVOSVFVRTtcbmV4cG9ydHMuVVBQRVIgPSBVUFBFUjtcbmV4cG9ydHMuVkxPT0tVUCA9IFZMT09LVVA7XG5leHBvcnRzLlhPUiA9IFhPUjtcblxuIl19
