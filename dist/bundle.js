(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _functionfoundry = require('functionfoundry');

var _functionfoundry2 = _interopRequireDefault(_functionfoundry);

var expressions = ['ABS(-1.1)', 'LOWER("TEXT ") + ABS(-2)', 'SUM(2, 5)'];

(function () {
    // Create set of functions
    for (var key in _functionfoundry2['default']) {
        window[key] = _functionfoundry2['default'][key];
    }

    var e = undefined,
        output = '';

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = expressions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            e = _step.value;

            output += '<code>' + e + ' = ' + eval(e) + '</code></br>';
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    document.getElementById('debug').innerHTML = output;
})();

},{"functionfoundry":74}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ABS = ABS;

var _ISNUMBER = require('./ISNUMBER');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ABS(value) {
  if (!(0, _ISNUMBER.ISNUMBER)(value)) {
    return _ERROR2.default.value;
  }
  return Math.abs(value);
}
},{"./ERROR":20,"./ISNUMBER":40}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACOS = ACOS;

var _ISNUMBER = require('./ISNUMBER');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ACOS(value) {

  if (!(0, _ISNUMBER.ISNUMBER)(value)) {
    return _ERROR2.default.value;
  }

  return Math.acos(value);
}
},{"./ERROR":20,"./ISNUMBER":40}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ADD = ADD;
function ADD(a, b) {
  return a + b;
}
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AND = AND;
// Logical AND reduction
//
// Author: Peter Moresi
//
// Any list of criteria can be flattened out to a truthy value.
function AND() {
  for (var _len = arguments.length, criteria = Array(_len), _key = 0; _key < _len; _key++) {
    criteria[_key] = arguments[_key];
  }

  return criteria.reduce(function (previousValue, currentValue) {
    if (previousValue === false) return false;
    return currentValue;
  }, true);
}
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BIN2DEC = BIN2DEC;

var _ERROR = require("./ERROR");

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BIN2DEC(value) {
    var valueAsString;

    if (typeof value === "string") {
        valueAsString = value;
    } else if (typeof value !== "undefined") {
        valueAsString = value.toString();
    } else {
        return _ERROR2.default.NA;
    }

    if (valueAsString.length > 10) return _ERROR2.default.NUM;

    // we subtract 512 when the leading number is 0.
    if (valueAsString.length === 10 && valueAsString[0] === '1') {
        return parseInt(valueAsString.substring(1), 2) - 512;
    }

    // Convert binary number to decimal with built-in facility
    return parseInt(valueAsString, 2);
};
},{"./ERROR":20}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CELL = CELL;

var _INDEX2COL = require('./INDEX2COL');

var _INDEX2ROW = require('./INDEX2ROW');

/* Structure for CELL reference
*/
function CELL(index) {
  if (typeof index !== 'number') {
    throw 'Cell index must be a Number';
  }
  return Object.freeze({
    /* Cells also support topLeft
     */
    topLeft: function topLeft() {
      return index;
    },
    /* Returns rowIndex
    */
    getRow: function getRow() {
      return (0, _INDEX2ROW.INDEX2ROW)(index);
    },

    /* Return columnIndex
    */
    getColumn: function getColumn() {
      return (0, _INDEX2COL.INDEX2COL)(index);
    }
  });
}
},{"./INDEX2COL":30,"./INDEX2ROW":31}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CELLINDEX = CELLINDEX;
/* Compute the position in a 2 dimensional array
 */
function CELLINDEX(row, col) {
  return Math.floor(row * 16384 + col);
}
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CHOOSE = CHOOSE;

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CHOOSE() {
  if (arguments.length < 2) {
    return _ERROR2.default.na;
  }

  var index = arguments[0];
  if (index < 1 || index > 254) {
    return _ERROR2.default.value;
  }

  if (arguments.length < index + 1) {
    return _ERROR2.default.value;
  }

  return arguments[index];
}
},{"./ERROR":20}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLEAN = CLEAN;

var _ISBLANK = require('./ISBLANK');

function CLEAN(obj) {
  return Object.keys(obj).reduce(function (a, b) {
    return (0, _ISBLANK.ISBLANK)(obj[b]) ? a : a.concat(b);
  }, []).reduce(function (a, b) {
    a[b] = obj[b];return a;
  }, {});
} // Take an object with falsy values and return a clean object with no falsy values
},{"./ISBLANK":34}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONCATENATE = CONCATENATE;
function CONCATENATE(a, b) {
  return "" + a + b;
}
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COND = COND;
// COND.js -
// SYNTAX( condition1, result_if_true [, condition2, result_if_true] )

function COND() {
  for (var _len = arguments.length, cases = Array(_len), _key = 0; _key < _len; _key++) {
    cases[_key] = arguments[_key];
  }

  return cases.reduce(function (a, b, i) {

    if (typeof a !== 'undefined') {
      // return the previously found item
      return a;
    } else if (i === cases.length - 1) {

      if (i % 2 === 1) {
        return; // nothing found
      }

      // return the last item
      return b;
    } else if (i % 2 === 0 && b) {
      // return the found item
      return cases[i + 1];
    }
  }, undefined);
}
},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var d1900 = exports.d1900 = new Date(1900, 0, 1),
    JulianOffset = exports.JulianOffset = 2415019,
    MinutesInHour = exports.MinutesInHour = 60,
    MinutesInDay = exports.MinutesInDay = 1440,
    SecondsInMinute = exports.SecondsInMinute = 60,
    SecondsInHour = exports.SecondsInHour = 3600,
    SecondsInDay = exports.SecondsInDay = 86400,
    DaysInYear = exports.DaysInYear = 365.25,
    MilliSecondsInDay = exports.MilliSecondsInDay = 86400000,
    AllowedDates = exports.AllowedDates = { H: "h]", M: "m]", MM: "mm]", S: "s]", SS: "ss]" },
    DayNames = exports.DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    DayNames3 = exports.DayNames3 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    MonthNames = exports.MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    MonthNames3 = exports.MonthNames3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    AM = exports.AM = "AM",
    AM1 = exports.AM1 = "A",
    PM = exports.PM = "PM",
    PM1 = exports.PM1 = "P",

// Circle Constants
τ = exports.τ = 6.28318530717958,
    // http://tauday.com/tau-manifesto

// Address System Constants
MaxCols = exports.MaxCols = 16384,
    // 14 bits, 2^14
MaxRows = exports.MaxRows = 1048576,
    // 20 bits, 2^20

// Formatting Constants
SeparatorChar = exports.SeparatorChar = ",",
    DecimalChar = exports.DecimalChar = ".",
    DefaultCurrency = exports.DefaultCurrency = "$",
    // the currency string used if none specified
AllowedColors = exports.AllowedColors = {
  BLACK: "#000000",
  BLUE: "#0000FF",
  CYAN: "#00FFFF",
  GREEN: "#00FF00",
  MAGENTA: "#FF00FF",
  RED: "#FF0000",
  WHITE: "#FFFFFF",
  YELLOW: "#FFFF00"
};
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COS = COS;

var _ISNUMBER = require('./ISNUMBER');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function COS(value) {

  if (!(0, _ISNUMBER.ISNUMBER)(value)) {
    return _ERROR2.default.value;
  }

  return Math.cos(value);
}
},{"./ERROR":20,"./ISNUMBER":40}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATE = DATE;

var _SERIAL = require('./SERIAL');

function DATE(year, month, day) {
  return (0, _SERIAL.SERIAL)(new Date(year, month - 1, day));
}
},{"./SERIAL":63}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATEDIF = DATEDIF;
function DATEDIF(start_date, end_date, unit) {
  var second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7;
  start_date = new Date(start_date);
  end_date = new Date(end_date);

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
},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEC2BIN = DEC2BIN;

var _REPT = require('./REPT');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// based on https://github.com/sutoiku/formula.js/blob/mast../src/engineering.js
function DEC2BIN(input, places) {

  // exit if input is an error
  if (input instanceof Error) {
    return number;
  }

  // cast input to number
  var number = parseInt(input);

  if (Number.isNaN(number)) {
    return _ERROR2.default.value;
  }

  // Return error.if number is not decimal, is lower than -512, or is greater than 511
  if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) {
    return _ERROR2.default.num;
  }

  // Ignore places and return a 10-character binary number if number is negative
  if (number < 0) {
    return '1' + (0, _REPT.REPT)('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
  }

  // Convert decimal number to binary
  var result = parseInt(number, 10).toString(2);

  // Return binary number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error.if places is nonnumeric
    if (isNaN(places)) {
      return _ERROR2.default.value;
    }

    // Return error.if places is negative
    if (places < 0) {
      return _ERROR2.default.num;
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return places >= result.length ? (0, _REPT.REPT)('0', places - result.length) + result : _ERROR2.default.num;
  }
}
},{"./ERROR":20,"./REPT":61}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIVIDE = DIVIDE;
function DIVIDE(a, b) {
  return a / b;
}
},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EQ = EQ;
function EQ(a, b) {
  // Unlike JavaScript the string comparisions are case-insensitive
  if (typeof a === "string" && typeof b === "string") {
    return a.toLowerCase() === b.toLowerCase();
  } else {
    return a === b;
  }
}
},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// List of errors in the spreadsheet system

var nil = new Error('#NULL!'),
    div0 = new Error('#DIV/0!'),
    value = new Error('#VALUE?'),
    ref = new Error('#REF!'),
    name = new Error('#NAME?'),
    num = new Error('#NUM!'),
    na = new Error('#N/A'),
    error = new Error('#Error('),
    data = new Error('#GETTING_DATA'),
    missing = new Error('#MISSING'),
    unknown = new Error('#UNKNOWN');

exports.default = {
  nil: nil,
  div0: div0,
  value: value,
  ref: ref,
  name: name,
  num: num,
  na: na,
  error: error,
  data: data,
  missing: missing,
  unknown: unknown
};
},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FILTER = FILTER;
/* The filter an array or a range by a set of filters */

function FILTER(range) {
  for (var _len = arguments.length, filters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    filters[_key - 1] = arguments[_key];
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
},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIND = FIND;

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FIND(find_text, within_text, position) {
  if (!within_text) {
    return null;
  }
  position = typeof position === 'undefined' ? 1 : position;
  position = within_text.indexOf(find_text, position - 1) + 1;
  return position === 0 ? _ERROR2.default.value : position;
}
},{"./ERROR":20}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FLATTEN = FLATTEN;
function FLATTEN(ref) {
  return ref.reduce(function (a, b) {
    return a.concat(b);
  }, []);
}
},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GT = GT;

var _ISARRAY = require('./ISARRAY');

var _ISRANGE = require('./ISRANGE');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GT(a, b) {
  if ((0, _ISRANGE.ISRANGE)(a) && (0, _ISRANGE.ISRANGE)(b)) {
    return _ERROR2.default.na;
  } else if ((0, _ISARRAY.ISARRAY)(a) && (0, _ISARRAY.ISARRAY)(b)) {
    return _ERROR2.default.na;
  } else if ((0, _ISRANGE.ISRANGE)(a) || (0, _ISARRAY.ISARRAY)(a)) {
    return a.map(function (d) {
      return d > b;
    });
  } else if ((0, _ISRANGE.ISRANGE)(b) || (0, _ISARRAY.ISARRAY)(b)) {
    return b.map(function (d) {
      return d > a;
    });
  } else {
    return a > b;
  }
}
},{"./ERROR":20,"./ISARRAY":33,"./ISRANGE":42}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GTE = GTE;

var _RANGE = require('./RANGE');

var _ISARRAY = require('./ISARRAY');

var _ISRANGE = require('./ISRANGE');

function GTE(a, b) {
  if ((0, _ISRANGE.ISRANGE)(a) && (0, _ISRANGE.ISRANGE)(b)) {
    return error.na;
  } else if ((0, _ISARRAY.ISARRAY)(a) && (0, _ISARRAY.ISARRAY)(b)) {
    return error.na;
  } else if ((0, _ISRANGE.ISRANGE)(a) || (0, _ISARRAY.ISARRAY)(a)) {
    return a.map(function (d) {
      return d >= b;
    });
  } else if ((0, _ISRANGE.ISRANGE)(b) || (0, _ISARRAY.ISARRAY)(b)) {
    return b.map(function (d) {
      return d >= a;
    });
  } else {
    return a >= b;
  }
}
},{"./ISARRAY":33,"./ISRANGE":42,"./RANGE":60}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GUID = GUID;
// credit to http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
// rfc4122 version 4 compliant solution

/* Generate a globally unique identifier
 */
function GUID() {
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
  return guid;
};
},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HLOOKUP = HLOOKUP;

var _ISBLANK = require("./ISBLANK");

function HLOOKUP(needle, table, index, exactmatch) {
    if (typeof needle === "undefined" || (0, _ISBLANK.ISBLANK)(needle)) {
        return null;
    }

    var index = index || 0,
        row = table[0];

    for (var i = 0; i < row.length; i++) {

        if (exactmatch && row[i] === needle || row[i].toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
            return index < table.length + 1 ? table[index - 1][i] : table[0][i];
        }
    }

    return error.na;
}
},{"./ISBLANK":34}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IFNA = IFNA;

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IFNA(value, value_if_na) {
    return value === _ERROR2.default.na ? value_if_na : value;
}
},{"./ERROR":20}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IN = IN;

var _ISBLANK = require('./ISBLANK');

var _ISARRAY = require('./ISARRAY');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Find a needle in a lookup
function IN(needle, lookup) {

  if ((0, _ISBLANK.ISBLANK)(needle) && (0, _ISBLANK.ISBLANK)(lookup)) {
    return _ERROR2.default.na;
  }

  if (!(0, _ISARRAY.ISARRAY)(lookup)) {
    return _ERROR2.default.na;
  }

  return lookup.some(function (n) {
    return n === needle;
  });
}
},{"./ERROR":20,"./ISARRAY":33,"./ISBLANK":34}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INDEX2COL = INDEX2COL;

var _CONSTANTS = require('./CONSTANTS');

var _INDEX2ROW = require('./INDEX2ROW');

/* Isolate the column from a cell index */
function INDEX2COL(index) {
  return index - (0, _INDEX2ROW.INDEX2ROW)(index) * _CONSTANTS.MaxCols;
}
},{"./CONSTANTS":13,"./INDEX2ROW":31}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INDEX2ROW = INDEX2ROW;

var _CONSTANTS = require('./CONSTANTS');

function INDEX2ROW(index) {
  return Math.floor(index / _CONSTANTS.MaxCols);
} /* Isolate the row from a cell index */
},{"./CONSTANTS":13}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INDIRECT = INDIRECT;

var _CELL = require('./CELL');

function INDIRECT(ref) {
  console.log(this);
  return new _CELL.CELL(this, ref.index);
} /* Returns a cell indirection
   */
},{"./CELL":7}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ISARRAY = ISARRAY;
function ISARRAY(arr) {
    return Array.isArray(arr);
}
},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ISBLANK = ISBLANK;
function ISBLANK(value) {
    return typeof value === 'undefined' || value === null;
};
},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ISEMAIL = ISEMAIL;
function ISEMAIL(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};
},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISERR = ISERR;

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ISERR(value) {
  return value !== _ERROR2.default.na && value.constructor.name === 'Error' || typeof value === 'number' && (Number.isNaN(value) || !Number.isFinite(value));
}
},{"./ERROR":20}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ISERROR = ISERROR;

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

var _ISERR = require('./ISERR');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ISERROR(value) {
    return (0, _ISERR.ISERR)(value) || value === _ERROR2.default.na;
}
},{"./ERROR":20,"./ISERR":36}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ISEVEN = ISEVEN;
function ISEVEN(value) {
    return Math.floor(Math.abs(value)) & 1 ? false : true;
}
},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISNA = ISNA;

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ISNA(value) {
  return value === _ERROR2.default.na;
}
},{"./ERROR":20}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ISNUMBER = ISNUMBER;
function ISNUMBER(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
}
},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ISODD = ISODD;
function ISODD(value) {
    return Math.floor(Math.abs(value)) & 1 ? true : false;
}
},{}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISRANGE = ISRANGE;
function ISRANGE(v) {
  return v.constructor.name === 'RANGE';
}
},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISREF = ISREF;
function ISREF(ref) {
  return ref.hasOwnProperty('topLeft');
}
},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ISTEXT = ISTEXT;
function ISTEXT(value) {
    return typeof value === 'string';
};
},{}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISURL = ISURL;
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
},{}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LOOKUP = LOOKUP;
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
},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOWER = LOWER;
function LOWER(str) {
  return str.toLowerCase();
}
},{}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LT = LT;

var _RANGE = require('./RANGE');

var _ISARRAY = require('./ISARRAY');

var _ISRANGE = require('./ISRANGE');

function LT(a, b) {
  if ((0, _ISRANGE.ISRANGE)(a) && (0, _ISRANGE.ISRANGE)(b)) {
    return error.na;
  } else if ((0, _ISARRAY.ISARRAY)(a) && (0, _ISARRAY.ISARRAY)(b)) {
    return error.na;
  } else if ((0, _ISRANGE.ISRANGE)(a) || (0, _ISARRAY.ISARRAY)(a)) {
    return a.map(function (d) {
      return d < b;
    });
  } else if ((0, _ISRANGE.ISRANGE)(b) || (0, _ISARRAY.ISARRAY)(b)) {
    return b.map(function (d) {
      return d < a;
    });
  } else {
    return a < b;
  }
}
},{"./ISARRAY":33,"./ISRANGE":42,"./RANGE":60}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LTE = LTE;

var _RANGE = require('./RANGE');

var _ISARRAY = require('./ISARRAY');

var _ISRANGE = require('./ISRANGE');

function LTE(a, b) {
  if ((0, _ISRANGE.ISRANGE)(a) && (0, _ISRANGE.ISRANGE)(b)) {
    return error.na;
  } else if ((0, _ISARRAY.ISARRAY)(a) && (0, _ISARRAY.ISARRAY)(b)) {
    return error.na;
  } else if ((0, _ISRANGE.ISRANGE)(a) || (0, _ISARRAY.ISARRAY)(a)) {
    return a.map(function (d) {
      return d <= b;
    });
  } else if ((0, _ISRANGE.ISRANGE)(b) || (0, _ISARRAY.ISARRAY)(b)) {
    return b.map(function (d) {
      return d <= a;
    });
  } else {
    return a <= b;
  }
}
},{"./ISARRAY":33,"./ISRANGE":42,"./RANGE":60}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MAX = MAX;

var _FLATTEN = require('./FLATTEN');

function MAX() {
    (0, _FLATTEN.FLATTEN)(arguments).reduce(function (max, next) {
        if (typeof x !== 'number' || x !== x) {
            return max;
        }

        return Math.max(max, next);
    });
}
},{"./FLATTEN":23}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MULTIPLY = MULTIPLY;
function MULTIPLY(a, b) {
  return a * b;
}
},{}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.N = N;

var _ISNUMBER = require('./ISNUMBER');

var _ISERROR = require('./ISERROR');

var _SERIAL = require('./SERIAL');

function N(value) {
  if ((0, _ISNUMBER.ISNUMBER)(value)) {
    return value;
  }
  if (value instanceof Date) {
    return (0, _SERIAL.SERIAL)(value);
  }
  if (value === true) {
    return 1;
  }
  if (value === false) {
    return 0;
  }
  if ((0, _ISERROR.ISERROR)(value)) {
    return value;
  }
  return 0;
}
},{"./ISERROR":37,"./ISNUMBER":40,"./SERIAL":63}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NE = NE;
function NE(a, b) {
  if (typeof a === "string" && typeof b === "string") {
    return a.toLowerCase() !== b.toLowerCase();
  } else {
    return a !== b;
  }
}
},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NOT = NOT;
function NOT(value) {
  return !value;
}
},{}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OCT2DEC = OCT2DEC;

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OCT2DEC(octalNumber) {
  // Credits: Based on implementation found in https://gist.github.com/ghalimi/4525876#file-oct2dec-js
  // Return error.when number passed in is not octal or has more than 10 digits
  if (!/^[0-7]{1,10}$/.test(octalNumber)) return _ERROR2.default.num;

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
},{"./ERROR":20}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OR = OR;
// Logical OR operation

function OR() {
  for (var _len = arguments.length, criteria = Array(_len), _key = 0; _key < _len; _key++) {
    criteria[_key] = arguments[_key];
  }

  return criteria.reduce(function (a, b) {
    if (a === true) return true;
    return b;
  }, false);
}
},{}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PI = PI;

var _CONSTANTS = require('./CONSTANTS');

function PI() {
  return _CONSTANTS.τ / 2;
} // Returns half the universal circle constant
},{"./CONSTANTS":13}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PMT = PMT;

var _ISNUMBER = require('./ISNUMBER');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PMT(rate, periods, present) {
  var future = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
  var type = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

  if (!(0, _ISNUMBER.ISNUMBER)(rate) || !(0, _ISNUMBER.ISNUMBER)(periods)) {
    return _ERROR2.default.value;
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
},{"./ERROR":20,"./ISNUMBER":40}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POWER = POWER;
function POWER(val, nth) {
  return Math.pow(val, nth);
}
},{}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RANGE = undefined;

var _CELLINDEX = require('./CELLINDEX');

var _INDEX2COL = require('./INDEX2COL');

var _INDEX2ROW = require('./INDEX2ROW');

/* A range represents a subset of a worksheet.
*
* The topLeft is the cell index for the top left (inclusive)
* cell or, alternatively, it may be a function used to
* resolve a cell index.
*
* The bottom right is also a cell index or a function.
*/
function RANGE(_topLeft, _bottomRight) {

  return Object.freeze({
    /* Determine if cellIndex is within range
    */
    hit: function hit(cellIndex) {
      // The cell id puts the whole table into a single dimension. It simply needs to be between the topLeft and the bottomRight to qualify.
      return _topLeft <= cellIndex && cellIndex <= _bottomRight;
    },
    topLeft: function topLeft() {
      return _topLeft;
    },
    topRow: function topRow() {
      return (0, _INDEX2ROW.INDEX2ROW)(_topLeft);
    },
    topColumn: function topColumn() {
      return (0, _INDEX2COL.INDEX2COL)(_topLeft);
    },
    bottomRight: function bottomRight() {
      return _bottomRight;
    },
    bottomColumn: function bottomColumn() {
      return (0, _INDEX2COL.INDEX2COL)(_bottomRight);
    },
    bottomRow: function bottomRow() {
      return (0, _INDEX2ROW.INDEX2ROW)(_bottomRight);
    },
    size: function size() {
      return _topLeft - _bottomRight;
    },
    cells: function cells() {
      var start = typeof _topLeft === 'function' ? _topLeft() : _topLeft,
          end = typeof _bottomRight === 'function' ? _bottomRight() : _bottomRight,
          that = this;

      return Array.apply(start, Array(end + 1)).map(function (x, y) {
        return y;
      });
    },
    rows: function rows() {
      var self = this;
      return Array.apply(topRow(), Array(bottomRow() + 1)).map(function (x, row) {
        return Array.apply(self.topColumn(), Array(self.bottomColumn() + 1)).map(function (x, col) {
          return [(0, _CELLINDEX.CELLINDEX)(col, row)];
        });
      });
    }
  });
} /*
  * A range represents a fragment of a worksheet.
  * It is defined as two points in a flat worksheet array.
  *
  * Use address system to convert row/col to cell indexes.
  */

exports.RANGE = RANGE;
},{"./CELLINDEX":8,"./INDEX2COL":30,"./INDEX2ROW":31}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REPT = REPT;
function REPT(t, n) {
  var r = '';
  for (var i = 0; i < n; i++) {
    r += t;
  }
  return r;
}
},{}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SEARCH = SEARCH;

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return _ERROR2.default.value;
}
},{"./ERROR":20}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SERIAL = SERIAL;

var _CONSTANTS = require('./CONSTANTS');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convert a date object into a serial number.
// Credit: https://github.com/sutoiku/formula.js/
function SERIAL(date) {
    if (date.constructor.name !== 'Date') return _ERROR2.default.na;
    var diff = Math.ceil((date - _CONSTANTS.d1900) / _CONSTANTS.MilliSecondsInDay);
    return diff + (diff > 59 ? 2 : 1);
}
},{"./CONSTANTS":13,"./ERROR":20}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIN = SIN;

var _ISNUMBER = require('./ISNUMBER');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SIN(value) {

  if (!(0, _ISNUMBER.ISNUMBER)(value)) {
    return _ERROR2.default.value;
  }

  return Math.sin(value);
}
},{"./ERROR":20,"./ISNUMBER":40}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SORT = SORT;

var _ISREF = require('./ISREF');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* SORT a reference.
 *
 * The criteria may use 1 of several forms:
 *
 * SORT(reference(reference: Array, ...criteria : List<string>)
 * SORT(reference(reference: Range, ...criteria : List<string>)
 *
 * The List<function> will be reduced into a single function.
 *
 * The list<string> will also be reduced into a single function which
 * interprets the strings as pairs. The odd items are fields and the
 * even ones are direction (ASC|DESC).
**/

function SORT(ref) {
  for (var _len = arguments.length, criteria = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    criteria[_key - 1] = arguments[_key];
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

  if ((0, _ISREF.ISREF)(ref) || Array.isArray(ref)) {
    return ref.sort(makeComparer());
  }

  return _ERROR2.default.na;
}
},{"./ERROR":20,"./ISREF":43}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUM = SUM;

var _FLATTEN = require('./FLATTEN');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Author: Peter Moresi
function SUM() {
  for (var _len = arguments.length, numbers = Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key];
  }

  return (0, _FLATTEN.FLATTEN)((0, _FLATTEN.FLATTEN)(numbers)).reduce(function (a, b) {
    if (typeof b !== 'number') {
      return _ERROR2.default.value;
    }
    return a + b;
  });
}
},{"./ERROR":20,"./FLATTEN":23}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SWITCH = SWITCH;

var _COND = require('./COND');

function SWITCH() {
  return _COND.COND.apply(undefined, arguments);
};
},{"./COND":12}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TAN = TAN;

var _ISNUMBER = require('./ISNUMBER');

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TAN(value) {

  if (!(0, _ISNUMBER.ISNUMBER)(value)) {
    return _ERROR2.default.value;
  }

  return Math.tan(value);
}
},{"./ERROR":20,"./ISNUMBER":40}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TAU = TAU;

var _CONSTANTS = require('./CONSTANTS');

function TAU() {
  return _CONSTANTS.τ;
} // Returns the universal circle constant
},{"./CONSTANTS":13}],70:[function(require,module,exports){
// Author: Peter Moresi
// based heavily on code from socialcalc
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TEXT = TEXT;

var _CONSTANTS = require('./CONSTANTS');

var FormatNumber = {};

FormatNumber.format_definitions = {}; // Parsed formats are stored here globally

// Other constants

FormatNumber.commands = { copy: 1, color: 2, integer_placeholder: 3, fraction_placeholder: 4, decimal: 5,
    currency: 6, general: 7, separator: 8, date: 9, comparison: 10, section: 11, style: 12 };

/* *******************

   result = FormatNumber.formatNumberWithFormat = function(rawvalue, format_string, currency_char)

   ************************* */

FormatNumber.formatNumberWithFormat = function (rawvalue, format_string, currency_char) {

    var scfn = FormatNumber;

    var op, operandstr, fromend, cval, operandstrlc;
    var startval, estartval;
    var hrs, mins, secs, ehrs, emins, esecs, ampmstr, ymd;
    var minOK, mpos;
    var result = "";
    var format;
    var section, gotcomparison, compop, compval, cpos, oppos;
    var sectioninfo;
    var i, decimalscale, scaledvalue, strvalue, strparts, integervalue, fractionvalue;
    var integerdigits2, integerpos, fractionpos, textcolor, textstyle, separatorchar, decimalchar;
    var value; // working copy to change sign, etc.

    rawvalue = rawvalue - 0; // make sure a number
    value = rawvalue;
    if (!isFinite(value)) return "NaN";

    var negativevalue = value < 0 ? 1 : 0; // determine sign, etc.
    if (negativevalue) value = -value;
    var zerovalue = value == 0 ? 1 : 0;

    currency_char = currency_char || _CONSTANTS.DefaultCurrency;

    scfn.parse_format_string(scfn.format_definitions, format_string); // make sure format is parsed
    format = scfn.format_definitions[format_string]; // Get format structure

    if (!format) throw "Format not parsed error.";

    section = format.sectioninfo.length - 1; // get number of sections - 1

    if (format.hascomparison) {
        // has comparisons - determine which section
        section = 0; // set to which section we will use
        gotcomparison = 0; // this section has no comparison
        for (cpos = 0;; cpos++) {
            // scan for comparisons
            op = format.operators[cpos];
            operandstr = format.operands[cpos]; // get next operator and operand
            if (!op) {
                // at end with no match
                if (gotcomparison) {
                    // if comparison but no match
                    format_string = "General"; // use default of General
                    scfn.parse_format_string(scfn.format_definitions, format_string);
                    format = scfn.format_definitions[format_string];
                    section = 0;
                }
                break; // if no comparision, matches on this section
            }
            if (op == scfn.commands.section) {
                // end of section
                if (!gotcomparison) {
                    // no comparison, so it's a match
                    break;
                }
                gotcomparison = 0;
                section++; // check out next one
                continue;
            }
            if (op == scfn.commands.comparison) {
                // found a comparison - do we meet it?
                i = operandstr.indexOf(":");
                compop = operandstr.substring(0, i);
                compval = operandstr.substring(i + 1) - 0;
                if (compop == "<" && rawvalue < compval || compop == "<=" && rawvalue <= compval || compop == "=" && rawvalue == compval || compop == "<>" && rawvalue != compval || compop == ">=" && rawvalue >= compval || compop == ">" && rawvalue > compval) {
                    // a match
                    break;
                }
                gotcomparison = 1;
            }
        }
    } else if (section > 0) {
        // more than one section (separated by ";")
        if (section == 1) {
            // two sections
            if (negativevalue) {
                negativevalue = 0; // sign will provided by section, not automatically
                section = 1; // use second section for negative values
            } else {
                    section = 0; // use first for all others
                }
        } else if (section == 2) {
                // three sections
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

    if (typeof scaledvalue != "number") return "NaN";
    if (!isFinite(scaledvalue)) return "NaN";

    strvalue = scaledvalue + ""; // convert to string (Number.toFixed doesn't do all we need)

    //   strvalue = value.toFixed(sectioninfo.fractiondigits); // cut down to required number of decimal digits
    // and convert to string

    if (scaledvalue == 0 && (sectioninfo.fractiondigits || sectioninfo.integerdigits)) {
        negativevalue = 0; // no "-0" unless using multiple sections or General
    }

    if (strvalue.indexOf("e") >= 0) {
        // converted to scientific notation
        return rawvalue + ""; // Just return plain converted raw value
    }

    strparts = strvalue.match(/^\+{0,1}(\d*)(?:\.(\d*)){0,1}$/); // get integer and fraction parts
    if (!strparts) return "NaN"; // if not a number
    integervalue = strparts[1];
    if (!integervalue || integervalue == "0") integervalue = "";
    fractionvalue = strparts[2];
    if (!fractionvalue) fractionvalue = "";

    if (sectioninfo.hasdate) {
        // there are date placeholders
        if (rawvalue < 0) {
            // bad date
            return "??-???-??&nbsp;??:??:??";
        }
        startval = (rawvalue - Math.floor(rawvalue)) * _CONSTANTS.SecondsInDay; // get date/time parts
        estartval = rawvalue * _CONSTANTS.SecondsInDay; // do elapsed time version, too
        hrs = Math.floor(startval / _CONSTANTS.SecondsInHour);
        ehrs = Math.floor(estartval / _CONSTANTS.SecondsInHour);
        startval = startval - hrs * _CONSTANTS.SecondsInHour;
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
        fractionvalue = secs - Math.floor(secs) + ""; // for "hh:mm:ss.000"
        fractionvalue = fractionvalue.substring(2); // skip "0."

        ymd = FormatNumber.convert_date_julian_to_gregorian(Math.floor(rawvalue + _CONSTANTS.JulianOffset));

        minOK = 0; // says "m" can be minutes if true
        mspos = sectioninfo.sectionstart; // m scan position in ops
        for (;; mspos++) {
            // scan for "m" and "mm" to see if any minutes fields, and am/pm
            op = format.operators[mspos];
            operandstr = format.operands[mspos]; // get next operator and operand
            if (!op) break; // don't go past end
            if (op == scfn.commands.section) break;
            if (op == scfn.commands.date) {
                if ((operandstr.toLowerCase() == "am/pm" || operandstr.toLowerCase() == "a/p") && !ampmstr) {
                    if (hrs >= 12) {
                        hrs -= 12;
                        ampmstr = operandstr.toLowerCase() == "a/p" ? _CONSTANTS.PM1 : _CONSTANTS.PM; // "P" : "PM";
                    } else {
                            ampmstr = operandstr.toLowerCase() == "a/p" ? _CONSTANTS.AM1 : _CONSTANTS.AM; // "A" : "AM";
                        }
                    if (operandstr.indexOf(ampmstr) < 0) ampmstr = ampmstr.toLowerCase(); // have case match case in format
                }
                if (minOK && (operandstr == "m" || operandstr == "mm")) {
                    format.operands[mspos] += "in"; // turn into "min" or "mmin"
                }
                if (operandstr.charAt(0) == "h") {
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
                if (minOK && (operandstr == "m" || operandstr == "mm")) {
                    format.operands[mspos] += "in"; // turn into "min" or "mmin"
                }
                if (operandstr == "ss") {
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
    textcolor = "";
    textstyle = "";
    separatorchar = _CONSTANTS.SeparatorChar;
    if (separatorchar.indexOf(" ") >= 0) separatorchar = separatorchar.replace(/ /g, "&nbsp;");
    decimalchar = _CONSTANTS.DecimalChar;
    if (decimalchar.indexOf(" ") >= 0) decimalchar = decimalchar.replace(/ /g, "&nbsp;");

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
                result += "-";
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
                if (operandstr == "0" || operandstr == "?") {
                    // fill with appropriate characters
                    result += operandstr == "0" ? "0" : "&nbsp;";
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
                if (operandstr == "0" || operandstr == "?") {
                    result += operandstr == "0" ? "0" : "&nbsp;";
                }
            } else {
                result += fractionvalue.charAt(fractionpos);
            }
            fractionpos++;
        } else if (op == scfn.commands.decimal) {
            // decimal point
            if (negativevalue) {
                result += "-";
                negativevalue = 0;
            }
            result += decimalchar;
        } else if (op == scfn.commands.currency) {
            // currency symbol
            if (negativevalue) {
                result += "-";
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
                if (!isFinite(value)) return "NaN";
            }
            if (negativevalue) {
                result += "-";
            }
            strvalue = value + ""; // convert original value to string
            if (strvalue.indexOf("e") >= 0) {
                // converted to scientific notation
                result += strvalue;
                continue;
            }
            strparts = strvalue.match(/^\+{0,1}(\d*)(?:\.(\d*)){0,1}$/); // get integer and fraction parts
            integervalue = strparts[1];
            if (!integervalue || integervalue == "0") integervalue = "";
            fractionvalue = strparts[2];
            if (!fractionvalue) fractionvalue = "";
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
                result += "0";
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
            if (operandstrlc == "y" || operandstrlc == "yy") {
                result += (ymd.year + "").substring(2);
            } else if (operandstrlc == "yyyy") {
                result += ymd.year + "";
            } else if (operandstrlc == "d") {
                result += ymd.day + "";
            } else if (operandstrlc == "dd") {
                cval = 1000 + ymd.day;
                result += (cval + "").substr(2);
            } else if (operandstrlc == "ddd") {
                cval = Math.floor(rawvalue + 6) % 7;
                result += _CONSTANTS.DayNames3[cval];
            } else if (operandstrlc == "dddd") {
                cval = Math.floor(rawvalue + 6) % 7;
                result += _CONSTANTS.DayNames[cval];
            } else if (operandstrlc == "m") {
                result += ymd.month + "";
            } else if (operandstrlc == "mm") {
                cval = 1000 + ymd.month;
                result += (cval + "").substr(2);
            } else if (operandstrlc == "mmm") {
                result += _CONSTANTS.MonthNames3[ymd.month - 1];
            } else if (operandstrlc == "mmmm") {
                result += _CONSTANTS.MonthNames[ymd.month - 1];
            } else if (operandstrlc == "mmmmm") {
                result += _CONSTANTS.MonthNames[ymd.month - 1].charAt(0);
            } else if (operandstrlc == "h") {
                result += hrs + "";
            } else if (operandstrlc == "h]") {
                result += ehrs + "";
            } else if (operandstrlc == "mmin") {
                cval = 1000 + mins + "";
                result += cval.substr(2);
            } else if (operandstrlc == "mm]") {
                if (emins < 100) {
                    cval = 1000 + emins + "";
                    result += cval.substr(2);
                } else {
                    result += emins + "";
                }
            } else if (operandstrlc == "min") {
                result += mins + "";
            } else if (operandstrlc == "m]") {
                result += emins + "";
            } else if (operandstrlc == "hh") {
                cval = 1000 + hrs + "";
                result += cval.substr(2);
            } else if (operandstrlc == "s") {
                cval = Math.floor(secs);
                result += cval + "";
            } else if (operandstrlc == "ss") {
                cval = 1000 + Math.floor(secs) + "";
                result += cval.substr(2);
            } else if (operandstrlc == "am/pm" || operandstrlc == "a/p") {
                result += ampmstr;
            } else if (operandstrlc == "ss]") {
                if (esecs < 100) {
                    cval = 1000 + Math.floor(esecs) + "";
                    result += cval.substr(2);
                } else {
                    cval = Math.floor(esecs);
                    result += cval + "";
                }
            }
        } else if (op == scfn.commands.section) {
            // end of section
            break;
        } else if (op == scfn.commands.comparison) {
            // ignore
            continue;
        } else {
            result += "!! Parse error.!!";
        }
    }

    if (textcolor) {
        result = '<span style="color:' + textcolor + ';">' + result + '</span>';
    }
    if (textstyle) {
        result = '<span style="' + textstyle + ';">' + result + '</span>';
    }

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
            format.operands.push("&nbsp;");
            lastwasunderscore = false;
            continue;
        }
        if (ingeneral) {
            if ("general".charAt(ingeneral) == ch.toLowerCase()) {
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
        if (indate) {
            // last char was part of a date placeholder
            if (indate.charAt(0) == ch) {
                // another of the same char
                indate += ch; // accumulate it
                continue;
            }
            format.operators.push(scfn.commands.date); // something else, save date info
            format.operands.push(indate);
            sectioninfo.hasdate = 1;
            indate = "";
        }
        if (ampmstr) {
            ampmstr += ch;
            part = ampmstr.toLowerCase();
            if (part != "am/pm".substring(0, part.length) && part != "a/p".substring(0, part.length)) {
                ampstr = "";
            } else if (part == "am/pm" || part == "a/p") {
                format.operators.push(scfn.commands.date);
                format.operands.push(ampmstr);
                ampmstr = "";
            }
            continue;
        }
        if (ch == "#" || ch == "0" || ch == "?") {
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
        } else if (ch == ".") {
            // decimal point
            lastwasinteger = 0;
            format.operators.push(scfn.commands.decimal);
            format.operands.push(ch);
            integerpart = 0;
        } else if (ch == '$') {
            // currency char
            lastwasinteger = 0;
            format.operators.push(scfn.commands.currency);
            format.operands.push(ch);
        } else if (ch == ",") {
            if (lastwasinteger) {
                sectioninfo.commas++;
            } else {
                format.operators.push(scfn.commands.copy);
                format.operands.push(ch);
            }
        } else if (ch == "%") {
            lastwasinteger = 0;
            sectioninfo.percent++;
            format.operators.push(scfn.commands.copy);
            format.operands.push(ch);
        } else if (ch == '"') {
            lastwasinteger = 0;
            inquote = 1;
            quotestr = "";
        } else if (ch == '[') {
            lastwasinteger = 0;
            inbracket = 1;
            bracketstr = "";
        } else if (ch == '\\') {
            lastwasslash = 1;
            lastwasinteger = 0;
        } else if (ch == '*') {
            lastwasasterisk = 1;
            lastwasinteger = 0;
        } else if (ch == '_') {
            lastwasunderscore = 1;
            lastwasinteger = 0;
        } else if (ch == ";") {
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
        } else if (ch.toLowerCase() == "g") {
            ingeneral = 1;
            lastwasinteger = 0;
        } else if (ch.toLowerCase() == "a") {
            ampmstr = ch;
            lastwasinteger = 0;
        } else if ("dmyhHs".indexOf(ch) >= 0) {
            indate = ch;
        } else {
            lastwasinteger = 0;
            format.operators.push(scfn.commands.copy);
            format.operands.push(ch);
        }
    }

    if (indate) {
        // last char was part of unsaved date placeholder
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

    if (bracketstr.charAt(0) == '$') {
        // currency
        bracketdata.operator = scfn.commands.currency;
        parts = bracketstr.match(/^\$(.+?)(\-.+?){0,1}$/);
        if (parts) {
            bracketdata.operand = parts[1] || _CONSTANTS.DefaultCurrency || '$';
        } else {
            bracketdata.operand = bracketstr.substring(1) || _CONSTANTS.DefaultCurrency || '$';
        }
    } else if (bracketstr == '?$') {
        bracketdata.operator = scfn.commands.currency;
        bracketdata.operand = '[?$]';
    } else if (_CONSTANTS.AllowedColors[bracketstr.toUpperCase()]) {
        bracketdata.operator = scfn.commands.color;
        bracketdata.operand = _CONSTANTS.AllowedColors[bracketstr.toUpperCase()];
    } else if (parts = bracketstr.match(/^style=([^"]*)$/)) {
        // [style=...]
        bracketdata.operator = scfn.commands.style;
        bracketdata.operand = parts[1];
    } else if (bracketstr == ",") {
        bracketdata.operator = scfn.commands.separator;
        bracketdata.operand = bracketstr;
    } else if (AllowedDates[bracketstr.toUpperCase()]) {
        bracketdata.operator = scfn.commands.date;
        bracketdata.operand = AllowedDates[bracketstr.toUpperCase()];
    } else if (parts = bracketstr.match(/^[<>=]/)) {
        // comparison operator
        parts = bracketstr.match(/^([<>=]+)(.+)$/); // split operator and value
        bracketdata.operator = scfn.commands.comparison;
        bracketdata.operand = parts[1] + ":" + parts[2];
    } else {
        // unknown bracket
        bracketdata.operator = scfn.commands.copy;
        bracketdata.operand = "[" + bracketstr + "]";
    }

    return bracketdata;
};

/* *******************

   juliandate = FormatNumber.convert_date_gregorian_to_julian(year, month, day)

   From: http://aa.usno.navy.mil/faq/docs/JD_Formula.html
   Uses: Fliegel, H. F. and van Flandern, T. C. (1968). Communications of the ACM, Vol. 11, No. 10 (October, 1968).
   Translated from the FORTRAN

   I= YEAR
   J= MONTH
   K= DAY
   C
   JD= K-32075+1461*(I+4800+(J-14)/12)/4+367*(J-2-(J-14)/12*12)
   2    /12-3*((I+4900+(J-14)/12)/100)/4

   ************************* */

FormatNumber.convert_date_gregorian_to_julian = function (year, month, day) {

    var juliandate;

    juliandate = day - 32075 + intFunc(1461 * (year + 4800 + intFunc((month - 14) / 12)) / 4);
    juliandate += intFunc(367 * (month - 2 - intFunc((month - 14) / 12) * 12) / 12);
    juliandate = juliandate - intFunc(3 * intFunc((year + 4900 + intFunc((month - 14) / 12)) / 100) / 4);

    return juliandate;
};

/* *******************

   ymd = FormatNumber.convert_date_julian_to_gregorian(juliandate)

   ymd->{}
   .year
   .month
   .day

   From: http://aa.usno.navy.mil/faq/docs/JD_Formula.html
   Uses: Fliegel, H. F. and van Flandern, T. C. (1968). Communications of the ACM, Vol. 11, No. 10 (October, 1968).
   Translated from the FORTRAN

   ************************* */

FormatNumber.convert_date_julian_to_gregorian = function (juliandate) {

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

    return { year: I, month: J, day: K };
};

function intFunc(n) {
    if (n < 0) {
        return -Math.floor(-n);
    } else {
        return Math.floor(n);
    }
}

function TEXT(value, format, currency_char) {
    return FormatNumber.formatNumberWithFormat(value, format, currency_char);
}
},{"./CONSTANTS":13}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNIQUE = UNIQUE;
function UNIQUE(arr) {
  return arr.reduce(function (p, c) {
    if (p.indexOf(c) < 0) p.push(c);
    return p;
  }, []);
}
},{}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPPER = UPPER;
function UPPER(string) {
  return string.toUpperCase();
}
},{}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VLOOKUP = VLOOKUP;

var _ERROR = require('./ERROR');

var _ERROR2 = _interopRequireDefault(_ERROR);

var _ISBLANK = require('./ISBLANK');

var _ISERROR = require('./ISERROR');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VLOOKUP(needle, table, index, exactmatch) {

    if ((0, _ISERROR.ISERROR)(needle) || (0, _ISBLANK.ISBLANK)(needle)) {
        return needle;
    }

    index = index || 0;
    exactmatch = exactmatch || false;
    for (var i = 0; i < table.length; i++) {
        var row = table[i];
        if (exactmatch && row[0] === needle || row[0] === needle || typeof row[0] === "string" && row[0].toLowerCase().indexOf(needle.toLowerCase()) != -1) {
            return index < row.length + 1 ? row[index - 1] : row[0];
        }
    }

    return _ERROR2.default.na;
}
},{"./ERROR":20,"./ISBLANK":34,"./ISERROR":37}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.functions = exports.engineeringFunctions = exports.textFunctions = exports.statisticFunctions = exports.financialFunctions = exports.dateTimeFunctions = exports.mathFunctions = exports.dataFunctions = exports.referenceFunctions = exports.informationFunctions = exports.logicalFunctions = exports.VLOOKUP = exports.UPPER = exports.UNIQUE = exports.TEXT = exports.TAU = exports.TAN = exports.SWITCH = exports.SUM = exports.SORT = exports.SIN = exports.SEARCH = exports.REPT = exports.RANGE = exports.POWER = exports.PMT = exports.PI = exports.OR = exports.OCT2DEC = exports.NOT = exports.NE = exports.N = exports.MULTIPLY = exports.MAX = exports.LTE = exports.LT = exports.LOWER = exports.LOOKUP = exports.ISURL = exports.ISTEXT = exports.ISREF = exports.ISRANGE = exports.ISODD = exports.ISNUMBER = exports.ISNA = exports.ISEVEN = exports.ISERROR = exports.ISEMAIL = exports.ISBLANK = exports.ISARRAY = exports.INDIRECT = exports.INDEX2ROW = exports.INDEX2COL = exports.IN = exports.IFNA = exports.HLOOKUP = exports.GUID = exports.GTE = exports.GT = exports.FLATTEN = exports.FIND = exports.FILTER = exports.EQ = exports.DIVIDE = exports.DEC2BIN = exports.DATEDIF = exports.DATE = exports.COS = exports.COND = exports.CONCATENATE = exports.CLEAN = exports.CHOOSE = exports.CELLINDEX = exports.CELL = exports.BIN2DEC = exports.AND = exports.ADD = exports.ACOS = exports.ABS = undefined;

var _ABS = require('./ABS');

Object.defineProperty(exports, 'ABS', {
  enumerable: true,
  get: function get() {
    return _ABS.ABS;
  }
});

var _ACOS = require('./ACOS');

Object.defineProperty(exports, 'ACOS', {
  enumerable: true,
  get: function get() {
    return _ACOS.ACOS;
  }
});

var _ADD = require('./ADD');

Object.defineProperty(exports, 'ADD', {
  enumerable: true,
  get: function get() {
    return _ADD.ADD;
  }
});

var _AND = require('./AND');

Object.defineProperty(exports, 'AND', {
  enumerable: true,
  get: function get() {
    return _AND.AND;
  }
});

var _BIN2DEC = require('./BIN2DEC');

Object.defineProperty(exports, 'BIN2DEC', {
  enumerable: true,
  get: function get() {
    return _BIN2DEC.BIN2DEC;
  }
});

var _CELL = require('./CELL');

Object.defineProperty(exports, 'CELL', {
  enumerable: true,
  get: function get() {
    return _CELL.CELL;
  }
});

var _CELLINDEX = require('./CELLINDEX');

Object.defineProperty(exports, 'CELLINDEX', {
  enumerable: true,
  get: function get() {
    return _CELLINDEX.CELLINDEX;
  }
});

var _CHOOSE = require('./CHOOSE');

Object.defineProperty(exports, 'CHOOSE', {
  enumerable: true,
  get: function get() {
    return _CHOOSE.CHOOSE;
  }
});

var _CLEAN = require('./CLEAN');

Object.defineProperty(exports, 'CLEAN', {
  enumerable: true,
  get: function get() {
    return _CLEAN.CLEAN;
  }
});

var _CONCATENATE = require('./CONCATENATE');

Object.defineProperty(exports, 'CONCATENATE', {
  enumerable: true,
  get: function get() {
    return _CONCATENATE.CONCATENATE;
  }
});

var _COND = require('./COND');

Object.defineProperty(exports, 'COND', {
  enumerable: true,
  get: function get() {
    return _COND.COND;
  }
});

var _COS = require('./COS');

Object.defineProperty(exports, 'COS', {
  enumerable: true,
  get: function get() {
    return _COS.COS;
  }
});

var _DATE = require('./DATE');

Object.defineProperty(exports, 'DATE', {
  enumerable: true,
  get: function get() {
    return _DATE.DATE;
  }
});

var _DATEDIF = require('./DATEDIF');

Object.defineProperty(exports, 'DATEDIF', {
  enumerable: true,
  get: function get() {
    return _DATEDIF.DATEDIF;
  }
});

var _DEC2BIN = require('./DEC2BIN');

Object.defineProperty(exports, 'DEC2BIN', {
  enumerable: true,
  get: function get() {
    return _DEC2BIN.DEC2BIN;
  }
});

var _DIVIDE = require('./DIVIDE');

Object.defineProperty(exports, 'DIVIDE', {
  enumerable: true,
  get: function get() {
    return _DIVIDE.DIVIDE;
  }
});

var _EQ = require('./EQ');

Object.defineProperty(exports, 'EQ', {
  enumerable: true,
  get: function get() {
    return _EQ.EQ;
  }
});

var _FILTER = require('./FILTER');

Object.defineProperty(exports, 'FILTER', {
  enumerable: true,
  get: function get() {
    return _FILTER.FILTER;
  }
});

var _FIND = require('./FIND');

Object.defineProperty(exports, 'FIND', {
  enumerable: true,
  get: function get() {
    return _FIND.FIND;
  }
});

var _FLATTEN = require('./FLATTEN');

Object.defineProperty(exports, 'FLATTEN', {
  enumerable: true,
  get: function get() {
    return _FLATTEN.FLATTEN;
  }
});

var _GT = require('./GT');

Object.defineProperty(exports, 'GT', {
  enumerable: true,
  get: function get() {
    return _GT.GT;
  }
});

var _GTE = require('./GTE');

Object.defineProperty(exports, 'GTE', {
  enumerable: true,
  get: function get() {
    return _GTE.GTE;
  }
});

var _GUID = require('./GUID');

Object.defineProperty(exports, 'GUID', {
  enumerable: true,
  get: function get() {
    return _GUID.GUID;
  }
});

var _HLOOKUP = require('./HLOOKUP');

Object.defineProperty(exports, 'HLOOKUP', {
  enumerable: true,
  get: function get() {
    return _HLOOKUP.HLOOKUP;
  }
});

var _IFNA = require('./IFNA');

Object.defineProperty(exports, 'IFNA', {
  enumerable: true,
  get: function get() {
    return _IFNA.IFNA;
  }
});

var _IN = require('./IN');

Object.defineProperty(exports, 'IN', {
  enumerable: true,
  get: function get() {
    return _IN.IN;
  }
});

var _INDEX2COL = require('./INDEX2COL');

Object.defineProperty(exports, 'INDEX2COL', {
  enumerable: true,
  get: function get() {
    return _INDEX2COL.INDEX2COL;
  }
});

var _INDEX2ROW = require('./INDEX2ROW');

Object.defineProperty(exports, 'INDEX2ROW', {
  enumerable: true,
  get: function get() {
    return _INDEX2ROW.INDEX2ROW;
  }
});

var _INDIRECT = require('./INDIRECT');

Object.defineProperty(exports, 'INDIRECT', {
  enumerable: true,
  get: function get() {
    return _INDIRECT.INDIRECT;
  }
});

var _ISARRAY = require('./ISARRAY');

Object.defineProperty(exports, 'ISARRAY', {
  enumerable: true,
  get: function get() {
    return _ISARRAY.ISARRAY;
  }
});

var _ISBLANK = require('./ISBLANK');

Object.defineProperty(exports, 'ISBLANK', {
  enumerable: true,
  get: function get() {
    return _ISBLANK.ISBLANK;
  }
});

var _ISEMAIL = require('./ISEMAIL');

Object.defineProperty(exports, 'ISEMAIL', {
  enumerable: true,
  get: function get() {
    return _ISEMAIL.ISEMAIL;
  }
});

var _ISERROR = require('./ISERROR');

Object.defineProperty(exports, 'ISERROR', {
  enumerable: true,
  get: function get() {
    return _ISERROR.ISERROR;
  }
});

var _ISEVEN = require('./ISEVEN');

Object.defineProperty(exports, 'ISEVEN', {
  enumerable: true,
  get: function get() {
    return _ISEVEN.ISEVEN;
  }
});

var _ISNA = require('./ISNA');

Object.defineProperty(exports, 'ISNA', {
  enumerable: true,
  get: function get() {
    return _ISNA.ISNA;
  }
});

var _ISNUMBER = require('./ISNUMBER');

Object.defineProperty(exports, 'ISNUMBER', {
  enumerable: true,
  get: function get() {
    return _ISNUMBER.ISNUMBER;
  }
});

var _ISODD = require('./ISODD');

Object.defineProperty(exports, 'ISODD', {
  enumerable: true,
  get: function get() {
    return _ISODD.ISODD;
  }
});

var _ISRANGE = require('./ISRANGE');

Object.defineProperty(exports, 'ISRANGE', {
  enumerable: true,
  get: function get() {
    return _ISRANGE.ISRANGE;
  }
});

var _ISREF = require('./ISREF');

Object.defineProperty(exports, 'ISREF', {
  enumerable: true,
  get: function get() {
    return _ISREF.ISREF;
  }
});

var _ISTEXT = require('./ISTEXT');

Object.defineProperty(exports, 'ISTEXT', {
  enumerable: true,
  get: function get() {
    return _ISTEXT.ISTEXT;
  }
});

var _ISURL = require('./ISURL');

Object.defineProperty(exports, 'ISURL', {
  enumerable: true,
  get: function get() {
    return _ISURL.ISURL;
  }
});

var _LOOKUP = require('./LOOKUP');

Object.defineProperty(exports, 'LOOKUP', {
  enumerable: true,
  get: function get() {
    return _LOOKUP.LOOKUP;
  }
});

var _LOWER = require('./LOWER');

Object.defineProperty(exports, 'LOWER', {
  enumerable: true,
  get: function get() {
    return _LOWER.LOWER;
  }
});

var _LT = require('./LT');

Object.defineProperty(exports, 'LT', {
  enumerable: true,
  get: function get() {
    return _LT.LT;
  }
});

var _LTE = require('./LTE');

Object.defineProperty(exports, 'LTE', {
  enumerable: true,
  get: function get() {
    return _LTE.LTE;
  }
});

var _MAX = require('./MAX');

Object.defineProperty(exports, 'MAX', {
  enumerable: true,
  get: function get() {
    return _MAX.MAX;
  }
});

var _MULTIPLY = require('./MULTIPLY');

Object.defineProperty(exports, 'MULTIPLY', {
  enumerable: true,
  get: function get() {
    return _MULTIPLY.MULTIPLY;
  }
});

var _N = require('./N');

Object.defineProperty(exports, 'N', {
  enumerable: true,
  get: function get() {
    return _N.N;
  }
});

var _NE = require('./NE');

Object.defineProperty(exports, 'NE', {
  enumerable: true,
  get: function get() {
    return _NE.NE;
  }
});

var _NOT = require('./NOT');

Object.defineProperty(exports, 'NOT', {
  enumerable: true,
  get: function get() {
    return _NOT.NOT;
  }
});

var _OCT2DEC = require('./OCT2DEC');

Object.defineProperty(exports, 'OCT2DEC', {
  enumerable: true,
  get: function get() {
    return _OCT2DEC.OCT2DEC;
  }
});

var _OR = require('./OR');

Object.defineProperty(exports, 'OR', {
  enumerable: true,
  get: function get() {
    return _OR.OR;
  }
});

var _PI = require('./PI');

Object.defineProperty(exports, 'PI', {
  enumerable: true,
  get: function get() {
    return _PI.PI;
  }
});

var _PMT = require('./PMT');

Object.defineProperty(exports, 'PMT', {
  enumerable: true,
  get: function get() {
    return _PMT.PMT;
  }
});

var _POWER = require('./POWER');

Object.defineProperty(exports, 'POWER', {
  enumerable: true,
  get: function get() {
    return _POWER.POWER;
  }
});

var _RANGE = require('./RANGE');

Object.defineProperty(exports, 'RANGE', {
  enumerable: true,
  get: function get() {
    return _RANGE.RANGE;
  }
});

var _REPT = require('./REPT');

Object.defineProperty(exports, 'REPT', {
  enumerable: true,
  get: function get() {
    return _REPT.REPT;
  }
});

var _SEARCH = require('./SEARCH');

Object.defineProperty(exports, 'SEARCH', {
  enumerable: true,
  get: function get() {
    return _SEARCH.SEARCH;
  }
});

var _SIN = require('./SIN');

Object.defineProperty(exports, 'SIN', {
  enumerable: true,
  get: function get() {
    return _SIN.SIN;
  }
});

var _SORT = require('./SORT');

Object.defineProperty(exports, 'SORT', {
  enumerable: true,
  get: function get() {
    return _SORT.SORT;
  }
});

var _SUM = require('./SUM');

Object.defineProperty(exports, 'SUM', {
  enumerable: true,
  get: function get() {
    return _SUM.SUM;
  }
});

var _SWITCH = require('./SWITCH');

Object.defineProperty(exports, 'SWITCH', {
  enumerable: true,
  get: function get() {
    return _SWITCH.SWITCH;
  }
});

var _TAN = require('./TAN');

Object.defineProperty(exports, 'TAN', {
  enumerable: true,
  get: function get() {
    return _TAN.TAN;
  }
});

var _TAU = require('./TAU');

Object.defineProperty(exports, 'TAU', {
  enumerable: true,
  get: function get() {
    return _TAU.TAU;
  }
});

var _TEXT = require('./TEXT');

Object.defineProperty(exports, 'TEXT', {
  enumerable: true,
  get: function get() {
    return _TEXT.TEXT;
  }
});

var _UNIQUE = require('./UNIQUE');

Object.defineProperty(exports, 'UNIQUE', {
  enumerable: true,
  get: function get() {
    return _UNIQUE.UNIQUE;
  }
});

var _UPPER = require('./UPPER');

Object.defineProperty(exports, 'UPPER', {
  enumerable: true,
  get: function get() {
    return _UPPER.UPPER;
  }
});

var _VLOOKUP = require('./VLOOKUP');

Object.defineProperty(exports, 'VLOOKUP', {
  enumerable: true,
  get: function get() {
    return _VLOOKUP.VLOOKUP;
  }
});
var logicalFunctions = exports.logicalFunctions = ['if', 'ifna', 'iferror', 'and', 'eq', 'or', 'xor', 'not', 'lt', 'lte', 'gt', 'gte', 'ne', 'switch', 'choose', 'cond'];

var informationFunctions = exports.informationFunctions = ['isarray', 'isblank', 'isemail', 'iserror', 'iseven', 'isformula', 'islogical', 'isna', 'isnontext', 'isnumber', 'isodd', 'istext', 'isrange', 'isref', 'isurl', 'n', 'na', 'precedents', 'sheet', 'sheets', 'type'];

var referenceFunctions = exports.referenceFunctions = ['indirect', 'isref', 'rows', 'columns', 'range', 'cell', 'cellindex', 'index2addr', 'index2col', 'index2row'];

var dataFunctions = exports.dataFunctions = ['clean', 'sort', 'filter', 'unique'];

var mathFunctions = exports.mathFunctions = ['abs', 'acos', 'acosh', 'acot', 'acoth', 'add', 'aggregate', 'arabic', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'base', 'ceiling', 'combin', 'combina', 'cos', 'cosh', 'cot', 'coth', 'csc', 'csch', 'decimal', 'degrees', 'divide', 'even', 'exp', 'fact', 'factdouble', 'floor', 'gcd', 'gt', 'gte', 'int', 'lcm', 'log', 'log10', 'lt', 'lte', 'mdeterm', 'minus', 'minverse', 'mmult', 'mod', 'mround', 'multinomial', 'multiply', 'odd', 'pi', 'tau', 'power', 'product', 'quotient', 'radians', 'rand', 'randbetween', 'roman', 'round', 'rounddown', 'roundup', 'sec', 'sech', 'seriessum', 'sign', 'sin', 'sqrt', 'sqrtpi', 'subtotal', 'sum', 'tan'];

var dateTimeFunctions = exports.dateTimeFunctions = ['date', 'datevalue', 'datedif', 'day', 'days360', 'edate', 'eomonth', 'hour', 'isleapyear', 'isoweeknum', 'minute', 'month', 'networkdays', 'now', 'second', 'time', 'timevalue', 'today', 'weekday', 'weeknum', 'workday', 'year', 'yearfrac'];

var financialFunctions = exports.financialFunctions = ['accrintm', 'amorlinc', 'coupdays', 'coupdaysnc', 'coupncd', 'coupnum', 'couppcd', 'cumipmt', 'cumprinc', 'db', 'ddb', 'disc', 'dollarde', 'dollarfr', 'duration', 'effect', 'fv', 'fvschedule', 'intrate', 'irr', 'ipmt', 'mduration', 'mirr', 'nominal', 'nper', 'npv', 'oddfprice', 'oddfyield', 'pmt', 'pv'];

var statisticFunctions = exports.statisticFunctions = ['avedev', 'average', 'averagea', 'averageif', 'averageifs', 'correl', 'count', 'counta', 'countin', 'countblank', 'countif', 'countifs', 'countunique', 'devsq', 'fisher', 'fisherinv', 'forecast', 'frequency', 'gammaln', 'geomean', 'growth', 'harmean', 'intercept', 'kurt', 'large', 'linest', 'logest', 'max', 'maxa', 'median', 'min', 'mina', 'pearson', 'permut', 'permutationa', 'phi', 'prob', 'rsq', 'skew', 'slope', 'small', 'standardize', 'stdeva', 'stdevpa', 'steyx', 'transpose', 'trend', 'trimmean', 'vara', 'varpa'];

var textFunctions = exports.textFunctions = ['asc', 'bahttext', 'clean', 'char', 'code', 'concatenate', 'dbcs', 'dollar', 'exact', 'find', 'fixed', 'left', 'len', 'lower', 'join', 'mid', 'numbervalue', 'pronetic', 'proper', 'replace', 'rept', 'right', 'search', 'split', 'substitute', 't', 'text', 'trim', 'upper', 'value'];

var engineeringFunctions = exports.engineeringFunctions = ['besseli', 'besselj', 'besselk', 'bessely', 'bin2dec', 'bin2hex', 'bin2oct', 'bitand', 'bitlshift', 'bitor', 'bitrshift', 'bitxor', 'complex', 'convert', 'dec2bin', 'dec2hex', 'dec2oct', 'delta', 'erf', 'erfc', 'gestep', 'hex2bin', 'hex2dec', 'hex2oct', 'imabs', 'imaginary', 'imargument', 'imconjugate', 'imcos', 'imcosh', 'imcot', 'imdiv', 'imexp', 'imln', 'imlog19', 'imlog2', 'impower', 'improduct', 'imreal', 'imsec', 'imsech', 'imsin', 'imsinh', 'imsqrt', 'imcsc', 'imcsch', 'imsub', 'imtan', 'oct2bin', 'oct2dec', 'oct2hex'];

var functions = exports.functions = (0, _FLATTEN.FLATTEN)([logicalFunctions, informationFunctions, referenceFunctions, dataFunctions, mathFunctions, dateTimeFunctions, financialFunctions, statisticFunctions, textFunctions, engineeringFunctions]).sort();

exports.default = {
  ABS: _ABS.ABS,
  ACOS: _ACOS.ACOS,
  ADD: _ADD.ADD,
  AND: _AND.AND,
  BIN2DEC: _BIN2DEC.BIN2DEC,
  CELL: _CELL.CELL,
  CELLINDEX: _CELLINDEX.CELLINDEX,
  CHOOSE: _CHOOSE.CHOOSE,
  CLEAN: _CLEAN.CLEAN,
  CONCATENATE: _CONCATENATE.CONCATENATE,
  COND: _COND.COND,
  COS: _COS.COS,
  DATE: _DATE.DATE,
  DATEDIF: _DATEDIF.DATEDIF,
  DEC2BIN: _DEC2BIN.DEC2BIN,
  DIVIDE: _DIVIDE.DIVIDE,
  EQ: _EQ.EQ,
  FILTER: _FILTER.FILTER,
  FIND: _FIND.FIND,
  FLATTEN: _FLATTEN.FLATTEN,
  GT: _GT.GT,
  GTE: _GTE.GTE,
  GUID: _GUID.GUID,
  HLOOKUP: _HLOOKUP.HLOOKUP,
  IFNA: _IFNA.IFNA,
  IN: _IN.IN,
  INDEX2COL: _INDEX2COL.INDEX2COL,
  INDEX2ROW: _INDEX2ROW.INDEX2ROW,
  INDIRECT: _INDIRECT.INDIRECT,
  ISARRAY: _ISARRAY.ISARRAY,
  ISBLANK: _ISBLANK.ISBLANK,
  ISEMAIL: _ISEMAIL.ISEMAIL,
  ISERROR: _ISERROR.ISERROR,
  ISEVEN: _ISEVEN.ISEVEN,
  ISNA: _ISNA.ISNA,
  ISNUMBER: _ISNUMBER.ISNUMBER,
  ISODD: _ISODD.ISODD,
  ISRANGE: _ISRANGE.ISRANGE,
  ISREF: _ISREF.ISREF,
  ISTEXT: _ISTEXT.ISTEXT,
  ISURL: _ISURL.ISURL,
  LOOKUP: _LOOKUP.LOOKUP,
  LOWER: _LOWER.LOWER,
  LT: _LT.LT,
  LTE: _LTE.LTE,
  MAX: _MAX.MAX,
  MULTIPLY: _MULTIPLY.MULTIPLY,
  N: _N.N,
  NE: _NE.NE,
  NOT: _NOT.NOT,
  OCT2DEC: _OCT2DEC.OCT2DEC,
  OR: _OR.OR,
  PI: _PI.PI,
  PMT: _PMT.PMT,
  POWER: _POWER.POWER,
  RANGE: _RANGE.RANGE,
  REPT: _REPT.REPT,
  SEARCH: _SEARCH.SEARCH,
  SIN: _SIN.SIN,
  SORT: _SORT.SORT,
  SUM: _SUM.SUM,
  SWITCH: _SWITCH.SWITCH,
  TAN: _TAN.TAN,
  TAU: _TAU.TAU,
  TEXT: _TEXT.TEXT,
  UNIQUE: _UNIQUE.UNIQUE,
  UPPER: _UPPER.UPPER,
  VLOOKUP: _VLOOKUP.VLOOKUP
};
},{"./ABS":2,"./ACOS":3,"./ADD":4,"./AND":5,"./BIN2DEC":6,"./CELL":7,"./CELLINDEX":8,"./CHOOSE":9,"./CLEAN":10,"./CONCATENATE":11,"./COND":12,"./COS":14,"./DATE":15,"./DATEDIF":16,"./DEC2BIN":17,"./DIVIDE":18,"./EQ":19,"./FILTER":21,"./FIND":22,"./FLATTEN":23,"./GT":24,"./GTE":25,"./GUID":26,"./HLOOKUP":27,"./IFNA":28,"./IN":29,"./INDEX2COL":30,"./INDEX2ROW":31,"./INDIRECT":32,"./ISARRAY":33,"./ISBLANK":34,"./ISEMAIL":35,"./ISERROR":37,"./ISEVEN":38,"./ISNA":39,"./ISNUMBER":40,"./ISODD":41,"./ISRANGE":42,"./ISREF":43,"./ISTEXT":44,"./ISURL":45,"./LOOKUP":46,"./LOWER":47,"./LT":48,"./LTE":49,"./MAX":50,"./MULTIPLY":51,"./N":52,"./NE":53,"./NOT":54,"./OCT2DEC":55,"./OR":56,"./PI":57,"./PMT":58,"./POWER":59,"./RANGE":60,"./REPT":61,"./SEARCH":62,"./SIN":64,"./SORT":65,"./SUM":66,"./SWITCH":67,"./TAN":68,"./TAU":69,"./TEXT":70,"./UNIQUE":71,"./UPPER":72,"./VLOOKUP":73}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFOi9EYXRhL01hcmsvUHJvamVjdHMvZXhjZWwtanMvYXBwLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvQUJTLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvQUNPUy5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0FERC5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0FORC5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0JJTjJERUMuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9DRUxMLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvQ0VMTElOREVYLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvQ0hPT1NFLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvQ0xFQU4uanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9DT05DQVRFTkFURS5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0NPTkQuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9DT05TVEFOVFMuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9DT1MuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9EQVRFLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvREFURURJRi5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0RFQzJCSU4uanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9ESVZJREUuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9FUS5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0VSUk9SLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvRklMVEVSLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvRklORC5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0ZMQVRURU4uanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9HVC5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0dURS5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0dVSUQuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9ITE9PS1VQLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvSUZOQS5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0lOLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvSU5ERVgyQ09MLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvSU5ERVgyUk9XLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvSU5ESVJFQ1QuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9JU0FSUkFZLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvSVNCTEFOSy5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0lTRU1BSUwuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9JU0VSUi5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0lTRVJST1IuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9JU0VWRU4uanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9JU05BLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvSVNOVU1CRVIuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9JU09ERC5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0lTUkFOR0UuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9JU1JFRi5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0lTVEVYVC5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0lTVVJMLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvTE9PS1VQLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvTE9XRVIuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9MVC5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL0xURS5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL01BWC5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL01VTFRJUExZLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvTi5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL05FLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvTk9ULmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvT0NUMkRFQy5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL09SLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvUEkuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9QTVQuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9QT1dFUi5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL1JBTkdFLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvUkVQVC5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL1NFQVJDSC5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL1NFUklBTC5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL1NJTi5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbmZvdW5kcnkvbGliL1NPUlQuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9TVU0uanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9TV0lUQ0guanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9UQU4uanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9UQVUuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9URVhULmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvVU5JUVVFLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvVVBQRVIuanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb25mb3VuZHJ5L2xpYi9WTE9PS1VQLmpzIiwibm9kZV9tb2R1bGVzL2Z1bmN0aW9uZm91bmRyeS9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OytCQ0FtQyxpQkFBaUI7Ozs7QUFFcEQsSUFBSSxXQUFXLEdBQUcsQ0FDZCxXQUFXLEVBQ1gsMEJBQTBCLEVBQzFCLFdBQVcsQ0FDZCxDQUFDOztBQUVGLENBQUMsWUFBVzs7QUFFUixTQUFLLElBQUksR0FBRyxrQ0FBZTtBQUN2QixjQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsNkJBQVUsR0FBRyxDQUFDLENBQUM7S0FDaEM7O0FBRUQsUUFBSSxDQUFDLFlBQUE7UUFDRCxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7Ozs7O0FBRWhCLDZCQUFVLFdBQVcsOEhBQUU7QUFBbEIsYUFBQzs7QUFDRixrQkFBTSxJQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUM7U0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxZQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7Q0FDdkQsQ0FBQSxFQUFHLENBQUM7OztBQ3RCTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3MUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtkZWZhdWx0IGFzIGZ1bmN0aW9uc30gZnJvbSAnZnVuY3Rpb25mb3VuZHJ5JztcclxuXHJcbmxldCBleHByZXNzaW9ucyA9IFtcclxuICAgICdBQlMoLTEuMSknLFxyXG4gICAgJ0xPV0VSKFwiVEVYVCBcIikgKyBBQlMoLTIpJyxcclxuICAgICdTVU0oMiwgNSknXHJcbl07XHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBDcmVhdGUgc2V0IG9mIGZ1bmN0aW9uc1xyXG4gICAgZm9yIChsZXQga2V5IGluIGZ1bmN0aW9ucykge1xyXG4gICAgICAgIHdpbmRvd1trZXldID0gZnVuY3Rpb25zW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGUsXHJcbiAgICAgICAgb3V0cHV0ID0gJyc7XHJcblxyXG4gICAgZm9yIChlIG9mIGV4cHJlc3Npb25zKSB7XHJcbiAgICAgICAgb3V0cHV0ICs9ICc8Y29kZT4nICsgZSArICcgPSAnICsgZXZhbChlKSArICc8L2NvZGU+PC9icj4nO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWJ1ZycpLmlubmVySFRNTCA9IG91dHB1dDtcclxufSkoKTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFCUyA9IEFCUztcblxudmFyIF9JU05VTUJFUiA9IHJlcXVpcmUoJy4vSVNOVU1CRVInKTtcblxudmFyIF9FUlJPUiA9IHJlcXVpcmUoJy4vRVJST1InKTtcblxudmFyIF9FUlJPUjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FUlJPUik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIEFCUyh2YWx1ZSkge1xuICBpZiAoISgwLCBfSVNOVU1CRVIuSVNOVU1CRVIpKHZhbHVlKSkge1xuICAgIHJldHVybiBfRVJST1IyLmRlZmF1bHQudmFsdWU7XG4gIH1cbiAgcmV0dXJuIE1hdGguYWJzKHZhbHVlKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFDT1MgPSBBQ09TO1xuXG52YXIgX0lTTlVNQkVSID0gcmVxdWlyZSgnLi9JU05VTUJFUicpO1xuXG52YXIgX0VSUk9SID0gcmVxdWlyZSgnLi9FUlJPUicpO1xuXG52YXIgX0VSUk9SMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VSUk9SKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gQUNPUyh2YWx1ZSkge1xuXG4gIGlmICghKDAsIF9JU05VTUJFUi5JU05VTUJFUikodmFsdWUpKSB7XG4gICAgcmV0dXJuIF9FUlJPUjIuZGVmYXVsdC52YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLmFjb3ModmFsdWUpO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5BREQgPSBBREQ7XG5mdW5jdGlvbiBBREQoYSwgYikge1xuICByZXR1cm4gYSArIGI7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFORCA9IEFORDtcbi8vIExvZ2ljYWwgQU5EIHJlZHVjdGlvblxuLy9cbi8vIEF1dGhvcjogUGV0ZXIgTW9yZXNpXG4vL1xuLy8gQW55IGxpc3Qgb2YgY3JpdGVyaWEgY2FuIGJlIGZsYXR0ZW5lZCBvdXQgdG8gYSB0cnV0aHkgdmFsdWUuXG5mdW5jdGlvbiBBTkQoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBjcml0ZXJpYSA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGNyaXRlcmlhW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGNyaXRlcmlhLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG4gICAgaWYgKHByZXZpb3VzVmFsdWUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgfSwgdHJ1ZSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQklOMkRFQyA9IEJJTjJERUM7XG5cbnZhciBfRVJST1IgPSByZXF1aXJlKFwiLi9FUlJPUlwiKTtcblxudmFyIF9FUlJPUjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FUlJPUik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIEJJTjJERUModmFsdWUpIHtcbiAgICB2YXIgdmFsdWVBc1N0cmluZztcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFsdWVBc1N0cmluZyA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHZhbHVlQXNTdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBfRVJST1IyLmRlZmF1bHQuTkE7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlQXNTdHJpbmcubGVuZ3RoID4gMTApIHJldHVybiBfRVJST1IyLmRlZmF1bHQuTlVNO1xuXG4gICAgLy8gd2Ugc3VidHJhY3QgNTEyIHdoZW4gdGhlIGxlYWRpbmcgbnVtYmVyIGlzIDAuXG4gICAgaWYgKHZhbHVlQXNTdHJpbmcubGVuZ3RoID09PSAxMCAmJiB2YWx1ZUFzU3RyaW5nWzBdID09PSAnMScpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlQXNTdHJpbmcuc3Vic3RyaW5nKDEpLCAyKSAtIDUxMjtcbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0IGJpbmFyeSBudW1iZXIgdG8gZGVjaW1hbCB3aXRoIGJ1aWx0LWluIGZhY2lsaXR5XG4gICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlQXNTdHJpbmcsIDIpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNFTEwgPSBDRUxMO1xuXG52YXIgX0lOREVYMkNPTCA9IHJlcXVpcmUoJy4vSU5ERVgyQ09MJyk7XG5cbnZhciBfSU5ERVgyUk9XID0gcmVxdWlyZSgnLi9JTkRFWDJST1cnKTtcblxuLyogU3RydWN0dXJlIGZvciBDRUxMIHJlZmVyZW5jZVxuKi9cbmZ1bmN0aW9uIENFTEwoaW5kZXgpIHtcbiAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyAnQ2VsbCBpbmRleCBtdXN0IGJlIGEgTnVtYmVyJztcbiAgfVxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgLyogQ2VsbHMgYWxzbyBzdXBwb3J0IHRvcExlZnRcbiAgICAgKi9cbiAgICB0b3BMZWZ0OiBmdW5jdGlvbiB0b3BMZWZ0KCkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH0sXG4gICAgLyogUmV0dXJucyByb3dJbmRleFxuICAgICovXG4gICAgZ2V0Um93OiBmdW5jdGlvbiBnZXRSb3coKSB7XG4gICAgICByZXR1cm4gKDAsIF9JTkRFWDJST1cuSU5ERVgyUk9XKShpbmRleCk7XG4gICAgfSxcblxuICAgIC8qIFJldHVybiBjb2x1bW5JbmRleFxuICAgICovXG4gICAgZ2V0Q29sdW1uOiBmdW5jdGlvbiBnZXRDb2x1bW4oKSB7XG4gICAgICByZXR1cm4gKDAsIF9JTkRFWDJDT0wuSU5ERVgyQ09MKShpbmRleCk7XG4gICAgfVxuICB9KTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQ0VMTElOREVYID0gQ0VMTElOREVYO1xuLyogQ29tcHV0ZSB0aGUgcG9zaXRpb24gaW4gYSAyIGRpbWVuc2lvbmFsIGFycmF5XG4gKi9cbmZ1bmN0aW9uIENFTExJTkRFWChyb3csIGNvbCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihyb3cgKiAxNjM4NCArIGNvbCk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5DSE9PU0UgPSBDSE9PU0U7XG5cbnZhciBfRVJST1IgPSByZXF1aXJlKCcuL0VSUk9SJyk7XG5cbnZhciBfRVJST1IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRVJST1IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBDSE9PU0UoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHJldHVybiBfRVJST1IyLmRlZmF1bHQubmE7XG4gIH1cblxuICB2YXIgaW5kZXggPSBhcmd1bWVudHNbMF07XG4gIGlmIChpbmRleCA8IDEgfHwgaW5kZXggPiAyNTQpIHtcbiAgICByZXR1cm4gX0VSUk9SMi5kZWZhdWx0LnZhbHVlO1xuICB9XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCBpbmRleCArIDEpIHtcbiAgICByZXR1cm4gX0VSUk9SMi5kZWZhdWx0LnZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGFyZ3VtZW50c1tpbmRleF07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5DTEVBTiA9IENMRUFOO1xuXG52YXIgX0lTQkxBTksgPSByZXF1aXJlKCcuL0lTQkxBTksnKTtcblxuZnVuY3Rpb24gQ0xFQU4ob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiAoMCwgX0lTQkxBTksuSVNCTEFOSykob2JqW2JdKSA/IGEgOiBhLmNvbmNhdChiKTtcbiAgfSwgW10pLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIGFbYl0gPSBvYmpbYl07cmV0dXJuIGE7XG4gIH0sIHt9KTtcbn0gLy8gVGFrZSBhbiBvYmplY3Qgd2l0aCBmYWxzeSB2YWx1ZXMgYW5kIHJldHVybiBhIGNsZWFuIG9iamVjdCB3aXRoIG5vIGZhbHN5IHZhbHVlcyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5DT05DQVRFTkFURSA9IENPTkNBVEVOQVRFO1xuZnVuY3Rpb24gQ09OQ0FURU5BVEUoYSwgYikge1xuICByZXR1cm4gXCJcIiArIGEgKyBiO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQ09ORCA9IENPTkQ7XG4vLyBDT05ELmpzIC1cbi8vIFNZTlRBWCggY29uZGl0aW9uMSwgcmVzdWx0X2lmX3RydWUgWywgY29uZGl0aW9uMiwgcmVzdWx0X2lmX3RydWVdIClcblxuZnVuY3Rpb24gQ09ORCgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNhc2VzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgY2FzZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gY2FzZXMucmVkdWNlKGZ1bmN0aW9uIChhLCBiLCBpKSB7XG5cbiAgICBpZiAodHlwZW9mIGEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyByZXR1cm4gdGhlIHByZXZpb3VzbHkgZm91bmQgaXRlbVxuICAgICAgcmV0dXJuIGE7XG4gICAgfSBlbHNlIGlmIChpID09PSBjYXNlcy5sZW5ndGggLSAxKSB7XG5cbiAgICAgIGlmIChpICUgMiA9PT0gMSkge1xuICAgICAgICByZXR1cm47IC8vIG5vdGhpbmcgZm91bmRcbiAgICAgIH1cblxuICAgICAgLy8gcmV0dXJuIHRoZSBsYXN0IGl0ZW1cbiAgICAgIHJldHVybiBiO1xuICAgIH0gZWxzZSBpZiAoaSAlIDIgPT09IDAgJiYgYikge1xuICAgICAgLy8gcmV0dXJuIHRoZSBmb3VuZCBpdGVtXG4gICAgICByZXR1cm4gY2FzZXNbaSArIDFdO1xuICAgIH1cbiAgfSwgdW5kZWZpbmVkKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBkMTkwMCA9IGV4cG9ydHMuZDE5MDAgPSBuZXcgRGF0ZSgxOTAwLCAwLCAxKSxcbiAgICBKdWxpYW5PZmZzZXQgPSBleHBvcnRzLkp1bGlhbk9mZnNldCA9IDI0MTUwMTksXG4gICAgTWludXRlc0luSG91ciA9IGV4cG9ydHMuTWludXRlc0luSG91ciA9IDYwLFxuICAgIE1pbnV0ZXNJbkRheSA9IGV4cG9ydHMuTWludXRlc0luRGF5ID0gMTQ0MCxcbiAgICBTZWNvbmRzSW5NaW51dGUgPSBleHBvcnRzLlNlY29uZHNJbk1pbnV0ZSA9IDYwLFxuICAgIFNlY29uZHNJbkhvdXIgPSBleHBvcnRzLlNlY29uZHNJbkhvdXIgPSAzNjAwLFxuICAgIFNlY29uZHNJbkRheSA9IGV4cG9ydHMuU2Vjb25kc0luRGF5ID0gODY0MDAsXG4gICAgRGF5c0luWWVhciA9IGV4cG9ydHMuRGF5c0luWWVhciA9IDM2NS4yNSxcbiAgICBNaWxsaVNlY29uZHNJbkRheSA9IGV4cG9ydHMuTWlsbGlTZWNvbmRzSW5EYXkgPSA4NjQwMDAwMCxcbiAgICBBbGxvd2VkRGF0ZXMgPSBleHBvcnRzLkFsbG93ZWREYXRlcyA9IHsgSDogXCJoXVwiLCBNOiBcIm1dXCIsIE1NOiBcIm1tXVwiLCBTOiBcInNdXCIsIFNTOiBcInNzXVwiIH0sXG4gICAgRGF5TmFtZXMgPSBleHBvcnRzLkRheU5hbWVzID0gW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl0sXG4gICAgRGF5TmFtZXMzID0gZXhwb3J0cy5EYXlOYW1lczMgPSBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXG4gICAgTW9udGhOYW1lcyA9IGV4cG9ydHMuTW9udGhOYW1lcyA9IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICAgIE1vbnRoTmFtZXMzID0gZXhwb3J0cy5Nb250aE5hbWVzMyA9IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXSxcbiAgICBBTSA9IGV4cG9ydHMuQU0gPSBcIkFNXCIsXG4gICAgQU0xID0gZXhwb3J0cy5BTTEgPSBcIkFcIixcbiAgICBQTSA9IGV4cG9ydHMuUE0gPSBcIlBNXCIsXG4gICAgUE0xID0gZXhwb3J0cy5QTTEgPSBcIlBcIixcblxuLy8gQ2lyY2xlIENvbnN0YW50c1xuz4QgPSBleHBvcnRzLs+EID0gNi4yODMxODUzMDcxNzk1OCxcbiAgICAvLyBodHRwOi8vdGF1ZGF5LmNvbS90YXUtbWFuaWZlc3RvXG5cbi8vIEFkZHJlc3MgU3lzdGVtIENvbnN0YW50c1xuTWF4Q29scyA9IGV4cG9ydHMuTWF4Q29scyA9IDE2Mzg0LFxuICAgIC8vIDE0IGJpdHMsIDJeMTRcbk1heFJvd3MgPSBleHBvcnRzLk1heFJvd3MgPSAxMDQ4NTc2LFxuICAgIC8vIDIwIGJpdHMsIDJeMjBcblxuLy8gRm9ybWF0dGluZyBDb25zdGFudHNcblNlcGFyYXRvckNoYXIgPSBleHBvcnRzLlNlcGFyYXRvckNoYXIgPSBcIixcIixcbiAgICBEZWNpbWFsQ2hhciA9IGV4cG9ydHMuRGVjaW1hbENoYXIgPSBcIi5cIixcbiAgICBEZWZhdWx0Q3VycmVuY3kgPSBleHBvcnRzLkRlZmF1bHRDdXJyZW5jeSA9IFwiJFwiLFxuICAgIC8vIHRoZSBjdXJyZW5jeSBzdHJpbmcgdXNlZCBpZiBub25lIHNwZWNpZmllZFxuQWxsb3dlZENvbG9ycyA9IGV4cG9ydHMuQWxsb3dlZENvbG9ycyA9IHtcbiAgQkxBQ0s6IFwiIzAwMDAwMFwiLFxuICBCTFVFOiBcIiMwMDAwRkZcIixcbiAgQ1lBTjogXCIjMDBGRkZGXCIsXG4gIEdSRUVOOiBcIiMwMEZGMDBcIixcbiAgTUFHRU5UQTogXCIjRkYwMEZGXCIsXG4gIFJFRDogXCIjRkYwMDAwXCIsXG4gIFdISVRFOiBcIiNGRkZGRkZcIixcbiAgWUVMTE9XOiBcIiNGRkZGMDBcIlxufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNPUyA9IENPUztcblxudmFyIF9JU05VTUJFUiA9IHJlcXVpcmUoJy4vSVNOVU1CRVInKTtcblxudmFyIF9FUlJPUiA9IHJlcXVpcmUoJy4vRVJST1InKTtcblxudmFyIF9FUlJPUjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FUlJPUik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIENPUyh2YWx1ZSkge1xuXG4gIGlmICghKDAsIF9JU05VTUJFUi5JU05VTUJFUikodmFsdWUpKSB7XG4gICAgcmV0dXJuIF9FUlJPUjIuZGVmYXVsdC52YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLmNvcyh2YWx1ZSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5EQVRFID0gREFURTtcblxudmFyIF9TRVJJQUwgPSByZXF1aXJlKCcuL1NFUklBTCcpO1xuXG5mdW5jdGlvbiBEQVRFKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgcmV0dXJuICgwLCBfU0VSSUFMLlNFUklBTCkobmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuREFURURJRiA9IERBVEVESUY7XG5mdW5jdGlvbiBEQVRFRElGKHN0YXJ0X2RhdGUsIGVuZF9kYXRlLCB1bml0KSB7XG4gIHZhciBzZWNvbmQgPSAxMDAwLFxuICAgICAgbWludXRlID0gc2Vjb25kICogNjAsXG4gICAgICBob3VyID0gbWludXRlICogNjAsXG4gICAgICBkYXkgPSBob3VyICogMjQsXG4gICAgICB3ZWVrID0gZGF5ICogNztcbiAgc3RhcnRfZGF0ZSA9IG5ldyBEYXRlKHN0YXJ0X2RhdGUpO1xuICBlbmRfZGF0ZSA9IG5ldyBEYXRlKGVuZF9kYXRlKTtcblxuICB2YXIgdGltZWRpZmYgPSBlbmRfZGF0ZSAtIHN0YXJ0X2RhdGU7XG4gIGlmIChpc05hTih0aW1lZGlmZikpIHJldHVybiBOYU47XG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSBcIllcIjpcbiAgICAgIHJldHVybiBlbmRfZGF0ZS5nZXRGdWxsWWVhcigpIC0gc3RhcnRfZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNhc2UgXCJNXCI6XG4gICAgICByZXR1cm4gZW5kX2RhdGUuZ2V0RnVsbFllYXIoKSAqIDEyICsgZW5kX2RhdGUuZ2V0TW9udGgoKSAtIChzdGFydF9kYXRlLmdldEZ1bGxZZWFyKCkgKiAxMiArIHN0YXJ0X2RhdGUuZ2V0TW9udGgoKSk7XG4gICAgY2FzZSBcIldcIjpcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHRpbWVkaWZmIC8gd2Vlayk7XG4gICAgY2FzZSBcIkRcIjpcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHRpbWVkaWZmIC8gZGF5KTtcbiAgICBjYXNlIFwiTURcIjpcbiAgICAgIHJldHVybiBlbmRfZGF0ZS5nZXREYXRlKCkgLSBzdGFydF9kYXRlLmdldERhdGUoKTtcbiAgICBjYXNlIFwiWU1cIjpcbiAgICAgIHJldHVybiBlbmRfZGF0ZS5nZXRNb250aCgpIC0gc3RhcnRfZGF0ZS5nZXRNb250aCgpO1xuICAgIGNhc2UgXCJZRFwiOlxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIk5PVCBJTVBMRU1FTlRFRFwiKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuREVDMkJJTiA9IERFQzJCSU47XG5cbnZhciBfUkVQVCA9IHJlcXVpcmUoJy4vUkVQVCcpO1xuXG52YXIgX0VSUk9SID0gcmVxdWlyZSgnLi9FUlJPUicpO1xuXG52YXIgX0VSUk9SMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VSUk9SKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3N1dG9pa3UvZm9ybXVsYS5qcy9ibG9iL21hc3QuLi9zcmMvZW5naW5lZXJpbmcuanNcbmZ1bmN0aW9uIERFQzJCSU4oaW5wdXQsIHBsYWNlcykge1xuXG4gIC8vIGV4aXQgaWYgaW5wdXQgaXMgYW4gZXJyb3JcbiAgaWYgKGlucHV0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gbnVtYmVyO1xuICB9XG5cbiAgLy8gY2FzdCBpbnB1dCB0byBudW1iZXJcbiAgdmFyIG51bWJlciA9IHBhcnNlSW50KGlucHV0KTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKG51bWJlcikpIHtcbiAgICByZXR1cm4gX0VSUk9SMi5kZWZhdWx0LnZhbHVlO1xuICB9XG5cbiAgLy8gUmV0dXJuIGVycm9yLmlmIG51bWJlciBpcyBub3QgZGVjaW1hbCwgaXMgbG93ZXIgdGhhbiAtNTEyLCBvciBpcyBncmVhdGVyIHRoYW4gNTExXG4gIGlmICghL14tP1swLTldezEsM30kLy50ZXN0KG51bWJlcikgfHwgbnVtYmVyIDwgLTUxMiB8fCBudW1iZXIgPiA1MTEpIHtcbiAgICByZXR1cm4gX0VSUk9SMi5kZWZhdWx0Lm51bTtcbiAgfVxuXG4gIC8vIElnbm9yZSBwbGFjZXMgYW5kIHJldHVybiBhIDEwLWNoYXJhY3RlciBiaW5hcnkgbnVtYmVyIGlmIG51bWJlciBpcyBuZWdhdGl2ZVxuICBpZiAobnVtYmVyIDwgMCkge1xuICAgIHJldHVybiAnMScgKyAoMCwgX1JFUFQuUkVQVCkoJzAnLCA5IC0gKDUxMiArIG51bWJlcikudG9TdHJpbmcoMikubGVuZ3RoKSArICg1MTIgKyBudW1iZXIpLnRvU3RyaW5nKDIpO1xuICB9XG5cbiAgLy8gQ29udmVydCBkZWNpbWFsIG51bWJlciB0byBiaW5hcnlcbiAgdmFyIHJlc3VsdCA9IHBhcnNlSW50KG51bWJlciwgMTApLnRvU3RyaW5nKDIpO1xuXG4gIC8vIFJldHVybiBiaW5hcnkgbnVtYmVyIHVzaW5nIHRoZSBtaW5pbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIG5lY2Vzc2FyeSBpZiBwbGFjZXMgaXMgdW5kZWZpbmVkXG4gIGlmICh0eXBlb2YgcGxhY2VzID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gUmV0dXJuIGVycm9yLmlmIHBsYWNlcyBpcyBub25udW1lcmljXG4gICAgaWYgKGlzTmFOKHBsYWNlcykpIHtcbiAgICAgIHJldHVybiBfRVJST1IyLmRlZmF1bHQudmFsdWU7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGVycm9yLmlmIHBsYWNlcyBpcyBuZWdhdGl2ZVxuICAgIGlmIChwbGFjZXMgPCAwKSB7XG4gICAgICByZXR1cm4gX0VSUk9SMi5kZWZhdWx0Lm51bTtcbiAgICB9XG5cbiAgICAvLyBUcnVuY2F0ZSBwbGFjZXMgaW4gY2FzZSBpdCBpcyBub3QgYW4gaW50ZWdlclxuICAgIHBsYWNlcyA9IE1hdGguZmxvb3IocGxhY2VzKTtcblxuICAgIC8vIFBhZCByZXR1cm4gdmFsdWUgd2l0aCBsZWFkaW5nIDBzICh6ZXJvcykgaWYgbmVjZXNzYXJ5ICh1c2luZyBVbmRlcnNjb3JlLnN0cmluZylcbiAgICByZXR1cm4gcGxhY2VzID49IHJlc3VsdC5sZW5ndGggPyAoMCwgX1JFUFQuUkVQVCkoJzAnLCBwbGFjZXMgLSByZXN1bHQubGVuZ3RoKSArIHJlc3VsdCA6IF9FUlJPUjIuZGVmYXVsdC5udW07XG4gIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRElWSURFID0gRElWSURFO1xuZnVuY3Rpb24gRElWSURFKGEsIGIpIHtcbiAgcmV0dXJuIGEgLyBiO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5FUSA9IEVRO1xuZnVuY3Rpb24gRVEoYSwgYikge1xuICAvLyBVbmxpa2UgSmF2YVNjcmlwdCB0aGUgc3RyaW5nIGNvbXBhcmlzaW9ucyBhcmUgY2FzZS1pbnNlbnNpdGl2ZVxuICBpZiAodHlwZW9mIGEgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGIgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gYS50b0xvd2VyQ2FzZSgpID09PSBiLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG4vLyBMaXN0IG9mIGVycm9ycyBpbiB0aGUgc3ByZWFkc2hlZXQgc3lzdGVtXG5cbnZhciBuaWwgPSBuZXcgRXJyb3IoJyNOVUxMIScpLFxuICAgIGRpdjAgPSBuZXcgRXJyb3IoJyNESVYvMCEnKSxcbiAgICB2YWx1ZSA9IG5ldyBFcnJvcignI1ZBTFVFPycpLFxuICAgIHJlZiA9IG5ldyBFcnJvcignI1JFRiEnKSxcbiAgICBuYW1lID0gbmV3IEVycm9yKCcjTkFNRT8nKSxcbiAgICBudW0gPSBuZXcgRXJyb3IoJyNOVU0hJyksXG4gICAgbmEgPSBuZXcgRXJyb3IoJyNOL0EnKSxcbiAgICBlcnJvciA9IG5ldyBFcnJvcignI0Vycm9yKCcpLFxuICAgIGRhdGEgPSBuZXcgRXJyb3IoJyNHRVRUSU5HX0RBVEEnKSxcbiAgICBtaXNzaW5nID0gbmV3IEVycm9yKCcjTUlTU0lORycpLFxuICAgIHVua25vd24gPSBuZXcgRXJyb3IoJyNVTktOT1dOJyk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgbmlsOiBuaWwsXG4gIGRpdjA6IGRpdjAsXG4gIHZhbHVlOiB2YWx1ZSxcbiAgcmVmOiByZWYsXG4gIG5hbWU6IG5hbWUsXG4gIG51bTogbnVtLFxuICBuYTogbmEsXG4gIGVycm9yOiBlcnJvcixcbiAgZGF0YTogZGF0YSxcbiAgbWlzc2luZzogbWlzc2luZyxcbiAgdW5rbm93bjogdW5rbm93blxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRklMVEVSID0gRklMVEVSO1xuLyogVGhlIGZpbHRlciBhbiBhcnJheSBvciBhIHJhbmdlIGJ5IGEgc2V0IG9mIGZpbHRlcnMgKi9cblxuZnVuY3Rpb24gRklMVEVSKHJhbmdlKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmaWx0ZXJzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZpbHRlcnNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgLy8gQSBmaWx0ZXIgaXMgYW4gYXJyYXkgb2YgdHJ1ZS9mYWxzZSB2YWx1ZXMuXG4gIC8vIFRoZSBmaWx0ZXIgbWF5IGJlIGZvciByb3dzIG9yIGZvciBjb2x1bW5zIGJ1dCBub3QgYm90aC5cbiAgLy8gQSBhcnJheSBmaWx0ZXIgbWF5IG9ubHkgZmlsdGVyIGEgcmFuZ2UgdGhhdCBjb3ZlcnMgYSBzaW5nbGUgcm93IG9yIGEgc2luZ2xlIGNvbHVtbi5cblxuICBmdW5jdGlvbiBtYWtlRmlsdGVyKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XG4gICAgICByZXR1cm4gZmlsdGVycy5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZVtpbmRleF07XG4gICAgICAgIH1cbiAgICAgIH0sIHRydWUpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gcmFuZ2UuZmlsdGVyKG1ha2VGaWx0ZXIoKSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GSU5EID0gRklORDtcblxudmFyIF9FUlJPUiA9IHJlcXVpcmUoJy4vRVJST1InKTtcblxudmFyIF9FUlJPUjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FUlJPUik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIEZJTkQoZmluZF90ZXh0LCB3aXRoaW5fdGV4dCwgcG9zaXRpb24pIHtcbiAgaWYgKCF3aXRoaW5fdGV4dCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHBvc2l0aW9uID0gdHlwZW9mIHBvc2l0aW9uID09PSAndW5kZWZpbmVkJyA/IDEgOiBwb3NpdGlvbjtcbiAgcG9zaXRpb24gPSB3aXRoaW5fdGV4dC5pbmRleE9mKGZpbmRfdGV4dCwgcG9zaXRpb24gLSAxKSArIDE7XG4gIHJldHVybiBwb3NpdGlvbiA9PT0gMCA/IF9FUlJPUjIuZGVmYXVsdC52YWx1ZSA6IHBvc2l0aW9uO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GTEFUVEVOID0gRkxBVFRFTjtcbmZ1bmN0aW9uIEZMQVRURU4ocmVmKSB7XG4gIHJldHVybiByZWYucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICB9LCBbXSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5HVCA9IEdUO1xuXG52YXIgX0lTQVJSQVkgPSByZXF1aXJlKCcuL0lTQVJSQVknKTtcblxudmFyIF9JU1JBTkdFID0gcmVxdWlyZSgnLi9JU1JBTkdFJyk7XG5cbnZhciBfRVJST1IgPSByZXF1aXJlKCcuL0VSUk9SJyk7XG5cbnZhciBfRVJST1IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRVJST1IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBHVChhLCBiKSB7XG4gIGlmICgoMCwgX0lTUkFOR0UuSVNSQU5HRSkoYSkgJiYgKDAsIF9JU1JBTkdFLklTUkFOR0UpKGIpKSB7XG4gICAgcmV0dXJuIF9FUlJPUjIuZGVmYXVsdC5uYTtcbiAgfSBlbHNlIGlmICgoMCwgX0lTQVJSQVkuSVNBUlJBWSkoYSkgJiYgKDAsIF9JU0FSUkFZLklTQVJSQVkpKGIpKSB7XG4gICAgcmV0dXJuIF9FUlJPUjIuZGVmYXVsdC5uYTtcbiAgfSBlbHNlIGlmICgoMCwgX0lTUkFOR0UuSVNSQU5HRSkoYSkgfHwgKDAsIF9JU0FSUkFZLklTQVJSQVkpKGEpKSB7XG4gICAgcmV0dXJuIGEubWFwKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZCA+IGI7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoKDAsIF9JU1JBTkdFLklTUkFOR0UpKGIpIHx8ICgwLCBfSVNBUlJBWS5JU0FSUkFZKShiKSkge1xuICAgIHJldHVybiBiLm1hcChmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGQgPiBhO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhID4gYjtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuR1RFID0gR1RFO1xuXG52YXIgX1JBTkdFID0gcmVxdWlyZSgnLi9SQU5HRScpO1xuXG52YXIgX0lTQVJSQVkgPSByZXF1aXJlKCcuL0lTQVJSQVknKTtcblxudmFyIF9JU1JBTkdFID0gcmVxdWlyZSgnLi9JU1JBTkdFJyk7XG5cbmZ1bmN0aW9uIEdURShhLCBiKSB7XG4gIGlmICgoMCwgX0lTUkFOR0UuSVNSQU5HRSkoYSkgJiYgKDAsIF9JU1JBTkdFLklTUkFOR0UpKGIpKSB7XG4gICAgcmV0dXJuIGVycm9yLm5hO1xuICB9IGVsc2UgaWYgKCgwLCBfSVNBUlJBWS5JU0FSUkFZKShhKSAmJiAoMCwgX0lTQVJSQVkuSVNBUlJBWSkoYikpIHtcbiAgICByZXR1cm4gZXJyb3IubmE7XG4gIH0gZWxzZSBpZiAoKDAsIF9JU1JBTkdFLklTUkFOR0UpKGEpIHx8ICgwLCBfSVNBUlJBWS5JU0FSUkFZKShhKSkge1xuICAgIHJldHVybiBhLm1hcChmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGQgPj0gYjtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICgoMCwgX0lTUkFOR0UuSVNSQU5HRSkoYikgfHwgKDAsIF9JU0FSUkFZLklTQVJSQVkpKGIpKSB7XG4gICAgcmV0dXJuIGIubWFwKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZCA+PSBhO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhID49IGI7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkdVSUQgPSBHVUlEO1xuLy8gY3JlZGl0IHRvIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2NyZWF0ZS1ndWlkLXV1aWQtaW4tamF2YXNjcmlwdFxuLy8gcmZjNDEyMiB2ZXJzaW9uIDQgY29tcGxpYW50IHNvbHV0aW9uXG5cbi8qIEdlbmVyYXRlIGEgZ2xvYmFsbHkgdW5pcXVlIGlkZW50aWZpZXJcbiAqL1xuZnVuY3Rpb24gR1VJRCgpIHtcbiAgdmFyIGd1aWQgPSAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLFxuICAgICAgICB2ID0gYyA9PSAneCcgPyByIDogciAmIDB4MyB8IDB4ODtcbiAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gIH0pO1xuICByZXR1cm4gZ3VpZDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSExPT0tVUCA9IEhMT09LVVA7XG5cbnZhciBfSVNCTEFOSyA9IHJlcXVpcmUoXCIuL0lTQkxBTktcIik7XG5cbmZ1bmN0aW9uIEhMT09LVVAobmVlZGxlLCB0YWJsZSwgaW5kZXgsIGV4YWN0bWF0Y2gpIHtcbiAgICBpZiAodHlwZW9mIG5lZWRsZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCAoMCwgX0lTQkxBTksuSVNCTEFOSykobmVlZGxlKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgaW5kZXggPSBpbmRleCB8fCAwLFxuICAgICAgICByb3cgPSB0YWJsZVswXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgaWYgKGV4YWN0bWF0Y2ggJiYgcm93W2ldID09PSBuZWVkbGUgfHwgcm93W2ldLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPCB0YWJsZS5sZW5ndGggKyAxID8gdGFibGVbaW5kZXggLSAxXVtpXSA6IHRhYmxlWzBdW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVycm9yLm5hO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5JRk5BID0gSUZOQTtcblxudmFyIF9FUlJPUiA9IHJlcXVpcmUoJy4vRVJST1InKTtcblxudmFyIF9FUlJPUjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FUlJPUik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIElGTkEodmFsdWUsIHZhbHVlX2lmX25hKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBfRVJST1IyLmRlZmF1bHQubmEgPyB2YWx1ZV9pZl9uYSA6IHZhbHVlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSU4gPSBJTjtcblxudmFyIF9JU0JMQU5LID0gcmVxdWlyZSgnLi9JU0JMQU5LJyk7XG5cbnZhciBfSVNBUlJBWSA9IHJlcXVpcmUoJy4vSVNBUlJBWScpO1xuXG52YXIgX0VSUk9SID0gcmVxdWlyZSgnLi9FUlJPUicpO1xuXG52YXIgX0VSUk9SMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VSUk9SKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gRmluZCBhIG5lZWRsZSBpbiBhIGxvb2t1cFxuZnVuY3Rpb24gSU4obmVlZGxlLCBsb29rdXApIHtcblxuICBpZiAoKDAsIF9JU0JMQU5LLklTQkxBTkspKG5lZWRsZSkgJiYgKDAsIF9JU0JMQU5LLklTQkxBTkspKGxvb2t1cCkpIHtcbiAgICByZXR1cm4gX0VSUk9SMi5kZWZhdWx0Lm5hO1xuICB9XG5cbiAgaWYgKCEoMCwgX0lTQVJSQVkuSVNBUlJBWSkobG9va3VwKSkge1xuICAgIHJldHVybiBfRVJST1IyLmRlZmF1bHQubmE7XG4gIH1cblxuICByZXR1cm4gbG9va3VwLnNvbWUoZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4gbiA9PT0gbmVlZGxlO1xuICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLklOREVYMkNPTCA9IElOREVYMkNPTDtcblxudmFyIF9DT05TVEFOVFMgPSByZXF1aXJlKCcuL0NPTlNUQU5UUycpO1xuXG52YXIgX0lOREVYMlJPVyA9IHJlcXVpcmUoJy4vSU5ERVgyUk9XJyk7XG5cbi8qIElzb2xhdGUgdGhlIGNvbHVtbiBmcm9tIGEgY2VsbCBpbmRleCAqL1xuZnVuY3Rpb24gSU5ERVgyQ09MKGluZGV4KSB7XG4gIHJldHVybiBpbmRleCAtICgwLCBfSU5ERVgyUk9XLklOREVYMlJPVykoaW5kZXgpICogX0NPTlNUQU5UUy5NYXhDb2xzO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSU5ERVgyUk9XID0gSU5ERVgyUk9XO1xuXG52YXIgX0NPTlNUQU5UUyA9IHJlcXVpcmUoJy4vQ09OU1RBTlRTJyk7XG5cbmZ1bmN0aW9uIElOREVYMlJPVyhpbmRleCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihpbmRleCAvIF9DT05TVEFOVFMuTWF4Q29scyk7XG59IC8qIElzb2xhdGUgdGhlIHJvdyBmcm9tIGEgY2VsbCBpbmRleCAqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSU5ESVJFQ1QgPSBJTkRJUkVDVDtcblxudmFyIF9DRUxMID0gcmVxdWlyZSgnLi9DRUxMJyk7XG5cbmZ1bmN0aW9uIElORElSRUNUKHJlZikge1xuICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgcmV0dXJuIG5ldyBfQ0VMTC5DRUxMKHRoaXMsIHJlZi5pbmRleCk7XG59IC8qIFJldHVybnMgYSBjZWxsIGluZGlyZWN0aW9uXG4gICAqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLklTQVJSQVkgPSBJU0FSUkFZO1xuZnVuY3Rpb24gSVNBUlJBWShhcnIpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5JU0JMQU5LID0gSVNCTEFOSztcbmZ1bmN0aW9uIElTQkxBTksodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZSA9PT0gbnVsbDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSVNFTUFJTCA9IElTRU1BSUw7XG5mdW5jdGlvbiBJU0VNQUlMKGVtYWlsKSB7XG4gICAgdmFyIHJlID0gL14oW1xcdy1dKyg/OlxcLltcXHctXSspKilAKCg/OltcXHctXStcXC4pKlxcd1tcXHctXXswLDY2fSlcXC4oW2Etel17Miw2fSg/OlxcLlthLXpdezJ9KT8pJC9pO1xuICAgIHJldHVybiByZS50ZXN0KGVtYWlsKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5JU0VSUiA9IElTRVJSO1xuXG52YXIgX0VSUk9SID0gcmVxdWlyZSgnLi9FUlJPUicpO1xuXG52YXIgX0VSUk9SMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VSUk9SKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gSVNFUlIodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBfRVJST1IyLmRlZmF1bHQubmEgJiYgdmFsdWUuY29uc3RydWN0b3IubmFtZSA9PT0gJ0Vycm9yJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIChOdW1iZXIuaXNOYU4odmFsdWUpIHx8ICFOdW1iZXIuaXNGaW5pdGUodmFsdWUpKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSVNFUlJPUiA9IElTRVJST1I7XG5cbnZhciBfRVJST1IgPSByZXF1aXJlKCcuL0VSUk9SJyk7XG5cbnZhciBfRVJST1IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRVJST1IpO1xuXG52YXIgX0lTRVJSID0gcmVxdWlyZSgnLi9JU0VSUicpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBJU0VSUk9SKHZhbHVlKSB7XG4gICAgcmV0dXJuICgwLCBfSVNFUlIuSVNFUlIpKHZhbHVlKSB8fCB2YWx1ZSA9PT0gX0VSUk9SMi5kZWZhdWx0Lm5hO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLklTRVZFTiA9IElTRVZFTjtcbmZ1bmN0aW9uIElTRVZFTih2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGguYWJzKHZhbHVlKSkgJiAxID8gZmFsc2UgOiB0cnVlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSVNOQSA9IElTTkE7XG5cbnZhciBfRVJST1IgPSByZXF1aXJlKCcuL0VSUk9SJyk7XG5cbnZhciBfRVJST1IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRVJST1IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBJU05BKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gX0VSUk9SMi5kZWZhdWx0Lm5hO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5JU05VTUJFUiA9IElTTlVNQkVSO1xuZnVuY3Rpb24gSVNOVU1CRVIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpICYmIGlzRmluaXRlKHZhbHVlKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5JU09ERCA9IElTT0REO1xuZnVuY3Rpb24gSVNPREQodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLmFicyh2YWx1ZSkpICYgMSA/IHRydWUgOiBmYWxzZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLklTUkFOR0UgPSBJU1JBTkdFO1xuZnVuY3Rpb24gSVNSQU5HRSh2KSB7XG4gIHJldHVybiB2LmNvbnN0cnVjdG9yLm5hbWUgPT09ICdSQU5HRSc7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5JU1JFRiA9IElTUkVGO1xuZnVuY3Rpb24gSVNSRUYocmVmKSB7XG4gIHJldHVybiByZWYuaGFzT3duUHJvcGVydHkoJ3RvcExlZnQnKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSVNURVhUID0gSVNURVhUO1xuZnVuY3Rpb24gSVNURVhUKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSVNVUkwgPSBJU1VSTDtcbmZ1bmN0aW9uIElTVVJMKHN0cikge1xuICAvLyBjcmVkaXQ6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTcxNzA5My9jaGVjay1pZi1hLWphdmFzY3JpcHQtc3RyaW5nLWlzLWFuLXVybFxuICB2YXIgcGF0dGVybiA9IG5ldyBSZWdFeHAoJ14oaHR0cHM/OlxcXFwvXFxcXC8pPycgKyAvLyBwcm90b2NvbFxuICAnKCgoW2EtelxcXFxkXShbYS16XFxcXGQtXSpbYS16XFxcXGRdKSopXFxcXC4/KStbYS16XXsyLH18JyArIC8vIGRvbWFpbiBuYW1lXG4gICcoKFxcXFxkezEsM31cXFxcLil7M31cXFxcZHsxLDN9KSknICsgLy8gT1IgaXAgKHY0KSBhZGRyZXNzXG4gICcoXFxcXDpcXFxcZCspPyhcXFxcL1stYS16XFxcXGQlXy5+K10qKSonICsgLy8gcG9ydCBhbmQgcGF0aFxuICAnKFxcXFw/WzsmYS16XFxcXGQlXy5+Kz0tXSopPycgKyAvLyBxdWVyeSBzdHJpbmdcbiAgJyhcXFxcI1stYS16XFxcXGRfXSopPyQnLCAnaScpOyAvLyBmcmFnbWVudCBsb2NhdG9yXG4gIHJldHVybiBwYXR0ZXJuLnRlc3Qoc3RyKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuTE9PS1VQID0gTE9PS1VQO1xuZnVuY3Rpb24gTE9PS1VQKCkge1xuICAgIHZhciBsb29rdXBfdmFsdWUsIGxvb2t1cF9hcnJheSwgbG9va3VwX3ZlY3RvciwgcmVzdWx0c192ZWN0b3I7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgLy8gYXJyYXkgZm9ybVxuICAgICAgICB2YXIgd2lkZSA9IGZhbHNlO1xuXG4gICAgICAgIGxvb2t1cF92YWx1ZSA9IGFyZ3VtZW50c1swXS52YWx1ZU9mKCk7XG4gICAgICAgIGxvb2t1cF9hcnJheSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvb2t1cF9hcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBsb29rdXBfYXJyYXlbaV0gIT09ICd1bmRlZmluZWQnICYmIGxvb2t1cF92YWx1ZSA9PT0gbG9va3VwX2FycmF5W2ldLnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb29rdXBfYXJyYXlbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgLy8gdmVjdG9yIGZvcm1gXG4gICAgICAgIGxvb2t1cF92YWx1ZSA9IGFyZ3VtZW50c1swXS52YWx1ZU9mKCk7XG4gICAgICAgIGxvb2t1cF92ZWN0b3IgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIHJlc3VsdHNfdmVjdG9yID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9va3VwX3ZlY3Rvci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBsb29rdXBfdmVjdG9yW2ldICE9PSAndW5kZWZpbmVkJyAmJiBsb29rdXBfdmFsdWUgPT09IGxvb2t1cF92ZWN0b3JbaV0udmFsdWVPZigpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHNfdmVjdG9yW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVycm9yLm5hO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5MT1dFUiA9IExPV0VSO1xuZnVuY3Rpb24gTE9XRVIoc3RyKSB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkxUID0gTFQ7XG5cbnZhciBfUkFOR0UgPSByZXF1aXJlKCcuL1JBTkdFJyk7XG5cbnZhciBfSVNBUlJBWSA9IHJlcXVpcmUoJy4vSVNBUlJBWScpO1xuXG52YXIgX0lTUkFOR0UgPSByZXF1aXJlKCcuL0lTUkFOR0UnKTtcblxuZnVuY3Rpb24gTFQoYSwgYikge1xuICBpZiAoKDAsIF9JU1JBTkdFLklTUkFOR0UpKGEpICYmICgwLCBfSVNSQU5HRS5JU1JBTkdFKShiKSkge1xuICAgIHJldHVybiBlcnJvci5uYTtcbiAgfSBlbHNlIGlmICgoMCwgX0lTQVJSQVkuSVNBUlJBWSkoYSkgJiYgKDAsIF9JU0FSUkFZLklTQVJSQVkpKGIpKSB7XG4gICAgcmV0dXJuIGVycm9yLm5hO1xuICB9IGVsc2UgaWYgKCgwLCBfSVNSQU5HRS5JU1JBTkdFKShhKSB8fCAoMCwgX0lTQVJSQVkuSVNBUlJBWSkoYSkpIHtcbiAgICByZXR1cm4gYS5tYXAoZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBkIDwgYjtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICgoMCwgX0lTUkFOR0UuSVNSQU5HRSkoYikgfHwgKDAsIF9JU0FSUkFZLklTQVJSQVkpKGIpKSB7XG4gICAgcmV0dXJuIGIubWFwKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZCA8IGE7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGEgPCBiO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5MVEUgPSBMVEU7XG5cbnZhciBfUkFOR0UgPSByZXF1aXJlKCcuL1JBTkdFJyk7XG5cbnZhciBfSVNBUlJBWSA9IHJlcXVpcmUoJy4vSVNBUlJBWScpO1xuXG52YXIgX0lTUkFOR0UgPSByZXF1aXJlKCcuL0lTUkFOR0UnKTtcblxuZnVuY3Rpb24gTFRFKGEsIGIpIHtcbiAgaWYgKCgwLCBfSVNSQU5HRS5JU1JBTkdFKShhKSAmJiAoMCwgX0lTUkFOR0UuSVNSQU5HRSkoYikpIHtcbiAgICByZXR1cm4gZXJyb3IubmE7XG4gIH0gZWxzZSBpZiAoKDAsIF9JU0FSUkFZLklTQVJSQVkpKGEpICYmICgwLCBfSVNBUlJBWS5JU0FSUkFZKShiKSkge1xuICAgIHJldHVybiBlcnJvci5uYTtcbiAgfSBlbHNlIGlmICgoMCwgX0lTUkFOR0UuSVNSQU5HRSkoYSkgfHwgKDAsIF9JU0FSUkFZLklTQVJSQVkpKGEpKSB7XG4gICAgcmV0dXJuIGEubWFwKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZCA8PSBiO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCgwLCBfSVNSQU5HRS5JU1JBTkdFKShiKSB8fCAoMCwgX0lTQVJSQVkuSVNBUlJBWSkoYikpIHtcbiAgICByZXR1cm4gYi5tYXAoZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBkIDw9IGE7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGEgPD0gYjtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5NQVggPSBNQVg7XG5cbnZhciBfRkxBVFRFTiA9IHJlcXVpcmUoJy4vRkxBVFRFTicpO1xuXG5mdW5jdGlvbiBNQVgoKSB7XG4gICAgKDAsIF9GTEFUVEVOLkZMQVRURU4pKGFyZ3VtZW50cykucmVkdWNlKGZ1bmN0aW9uIChtYXgsIG5leHQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB4ICE9PSAnbnVtYmVyJyB8fCB4ICE9PSB4KSB7XG4gICAgICAgICAgICByZXR1cm4gbWF4O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1heCwgbmV4dCk7XG4gICAgfSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLk1VTFRJUExZID0gTVVMVElQTFk7XG5mdW5jdGlvbiBNVUxUSVBMWShhLCBiKSB7XG4gIHJldHVybiBhICogYjtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLk4gPSBOO1xuXG52YXIgX0lTTlVNQkVSID0gcmVxdWlyZSgnLi9JU05VTUJFUicpO1xuXG52YXIgX0lTRVJST1IgPSByZXF1aXJlKCcuL0lTRVJST1InKTtcblxudmFyIF9TRVJJQUwgPSByZXF1aXJlKCcuL1NFUklBTCcpO1xuXG5mdW5jdGlvbiBOKHZhbHVlKSB7XG4gIGlmICgoMCwgX0lTTlVNQkVSLklTTlVNQkVSKSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiAoMCwgX1NFUklBTC5TRVJJQUwpKHZhbHVlKTtcbiAgfVxuICBpZiAodmFsdWUgPT09IHRydWUpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKCgwLCBfSVNFUlJPUi5JU0VSUk9SKSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIDA7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLk5FID0gTkU7XG5mdW5jdGlvbiBORShhLCBiKSB7XG4gIGlmICh0eXBlb2YgYSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgYiA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBhLnRvTG93ZXJDYXNlKCkgIT09IGIudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYSAhPT0gYjtcbiAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5OT1QgPSBOT1Q7XG5mdW5jdGlvbiBOT1QodmFsdWUpIHtcbiAgcmV0dXJuICF2YWx1ZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLk9DVDJERUMgPSBPQ1QyREVDO1xuXG52YXIgX0VSUk9SID0gcmVxdWlyZSgnLi9FUlJPUicpO1xuXG52YXIgX0VSUk9SMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VSUk9SKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gT0NUMkRFQyhvY3RhbE51bWJlcikge1xuICAvLyBDcmVkaXRzOiBCYXNlZCBvbiBpbXBsZW1lbnRhdGlvbiBmb3VuZCBpbiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9naGFsaW1pLzQ1MjU4NzYjZmlsZS1vY3QyZGVjLWpzXG4gIC8vIFJldHVybiBlcnJvci53aGVuIG51bWJlciBwYXNzZWQgaW4gaXMgbm90IG9jdGFsIG9yIGhhcyBtb3JlIHRoYW4gMTAgZGlnaXRzXG4gIGlmICghL15bMC03XXsxLDEwfSQvLnRlc3Qob2N0YWxOdW1iZXIpKSByZXR1cm4gX0VSUk9SMi5kZWZhdWx0Lm51bTtcblxuICAvLyBDb252ZXJ0IG9jdGFsIG51bWJlciB0byBkZWNpbWFsIG51bWJlclxuICB2YXIgbm9uTmVnYXRpdmVEZWNpbWFsTnVtYmVyID0gcGFyc2VJbnQob2N0YWxOdW1iZXIsIDgpO1xuXG4gIC8vIFJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgZGVjaW1hbCBudW1iZXJcbiAgLy8gVHdvJ3MgQ29tcGxlbWVudCBEZWNpbWFsIFJhbmdlOiAtKDJeTi0xKSB0byAoMl5OLTEgLSAxKSB3aGVyZSBOPTMwIChOID0gbnVtYmVyIG9mIGJpdHMpIGFuZCBeIG1lYW5zIHJhaXNlZCB0byB0aGUgcG93ZXIgb2ZcbiAgLy8gMl5OLTEgPSAyXigzMCAtIDEpID0gMl4yOSA9IDUzNjg3MDkxMlxuICAvLyAyXk4tMSAtIDEgPSA1MzY4NzA5MTIgLSAxID0gNTM2ODcwOTExXG4gIC8vIDJeTiA9IDJeMzAgPSAxMDczNzQxODI0XG4gIC8vIFR3bydzIENvbXBsZW1lbnQgRGVjaW1hbCBSYW5nZTogWy01MzY4NzA5MTIsNTM2ODcwOTExXVxuICAvLyBMYXJnZXN0IG9jdGFsIG51bWJlciBhbGxvd2VkOiA3Nzc3Nzc3Nzc3IHdoaWNoIGluIGRlY2ltYWwgaXMgMTA3Mzc0MTgyMyA9IDJeTiAtIDFcbiAgLy8gQ2FzZSAxOiBOZWdhdGl2ZSBSYW5nZVxuICAvLyAgaWYgbm9uTmVnYXRpdmVEZWNpbWFsTnVtYmVyID49IDJeTi0xLCB0aGVuIHJldHVybiAobm9uTmVnYXRpdmVOdW1iZXIgLSAyXk4pXG4gIC8vICBTbWFsbGVzdCBOdW1iZXI6IDJeTi0xIC0gMl5OID0gMl5OLTEgLSAyKjJeTi0xID0gMl5OLTEgKiAoMSAtIDIpID0gMl5OLTEgKiAoLTEpID0gLTJeTi0xXG4gIC8vICBMYXJnZXN0IE51bWJlcjogKDJeTiAtIDEpIC0gKDJeTikgPSAoMl5OIC0gMl5OKSAtIDEgPSAtMVxuICAvLyAgUmFuZ2U6IFstMl5OLTEsIC0xXSA9IFstNTM2ODcwOTEyLCAtMV1cbiAgLy9cbiAgLy8gU21hbGxlc3Qgb2N0YWwgbnVtYmVyIGFsbG93ZWQ6IDAgd2hpY2ggaW4gZGVjaW1hbCBpcyAwXG4gIC8vIENhc2UgMjogTm9uLU5lZ2F0aXZlIFJhbmdlXG4gIC8vICAgUmFuZ2U6IFswLCAyXk4tMSAtIDFdID0gWzAsIDUzNjg3MDkxMV1cblxuICByZXR1cm4gbm9uTmVnYXRpdmVEZWNpbWFsTnVtYmVyID49IDUzNjg3MDkxMiA/IG5vbk5lZ2F0aXZlRGVjaW1hbE51bWJlciAtIDEwNzM3NDE4MjQgOiBub25OZWdhdGl2ZURlY2ltYWxOdW1iZXI7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLk9SID0gT1I7XG4vLyBMb2dpY2FsIE9SIG9wZXJhdGlvblxuXG5mdW5jdGlvbiBPUigpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNyaXRlcmlhID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgY3JpdGVyaWFbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gY3JpdGVyaWEucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgaWYgKGEgPT09IHRydWUpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBiO1xuICB9LCBmYWxzZSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5QSSA9IFBJO1xuXG52YXIgX0NPTlNUQU5UUyA9IHJlcXVpcmUoJy4vQ09OU1RBTlRTJyk7XG5cbmZ1bmN0aW9uIFBJKCkge1xuICByZXR1cm4gX0NPTlNUQU5UUy7PhCAvIDI7XG59IC8vIFJldHVybnMgaGFsZiB0aGUgdW5pdmVyc2FsIGNpcmNsZSBjb25zdGFudCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuUE1UID0gUE1UO1xuXG52YXIgX0lTTlVNQkVSID0gcmVxdWlyZSgnLi9JU05VTUJFUicpO1xuXG52YXIgX0VSUk9SID0gcmVxdWlyZSgnLi9FUlJPUicpO1xuXG52YXIgX0VSUk9SMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VSUk9SKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gUE1UKHJhdGUsIHBlcmlvZHMsIHByZXNlbnQpIHtcbiAgdmFyIGZ1dHVyZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IDAgOiBhcmd1bWVudHNbM107XG4gIHZhciB0eXBlID0gYXJndW1lbnRzLmxlbmd0aCA8PSA0IHx8IGFyZ3VtZW50c1s0XSA9PT0gdW5kZWZpbmVkID8gMCA6IGFyZ3VtZW50c1s0XTtcblxuICBpZiAoISgwLCBfSVNOVU1CRVIuSVNOVU1CRVIpKHJhdGUpIHx8ICEoMCwgX0lTTlVNQkVSLklTTlVNQkVSKShwZXJpb2RzKSkge1xuICAgIHJldHVybiBfRVJST1IyLmRlZmF1bHQudmFsdWU7XG4gIH1cblxuICBpZiAocmF0ZSA9PT0gMCkge1xuICAgIHJldHVybiAtKChwcmVzZW50ICsgZnV0dXJlKSAvIHBlcmlvZHMpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0ZXJtID0gTWF0aC5wb3coMSArIHJhdGUsIHBlcmlvZHMpO1xuICAgIGlmICh0eXBlID09PSAxKSB7XG4gICAgICByZXR1cm4gLSgoZnV0dXJlICogcmF0ZSAvICh0ZXJtIC0gMSkgKyBwcmVzZW50ICogcmF0ZSAvICgxIC0gMSAvIHRlcm0pKSAvICgxICsgcmF0ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gLShmdXR1cmUgKiByYXRlIC8gKHRlcm0gLSAxKSArIHByZXNlbnQgKiByYXRlIC8gKDEgLSAxIC8gdGVybSkpO1xuICAgIH1cbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuUE9XRVIgPSBQT1dFUjtcbmZ1bmN0aW9uIFBPV0VSKHZhbCwgbnRoKSB7XG4gIHJldHVybiBNYXRoLnBvdyh2YWwsIG50aCk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5SQU5HRSA9IHVuZGVmaW5lZDtcblxudmFyIF9DRUxMSU5ERVggPSByZXF1aXJlKCcuL0NFTExJTkRFWCcpO1xuXG52YXIgX0lOREVYMkNPTCA9IHJlcXVpcmUoJy4vSU5ERVgyQ09MJyk7XG5cbnZhciBfSU5ERVgyUk9XID0gcmVxdWlyZSgnLi9JTkRFWDJST1cnKTtcblxuLyogQSByYW5nZSByZXByZXNlbnRzIGEgc3Vic2V0IG9mIGEgd29ya3NoZWV0LlxuKlxuKiBUaGUgdG9wTGVmdCBpcyB0aGUgY2VsbCBpbmRleCBmb3IgdGhlIHRvcCBsZWZ0IChpbmNsdXNpdmUpXG4qIGNlbGwgb3IsIGFsdGVybmF0aXZlbHksIGl0IG1heSBiZSBhIGZ1bmN0aW9uIHVzZWQgdG9cbiogcmVzb2x2ZSBhIGNlbGwgaW5kZXguXG4qXG4qIFRoZSBib3R0b20gcmlnaHQgaXMgYWxzbyBhIGNlbGwgaW5kZXggb3IgYSBmdW5jdGlvbi5cbiovXG5mdW5jdGlvbiBSQU5HRShfdG9wTGVmdCwgX2JvdHRvbVJpZ2h0KSB7XG5cbiAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgIC8qIERldGVybWluZSBpZiBjZWxsSW5kZXggaXMgd2l0aGluIHJhbmdlXG4gICAgKi9cbiAgICBoaXQ6IGZ1bmN0aW9uIGhpdChjZWxsSW5kZXgpIHtcbiAgICAgIC8vIFRoZSBjZWxsIGlkIHB1dHMgdGhlIHdob2xlIHRhYmxlIGludG8gYSBzaW5nbGUgZGltZW5zaW9uLiBJdCBzaW1wbHkgbmVlZHMgdG8gYmUgYmV0d2VlbiB0aGUgdG9wTGVmdCBhbmQgdGhlIGJvdHRvbVJpZ2h0IHRvIHF1YWxpZnkuXG4gICAgICByZXR1cm4gX3RvcExlZnQgPD0gY2VsbEluZGV4ICYmIGNlbGxJbmRleCA8PSBfYm90dG9tUmlnaHQ7XG4gICAgfSxcbiAgICB0b3BMZWZ0OiBmdW5jdGlvbiB0b3BMZWZ0KCkge1xuICAgICAgcmV0dXJuIF90b3BMZWZ0O1xuICAgIH0sXG4gICAgdG9wUm93OiBmdW5jdGlvbiB0b3BSb3coKSB7XG4gICAgICByZXR1cm4gKDAsIF9JTkRFWDJST1cuSU5ERVgyUk9XKShfdG9wTGVmdCk7XG4gICAgfSxcbiAgICB0b3BDb2x1bW46IGZ1bmN0aW9uIHRvcENvbHVtbigpIHtcbiAgICAgIHJldHVybiAoMCwgX0lOREVYMkNPTC5JTkRFWDJDT0wpKF90b3BMZWZ0KTtcbiAgICB9LFxuICAgIGJvdHRvbVJpZ2h0OiBmdW5jdGlvbiBib3R0b21SaWdodCgpIHtcbiAgICAgIHJldHVybiBfYm90dG9tUmlnaHQ7XG4gICAgfSxcbiAgICBib3R0b21Db2x1bW46IGZ1bmN0aW9uIGJvdHRvbUNvbHVtbigpIHtcbiAgICAgIHJldHVybiAoMCwgX0lOREVYMkNPTC5JTkRFWDJDT0wpKF9ib3R0b21SaWdodCk7XG4gICAgfSxcbiAgICBib3R0b21Sb3c6IGZ1bmN0aW9uIGJvdHRvbVJvdygpIHtcbiAgICAgIHJldHVybiAoMCwgX0lOREVYMlJPVy5JTkRFWDJST1cpKF9ib3R0b21SaWdodCk7XG4gICAgfSxcbiAgICBzaXplOiBmdW5jdGlvbiBzaXplKCkge1xuICAgICAgcmV0dXJuIF90b3BMZWZ0IC0gX2JvdHRvbVJpZ2h0O1xuICAgIH0sXG4gICAgY2VsbHM6IGZ1bmN0aW9uIGNlbGxzKCkge1xuICAgICAgdmFyIHN0YXJ0ID0gdHlwZW9mIF90b3BMZWZ0ID09PSAnZnVuY3Rpb24nID8gX3RvcExlZnQoKSA6IF90b3BMZWZ0LFxuICAgICAgICAgIGVuZCA9IHR5cGVvZiBfYm90dG9tUmlnaHQgPT09ICdmdW5jdGlvbicgPyBfYm90dG9tUmlnaHQoKSA6IF9ib3R0b21SaWdodCxcbiAgICAgICAgICB0aGF0ID0gdGhpcztcblxuICAgICAgcmV0dXJuIEFycmF5LmFwcGx5KHN0YXJ0LCBBcnJheShlbmQgKyAxKSkubWFwKGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiB5O1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByb3dzOiBmdW5jdGlvbiByb3dzKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgcmV0dXJuIEFycmF5LmFwcGx5KHRvcFJvdygpLCBBcnJheShib3R0b21Sb3coKSArIDEpKS5tYXAoZnVuY3Rpb24gKHgsIHJvdykge1xuICAgICAgICByZXR1cm4gQXJyYXkuYXBwbHkoc2VsZi50b3BDb2x1bW4oKSwgQXJyYXkoc2VsZi5ib3R0b21Db2x1bW4oKSArIDEpKS5tYXAoZnVuY3Rpb24gKHgsIGNvbCkge1xuICAgICAgICAgIHJldHVybiBbKDAsIF9DRUxMSU5ERVguQ0VMTElOREVYKShjb2wsIHJvdyldO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59IC8qXG4gICogQSByYW5nZSByZXByZXNlbnRzIGEgZnJhZ21lbnQgb2YgYSB3b3Jrc2hlZXQuXG4gICogSXQgaXMgZGVmaW5lZCBhcyB0d28gcG9pbnRzIGluIGEgZmxhdCB3b3Jrc2hlZXQgYXJyYXkuXG4gICpcbiAgKiBVc2UgYWRkcmVzcyBzeXN0ZW0gdG8gY29udmVydCByb3cvY29sIHRvIGNlbGwgaW5kZXhlcy5cbiAgKi9cblxuZXhwb3J0cy5SQU5HRSA9IFJBTkdFOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuUkVQVCA9IFJFUFQ7XG5mdW5jdGlvbiBSRVBUKHQsIG4pIHtcbiAgdmFyIHIgPSAnJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICByICs9IHQ7XG4gIH1cbiAgcmV0dXJuIHI7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNFQVJDSCA9IFNFQVJDSDtcblxudmFyIF9FUlJPUiA9IHJlcXVpcmUoJy4vRVJST1InKTtcblxudmFyIF9FUlJPUjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FUlJPUik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIFNFQVJDSChmaW5kX3RleHQsIHdpdGhpbl90ZXh0LCBwb3NpdGlvbikge1xuICAgIGlmICghd2l0aGluX3RleHQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHBvc2l0aW9uID0gdHlwZW9mIHBvc2l0aW9uID09PSAndW5kZWZpbmVkJyA/IDEgOiBwb3NpdGlvbjtcblxuICAgIC8vIFRoZSBTRUFSQ0ggZnVuY3Rpb24gdHJhbnNsYXRlZCB0aGUgZmluZF90ZXh0IGludG8gYSByZWdleC5cbiAgICB2YXIgZmluZF9leHAgPSBmaW5kX3RleHQucmVwbGFjZSgvKFtefl0pXFw/L2csICckMS4nKSAvLyBjb252ZXJ0ID8gaW50byAuXG4gICAgLnJlcGxhY2UoLyhbXn5dKVxcKi9nLCAnJDEuKicpIC8vIGNvbnZlcnQgKiBpbnRvIC4qXG4gICAgLnJlcGxhY2UoLyhbfl0pXFw/L2csICdcXFxcPycpIC8vIGNvbnZlcnQgfj8gaW50byBcXD9cbiAgICAucmVwbGFjZSgvKFt+XSlcXCovZywgJ1xcXFwqJyk7IC8vIGNvbnZlcnQgfiogaW50byBcXCpcblxuICAgIHBvc2l0aW9uID0gbmV3IFJlZ0V4cChmaW5kX2V4cCwgXCJpXCIpLmV4ZWMod2l0aGluX3RleHQpO1xuXG4gICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiBwb3NpdGlvbi5pbmRleCArIDE7XG4gICAgfVxuICAgIHJldHVybiBfRVJST1IyLmRlZmF1bHQudmFsdWU7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNFUklBTCA9IFNFUklBTDtcblxudmFyIF9DT05TVEFOVFMgPSByZXF1aXJlKCcuL0NPTlNUQU5UUycpO1xuXG52YXIgX0VSUk9SID0gcmVxdWlyZSgnLi9FUlJPUicpO1xuXG52YXIgX0VSUk9SMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VSUk9SKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gQ29udmVydCBhIGRhdGUgb2JqZWN0IGludG8gYSBzZXJpYWwgbnVtYmVyLlxuLy8gQ3JlZGl0OiBodHRwczovL2dpdGh1Yi5jb20vc3V0b2lrdS9mb3JtdWxhLmpzL1xuZnVuY3Rpb24gU0VSSUFMKGRhdGUpIHtcbiAgICBpZiAoZGF0ZS5jb25zdHJ1Y3Rvci5uYW1lICE9PSAnRGF0ZScpIHJldHVybiBfRVJST1IyLmRlZmF1bHQubmE7XG4gICAgdmFyIGRpZmYgPSBNYXRoLmNlaWwoKGRhdGUgLSBfQ09OU1RBTlRTLmQxOTAwKSAvIF9DT05TVEFOVFMuTWlsbGlTZWNvbmRzSW5EYXkpO1xuICAgIHJldHVybiBkaWZmICsgKGRpZmYgPiA1OSA/IDIgOiAxKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNJTiA9IFNJTjtcblxudmFyIF9JU05VTUJFUiA9IHJlcXVpcmUoJy4vSVNOVU1CRVInKTtcblxudmFyIF9FUlJPUiA9IHJlcXVpcmUoJy4vRVJST1InKTtcblxudmFyIF9FUlJPUjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FUlJPUik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIFNJTih2YWx1ZSkge1xuXG4gIGlmICghKDAsIF9JU05VTUJFUi5JU05VTUJFUikodmFsdWUpKSB7XG4gICAgcmV0dXJuIF9FUlJPUjIuZGVmYXVsdC52YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLnNpbih2YWx1ZSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5TT1JUID0gU09SVDtcblxudmFyIF9JU1JFRiA9IHJlcXVpcmUoJy4vSVNSRUYnKTtcblxudmFyIF9FUlJPUiA9IHJlcXVpcmUoJy4vRVJST1InKTtcblxudmFyIF9FUlJPUjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FUlJPUik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qIFNPUlQgYSByZWZlcmVuY2UuXG4gKlxuICogVGhlIGNyaXRlcmlhIG1heSB1c2UgMSBvZiBzZXZlcmFsIGZvcm1zOlxuICpcbiAqIFNPUlQocmVmZXJlbmNlKHJlZmVyZW5jZTogQXJyYXksIC4uLmNyaXRlcmlhIDogTGlzdDxzdHJpbmc+KVxuICogU09SVChyZWZlcmVuY2UocmVmZXJlbmNlOiBSYW5nZSwgLi4uY3JpdGVyaWEgOiBMaXN0PHN0cmluZz4pXG4gKlxuICogVGhlIExpc3Q8ZnVuY3Rpb24+IHdpbGwgYmUgcmVkdWNlZCBpbnRvIGEgc2luZ2xlIGZ1bmN0aW9uLlxuICpcbiAqIFRoZSBsaXN0PHN0cmluZz4gd2lsbCBhbHNvIGJlIHJlZHVjZWQgaW50byBhIHNpbmdsZSBmdW5jdGlvbiB3aGljaFxuICogaW50ZXJwcmV0cyB0aGUgc3RyaW5ncyBhcyBwYWlycy4gVGhlIG9kZCBpdGVtcyBhcmUgZmllbGRzIGFuZCB0aGVcbiAqIGV2ZW4gb25lcyBhcmUgZGlyZWN0aW9uIChBU0N8REVTQykuXG4qKi9cblxuZnVuY3Rpb24gU09SVChyZWYpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNyaXRlcmlhID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGNyaXRlcmlhW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIC8vIHJlZHVjZSB0aGUgY3JpdGVyaWEgYXJyYXkgaW50byBhIGZ1bmN0aW9uXG4gIHZhciBtYWtlQ29tcGFyZXIgPSBmdW5jdGlvbiBtYWtlQ29tcGFyZXIoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3JpdGVyaWEubGVuZ3RoOyBpICsgMikge1xuICAgICAgICB2YXIgZmllbGQgPSB0eXBlb2YgY3JpdGVyaWFbaV0gPT09ICdzdHJpbmcnID8gY3JpdGVyaWFbaV0gOiBjcml0ZXJpYVtpXSAtIDEsXG4gICAgICAgICAgICBvcmRlciA9IGNyaXRlcmlhW2kgKyAxXTtcblxuICAgICAgICBpZiAoYVtmaWVsZF0gPCBiW2ZpZWxkXSkge1xuICAgICAgICAgIHJldHVybiBvcmRlciA/IC0xIDogMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb3JkZXIgPyAxIDogLTE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIGlmICgoMCwgX0lTUkVGLklTUkVGKShyZWYpIHx8IEFycmF5LmlzQXJyYXkocmVmKSkge1xuICAgIHJldHVybiByZWYuc29ydChtYWtlQ29tcGFyZXIoKSk7XG4gIH1cblxuICByZXR1cm4gX0VSUk9SMi5kZWZhdWx0Lm5hO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU1VNID0gU1VNO1xuXG52YXIgX0ZMQVRURU4gPSByZXF1aXJlKCcuL0ZMQVRURU4nKTtcblxudmFyIF9FUlJPUiA9IHJlcXVpcmUoJy4vRVJST1InKTtcblxudmFyIF9FUlJPUjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FUlJPUik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIEF1dGhvcjogUGV0ZXIgTW9yZXNpXG5mdW5jdGlvbiBTVU0oKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBudW1iZXJzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgbnVtYmVyc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiAoMCwgX0ZMQVRURU4uRkxBVFRFTikoKDAsIF9GTEFUVEVOLkZMQVRURU4pKG51bWJlcnMpKS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBpZiAodHlwZW9mIGIgIT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gX0VSUk9SMi5kZWZhdWx0LnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gYSArIGI7XG4gIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU1dJVENIID0gU1dJVENIO1xuXG52YXIgX0NPTkQgPSByZXF1aXJlKCcuL0NPTkQnKTtcblxuZnVuY3Rpb24gU1dJVENIKCkge1xuICByZXR1cm4gX0NPTkQuQ09ORC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuVEFOID0gVEFOO1xuXG52YXIgX0lTTlVNQkVSID0gcmVxdWlyZSgnLi9JU05VTUJFUicpO1xuXG52YXIgX0VSUk9SID0gcmVxdWlyZSgnLi9FUlJPUicpO1xuXG52YXIgX0VSUk9SMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VSUk9SKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gVEFOKHZhbHVlKSB7XG5cbiAgaWYgKCEoMCwgX0lTTlVNQkVSLklTTlVNQkVSKSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gX0VSUk9SMi5kZWZhdWx0LnZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIE1hdGgudGFuKHZhbHVlKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlRBVSA9IFRBVTtcblxudmFyIF9DT05TVEFOVFMgPSByZXF1aXJlKCcuL0NPTlNUQU5UUycpO1xuXG5mdW5jdGlvbiBUQVUoKSB7XG4gIHJldHVybiBfQ09OU1RBTlRTLs+EO1xufSAvLyBSZXR1cm5zIHRoZSB1bml2ZXJzYWwgY2lyY2xlIGNvbnN0YW50IiwiLy8gQXV0aG9yOiBQZXRlciBNb3Jlc2lcbi8vIGJhc2VkIGhlYXZpbHkgb24gY29kZSBmcm9tIHNvY2lhbGNhbGNcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5URVhUID0gVEVYVDtcblxudmFyIF9DT05TVEFOVFMgPSByZXF1aXJlKCcuL0NPTlNUQU5UUycpO1xuXG52YXIgRm9ybWF0TnVtYmVyID0ge307XG5cbkZvcm1hdE51bWJlci5mb3JtYXRfZGVmaW5pdGlvbnMgPSB7fTsgLy8gUGFyc2VkIGZvcm1hdHMgYXJlIHN0b3JlZCBoZXJlIGdsb2JhbGx5XG5cbi8vIE90aGVyIGNvbnN0YW50c1xuXG5Gb3JtYXROdW1iZXIuY29tbWFuZHMgPSB7IGNvcHk6IDEsIGNvbG9yOiAyLCBpbnRlZ2VyX3BsYWNlaG9sZGVyOiAzLCBmcmFjdGlvbl9wbGFjZWhvbGRlcjogNCwgZGVjaW1hbDogNSxcbiAgICBjdXJyZW5jeTogNiwgZ2VuZXJhbDogNywgc2VwYXJhdG9yOiA4LCBkYXRlOiA5LCBjb21wYXJpc29uOiAxMCwgc2VjdGlvbjogMTEsIHN0eWxlOiAxMiB9O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqXG5cbiAgIHJlc3VsdCA9IEZvcm1hdE51bWJlci5mb3JtYXROdW1iZXJXaXRoRm9ybWF0ID0gZnVuY3Rpb24ocmF3dmFsdWUsIGZvcm1hdF9zdHJpbmcsIGN1cnJlbmN5X2NoYXIpXG5cbiAgICoqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuRm9ybWF0TnVtYmVyLmZvcm1hdE51bWJlcldpdGhGb3JtYXQgPSBmdW5jdGlvbiAocmF3dmFsdWUsIGZvcm1hdF9zdHJpbmcsIGN1cnJlbmN5X2NoYXIpIHtcblxuICAgIHZhciBzY2ZuID0gRm9ybWF0TnVtYmVyO1xuXG4gICAgdmFyIG9wLCBvcGVyYW5kc3RyLCBmcm9tZW5kLCBjdmFsLCBvcGVyYW5kc3RybGM7XG4gICAgdmFyIHN0YXJ0dmFsLCBlc3RhcnR2YWw7XG4gICAgdmFyIGhycywgbWlucywgc2VjcywgZWhycywgZW1pbnMsIGVzZWNzLCBhbXBtc3RyLCB5bWQ7XG4gICAgdmFyIG1pbk9LLCBtcG9zO1xuICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgIHZhciBmb3JtYXQ7XG4gICAgdmFyIHNlY3Rpb24sIGdvdGNvbXBhcmlzb24sIGNvbXBvcCwgY29tcHZhbCwgY3Bvcywgb3Bwb3M7XG4gICAgdmFyIHNlY3Rpb25pbmZvO1xuICAgIHZhciBpLCBkZWNpbWFsc2NhbGUsIHNjYWxlZHZhbHVlLCBzdHJ2YWx1ZSwgc3RycGFydHMsIGludGVnZXJ2YWx1ZSwgZnJhY3Rpb252YWx1ZTtcbiAgICB2YXIgaW50ZWdlcmRpZ2l0czIsIGludGVnZXJwb3MsIGZyYWN0aW9ucG9zLCB0ZXh0Y29sb3IsIHRleHRzdHlsZSwgc2VwYXJhdG9yY2hhciwgZGVjaW1hbGNoYXI7XG4gICAgdmFyIHZhbHVlOyAvLyB3b3JraW5nIGNvcHkgdG8gY2hhbmdlIHNpZ24sIGV0Yy5cblxuICAgIHJhd3ZhbHVlID0gcmF3dmFsdWUgLSAwOyAvLyBtYWtlIHN1cmUgYSBudW1iZXJcbiAgICB2YWx1ZSA9IHJhd3ZhbHVlO1xuICAgIGlmICghaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gXCJOYU5cIjtcblxuICAgIHZhciBuZWdhdGl2ZXZhbHVlID0gdmFsdWUgPCAwID8gMSA6IDA7IC8vIGRldGVybWluZSBzaWduLCBldGMuXG4gICAgaWYgKG5lZ2F0aXZldmFsdWUpIHZhbHVlID0gLXZhbHVlO1xuICAgIHZhciB6ZXJvdmFsdWUgPSB2YWx1ZSA9PSAwID8gMSA6IDA7XG5cbiAgICBjdXJyZW5jeV9jaGFyID0gY3VycmVuY3lfY2hhciB8fCBfQ09OU1RBTlRTLkRlZmF1bHRDdXJyZW5jeTtcblxuICAgIHNjZm4ucGFyc2VfZm9ybWF0X3N0cmluZyhzY2ZuLmZvcm1hdF9kZWZpbml0aW9ucywgZm9ybWF0X3N0cmluZyk7IC8vIG1ha2Ugc3VyZSBmb3JtYXQgaXMgcGFyc2VkXG4gICAgZm9ybWF0ID0gc2Nmbi5mb3JtYXRfZGVmaW5pdGlvbnNbZm9ybWF0X3N0cmluZ107IC8vIEdldCBmb3JtYXQgc3RydWN0dXJlXG5cbiAgICBpZiAoIWZvcm1hdCkgdGhyb3cgXCJGb3JtYXQgbm90IHBhcnNlZCBlcnJvci5cIjtcblxuICAgIHNlY3Rpb24gPSBmb3JtYXQuc2VjdGlvbmluZm8ubGVuZ3RoIC0gMTsgLy8gZ2V0IG51bWJlciBvZiBzZWN0aW9ucyAtIDFcblxuICAgIGlmIChmb3JtYXQuaGFzY29tcGFyaXNvbikge1xuICAgICAgICAvLyBoYXMgY29tcGFyaXNvbnMgLSBkZXRlcm1pbmUgd2hpY2ggc2VjdGlvblxuICAgICAgICBzZWN0aW9uID0gMDsgLy8gc2V0IHRvIHdoaWNoIHNlY3Rpb24gd2Ugd2lsbCB1c2VcbiAgICAgICAgZ290Y29tcGFyaXNvbiA9IDA7IC8vIHRoaXMgc2VjdGlvbiBoYXMgbm8gY29tcGFyaXNvblxuICAgICAgICBmb3IgKGNwb3MgPSAwOzsgY3BvcysrKSB7XG4gICAgICAgICAgICAvLyBzY2FuIGZvciBjb21wYXJpc29uc1xuICAgICAgICAgICAgb3AgPSBmb3JtYXQub3BlcmF0b3JzW2Nwb3NdO1xuICAgICAgICAgICAgb3BlcmFuZHN0ciA9IGZvcm1hdC5vcGVyYW5kc1tjcG9zXTsgLy8gZ2V0IG5leHQgb3BlcmF0b3IgYW5kIG9wZXJhbmRcbiAgICAgICAgICAgIGlmICghb3ApIHtcbiAgICAgICAgICAgICAgICAvLyBhdCBlbmQgd2l0aCBubyBtYXRjaFxuICAgICAgICAgICAgICAgIGlmIChnb3Rjb21wYXJpc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGNvbXBhcmlzb24gYnV0IG5vIG1hdGNoXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdF9zdHJpbmcgPSBcIkdlbmVyYWxcIjsgLy8gdXNlIGRlZmF1bHQgb2YgR2VuZXJhbFxuICAgICAgICAgICAgICAgICAgICBzY2ZuLnBhcnNlX2Zvcm1hdF9zdHJpbmcoc2Nmbi5mb3JtYXRfZGVmaW5pdGlvbnMsIGZvcm1hdF9zdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBzY2ZuLmZvcm1hdF9kZWZpbml0aW9uc1tmb3JtYXRfc3RyaW5nXTtcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBpZiBubyBjb21wYXJpc2lvbiwgbWF0Y2hlcyBvbiB0aGlzIHNlY3Rpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcCA9PSBzY2ZuLmNvbW1hbmRzLnNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAvLyBlbmQgb2Ygc2VjdGlvblxuICAgICAgICAgICAgICAgIGlmICghZ290Y29tcGFyaXNvbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBubyBjb21wYXJpc29uLCBzbyBpdCdzIGEgbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdvdGNvbXBhcmlzb24gPSAwO1xuICAgICAgICAgICAgICAgIHNlY3Rpb24rKzsgLy8gY2hlY2sgb3V0IG5leHQgb25lXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5jb21wYXJpc29uKSB7XG4gICAgICAgICAgICAgICAgLy8gZm91bmQgYSBjb21wYXJpc29uIC0gZG8gd2UgbWVldCBpdD9cbiAgICAgICAgICAgICAgICBpID0gb3BlcmFuZHN0ci5pbmRleE9mKFwiOlwiKTtcbiAgICAgICAgICAgICAgICBjb21wb3AgPSBvcGVyYW5kc3RyLnN1YnN0cmluZygwLCBpKTtcbiAgICAgICAgICAgICAgICBjb21wdmFsID0gb3BlcmFuZHN0ci5zdWJzdHJpbmcoaSArIDEpIC0gMDtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9wID09IFwiPFwiICYmIHJhd3ZhbHVlIDwgY29tcHZhbCB8fCBjb21wb3AgPT0gXCI8PVwiICYmIHJhd3ZhbHVlIDw9IGNvbXB2YWwgfHwgY29tcG9wID09IFwiPVwiICYmIHJhd3ZhbHVlID09IGNvbXB2YWwgfHwgY29tcG9wID09IFwiPD5cIiAmJiByYXd2YWx1ZSAhPSBjb21wdmFsIHx8IGNvbXBvcCA9PSBcIj49XCIgJiYgcmF3dmFsdWUgPj0gY29tcHZhbCB8fCBjb21wb3AgPT0gXCI+XCIgJiYgcmF3dmFsdWUgPiBjb21wdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGEgbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdvdGNvbXBhcmlzb24gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWN0aW9uID4gMCkge1xuICAgICAgICAvLyBtb3JlIHRoYW4gb25lIHNlY3Rpb24gKHNlcGFyYXRlZCBieSBcIjtcIilcbiAgICAgICAgaWYgKHNlY3Rpb24gPT0gMSkge1xuICAgICAgICAgICAgLy8gdHdvIHNlY3Rpb25zXG4gICAgICAgICAgICBpZiAobmVnYXRpdmV2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5lZ2F0aXZldmFsdWUgPSAwOyAvLyBzaWduIHdpbGwgcHJvdmlkZWQgYnkgc2VjdGlvbiwgbm90IGF1dG9tYXRpY2FsbHlcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gMTsgLy8gdXNlIHNlY29uZCBzZWN0aW9uIGZvciBuZWdhdGl2ZSB2YWx1ZXNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb24gPSAwOyAvLyB1c2UgZmlyc3QgZm9yIGFsbCBvdGhlcnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhyZWUgc2VjdGlvbnNcbiAgICAgICAgICAgICAgICBpZiAobmVnYXRpdmV2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZXZhbHVlID0gMDsgLy8gc2lnbiB3aWxsIHByb3ZpZGVkIGJ5IHNlY3Rpb24sIG5vdCBhdXRvbWF0aWNhbGx5XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb24gPSAxOyAvLyB1c2Ugc2Vjb25kIHNlY3Rpb24gZm9yIG5lZ2F0aXZlIHZhbHVlc1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoemVyb3ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uID0gMjsgLy8gdXNlIHRoaXJkIHNlY3Rpb24gZm9yIHplcm8gdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbiA9IDA7IC8vIHVzZSBmaXJzdCBmb3IgcG9zaXRpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWN0aW9uaW5mbyA9IGZvcm1hdC5zZWN0aW9uaW5mb1tzZWN0aW9uXTsgLy8gbG9vayBhdCB2YWx1ZXMgZm9yIG91ciBzZWN0aW9uXG5cbiAgICBpZiAoc2VjdGlvbmluZm8uY29tbWFzID4gMCkge1xuICAgICAgICAvLyBzY2FsZSBieSB0aG91c2FuZHNcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHNlY3Rpb25pbmZvLmNvbW1hczsgaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZSAvPSAxMDAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZWN0aW9uaW5mby5wZXJjZW50ID4gMCkge1xuICAgICAgICAvLyBkbyBwZXJjZW50IHNjYWxpbmdcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHNlY3Rpb25pbmZvLnBlcmNlbnQ7IGkrKykge1xuICAgICAgICAgICAgdmFsdWUgKj0gMTAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjaW1hbHNjYWxlID0gMTsgLy8gY3V0IGRvd24gdG8gcmVxdWlyZWQgbnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzXG4gICAgZm9yIChpID0gMDsgaSA8IHNlY3Rpb25pbmZvLmZyYWN0aW9uZGlnaXRzOyBpKyspIHtcbiAgICAgICAgZGVjaW1hbHNjYWxlICo9IDEwO1xuICAgIH1cbiAgICBzY2FsZWR2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUgKiBkZWNpbWFsc2NhbGUgKyAwLjUpO1xuICAgIHNjYWxlZHZhbHVlID0gc2NhbGVkdmFsdWUgLyBkZWNpbWFsc2NhbGU7XG5cbiAgICBpZiAodHlwZW9mIHNjYWxlZHZhbHVlICE9IFwibnVtYmVyXCIpIHJldHVybiBcIk5hTlwiO1xuICAgIGlmICghaXNGaW5pdGUoc2NhbGVkdmFsdWUpKSByZXR1cm4gXCJOYU5cIjtcblxuICAgIHN0cnZhbHVlID0gc2NhbGVkdmFsdWUgKyBcIlwiOyAvLyBjb252ZXJ0IHRvIHN0cmluZyAoTnVtYmVyLnRvRml4ZWQgZG9lc24ndCBkbyBhbGwgd2UgbmVlZClcblxuICAgIC8vICAgc3RydmFsdWUgPSB2YWx1ZS50b0ZpeGVkKHNlY3Rpb25pbmZvLmZyYWN0aW9uZGlnaXRzKTsgLy8gY3V0IGRvd24gdG8gcmVxdWlyZWQgbnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzXG4gICAgLy8gYW5kIGNvbnZlcnQgdG8gc3RyaW5nXG5cbiAgICBpZiAoc2NhbGVkdmFsdWUgPT0gMCAmJiAoc2VjdGlvbmluZm8uZnJhY3Rpb25kaWdpdHMgfHwgc2VjdGlvbmluZm8uaW50ZWdlcmRpZ2l0cykpIHtcbiAgICAgICAgbmVnYXRpdmV2YWx1ZSA9IDA7IC8vIG5vIFwiLTBcIiB1bmxlc3MgdXNpbmcgbXVsdGlwbGUgc2VjdGlvbnMgb3IgR2VuZXJhbFxuICAgIH1cblxuICAgIGlmIChzdHJ2YWx1ZS5pbmRleE9mKFwiZVwiKSA+PSAwKSB7XG4gICAgICAgIC8vIGNvbnZlcnRlZCB0byBzY2llbnRpZmljIG5vdGF0aW9uXG4gICAgICAgIHJldHVybiByYXd2YWx1ZSArIFwiXCI7IC8vIEp1c3QgcmV0dXJuIHBsYWluIGNvbnZlcnRlZCByYXcgdmFsdWVcbiAgICB9XG5cbiAgICBzdHJwYXJ0cyA9IHN0cnZhbHVlLm1hdGNoKC9eXFwrezAsMX0oXFxkKikoPzpcXC4oXFxkKikpezAsMX0kLyk7IC8vIGdldCBpbnRlZ2VyIGFuZCBmcmFjdGlvbiBwYXJ0c1xuICAgIGlmICghc3RycGFydHMpIHJldHVybiBcIk5hTlwiOyAvLyBpZiBub3QgYSBudW1iZXJcbiAgICBpbnRlZ2VydmFsdWUgPSBzdHJwYXJ0c1sxXTtcbiAgICBpZiAoIWludGVnZXJ2YWx1ZSB8fCBpbnRlZ2VydmFsdWUgPT0gXCIwXCIpIGludGVnZXJ2YWx1ZSA9IFwiXCI7XG4gICAgZnJhY3Rpb252YWx1ZSA9IHN0cnBhcnRzWzJdO1xuICAgIGlmICghZnJhY3Rpb252YWx1ZSkgZnJhY3Rpb252YWx1ZSA9IFwiXCI7XG5cbiAgICBpZiAoc2VjdGlvbmluZm8uaGFzZGF0ZSkge1xuICAgICAgICAvLyB0aGVyZSBhcmUgZGF0ZSBwbGFjZWhvbGRlcnNcbiAgICAgICAgaWYgKHJhd3ZhbHVlIDwgMCkge1xuICAgICAgICAgICAgLy8gYmFkIGRhdGVcbiAgICAgICAgICAgIHJldHVybiBcIj8/LT8/Py0/PyZuYnNwOz8/Oj8/Oj8/XCI7XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnR2YWwgPSAocmF3dmFsdWUgLSBNYXRoLmZsb29yKHJhd3ZhbHVlKSkgKiBfQ09OU1RBTlRTLlNlY29uZHNJbkRheTsgLy8gZ2V0IGRhdGUvdGltZSBwYXJ0c1xuICAgICAgICBlc3RhcnR2YWwgPSByYXd2YWx1ZSAqIF9DT05TVEFOVFMuU2Vjb25kc0luRGF5OyAvLyBkbyBlbGFwc2VkIHRpbWUgdmVyc2lvbiwgdG9vXG4gICAgICAgIGhycyA9IE1hdGguZmxvb3Ioc3RhcnR2YWwgLyBfQ09OU1RBTlRTLlNlY29uZHNJbkhvdXIpO1xuICAgICAgICBlaHJzID0gTWF0aC5mbG9vcihlc3RhcnR2YWwgLyBfQ09OU1RBTlRTLlNlY29uZHNJbkhvdXIpO1xuICAgICAgICBzdGFydHZhbCA9IHN0YXJ0dmFsIC0gaHJzICogX0NPTlNUQU5UUy5TZWNvbmRzSW5Ib3VyO1xuICAgICAgICBtaW5zID0gTWF0aC5mbG9vcihzdGFydHZhbCAvIDYwKTtcbiAgICAgICAgZW1pbnMgPSBNYXRoLmZsb29yKGVzdGFydHZhbCAvIDYwKTtcbiAgICAgICAgc2VjcyA9IHN0YXJ0dmFsIC0gbWlucyAqIDYwO1xuICAgICAgICBkZWNpbWFsc2NhbGUgPSAxOyAvLyByb3VuZCBhcHByb3ByaWF0ZWx5IGRlcGVuZGluZyBpZiB0aGVyZSBpcyBzcy4wXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzZWN0aW9uaW5mby5mcmFjdGlvbmRpZ2l0czsgaSsrKSB7XG4gICAgICAgICAgICBkZWNpbWFsc2NhbGUgKj0gMTA7XG4gICAgICAgIH1cbiAgICAgICAgc2VjcyA9IE1hdGguZmxvb3Ioc2VjcyAqIGRlY2ltYWxzY2FsZSArIDAuNSk7XG4gICAgICAgIHNlY3MgPSBzZWNzIC8gZGVjaW1hbHNjYWxlO1xuICAgICAgICBlc2VjcyA9IE1hdGguZmxvb3IoZXN0YXJ0dmFsICogZGVjaW1hbHNjYWxlICsgMC41KTtcbiAgICAgICAgZXNlY3MgPSBlc2VjcyAvIGRlY2ltYWxzY2FsZTtcbiAgICAgICAgaWYgKHNlY3MgPj0gNjApIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSByb3VuZCB1cCBpbnRvIG5leHQgc2Vjb25kLCBtaW51dGUsIGV0Yy5cbiAgICAgICAgICAgIHNlY3MgPSAwO1xuICAgICAgICAgICAgbWlucysrO2VtaW5zKys7XG4gICAgICAgICAgICBpZiAobWlucyA+PSA2MCkge1xuICAgICAgICAgICAgICAgIG1pbnMgPSAwO1xuICAgICAgICAgICAgICAgIGhycysrO2VocnMrKztcbiAgICAgICAgICAgICAgICBpZiAoaHJzID49IDI0KSB7XG4gICAgICAgICAgICAgICAgICAgIGhycyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHJhd3ZhbHVlKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZyYWN0aW9udmFsdWUgPSBzZWNzIC0gTWF0aC5mbG9vcihzZWNzKSArIFwiXCI7IC8vIGZvciBcImhoOm1tOnNzLjAwMFwiXG4gICAgICAgIGZyYWN0aW9udmFsdWUgPSBmcmFjdGlvbnZhbHVlLnN1YnN0cmluZygyKTsgLy8gc2tpcCBcIjAuXCJcblxuICAgICAgICB5bWQgPSBGb3JtYXROdW1iZXIuY29udmVydF9kYXRlX2p1bGlhbl90b19ncmVnb3JpYW4oTWF0aC5mbG9vcihyYXd2YWx1ZSArIF9DT05TVEFOVFMuSnVsaWFuT2Zmc2V0KSk7XG5cbiAgICAgICAgbWluT0sgPSAwOyAvLyBzYXlzIFwibVwiIGNhbiBiZSBtaW51dGVzIGlmIHRydWVcbiAgICAgICAgbXNwb3MgPSBzZWN0aW9uaW5mby5zZWN0aW9uc3RhcnQ7IC8vIG0gc2NhbiBwb3NpdGlvbiBpbiBvcHNcbiAgICAgICAgZm9yICg7OyBtc3BvcysrKSB7XG4gICAgICAgICAgICAvLyBzY2FuIGZvciBcIm1cIiBhbmQgXCJtbVwiIHRvIHNlZSBpZiBhbnkgbWludXRlcyBmaWVsZHMsIGFuZCBhbS9wbVxuICAgICAgICAgICAgb3AgPSBmb3JtYXQub3BlcmF0b3JzW21zcG9zXTtcbiAgICAgICAgICAgIG9wZXJhbmRzdHIgPSBmb3JtYXQub3BlcmFuZHNbbXNwb3NdOyAvLyBnZXQgbmV4dCBvcGVyYXRvciBhbmQgb3BlcmFuZFxuICAgICAgICAgICAgaWYgKCFvcCkgYnJlYWs7IC8vIGRvbid0IGdvIHBhc3QgZW5kXG4gICAgICAgICAgICBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5zZWN0aW9uKSBicmVhaztcbiAgICAgICAgICAgIGlmIChvcCA9PSBzY2ZuLmNvbW1hbmRzLmRhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoKG9wZXJhbmRzdHIudG9Mb3dlckNhc2UoKSA9PSBcImFtL3BtXCIgfHwgb3BlcmFuZHN0ci50b0xvd2VyQ2FzZSgpID09IFwiYS9wXCIpICYmICFhbXBtc3RyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChocnMgPj0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhycyAtPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtcG1zdHIgPSBvcGVyYW5kc3RyLnRvTG93ZXJDYXNlKCkgPT0gXCJhL3BcIiA/IF9DT05TVEFOVFMuUE0xIDogX0NPTlNUQU5UUy5QTTsgLy8gXCJQXCIgOiBcIlBNXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1wbXN0ciA9IG9wZXJhbmRzdHIudG9Mb3dlckNhc2UoKSA9PSBcImEvcFwiID8gX0NPTlNUQU5UUy5BTTEgOiBfQ09OU1RBTlRTLkFNOyAvLyBcIkFcIiA6IFwiQU1cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhbmRzdHIuaW5kZXhPZihhbXBtc3RyKSA8IDApIGFtcG1zdHIgPSBhbXBtc3RyLnRvTG93ZXJDYXNlKCk7IC8vIGhhdmUgY2FzZSBtYXRjaCBjYXNlIGluIGZvcm1hdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWluT0sgJiYgKG9wZXJhbmRzdHIgPT0gXCJtXCIgfHwgb3BlcmFuZHN0ciA9PSBcIm1tXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdC5vcGVyYW5kc1ttc3Bvc10gKz0gXCJpblwiOyAvLyB0dXJuIGludG8gXCJtaW5cIiBvciBcIm1taW5cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob3BlcmFuZHN0ci5jaGFyQXQoMCkgPT0gXCJoXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWluT0sgPSAxOyAvLyBtIGZvbGxvd2luZyBoIG9yIGhoIG9yIFtoXSBpcyBtaW51dGVzIG5vdCBtb250aHNcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluT0sgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wICE9IHNjZm4uY29tbWFuZHMuY29weSkge1xuICAgICAgICAgICAgICAgIC8vIGNvcHlpbmcgY2hhcnMgY2FuIGJlIGJldHdlZW4gaCBhbmQgbVxuICAgICAgICAgICAgICAgIG1pbk9LID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtaW5PSyA9IDA7XG4gICAgICAgIGZvciAoLS1tc3Bvczs7IG1zcG9zLS0pIHtcbiAgICAgICAgICAgIC8vIHNjYW4gb3RoZXIgd2F5IGZvciBzIGFmdGVyIG1cbiAgICAgICAgICAgIG9wID0gZm9ybWF0Lm9wZXJhdG9yc1ttc3Bvc107XG4gICAgICAgICAgICBvcGVyYW5kc3RyID0gZm9ybWF0Lm9wZXJhbmRzW21zcG9zXTsgLy8gZ2V0IG5leHQgb3BlcmF0b3IgYW5kIG9wZXJhbmRcbiAgICAgICAgICAgIGlmICghb3ApIGJyZWFrOyAvLyBkb24ndCBnbyBwYXN0IGVuZFxuICAgICAgICAgICAgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuc2VjdGlvbikgYnJlYWs7XG4gICAgICAgICAgICBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5kYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1pbk9LICYmIChvcGVyYW5kc3RyID09IFwibVwiIHx8IG9wZXJhbmRzdHIgPT0gXCJtbVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQub3BlcmFuZHNbbXNwb3NdICs9IFwiaW5cIjsgLy8gdHVybiBpbnRvIFwibWluXCIgb3IgXCJtbWluXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9wZXJhbmRzdHIgPT0gXCJzc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbk9LID0gMTsgLy8gbSBiZWZvcmUgc3MgaXMgbWludXRlcyBub3QgbW9udGhzXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbk9LID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChvcCAhPSBzY2ZuLmNvbW1hbmRzLmNvcHkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb3B5aW5nIGNoYXJzIGNhbiBiZSBiZXR3ZWVuIHNzIGFuZCBtXG4gICAgICAgICAgICAgICAgbWluT0sgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW50ZWdlcmRpZ2l0czIgPSAwOyAvLyBpbml0IGNvdW50ZXJzLCBldGMuXG4gICAgaW50ZWdlcnBvcyA9IDA7XG4gICAgZnJhY3Rpb25wb3MgPSAwO1xuICAgIHRleHRjb2xvciA9IFwiXCI7XG4gICAgdGV4dHN0eWxlID0gXCJcIjtcbiAgICBzZXBhcmF0b3JjaGFyID0gX0NPTlNUQU5UUy5TZXBhcmF0b3JDaGFyO1xuICAgIGlmIChzZXBhcmF0b3JjaGFyLmluZGV4T2YoXCIgXCIpID49IDApIHNlcGFyYXRvcmNoYXIgPSBzZXBhcmF0b3JjaGFyLnJlcGxhY2UoLyAvZywgXCImbmJzcDtcIik7XG4gICAgZGVjaW1hbGNoYXIgPSBfQ09OU1RBTlRTLkRlY2ltYWxDaGFyO1xuICAgIGlmIChkZWNpbWFsY2hhci5pbmRleE9mKFwiIFwiKSA+PSAwKSBkZWNpbWFsY2hhciA9IGRlY2ltYWxjaGFyLnJlcGxhY2UoLyAvZywgXCImbmJzcDtcIik7XG5cbiAgICBvcHBvcyA9IHNlY3Rpb25pbmZvLnNlY3Rpb25zdGFydDtcblxuICAgIHdoaWxlIChvcCA9IGZvcm1hdC5vcGVyYXRvcnNbb3Bwb3NdKSB7XG4gICAgICAgIC8vIGV4ZWN1dGUgZm9ybWF0XG4gICAgICAgIG9wZXJhbmRzdHIgPSBmb3JtYXQub3BlcmFuZHNbb3Bwb3MrK107IC8vIGdldCBuZXh0IG9wZXJhdG9yIGFuZCBvcGVyYW5kXG5cbiAgICAgICAgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuY29weSkge1xuICAgICAgICAgICAgLy8gcHV0IGNoYXIgaW4gcmVzdWx0XG4gICAgICAgICAgICByZXN1bHQgKz0gb3BlcmFuZHN0cjtcbiAgICAgICAgfSBlbHNlIGlmIChvcCA9PSBzY2ZuLmNvbW1hbmRzLmNvbG9yKSB7XG4gICAgICAgICAgICAvLyBzZXQgY29sb3JcbiAgICAgICAgICAgIHRleHRjb2xvciA9IG9wZXJhbmRzdHI7XG4gICAgICAgIH0gZWxzZSBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5zdHlsZSkge1xuICAgICAgICAgICAgLy8gc2V0IHN0eWxlXG4gICAgICAgICAgICB0ZXh0c3R5bGUgPSBvcGVyYW5kc3RyO1xuICAgICAgICB9IGVsc2UgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuaW50ZWdlcl9wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgLy8gaW5zZXJ0IG51bWJlciBwYXJ0XG4gICAgICAgICAgICBpZiAobmVnYXRpdmV2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIi1cIjtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZXZhbHVlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGludGVnZXJkaWdpdHMyKys7XG4gICAgICAgICAgICBpZiAoaW50ZWdlcmRpZ2l0czIgPT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIGZpcnN0IG9uZVxuICAgICAgICAgICAgICAgIGlmIChpbnRlZ2VydmFsdWUubGVuZ3RoID4gc2VjdGlvbmluZm8uaW50ZWdlcmRpZ2l0cykge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZWUgaWYgaW50ZWdlciB3aWRlciB0aGFuIGZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZvciAoOyBpbnRlZ2VycG9zIDwgaW50ZWdlcnZhbHVlLmxlbmd0aCAtIHNlY3Rpb25pbmZvLmludGVnZXJkaWdpdHM7IGludGVnZXJwb3MrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGludGVnZXJ2YWx1ZS5jaGFyQXQoaW50ZWdlcnBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VjdGlvbmluZm8udGhvdXNhbmRzc2VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VlIGlmIHRoaXMgaXMgYSBzZXBhcmF0b3IgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tZW5kID0gaW50ZWdlcnZhbHVlLmxlbmd0aCAtIGludGVnZXJwb3MgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmcm9tZW5kID4gMiAmJiBmcm9tZW5kICUgMyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBzZXBhcmF0b3JjaGFyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnRlZ2VydmFsdWUubGVuZ3RoIDwgc2VjdGlvbmluZm8uaW50ZWdlcmRpZ2l0cyAmJiBpbnRlZ2VyZGlnaXRzMiA8PSBzZWN0aW9uaW5mby5pbnRlZ2VyZGlnaXRzIC0gaW50ZWdlcnZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIGZpZWxkIGlzIHdpZGVyIHRoYW4gdmFsdWVcbiAgICAgICAgICAgICAgICBpZiAob3BlcmFuZHN0ciA9PSBcIjBcIiB8fCBvcGVyYW5kc3RyID09IFwiP1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbGwgd2l0aCBhcHByb3ByaWF0ZSBjaGFyYWN0ZXJzXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBvcGVyYW5kc3RyID09IFwiMFwiID8gXCIwXCIgOiBcIiZuYnNwO1wiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VjdGlvbmluZm8udGhvdXNhbmRzc2VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWUgaWYgdGhpcyBpcyBhIHNlcGFyYXRvciBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbWVuZCA9IHNlY3Rpb25pbmZvLmludGVnZXJkaWdpdHMgLSBpbnRlZ2VyZGlnaXRzMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmcm9tZW5kID4gMiAmJiBmcm9tZW5kICUgMyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IHNlcGFyYXRvcmNoYXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5vcm1hbCBpbnRlZ2VyIGRpZ2l0IC0gYWRkIGl0XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGludGVnZXJ2YWx1ZS5jaGFyQXQoaW50ZWdlcnBvcyk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY3Rpb25pbmZvLnRob3VzYW5kc3NlcCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZWUgaWYgdGhpcyBpcyBhIHNlcGFyYXRvciBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICBmcm9tZW5kID0gaW50ZWdlcnZhbHVlLmxlbmd0aCAtIGludGVnZXJwb3MgLSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnJvbWVuZCA+IDIgJiYgZnJvbWVuZCAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IHNlcGFyYXRvcmNoYXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW50ZWdlcnBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuZnJhY3Rpb25fcGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIC8vIGFkZCBmcmFjdGlvbiBwYXJ0IG9mIG51bWJlclxuICAgICAgICAgICAgaWYgKGZyYWN0aW9ucG9zID49IGZyYWN0aW9udmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wZXJhbmRzdHIgPT0gXCIwXCIgfHwgb3BlcmFuZHN0ciA9PSBcIj9cIikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gb3BlcmFuZHN0ciA9PSBcIjBcIiA/IFwiMFwiIDogXCImbmJzcDtcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBmcmFjdGlvbnZhbHVlLmNoYXJBdChmcmFjdGlvbnBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmcmFjdGlvbnBvcysrO1xuICAgICAgICB9IGVsc2UgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuZGVjaW1hbCkge1xuICAgICAgICAgICAgLy8gZGVjaW1hbCBwb2ludFxuICAgICAgICAgICAgaWYgKG5lZ2F0aXZldmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCItXCI7XG4gICAgICAgICAgICAgICAgbmVnYXRpdmV2YWx1ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgKz0gZGVjaW1hbGNoYXI7XG4gICAgICAgIH0gZWxzZSBpZiAob3AgPT0gc2Nmbi5jb21tYW5kcy5jdXJyZW5jeSkge1xuICAgICAgICAgICAgLy8gY3VycmVuY3kgc3ltYm9sXG4gICAgICAgICAgICBpZiAobmVnYXRpdmV2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIi1cIjtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZXZhbHVlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCArPSBvcGVyYW5kc3RyO1xuICAgICAgICB9IGVsc2UgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuZ2VuZXJhbCkge1xuICAgICAgICAgICAgLy8gaW5zZXJ0IFwiR2VuZXJhbFwiIGNvbnZlcnNpb25cblxuICAgICAgICAgICAgLy8gKioqIEN1dCBkb3duIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgYXJ0aWZhY3RzOlxuXG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgaWYgbm9uLXplcm9cbiAgICAgICAgICAgICAgICB2YXIgZmFjdG9yID0gTWF0aC5mbG9vcihNYXRoLkxPRzEwRSAqIE1hdGgubG9nKHZhbHVlKSk7IC8vIGdldCBpbnRlZ2VyIG1hZ25pdHVkZSBhcyBhIHBvd2VyIG9mIDEwXG4gICAgICAgICAgICAgICAgZmFjdG9yID0gTWF0aC5wb3coMTAsIDEzIC0gZmFjdG9yKTsgLy8gdHVybiBpbnRvIHNjYWxpbmcgZmFjdG9yXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmZsb29yKGZhY3RvciAqIHZhbHVlICsgMC41KSAvIGZhY3RvcjsgLy8gc2NhbGUgcG9zaXRpdmUgdmFsdWUsIHJvdW5kLCB1bmRvIHNjYWxpbmdcbiAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIFwiTmFOXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmVnYXRpdmV2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIi1cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cnZhbHVlID0gdmFsdWUgKyBcIlwiOyAvLyBjb252ZXJ0IG9yaWdpbmFsIHZhbHVlIHRvIHN0cmluZ1xuICAgICAgICAgICAgaWYgKHN0cnZhbHVlLmluZGV4T2YoXCJlXCIpID49IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0ZWQgdG8gc2NpZW50aWZpYyBub3RhdGlvblxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBzdHJ2YWx1ZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cnBhcnRzID0gc3RydmFsdWUubWF0Y2goL15cXCt7MCwxfShcXGQqKSg/OlxcLihcXGQqKSl7MCwxfSQvKTsgLy8gZ2V0IGludGVnZXIgYW5kIGZyYWN0aW9uIHBhcnRzXG4gICAgICAgICAgICBpbnRlZ2VydmFsdWUgPSBzdHJwYXJ0c1sxXTtcbiAgICAgICAgICAgIGlmICghaW50ZWdlcnZhbHVlIHx8IGludGVnZXJ2YWx1ZSA9PSBcIjBcIikgaW50ZWdlcnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIGZyYWN0aW9udmFsdWUgPSBzdHJwYXJ0c1syXTtcbiAgICAgICAgICAgIGlmICghZnJhY3Rpb252YWx1ZSkgZnJhY3Rpb252YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICBpbnRlZ2VycG9zID0gMDtcbiAgICAgICAgICAgIGZyYWN0aW9ucG9zID0gMDtcbiAgICAgICAgICAgIGlmIChpbnRlZ2VydmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yICg7IGludGVnZXJwb3MgPCBpbnRlZ2VydmFsdWUubGVuZ3RoOyBpbnRlZ2VycG9zKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGludGVnZXJ2YWx1ZS5jaGFyQXQoaW50ZWdlcnBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWN0aW9uaW5mby50aG91c2FuZHNzZXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlZSBpZiB0aGlzIGlzIGEgc2VwYXJhdG9yIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tZW5kID0gaW50ZWdlcnZhbHVlLmxlbmd0aCAtIGludGVnZXJwb3MgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZyb21lbmQgPiAyICYmIGZyb21lbmQgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gc2VwYXJhdG9yY2hhcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiMFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZyYWN0aW9udmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGRlY2ltYWxjaGFyO1xuICAgICAgICAgICAgICAgIGZvciAoOyBmcmFjdGlvbnBvcyA8IGZyYWN0aW9udmFsdWUubGVuZ3RoOyBmcmFjdGlvbnBvcysrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBmcmFjdGlvbnZhbHVlLmNoYXJBdChmcmFjdGlvbnBvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuZGF0ZSkge1xuICAgICAgICAgICAgLy8gZGF0ZSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgb3BlcmFuZHN0cmxjID0gb3BlcmFuZHN0ci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKG9wZXJhbmRzdHJsYyA9PSBcInlcIiB8fCBvcGVyYW5kc3RybGMgPT0gXCJ5eVwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9ICh5bWQueWVhciArIFwiXCIpLnN1YnN0cmluZygyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09IFwieXl5eVwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHltZC55ZWFyICsgXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09IFwiZFwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHltZC5kYXkgKyBcIlwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYW5kc3RybGMgPT0gXCJkZFwiKSB7XG4gICAgICAgICAgICAgICAgY3ZhbCA9IDEwMDAgKyB5bWQuZGF5O1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAoY3ZhbCArIFwiXCIpLnN1YnN0cigyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09IFwiZGRkXCIpIHtcbiAgICAgICAgICAgICAgICBjdmFsID0gTWF0aC5mbG9vcihyYXd2YWx1ZSArIDYpICUgNztcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gX0NPTlNUQU5UUy5EYXlOYW1lczNbY3ZhbF07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSBcImRkZGRcIikge1xuICAgICAgICAgICAgICAgIGN2YWwgPSBNYXRoLmZsb29yKHJhd3ZhbHVlICsgNikgJSA3O1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBfQ09OU1RBTlRTLkRheU5hbWVzW2N2YWxdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYW5kc3RybGMgPT0gXCJtXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0geW1kLm1vbnRoICsgXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09IFwibW1cIikge1xuICAgICAgICAgICAgICAgIGN2YWwgPSAxMDAwICsgeW1kLm1vbnRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAoY3ZhbCArIFwiXCIpLnN1YnN0cigyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09IFwibW1tXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gX0NPTlNUQU5UUy5Nb250aE5hbWVzM1t5bWQubW9udGggLSAxXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09IFwibW1tbVwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IF9DT05TVEFOVFMuTW9udGhOYW1lc1t5bWQubW9udGggLSAxXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09IFwibW1tbW1cIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBfQ09OU1RBTlRTLk1vbnRoTmFtZXNbeW1kLm1vbnRoIC0gMV0uY2hhckF0KDApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYW5kc3RybGMgPT0gXCJoXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gaHJzICsgXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09IFwiaF1cIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBlaHJzICsgXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09IFwibW1pblwiKSB7XG4gICAgICAgICAgICAgICAgY3ZhbCA9IDEwMDAgKyBtaW5zICsgXCJcIjtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gY3ZhbC5zdWJzdHIoMik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSBcIm1tXVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVtaW5zIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGN2YWwgPSAxMDAwICsgZW1pbnMgKyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gY3ZhbC5zdWJzdHIoMik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGVtaW5zICsgXCJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSBcIm1pblwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IG1pbnMgKyBcIlwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYW5kc3RybGMgPT0gXCJtXVwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGVtaW5zICsgXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09IFwiaGhcIikge1xuICAgICAgICAgICAgICAgIGN2YWwgPSAxMDAwICsgaHJzICsgXCJcIjtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gY3ZhbC5zdWJzdHIoMik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSBcInNcIikge1xuICAgICAgICAgICAgICAgIGN2YWwgPSBNYXRoLmZsb29yKHNlY3MpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBjdmFsICsgXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFuZHN0cmxjID09IFwic3NcIikge1xuICAgICAgICAgICAgICAgIGN2YWwgPSAxMDAwICsgTWF0aC5mbG9vcihzZWNzKSArIFwiXCI7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGN2YWwuc3Vic3RyKDIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYW5kc3RybGMgPT0gXCJhbS9wbVwiIHx8IG9wZXJhbmRzdHJsYyA9PSBcImEvcFwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGFtcG1zdHI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wZXJhbmRzdHJsYyA9PSBcInNzXVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVzZWNzIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGN2YWwgPSAxMDAwICsgTWF0aC5mbG9vcihlc2VjcykgKyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gY3ZhbC5zdWJzdHIoMik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3ZhbCA9IE1hdGguZmxvb3IoZXNlY3MpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gY3ZhbCArIFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuc2VjdGlvbikge1xuICAgICAgICAgICAgLy8gZW5kIG9mIHNlY3Rpb25cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKG9wID09IHNjZm4uY29tbWFuZHMuY29tcGFyaXNvbikge1xuICAgICAgICAgICAgLy8gaWdub3JlXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBcIiEhIFBhcnNlIGVycm9yLiEhXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGV4dGNvbG9yKSB7XG4gICAgICAgIHJlc3VsdCA9ICc8c3BhbiBzdHlsZT1cImNvbG9yOicgKyB0ZXh0Y29sb3IgKyAnO1wiPicgKyByZXN1bHQgKyAnPC9zcGFuPic7XG4gICAgfVxuICAgIGlmICh0ZXh0c3R5bGUpIHtcbiAgICAgICAgcmVzdWx0ID0gJzxzcGFuIHN0eWxlPVwiJyArIHRleHRzdHlsZSArICc7XCI+JyArIHJlc3VsdCArICc8L3NwYW4+JztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyogKioqKioqKioqKioqKioqKioqKlxuXG4gICBGb3JtYXROdW1iZXIucGFyc2VfZm9ybWF0X3N0cmluZyhmb3JtYXRfZGVmcywgZm9ybWF0X3N0cmluZylcblxuICAgVGFrZXMgYSBmb3JtYXQgc3RyaW5nIChlLmcuLCBcIiMsIyMwLjAwXyk7KCMsIyMwLjAwKVwiKSBhbmQgZmlsbHMgaW4gZm9ybWF0X2RlZnMgd2l0aCB0aGUgcGFyc2VkIGluZm9cblxuICAgZm9ybWF0X2RlZnNcbiAgIFtcIiMsIyMwLjBcIl0tPnt9IC0gZWxlbWVudHMgaW4gdGhlIGhhc2ggYXJlIG9uZSBoYXNoIGZvciBlYWNoIGZvcm1hdFxuICAgLm9wZXJhdG9ycy0+W10gLSBhcnJheSBvZiBvcGVyYXRvcnMgZnJvbSBwYXJzaW5nIHRoZSBmb3JtYXQgc3RyaW5nIChlYWNoIGEgbnVtYmVyKVxuICAgLm9wZXJhbmRzLT5bXSAtIGFycmF5IG9mIGNvcnJlc3BvbmRpbmcgb3BlcmF0b3JzIChlYWNoIHVzdWFsbHkgYSBzdHJpbmcpXG4gICAuc2VjdGlvbmluZm8tPltdIC0gb25lIGhhc2ggZm9yIGVhY2ggc2VjdGlvbiBvZiB0aGUgZm9ybWF0XG4gICAuc3RhcnRcbiAgIC5pbnRlZ2VyZGlnaXRzXG4gICAuZnJhY3Rpb25kaWdpdHNcbiAgIC5jb21tYXNcbiAgIC5wZXJjZW50XG4gICAudGhvdXNhbmRzc2VwXG4gICAuaGFzZGF0ZXNcbiAgIC5oYXNjb21wYXJpc29uIC0gdHJ1ZSBpZiBhbnkgc2VjdGlvbiBoYXMgWzwxMDBdLCBldGMuXG5cbiAgICoqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuRm9ybWF0TnVtYmVyLnBhcnNlX2Zvcm1hdF9zdHJpbmcgPSBmdW5jdGlvbiAoZm9ybWF0X2RlZnMsIGZvcm1hdF9zdHJpbmcpIHtcblxuICAgIHZhciBzY2ZuID0gRm9ybWF0TnVtYmVyO1xuXG4gICAgdmFyIGZvcm1hdCwgc2VjdGlvbiwgc2VjdGlvbmluZm87XG4gICAgdmFyIGludGVnZXJwYXJ0ID0gMTsgLy8gc3RhcnQgb3V0IGluIGludGVnZXIgcGFydFxuICAgIHZhciBsYXN0d2FzaW50ZWdlcjsgLy8gbGFzdCBjaGFyIHdhcyBhbiBpbnRlZ2VyIHBsYWNlaG9sZGVyXG4gICAgdmFyIGxhc3R3YXNzbGFzaDsgLy8gbGFzdCBjaGFyIHdhcyBhIGJhY2tzbGFzaCAtIGVzY2FwaW5nIGZvbGxvd2luZyBjaGFyYWN0ZXJcbiAgICB2YXIgbGFzdHdhc2FzdGVyaXNrOyAvLyByZXBlYXQgbmV4dCBjaGFyXG4gICAgdmFyIGxhc3R3YXN1bmRlcnNjb3JlOyAvLyBsYXN0IGNoYXIgd2FzIF8gd2hpY2ggcGlja3MgdXAgZm9sbG93aW5nIGNoYXIgZm9yIHdpZHRoXG4gICAgdmFyIGlucXVvdGUsIHF1b3Rlc3RyOyAvLyBwcm9jZXNzaW5nIGEgcXVvdGVkIHN0cmluZ1xuICAgIHZhciBpbmJyYWNrZXQsIGJyYWNrZXRzdHIsIGJyYWNrZXRkYXRhOyAvLyBwcm9jZXNzaW5nIGEgYnJhY2tldGVkIHN0cmluZ1xuICAgIHZhciBpbmdlbmVyYWwsIGdwb3M7IC8vIGNoZWNrcyBmb3IgY2hhcmFjdGVycyBcIkdlbmVyYWxcIlxuICAgIHZhciBhbXBtc3RyLCBwYXJ0OyAvLyBjaGVja3MgZm9yIGNoYXJhY3RlcnMgXCJBL1BcIiBhbmQgXCJBTS9QTVwiXG4gICAgdmFyIGluZGF0ZTsgLy8ga2VlcHMgdHJhY2sgb2YgZGF0ZS90aW1lIHBsYWNlaG9sZGVyc1xuICAgIHZhciBjaHBvczsgLy8gY2hhcmFjdGVyIHBvc2l0aW9uIGJlaW5nIGxvb2tlZCBhdFxuICAgIHZhciBjaDsgLy8gY2hhcmFjdGVyIGJlaW5nIGxvb2tlZCBhdFxuXG4gICAgaWYgKGZvcm1hdF9kZWZzW2Zvcm1hdF9zdHJpbmddKSByZXR1cm47IC8vIGFscmVhZHkgZGVmaW5lZCAtIG5vdGhpbmcgdG8gZG9cblxuICAgIGZvcm1hdCA9IHsgb3BlcmF0b3JzOiBbXSwgb3BlcmFuZHM6IFtdLCBzZWN0aW9uaW5mbzogW3t9XSB9OyAvLyBjcmVhdGUgaW5mbyBzdHJ1Y3R1cmUgZm9yIHRoaXMgZm9ybWF0XG4gICAgZm9ybWF0X2RlZnNbZm9ybWF0X3N0cmluZ10gPSBmb3JtYXQ7IC8vIGFkZCB0byBvdGhlciBmb3JtYXQgZGVmaW5pdGlvbnNcblxuICAgIHNlY3Rpb24gPSAwOyAvLyBzdGFydCB3aXRoIHNlY3Rpb24gMFxuICAgIHNlY3Rpb25pbmZvID0gZm9ybWF0LnNlY3Rpb25pbmZvW3NlY3Rpb25dOyAvLyBnZXQgcmVmZXJlbmNlIHRvIGluZm8gZm9yIGN1cnJlbnQgc2VjdGlvblxuICAgIHNlY3Rpb25pbmZvLnNlY3Rpb25zdGFydCA9IDA7IC8vIHBvc2l0aW9uIGluIG9wZXJhbmRzIHRoYXQgc3RhcnRzIHRoaXMgc2VjdGlvblxuICAgIHNlY3Rpb25pbmZvLmludGVnZXJkaWdpdHMgPSAwOyAvLyBudW1iZXIgb2YgaW50ZWdlci1wYXJ0IHBsYWNlaG9sZGVyc1xuICAgIHNlY3Rpb25pbmZvLmZyYWN0aW9uZGlnaXRzID0gMDsgLy8gZnJhY3Rpb24gcGxhY2Vob2xkZXJzXG4gICAgc2VjdGlvbmluZm8uY29tbWFzID0gMDsgLy8gY29tbWFzIGVuY291bnRlcmVkLCB0byBoYW5kbGUgc2NhbGluZ1xuICAgIHNlY3Rpb25pbmZvLnBlcmNlbnQgPSAwOyAvLyB0aW1lcyB0byBzY2FsZSBieSAxMDBcblxuICAgIGZvciAoY2hwb3MgPSAwOyBjaHBvcyA8IGZvcm1hdF9zdHJpbmcubGVuZ3RoOyBjaHBvcysrKSB7XG4gICAgICAgIC8vIHBhcnNlXG4gICAgICAgIGNoID0gZm9ybWF0X3N0cmluZy5jaGFyQXQoY2hwb3MpOyAvLyBnZXQgbmV4dCBjaGFyIHRvIGV4YW1pbmVcbiAgICAgICAgaWYgKGlucXVvdGUpIHtcbiAgICAgICAgICAgIGlmIChjaCA9PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgaW5xdW90ZSA9IDA7XG4gICAgICAgICAgICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuY29weSk7XG4gICAgICAgICAgICAgICAgZm9ybWF0Lm9wZXJhbmRzLnB1c2gocXVvdGVzdHIpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVvdGVzdHIgKz0gY2g7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5icmFja2V0KSB7XG4gICAgICAgICAgICBpZiAoY2ggPT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgaW5icmFja2V0ID0gMDtcbiAgICAgICAgICAgICAgICBicmFja2V0ZGF0YSA9IEZvcm1hdE51bWJlci5wYXJzZV9mb3JtYXRfYnJhY2tldChicmFja2V0c3RyKTtcbiAgICAgICAgICAgICAgICBpZiAoYnJhY2tldGRhdGEub3BlcmF0b3IgPT0gc2Nmbi5jb21tYW5kcy5zZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbmluZm8udGhvdXNhbmRzc2VwID0gMTsgLy8gZXhwbGljaXQgWyxdXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYnJhY2tldGRhdGEub3BlcmF0b3IgPT0gc2Nmbi5jb21tYW5kcy5kYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb25pbmZvLmhhc2RhdGUgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYnJhY2tldGRhdGEub3BlcmF0b3IgPT0gc2Nmbi5jb21tYW5kcy5jb21wYXJpc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdC5oYXNjb21wYXJpc29uID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKGJyYWNrZXRkYXRhLm9wZXJhdG9yKTtcbiAgICAgICAgICAgICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChicmFja2V0ZGF0YS5vcGVyYW5kKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyYWNrZXRzdHIgKz0gY2g7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdHdhc3NsYXNoKSB7XG4gICAgICAgICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5jb3B5KTtcbiAgICAgICAgICAgIGZvcm1hdC5vcGVyYW5kcy5wdXNoKGNoKTtcbiAgICAgICAgICAgIGxhc3R3YXNzbGFzaCA9IGZhbHNlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3R3YXNhc3Rlcmlzaykge1xuICAgICAgICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuY29weSk7XG4gICAgICAgICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChjaCArIGNoICsgY2ggKyBjaCArIGNoKTsgLy8gZG8gNSBvZiB0aGVtIHNpbmNlIG5vIHJlYWwgdGFic1xuICAgICAgICAgICAgbGFzdHdhc2FzdGVyaXNrID0gZmFsc2U7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdHdhc3VuZGVyc2NvcmUpIHtcbiAgICAgICAgICAgIGZvcm1hdC5vcGVyYXRvcnMucHVzaChzY2ZuLmNvbW1hbmRzLmNvcHkpO1xuICAgICAgICAgICAgZm9ybWF0Lm9wZXJhbmRzLnB1c2goXCImbmJzcDtcIik7XG4gICAgICAgICAgICBsYXN0d2FzdW5kZXJzY29yZSA9IGZhbHNlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZ2VuZXJhbCkge1xuICAgICAgICAgICAgaWYgKFwiZ2VuZXJhbFwiLmNoYXJBdChpbmdlbmVyYWwpID09IGNoLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICBpbmdlbmVyYWwrKztcbiAgICAgICAgICAgICAgICBpZiAoaW5nZW5lcmFsID09IDcpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuZ2VuZXJhbCk7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdC5vcGVyYW5kcy5wdXNoKGNoKTtcbiAgICAgICAgICAgICAgICAgICAgaW5nZW5lcmFsID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmdlbmVyYWwgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRhdGUpIHtcbiAgICAgICAgICAgIC8vIGxhc3QgY2hhciB3YXMgcGFydCBvZiBhIGRhdGUgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgIGlmIChpbmRhdGUuY2hhckF0KDApID09IGNoKSB7XG4gICAgICAgICAgICAgICAgLy8gYW5vdGhlciBvZiB0aGUgc2FtZSBjaGFyXG4gICAgICAgICAgICAgICAgaW5kYXRlICs9IGNoOyAvLyBhY2N1bXVsYXRlIGl0XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5kYXRlKTsgLy8gc29tZXRoaW5nIGVsc2UsIHNhdmUgZGF0ZSBpbmZvXG4gICAgICAgICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChpbmRhdGUpO1xuICAgICAgICAgICAgc2VjdGlvbmluZm8uaGFzZGF0ZSA9IDE7XG4gICAgICAgICAgICBpbmRhdGUgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbXBtc3RyKSB7XG4gICAgICAgICAgICBhbXBtc3RyICs9IGNoO1xuICAgICAgICAgICAgcGFydCA9IGFtcG1zdHIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChwYXJ0ICE9IFwiYW0vcG1cIi5zdWJzdHJpbmcoMCwgcGFydC5sZW5ndGgpICYmIHBhcnQgIT0gXCJhL3BcIi5zdWJzdHJpbmcoMCwgcGFydC5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgYW1wc3RyID0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFydCA9PSBcImFtL3BtXCIgfHwgcGFydCA9PSBcImEvcFwiKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuZGF0ZSk7XG4gICAgICAgICAgICAgICAgZm9ybWF0Lm9wZXJhbmRzLnB1c2goYW1wbXN0cik7XG4gICAgICAgICAgICAgICAgYW1wbXN0ciA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ggPT0gXCIjXCIgfHwgY2ggPT0gXCIwXCIgfHwgY2ggPT0gXCI/XCIpIHtcbiAgICAgICAgICAgIC8vIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICBpZiAoaW50ZWdlcnBhcnQpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uaW5mby5pbnRlZ2VyZGlnaXRzKys7XG4gICAgICAgICAgICAgICAgaWYgKHNlY3Rpb25pbmZvLmNvbW1hcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21tYSBpbnNpZGUgb2YgaW50ZWdlciBwbGFjZWhvbGRlcnNcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbmluZm8udGhvdXNhbmRzc2VwID0gMTsgLy8gYW55IG51bWJlciBpcyB0aG91c2FuZHMgc2VwYXJhdG9yXG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb25pbmZvLmNvbW1hcyA9IDA7IC8vIHJlc2V0IGNvdW50IG9mIFwidGhvdXNhbmRcIiBmYWN0b3JzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3R3YXNpbnRlZ2VyID0gMTtcbiAgICAgICAgICAgICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5pbnRlZ2VyX3BsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChjaCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlY3Rpb25pbmZvLmZyYWN0aW9uZGlnaXRzKys7XG4gICAgICAgICAgICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuZnJhY3Rpb25fcGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgIGZvcm1hdC5vcGVyYW5kcy5wdXNoKGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaCA9PSBcIi5cIikge1xuICAgICAgICAgICAgLy8gZGVjaW1hbCBwb2ludFxuICAgICAgICAgICAgbGFzdHdhc2ludGVnZXIgPSAwO1xuICAgICAgICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuZGVjaW1hbCk7XG4gICAgICAgICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChjaCk7XG4gICAgICAgICAgICBpbnRlZ2VycGFydCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoY2ggPT0gJyQnKSB7XG4gICAgICAgICAgICAvLyBjdXJyZW5jeSBjaGFyXG4gICAgICAgICAgICBsYXN0d2FzaW50ZWdlciA9IDA7XG4gICAgICAgICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5jdXJyZW5jeSk7XG4gICAgICAgICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChjaCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2ggPT0gXCIsXCIpIHtcbiAgICAgICAgICAgIGlmIChsYXN0d2FzaW50ZWdlcikge1xuICAgICAgICAgICAgICAgIHNlY3Rpb25pbmZvLmNvbW1hcysrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5jb3B5KTtcbiAgICAgICAgICAgICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2ggPT0gXCIlXCIpIHtcbiAgICAgICAgICAgIGxhc3R3YXNpbnRlZ2VyID0gMDtcbiAgICAgICAgICAgIHNlY3Rpb25pbmZvLnBlcmNlbnQrKztcbiAgICAgICAgICAgIGZvcm1hdC5vcGVyYXRvcnMucHVzaChzY2ZuLmNvbW1hbmRzLmNvcHkpO1xuICAgICAgICAgICAgZm9ybWF0Lm9wZXJhbmRzLnB1c2goY2gpO1xuICAgICAgICB9IGVsc2UgaWYgKGNoID09ICdcIicpIHtcbiAgICAgICAgICAgIGxhc3R3YXNpbnRlZ2VyID0gMDtcbiAgICAgICAgICAgIGlucXVvdGUgPSAxO1xuICAgICAgICAgICAgcXVvdGVzdHIgPSBcIlwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNoID09ICdbJykge1xuICAgICAgICAgICAgbGFzdHdhc2ludGVnZXIgPSAwO1xuICAgICAgICAgICAgaW5icmFja2V0ID0gMTtcbiAgICAgICAgICAgIGJyYWNrZXRzdHIgPSBcIlwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNoID09ICdcXFxcJykge1xuICAgICAgICAgICAgbGFzdHdhc3NsYXNoID0gMTtcbiAgICAgICAgICAgIGxhc3R3YXNpbnRlZ2VyID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChjaCA9PSAnKicpIHtcbiAgICAgICAgICAgIGxhc3R3YXNhc3RlcmlzayA9IDE7XG4gICAgICAgICAgICBsYXN0d2FzaW50ZWdlciA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoY2ggPT0gJ18nKSB7XG4gICAgICAgICAgICBsYXN0d2FzdW5kZXJzY29yZSA9IDE7XG4gICAgICAgICAgICBsYXN0d2FzaW50ZWdlciA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoY2ggPT0gXCI7XCIpIHtcbiAgICAgICAgICAgIHNlY3Rpb24rKzsgLy8gc3RhcnQgbmV4dCBzZWN0aW9uXG4gICAgICAgICAgICBmb3JtYXQuc2VjdGlvbmluZm9bc2VjdGlvbl0gPSB7fTsgLy8gY3JlYXRlIGEgbmV3IHNlY3Rpb25cbiAgICAgICAgICAgIHNlY3Rpb25pbmZvID0gZm9ybWF0LnNlY3Rpb25pbmZvW3NlY3Rpb25dOyAvLyBnZXQgcmVmZXJlbmNlIHRvIGluZm8gZm9yIGN1cnJlbnQgc2VjdGlvblxuICAgICAgICAgICAgc2VjdGlvbmluZm8uc2VjdGlvbnN0YXJ0ID0gMSArIGZvcm1hdC5vcGVyYXRvcnMubGVuZ3RoOyAvLyByZW1lbWJlciB3aGVyZSBpdCBzdGFydHNcbiAgICAgICAgICAgIHNlY3Rpb25pbmZvLmludGVnZXJkaWdpdHMgPSAwOyAvLyBudW1iZXIgb2YgaW50ZWdlci1wYXJ0IHBsYWNlaG9sZGVyc1xuICAgICAgICAgICAgc2VjdGlvbmluZm8uZnJhY3Rpb25kaWdpdHMgPSAwOyAvLyBmcmFjdGlvbiBwbGFjZWhvbGRlcnNcbiAgICAgICAgICAgIHNlY3Rpb25pbmZvLmNvbW1hcyA9IDA7IC8vIGNvbW1hcyBlbmNvdW50ZXJlZCwgdG8gaGFuZGxlIHNjYWxpbmdcbiAgICAgICAgICAgIHNlY3Rpb25pbmZvLnBlcmNlbnQgPSAwOyAvLyB0aW1lcyB0byBzY2FsZSBieSAxMDBcbiAgICAgICAgICAgIGludGVnZXJwYXJ0ID0gMTsgLy8gcmVzZXQgZm9yIG5ldyBzZWN0aW9uXG4gICAgICAgICAgICBsYXN0d2FzaW50ZWdlciA9IDA7XG4gICAgICAgICAgICBmb3JtYXQub3BlcmF0b3JzLnB1c2goc2Nmbi5jb21tYW5kcy5zZWN0aW9uKTtcbiAgICAgICAgICAgIGZvcm1hdC5vcGVyYW5kcy5wdXNoKGNoKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaC50b0xvd2VyQ2FzZSgpID09IFwiZ1wiKSB7XG4gICAgICAgICAgICBpbmdlbmVyYWwgPSAxO1xuICAgICAgICAgICAgbGFzdHdhc2ludGVnZXIgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGNoLnRvTG93ZXJDYXNlKCkgPT0gXCJhXCIpIHtcbiAgICAgICAgICAgIGFtcG1zdHIgPSBjaDtcbiAgICAgICAgICAgIGxhc3R3YXNpbnRlZ2VyID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChcImRteWhIc1wiLmluZGV4T2YoY2gpID49IDApIHtcbiAgICAgICAgICAgIGluZGF0ZSA9IGNoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFzdHdhc2ludGVnZXIgPSAwO1xuICAgICAgICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuY29weSk7XG4gICAgICAgICAgICBmb3JtYXQub3BlcmFuZHMucHVzaChjaCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5kYXRlKSB7XG4gICAgICAgIC8vIGxhc3QgY2hhciB3YXMgcGFydCBvZiB1bnNhdmVkIGRhdGUgcGxhY2Vob2xkZXJcbiAgICAgICAgZm9ybWF0Lm9wZXJhdG9ycy5wdXNoKHNjZm4uY29tbWFuZHMuZGF0ZSk7XG4gICAgICAgIGZvcm1hdC5vcGVyYW5kcy5wdXNoKGluZGF0ZSk7XG4gICAgICAgIHNlY3Rpb25pbmZvLmhhc2RhdGUgPSAxO1xuICAgIH1cblxuICAgIHJldHVybjtcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKipcblxuICAgYnJhY2tldGRhdGEgPSBGb3JtYXROdW1iZXIucGFyc2VfZm9ybWF0X2JyYWNrZXQoYnJhY2tldHN0cilcblxuICAgVGFrZXMgYSBicmFja2V0IGNvbnRlbnRzIChlLmcuLCBcIlJFRFwiLCBcIj4xMFwiKSBhbmQgcmV0dXJucyBhbiBvcGVyYXRvciBhbmQgb3BlcmFuZFxuXG4gICBicmFja2V0ZGF0YS0+e31cbiAgIC5vcGVyYXRvclxuICAgLm9wZXJhbmRcblxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5Gb3JtYXROdW1iZXIucGFyc2VfZm9ybWF0X2JyYWNrZXQgPSBmdW5jdGlvbiAoYnJhY2tldHN0cikge1xuXG4gICAgdmFyIHNjZm4gPSBGb3JtYXROdW1iZXI7XG5cbiAgICB2YXIgYnJhY2tldGRhdGEgPSB7fTtcbiAgICB2YXIgcGFydHM7XG5cbiAgICBpZiAoYnJhY2tldHN0ci5jaGFyQXQoMCkgPT0gJyQnKSB7XG4gICAgICAgIC8vIGN1cnJlbmN5XG4gICAgICAgIGJyYWNrZXRkYXRhLm9wZXJhdG9yID0gc2Nmbi5jb21tYW5kcy5jdXJyZW5jeTtcbiAgICAgICAgcGFydHMgPSBicmFja2V0c3RyLm1hdGNoKC9eXFwkKC4rPykoXFwtLis/KXswLDF9JC8pO1xuICAgICAgICBpZiAocGFydHMpIHtcbiAgICAgICAgICAgIGJyYWNrZXRkYXRhLm9wZXJhbmQgPSBwYXJ0c1sxXSB8fCBfQ09OU1RBTlRTLkRlZmF1bHRDdXJyZW5jeSB8fCAnJCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmFja2V0ZGF0YS5vcGVyYW5kID0gYnJhY2tldHN0ci5zdWJzdHJpbmcoMSkgfHwgX0NPTlNUQU5UUy5EZWZhdWx0Q3VycmVuY3kgfHwgJyQnO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChicmFja2V0c3RyID09ICc/JCcpIHtcbiAgICAgICAgYnJhY2tldGRhdGEub3BlcmF0b3IgPSBzY2ZuLmNvbW1hbmRzLmN1cnJlbmN5O1xuICAgICAgICBicmFja2V0ZGF0YS5vcGVyYW5kID0gJ1s/JF0nO1xuICAgIH0gZWxzZSBpZiAoX0NPTlNUQU5UUy5BbGxvd2VkQ29sb3JzW2JyYWNrZXRzdHIudG9VcHBlckNhc2UoKV0pIHtcbiAgICAgICAgYnJhY2tldGRhdGEub3BlcmF0b3IgPSBzY2ZuLmNvbW1hbmRzLmNvbG9yO1xuICAgICAgICBicmFja2V0ZGF0YS5vcGVyYW5kID0gX0NPTlNUQU5UUy5BbGxvd2VkQ29sb3JzW2JyYWNrZXRzdHIudG9VcHBlckNhc2UoKV07XG4gICAgfSBlbHNlIGlmIChwYXJ0cyA9IGJyYWNrZXRzdHIubWF0Y2goL15zdHlsZT0oW15cIl0qKSQvKSkge1xuICAgICAgICAvLyBbc3R5bGU9Li4uXVxuICAgICAgICBicmFja2V0ZGF0YS5vcGVyYXRvciA9IHNjZm4uY29tbWFuZHMuc3R5bGU7XG4gICAgICAgIGJyYWNrZXRkYXRhLm9wZXJhbmQgPSBwYXJ0c1sxXTtcbiAgICB9IGVsc2UgaWYgKGJyYWNrZXRzdHIgPT0gXCIsXCIpIHtcbiAgICAgICAgYnJhY2tldGRhdGEub3BlcmF0b3IgPSBzY2ZuLmNvbW1hbmRzLnNlcGFyYXRvcjtcbiAgICAgICAgYnJhY2tldGRhdGEub3BlcmFuZCA9IGJyYWNrZXRzdHI7XG4gICAgfSBlbHNlIGlmIChBbGxvd2VkRGF0ZXNbYnJhY2tldHN0ci50b1VwcGVyQ2FzZSgpXSkge1xuICAgICAgICBicmFja2V0ZGF0YS5vcGVyYXRvciA9IHNjZm4uY29tbWFuZHMuZGF0ZTtcbiAgICAgICAgYnJhY2tldGRhdGEub3BlcmFuZCA9IEFsbG93ZWREYXRlc1ticmFja2V0c3RyLnRvVXBwZXJDYXNlKCldO1xuICAgIH0gZWxzZSBpZiAocGFydHMgPSBicmFja2V0c3RyLm1hdGNoKC9eWzw+PV0vKSkge1xuICAgICAgICAvLyBjb21wYXJpc29uIG9wZXJhdG9yXG4gICAgICAgIHBhcnRzID0gYnJhY2tldHN0ci5tYXRjaCgvXihbPD49XSspKC4rKSQvKTsgLy8gc3BsaXQgb3BlcmF0b3IgYW5kIHZhbHVlXG4gICAgICAgIGJyYWNrZXRkYXRhLm9wZXJhdG9yID0gc2Nmbi5jb21tYW5kcy5jb21wYXJpc29uO1xuICAgICAgICBicmFja2V0ZGF0YS5vcGVyYW5kID0gcGFydHNbMV0gKyBcIjpcIiArIHBhcnRzWzJdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVua25vd24gYnJhY2tldFxuICAgICAgICBicmFja2V0ZGF0YS5vcGVyYXRvciA9IHNjZm4uY29tbWFuZHMuY29weTtcbiAgICAgICAgYnJhY2tldGRhdGEub3BlcmFuZCA9IFwiW1wiICsgYnJhY2tldHN0ciArIFwiXVwiO1xuICAgIH1cblxuICAgIHJldHVybiBicmFja2V0ZGF0YTtcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKipcblxuICAganVsaWFuZGF0ZSA9IEZvcm1hdE51bWJlci5jb252ZXJ0X2RhdGVfZ3JlZ29yaWFuX3RvX2p1bGlhbih5ZWFyLCBtb250aCwgZGF5KVxuXG4gICBGcm9tOiBodHRwOi8vYWEudXNuby5uYXZ5Lm1pbC9mYXEvZG9jcy9KRF9Gb3JtdWxhLmh0bWxcbiAgIFVzZXM6IEZsaWVnZWwsIEguIEYuIGFuZCB2YW4gRmxhbmRlcm4sIFQuIEMuICgxOTY4KS4gQ29tbXVuaWNhdGlvbnMgb2YgdGhlIEFDTSwgVm9sLiAxMSwgTm8uIDEwIChPY3RvYmVyLCAxOTY4KS5cbiAgIFRyYW5zbGF0ZWQgZnJvbSB0aGUgRk9SVFJBTlxuXG4gICBJPSBZRUFSXG4gICBKPSBNT05USFxuICAgSz0gREFZXG4gICBDXG4gICBKRD0gSy0zMjA3NSsxNDYxKihJKzQ4MDArKEotMTQpLzEyKS80KzM2NyooSi0yLShKLTE0KS8xMioxMilcbiAgIDIgICAgLzEyLTMqKChJKzQ5MDArKEotMTQpLzEyKS8xMDApLzRcblxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5Gb3JtYXROdW1iZXIuY29udmVydF9kYXRlX2dyZWdvcmlhbl90b19qdWxpYW4gPSBmdW5jdGlvbiAoeWVhciwgbW9udGgsIGRheSkge1xuXG4gICAgdmFyIGp1bGlhbmRhdGU7XG5cbiAgICBqdWxpYW5kYXRlID0gZGF5IC0gMzIwNzUgKyBpbnRGdW5jKDE0NjEgKiAoeWVhciArIDQ4MDAgKyBpbnRGdW5jKChtb250aCAtIDE0KSAvIDEyKSkgLyA0KTtcbiAgICBqdWxpYW5kYXRlICs9IGludEZ1bmMoMzY3ICogKG1vbnRoIC0gMiAtIGludEZ1bmMoKG1vbnRoIC0gMTQpIC8gMTIpICogMTIpIC8gMTIpO1xuICAgIGp1bGlhbmRhdGUgPSBqdWxpYW5kYXRlIC0gaW50RnVuYygzICogaW50RnVuYygoeWVhciArIDQ5MDAgKyBpbnRGdW5jKChtb250aCAtIDE0KSAvIDEyKSkgLyAxMDApIC8gNCk7XG5cbiAgICByZXR1cm4ganVsaWFuZGF0ZTtcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKipcblxuICAgeW1kID0gRm9ybWF0TnVtYmVyLmNvbnZlcnRfZGF0ZV9qdWxpYW5fdG9fZ3JlZ29yaWFuKGp1bGlhbmRhdGUpXG5cbiAgIHltZC0+e31cbiAgIC55ZWFyXG4gICAubW9udGhcbiAgIC5kYXlcblxuICAgRnJvbTogaHR0cDovL2FhLnVzbm8ubmF2eS5taWwvZmFxL2RvY3MvSkRfRm9ybXVsYS5odG1sXG4gICBVc2VzOiBGbGllZ2VsLCBILiBGLiBhbmQgdmFuIEZsYW5kZXJuLCBULiBDLiAoMTk2OCkuIENvbW11bmljYXRpb25zIG9mIHRoZSBBQ00sIFZvbC4gMTEsIE5vLiAxMCAoT2N0b2JlciwgMTk2OCkuXG4gICBUcmFuc2xhdGVkIGZyb20gdGhlIEZPUlRSQU5cblxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5Gb3JtYXROdW1iZXIuY29udmVydF9kYXRlX2p1bGlhbl90b19ncmVnb3JpYW4gPSBmdW5jdGlvbiAoanVsaWFuZGF0ZSkge1xuXG4gICAgdmFyIEwsIE4sIEksIEosIEs7XG5cbiAgICBMID0ganVsaWFuZGF0ZSArIDY4NTY5O1xuICAgIE4gPSBNYXRoLmZsb29yKDQgKiBMIC8gMTQ2MDk3KTtcbiAgICBMID0gTCAtIE1hdGguZmxvb3IoKDE0NjA5NyAqIE4gKyAzKSAvIDQpO1xuICAgIEkgPSBNYXRoLmZsb29yKDQwMDAgKiAoTCArIDEpIC8gMTQ2MTAwMSk7XG4gICAgTCA9IEwgLSBNYXRoLmZsb29yKDE0NjEgKiBJIC8gNCkgKyAzMTtcbiAgICBKID0gTWF0aC5mbG9vcig4MCAqIEwgLyAyNDQ3KTtcbiAgICBLID0gTCAtIE1hdGguZmxvb3IoMjQ0NyAqIEogLyA4MCk7XG4gICAgTCA9IE1hdGguZmxvb3IoSiAvIDExKTtcbiAgICBKID0gSiArIDIgLSAxMiAqIEw7XG4gICAgSSA9IDEwMCAqIChOIC0gNDkpICsgSSArIEw7XG5cbiAgICByZXR1cm4geyB5ZWFyOiBJLCBtb250aDogSiwgZGF5OiBLIH07XG59O1xuXG5mdW5jdGlvbiBpbnRGdW5jKG4pIHtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgICAgcmV0dXJuIC1NYXRoLmZsb29yKC1uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihuKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIFRFWFQodmFsdWUsIGZvcm1hdCwgY3VycmVuY3lfY2hhcikge1xuICAgIHJldHVybiBGb3JtYXROdW1iZXIuZm9ybWF0TnVtYmVyV2l0aEZvcm1hdCh2YWx1ZSwgZm9ybWF0LCBjdXJyZW5jeV9jaGFyKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuVU5JUVVFID0gVU5JUVVFO1xuZnVuY3Rpb24gVU5JUVVFKGFycikge1xuICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbiAocCwgYykge1xuICAgIGlmIChwLmluZGV4T2YoYykgPCAwKSBwLnB1c2goYyk7XG4gICAgcmV0dXJuIHA7XG4gIH0sIFtdKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuVVBQRVIgPSBVUFBFUjtcbmZ1bmN0aW9uIFVQUEVSKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnRvVXBwZXJDYXNlKCk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlZMT09LVVAgPSBWTE9PS1VQO1xuXG52YXIgX0VSUk9SID0gcmVxdWlyZSgnLi9FUlJPUicpO1xuXG52YXIgX0VSUk9SMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VSUk9SKTtcblxudmFyIF9JU0JMQU5LID0gcmVxdWlyZSgnLi9JU0JMQU5LJyk7XG5cbnZhciBfSVNFUlJPUiA9IHJlcXVpcmUoJy4vSVNFUlJPUicpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBWTE9PS1VQKG5lZWRsZSwgdGFibGUsIGluZGV4LCBleGFjdG1hdGNoKSB7XG5cbiAgICBpZiAoKDAsIF9JU0VSUk9SLklTRVJST1IpKG5lZWRsZSkgfHwgKDAsIF9JU0JMQU5LLklTQkxBTkspKG5lZWRsZSkpIHtcbiAgICAgICAgcmV0dXJuIG5lZWRsZTtcbiAgICB9XG5cbiAgICBpbmRleCA9IGluZGV4IHx8IDA7XG4gICAgZXhhY3RtYXRjaCA9IGV4YWN0bWF0Y2ggfHwgZmFsc2U7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcm93ID0gdGFibGVbaV07XG4gICAgICAgIGlmIChleGFjdG1hdGNoICYmIHJvd1swXSA9PT0gbmVlZGxlIHx8IHJvd1swXSA9PT0gbmVlZGxlIHx8IHR5cGVvZiByb3dbMF0gPT09IFwic3RyaW5nXCIgJiYgcm93WzBdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgIT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCA8IHJvdy5sZW5ndGggKyAxID8gcm93W2luZGV4IC0gMV0gOiByb3dbMF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX0VSUk9SMi5kZWZhdWx0Lm5hO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZnVuY3Rpb25zID0gZXhwb3J0cy5lbmdpbmVlcmluZ0Z1bmN0aW9ucyA9IGV4cG9ydHMudGV4dEZ1bmN0aW9ucyA9IGV4cG9ydHMuc3RhdGlzdGljRnVuY3Rpb25zID0gZXhwb3J0cy5maW5hbmNpYWxGdW5jdGlvbnMgPSBleHBvcnRzLmRhdGVUaW1lRnVuY3Rpb25zID0gZXhwb3J0cy5tYXRoRnVuY3Rpb25zID0gZXhwb3J0cy5kYXRhRnVuY3Rpb25zID0gZXhwb3J0cy5yZWZlcmVuY2VGdW5jdGlvbnMgPSBleHBvcnRzLmluZm9ybWF0aW9uRnVuY3Rpb25zID0gZXhwb3J0cy5sb2dpY2FsRnVuY3Rpb25zID0gZXhwb3J0cy5WTE9PS1VQID0gZXhwb3J0cy5VUFBFUiA9IGV4cG9ydHMuVU5JUVVFID0gZXhwb3J0cy5URVhUID0gZXhwb3J0cy5UQVUgPSBleHBvcnRzLlRBTiA9IGV4cG9ydHMuU1dJVENIID0gZXhwb3J0cy5TVU0gPSBleHBvcnRzLlNPUlQgPSBleHBvcnRzLlNJTiA9IGV4cG9ydHMuU0VBUkNIID0gZXhwb3J0cy5SRVBUID0gZXhwb3J0cy5SQU5HRSA9IGV4cG9ydHMuUE9XRVIgPSBleHBvcnRzLlBNVCA9IGV4cG9ydHMuUEkgPSBleHBvcnRzLk9SID0gZXhwb3J0cy5PQ1QyREVDID0gZXhwb3J0cy5OT1QgPSBleHBvcnRzLk5FID0gZXhwb3J0cy5OID0gZXhwb3J0cy5NVUxUSVBMWSA9IGV4cG9ydHMuTUFYID0gZXhwb3J0cy5MVEUgPSBleHBvcnRzLkxUID0gZXhwb3J0cy5MT1dFUiA9IGV4cG9ydHMuTE9PS1VQID0gZXhwb3J0cy5JU1VSTCA9IGV4cG9ydHMuSVNURVhUID0gZXhwb3J0cy5JU1JFRiA9IGV4cG9ydHMuSVNSQU5HRSA9IGV4cG9ydHMuSVNPREQgPSBleHBvcnRzLklTTlVNQkVSID0gZXhwb3J0cy5JU05BID0gZXhwb3J0cy5JU0VWRU4gPSBleHBvcnRzLklTRVJST1IgPSBleHBvcnRzLklTRU1BSUwgPSBleHBvcnRzLklTQkxBTksgPSBleHBvcnRzLklTQVJSQVkgPSBleHBvcnRzLklORElSRUNUID0gZXhwb3J0cy5JTkRFWDJST1cgPSBleHBvcnRzLklOREVYMkNPTCA9IGV4cG9ydHMuSU4gPSBleHBvcnRzLklGTkEgPSBleHBvcnRzLkhMT09LVVAgPSBleHBvcnRzLkdVSUQgPSBleHBvcnRzLkdURSA9IGV4cG9ydHMuR1QgPSBleHBvcnRzLkZMQVRURU4gPSBleHBvcnRzLkZJTkQgPSBleHBvcnRzLkZJTFRFUiA9IGV4cG9ydHMuRVEgPSBleHBvcnRzLkRJVklERSA9IGV4cG9ydHMuREVDMkJJTiA9IGV4cG9ydHMuREFURURJRiA9IGV4cG9ydHMuREFURSA9IGV4cG9ydHMuQ09TID0gZXhwb3J0cy5DT05EID0gZXhwb3J0cy5DT05DQVRFTkFURSA9IGV4cG9ydHMuQ0xFQU4gPSBleHBvcnRzLkNIT09TRSA9IGV4cG9ydHMuQ0VMTElOREVYID0gZXhwb3J0cy5DRUxMID0gZXhwb3J0cy5CSU4yREVDID0gZXhwb3J0cy5BTkQgPSBleHBvcnRzLkFERCA9IGV4cG9ydHMuQUNPUyA9IGV4cG9ydHMuQUJTID0gdW5kZWZpbmVkO1xuXG52YXIgX0FCUyA9IHJlcXVpcmUoJy4vQUJTJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQUJTJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0FCUy5BQlM7XG4gIH1cbn0pO1xuXG52YXIgX0FDT1MgPSByZXF1aXJlKCcuL0FDT1MnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdBQ09TJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0FDT1MuQUNPUztcbiAgfVxufSk7XG5cbnZhciBfQUREID0gcmVxdWlyZSgnLi9BREQnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdBREQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQURELkFERDtcbiAgfVxufSk7XG5cbnZhciBfQU5EID0gcmVxdWlyZSgnLi9BTkQnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdBTkQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQU5ELkFORDtcbiAgfVxufSk7XG5cbnZhciBfQklOMkRFQyA9IHJlcXVpcmUoJy4vQklOMkRFQycpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0JJTjJERUMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQklOMkRFQy5CSU4yREVDO1xuICB9XG59KTtcblxudmFyIF9DRUxMID0gcmVxdWlyZSgnLi9DRUxMJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQ0VMTCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9DRUxMLkNFTEw7XG4gIH1cbn0pO1xuXG52YXIgX0NFTExJTkRFWCA9IHJlcXVpcmUoJy4vQ0VMTElOREVYJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQ0VMTElOREVYJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0NFTExJTkRFWC5DRUxMSU5ERVg7XG4gIH1cbn0pO1xuXG52YXIgX0NIT09TRSA9IHJlcXVpcmUoJy4vQ0hPT1NFJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQ0hPT1NFJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0NIT09TRS5DSE9PU0U7XG4gIH1cbn0pO1xuXG52YXIgX0NMRUFOID0gcmVxdWlyZSgnLi9DTEVBTicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0NMRUFOJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0NMRUFOLkNMRUFOO1xuICB9XG59KTtcblxudmFyIF9DT05DQVRFTkFURSA9IHJlcXVpcmUoJy4vQ09OQ0FURU5BVEUnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdDT05DQVRFTkFURScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9DT05DQVRFTkFURS5DT05DQVRFTkFURTtcbiAgfVxufSk7XG5cbnZhciBfQ09ORCA9IHJlcXVpcmUoJy4vQ09ORCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0NPTkQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQ09ORC5DT05EO1xuICB9XG59KTtcblxudmFyIF9DT1MgPSByZXF1aXJlKCcuL0NPUycpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0NPUycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9DT1MuQ09TO1xuICB9XG59KTtcblxudmFyIF9EQVRFID0gcmVxdWlyZSgnLi9EQVRFJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnREFURScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9EQVRFLkRBVEU7XG4gIH1cbn0pO1xuXG52YXIgX0RBVEVESUYgPSByZXF1aXJlKCcuL0RBVEVESUYnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEQVRFRElGJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RBVEVESUYuREFURURJRjtcbiAgfVxufSk7XG5cbnZhciBfREVDMkJJTiA9IHJlcXVpcmUoJy4vREVDMkJJTicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RFQzJCSU4nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfREVDMkJJTi5ERUMyQklOO1xuICB9XG59KTtcblxudmFyIF9ESVZJREUgPSByZXF1aXJlKCcuL0RJVklERScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RJVklERScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9ESVZJREUuRElWSURFO1xuICB9XG59KTtcblxudmFyIF9FUSA9IHJlcXVpcmUoJy4vRVEnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdFUScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9FUS5FUTtcbiAgfVxufSk7XG5cbnZhciBfRklMVEVSID0gcmVxdWlyZSgnLi9GSUxURVInKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdGSUxURVInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRklMVEVSLkZJTFRFUjtcbiAgfVxufSk7XG5cbnZhciBfRklORCA9IHJlcXVpcmUoJy4vRklORCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0ZJTkQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRklORC5GSU5EO1xuICB9XG59KTtcblxudmFyIF9GTEFUVEVOID0gcmVxdWlyZSgnLi9GTEFUVEVOJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRkxBVFRFTicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9GTEFUVEVOLkZMQVRURU47XG4gIH1cbn0pO1xuXG52YXIgX0dUID0gcmVxdWlyZSgnLi9HVCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0dUJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0dULkdUO1xuICB9XG59KTtcblxudmFyIF9HVEUgPSByZXF1aXJlKCcuL0dURScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0dURScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9HVEUuR1RFO1xuICB9XG59KTtcblxudmFyIF9HVUlEID0gcmVxdWlyZSgnLi9HVUlEJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnR1VJRCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9HVUlELkdVSUQ7XG4gIH1cbn0pO1xuXG52YXIgX0hMT09LVVAgPSByZXF1aXJlKCcuL0hMT09LVVAnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdITE9PS1VQJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0hMT09LVVAuSExPT0tVUDtcbiAgfVxufSk7XG5cbnZhciBfSUZOQSA9IHJlcXVpcmUoJy4vSUZOQScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0lGTkEnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSUZOQS5JRk5BO1xuICB9XG59KTtcblxudmFyIF9JTiA9IHJlcXVpcmUoJy4vSU4nKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdJTicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9JTi5JTjtcbiAgfVxufSk7XG5cbnZhciBfSU5ERVgyQ09MID0gcmVxdWlyZSgnLi9JTkRFWDJDT0wnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdJTkRFWDJDT0wnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSU5ERVgyQ09MLklOREVYMkNPTDtcbiAgfVxufSk7XG5cbnZhciBfSU5ERVgyUk9XID0gcmVxdWlyZSgnLi9JTkRFWDJST1cnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdJTkRFWDJST1cnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSU5ERVgyUk9XLklOREVYMlJPVztcbiAgfVxufSk7XG5cbnZhciBfSU5ESVJFQ1QgPSByZXF1aXJlKCcuL0lORElSRUNUJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnSU5ESVJFQ1QnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSU5ESVJFQ1QuSU5ESVJFQ1Q7XG4gIH1cbn0pO1xuXG52YXIgX0lTQVJSQVkgPSByZXF1aXJlKCcuL0lTQVJSQVknKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdJU0FSUkFZJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0lTQVJSQVkuSVNBUlJBWTtcbiAgfVxufSk7XG5cbnZhciBfSVNCTEFOSyA9IHJlcXVpcmUoJy4vSVNCTEFOSycpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0lTQkxBTksnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSVNCTEFOSy5JU0JMQU5LO1xuICB9XG59KTtcblxudmFyIF9JU0VNQUlMID0gcmVxdWlyZSgnLi9JU0VNQUlMJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnSVNFTUFJTCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9JU0VNQUlMLklTRU1BSUw7XG4gIH1cbn0pO1xuXG52YXIgX0lTRVJST1IgPSByZXF1aXJlKCcuL0lTRVJST1InKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdJU0VSUk9SJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0lTRVJST1IuSVNFUlJPUjtcbiAgfVxufSk7XG5cbnZhciBfSVNFVkVOID0gcmVxdWlyZSgnLi9JU0VWRU4nKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdJU0VWRU4nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSVNFVkVOLklTRVZFTjtcbiAgfVxufSk7XG5cbnZhciBfSVNOQSA9IHJlcXVpcmUoJy4vSVNOQScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0lTTkEnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSVNOQS5JU05BO1xuICB9XG59KTtcblxudmFyIF9JU05VTUJFUiA9IHJlcXVpcmUoJy4vSVNOVU1CRVInKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdJU05VTUJFUicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9JU05VTUJFUi5JU05VTUJFUjtcbiAgfVxufSk7XG5cbnZhciBfSVNPREQgPSByZXF1aXJlKCcuL0lTT0REJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnSVNPREQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSVNPREQuSVNPREQ7XG4gIH1cbn0pO1xuXG52YXIgX0lTUkFOR0UgPSByZXF1aXJlKCcuL0lTUkFOR0UnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdJU1JBTkdFJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0lTUkFOR0UuSVNSQU5HRTtcbiAgfVxufSk7XG5cbnZhciBfSVNSRUYgPSByZXF1aXJlKCcuL0lTUkVGJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnSVNSRUYnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSVNSRUYuSVNSRUY7XG4gIH1cbn0pO1xuXG52YXIgX0lTVEVYVCA9IHJlcXVpcmUoJy4vSVNURVhUJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnSVNURVhUJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0lTVEVYVC5JU1RFWFQ7XG4gIH1cbn0pO1xuXG52YXIgX0lTVVJMID0gcmVxdWlyZSgnLi9JU1VSTCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0lTVVJMJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0lTVVJMLklTVVJMO1xuICB9XG59KTtcblxudmFyIF9MT09LVVAgPSByZXF1aXJlKCcuL0xPT0tVUCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0xPT0tVUCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9MT09LVVAuTE9PS1VQO1xuICB9XG59KTtcblxudmFyIF9MT1dFUiA9IHJlcXVpcmUoJy4vTE9XRVInKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdMT1dFUicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9MT1dFUi5MT1dFUjtcbiAgfVxufSk7XG5cbnZhciBfTFQgPSByZXF1aXJlKCcuL0xUJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnTFQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfTFQuTFQ7XG4gIH1cbn0pO1xuXG52YXIgX0xURSA9IHJlcXVpcmUoJy4vTFRFJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnTFRFJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0xURS5MVEU7XG4gIH1cbn0pO1xuXG52YXIgX01BWCA9IHJlcXVpcmUoJy4vTUFYJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnTUFYJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX01BWC5NQVg7XG4gIH1cbn0pO1xuXG52YXIgX01VTFRJUExZID0gcmVxdWlyZSgnLi9NVUxUSVBMWScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ01VTFRJUExZJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX01VTFRJUExZLk1VTFRJUExZO1xuICB9XG59KTtcblxudmFyIF9OID0gcmVxdWlyZSgnLi9OJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnTicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9OLk47XG4gIH1cbn0pO1xuXG52YXIgX05FID0gcmVxdWlyZSgnLi9ORScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ05FJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX05FLk5FO1xuICB9XG59KTtcblxudmFyIF9OT1QgPSByZXF1aXJlKCcuL05PVCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ05PVCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9OT1QuTk9UO1xuICB9XG59KTtcblxudmFyIF9PQ1QyREVDID0gcmVxdWlyZSgnLi9PQ1QyREVDJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnT0NUMkRFQycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9PQ1QyREVDLk9DVDJERUM7XG4gIH1cbn0pO1xuXG52YXIgX09SID0gcmVxdWlyZSgnLi9PUicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ09SJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX09SLk9SO1xuICB9XG59KTtcblxudmFyIF9QSSA9IHJlcXVpcmUoJy4vUEknKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdQSScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9QSS5QSTtcbiAgfVxufSk7XG5cbnZhciBfUE1UID0gcmVxdWlyZSgnLi9QTVQnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdQTVQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfUE1ULlBNVDtcbiAgfVxufSk7XG5cbnZhciBfUE9XRVIgPSByZXF1aXJlKCcuL1BPV0VSJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnUE9XRVInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfUE9XRVIuUE9XRVI7XG4gIH1cbn0pO1xuXG52YXIgX1JBTkdFID0gcmVxdWlyZSgnLi9SQU5HRScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1JBTkdFJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1JBTkdFLlJBTkdFO1xuICB9XG59KTtcblxudmFyIF9SRVBUID0gcmVxdWlyZSgnLi9SRVBUJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnUkVQVCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9SRVBULlJFUFQ7XG4gIH1cbn0pO1xuXG52YXIgX1NFQVJDSCA9IHJlcXVpcmUoJy4vU0VBUkNIJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU0VBUkNIJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NFQVJDSC5TRUFSQ0g7XG4gIH1cbn0pO1xuXG52YXIgX1NJTiA9IHJlcXVpcmUoJy4vU0lOJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU0lOJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NJTi5TSU47XG4gIH1cbn0pO1xuXG52YXIgX1NPUlQgPSByZXF1aXJlKCcuL1NPUlQnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTT1JUJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NPUlQuU09SVDtcbiAgfVxufSk7XG5cbnZhciBfU1VNID0gcmVxdWlyZSgnLi9TVU0nKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTVU0nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU1VNLlNVTTtcbiAgfVxufSk7XG5cbnZhciBfU1dJVENIID0gcmVxdWlyZSgnLi9TV0lUQ0gnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTV0lUQ0gnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU1dJVENILlNXSVRDSDtcbiAgfVxufSk7XG5cbnZhciBfVEFOID0gcmVxdWlyZSgnLi9UQU4nKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdUQU4nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfVEFOLlRBTjtcbiAgfVxufSk7XG5cbnZhciBfVEFVID0gcmVxdWlyZSgnLi9UQVUnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdUQVUnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfVEFVLlRBVTtcbiAgfVxufSk7XG5cbnZhciBfVEVYVCA9IHJlcXVpcmUoJy4vVEVYVCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1RFWFQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfVEVYVC5URVhUO1xuICB9XG59KTtcblxudmFyIF9VTklRVUUgPSByZXF1aXJlKCcuL1VOSVFVRScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1VOSVFVRScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9VTklRVUUuVU5JUVVFO1xuICB9XG59KTtcblxudmFyIF9VUFBFUiA9IHJlcXVpcmUoJy4vVVBQRVInKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdVUFBFUicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9VUFBFUi5VUFBFUjtcbiAgfVxufSk7XG5cbnZhciBfVkxPT0tVUCA9IHJlcXVpcmUoJy4vVkxPT0tVUCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1ZMT09LVVAnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfVkxPT0tVUC5WTE9PS1VQO1xuICB9XG59KTtcbnZhciBsb2dpY2FsRnVuY3Rpb25zID0gZXhwb3J0cy5sb2dpY2FsRnVuY3Rpb25zID0gWydpZicsICdpZm5hJywgJ2lmZXJyb3InLCAnYW5kJywgJ2VxJywgJ29yJywgJ3hvcicsICdub3QnLCAnbHQnLCAnbHRlJywgJ2d0JywgJ2d0ZScsICduZScsICdzd2l0Y2gnLCAnY2hvb3NlJywgJ2NvbmQnXTtcblxudmFyIGluZm9ybWF0aW9uRnVuY3Rpb25zID0gZXhwb3J0cy5pbmZvcm1hdGlvbkZ1bmN0aW9ucyA9IFsnaXNhcnJheScsICdpc2JsYW5rJywgJ2lzZW1haWwnLCAnaXNlcnJvcicsICdpc2V2ZW4nLCAnaXNmb3JtdWxhJywgJ2lzbG9naWNhbCcsICdpc25hJywgJ2lzbm9udGV4dCcsICdpc251bWJlcicsICdpc29kZCcsICdpc3RleHQnLCAnaXNyYW5nZScsICdpc3JlZicsICdpc3VybCcsICduJywgJ25hJywgJ3ByZWNlZGVudHMnLCAnc2hlZXQnLCAnc2hlZXRzJywgJ3R5cGUnXTtcblxudmFyIHJlZmVyZW5jZUZ1bmN0aW9ucyA9IGV4cG9ydHMucmVmZXJlbmNlRnVuY3Rpb25zID0gWydpbmRpcmVjdCcsICdpc3JlZicsICdyb3dzJywgJ2NvbHVtbnMnLCAncmFuZ2UnLCAnY2VsbCcsICdjZWxsaW5kZXgnLCAnaW5kZXgyYWRkcicsICdpbmRleDJjb2wnLCAnaW5kZXgycm93J107XG5cbnZhciBkYXRhRnVuY3Rpb25zID0gZXhwb3J0cy5kYXRhRnVuY3Rpb25zID0gWydjbGVhbicsICdzb3J0JywgJ2ZpbHRlcicsICd1bmlxdWUnXTtcblxudmFyIG1hdGhGdW5jdGlvbnMgPSBleHBvcnRzLm1hdGhGdW5jdGlvbnMgPSBbJ2FicycsICdhY29zJywgJ2Fjb3NoJywgJ2Fjb3QnLCAnYWNvdGgnLCAnYWRkJywgJ2FnZ3JlZ2F0ZScsICdhcmFiaWMnLCAnYXNpbicsICdhc2luaCcsICdhdGFuJywgJ2F0YW4yJywgJ2F0YW5oJywgJ2Jhc2UnLCAnY2VpbGluZycsICdjb21iaW4nLCAnY29tYmluYScsICdjb3MnLCAnY29zaCcsICdjb3QnLCAnY290aCcsICdjc2MnLCAnY3NjaCcsICdkZWNpbWFsJywgJ2RlZ3JlZXMnLCAnZGl2aWRlJywgJ2V2ZW4nLCAnZXhwJywgJ2ZhY3QnLCAnZmFjdGRvdWJsZScsICdmbG9vcicsICdnY2QnLCAnZ3QnLCAnZ3RlJywgJ2ludCcsICdsY20nLCAnbG9nJywgJ2xvZzEwJywgJ2x0JywgJ2x0ZScsICdtZGV0ZXJtJywgJ21pbnVzJywgJ21pbnZlcnNlJywgJ21tdWx0JywgJ21vZCcsICdtcm91bmQnLCAnbXVsdGlub21pYWwnLCAnbXVsdGlwbHknLCAnb2RkJywgJ3BpJywgJ3RhdScsICdwb3dlcicsICdwcm9kdWN0JywgJ3F1b3RpZW50JywgJ3JhZGlhbnMnLCAncmFuZCcsICdyYW5kYmV0d2VlbicsICdyb21hbicsICdyb3VuZCcsICdyb3VuZGRvd24nLCAncm91bmR1cCcsICdzZWMnLCAnc2VjaCcsICdzZXJpZXNzdW0nLCAnc2lnbicsICdzaW4nLCAnc3FydCcsICdzcXJ0cGknLCAnc3VidG90YWwnLCAnc3VtJywgJ3RhbiddO1xuXG52YXIgZGF0ZVRpbWVGdW5jdGlvbnMgPSBleHBvcnRzLmRhdGVUaW1lRnVuY3Rpb25zID0gWydkYXRlJywgJ2RhdGV2YWx1ZScsICdkYXRlZGlmJywgJ2RheScsICdkYXlzMzYwJywgJ2VkYXRlJywgJ2VvbW9udGgnLCAnaG91cicsICdpc2xlYXB5ZWFyJywgJ2lzb3dlZWtudW0nLCAnbWludXRlJywgJ21vbnRoJywgJ25ldHdvcmtkYXlzJywgJ25vdycsICdzZWNvbmQnLCAndGltZScsICd0aW1ldmFsdWUnLCAndG9kYXknLCAnd2Vla2RheScsICd3ZWVrbnVtJywgJ3dvcmtkYXknLCAneWVhcicsICd5ZWFyZnJhYyddO1xuXG52YXIgZmluYW5jaWFsRnVuY3Rpb25zID0gZXhwb3J0cy5maW5hbmNpYWxGdW5jdGlvbnMgPSBbJ2FjY3JpbnRtJywgJ2Ftb3JsaW5jJywgJ2NvdXBkYXlzJywgJ2NvdXBkYXlzbmMnLCAnY291cG5jZCcsICdjb3VwbnVtJywgJ2NvdXBwY2QnLCAnY3VtaXBtdCcsICdjdW1wcmluYycsICdkYicsICdkZGInLCAnZGlzYycsICdkb2xsYXJkZScsICdkb2xsYXJmcicsICdkdXJhdGlvbicsICdlZmZlY3QnLCAnZnYnLCAnZnZzY2hlZHVsZScsICdpbnRyYXRlJywgJ2lycicsICdpcG10JywgJ21kdXJhdGlvbicsICdtaXJyJywgJ25vbWluYWwnLCAnbnBlcicsICducHYnLCAnb2RkZnByaWNlJywgJ29kZGZ5aWVsZCcsICdwbXQnLCAncHYnXTtcblxudmFyIHN0YXRpc3RpY0Z1bmN0aW9ucyA9IGV4cG9ydHMuc3RhdGlzdGljRnVuY3Rpb25zID0gWydhdmVkZXYnLCAnYXZlcmFnZScsICdhdmVyYWdlYScsICdhdmVyYWdlaWYnLCAnYXZlcmFnZWlmcycsICdjb3JyZWwnLCAnY291bnQnLCAnY291bnRhJywgJ2NvdW50aW4nLCAnY291bnRibGFuaycsICdjb3VudGlmJywgJ2NvdW50aWZzJywgJ2NvdW50dW5pcXVlJywgJ2RldnNxJywgJ2Zpc2hlcicsICdmaXNoZXJpbnYnLCAnZm9yZWNhc3QnLCAnZnJlcXVlbmN5JywgJ2dhbW1hbG4nLCAnZ2VvbWVhbicsICdncm93dGgnLCAnaGFybWVhbicsICdpbnRlcmNlcHQnLCAna3VydCcsICdsYXJnZScsICdsaW5lc3QnLCAnbG9nZXN0JywgJ21heCcsICdtYXhhJywgJ21lZGlhbicsICdtaW4nLCAnbWluYScsICdwZWFyc29uJywgJ3Blcm11dCcsICdwZXJtdXRhdGlvbmEnLCAncGhpJywgJ3Byb2InLCAncnNxJywgJ3NrZXcnLCAnc2xvcGUnLCAnc21hbGwnLCAnc3RhbmRhcmRpemUnLCAnc3RkZXZhJywgJ3N0ZGV2cGEnLCAnc3RleXgnLCAndHJhbnNwb3NlJywgJ3RyZW5kJywgJ3RyaW1tZWFuJywgJ3ZhcmEnLCAndmFycGEnXTtcblxudmFyIHRleHRGdW5jdGlvbnMgPSBleHBvcnRzLnRleHRGdW5jdGlvbnMgPSBbJ2FzYycsICdiYWh0dGV4dCcsICdjbGVhbicsICdjaGFyJywgJ2NvZGUnLCAnY29uY2F0ZW5hdGUnLCAnZGJjcycsICdkb2xsYXInLCAnZXhhY3QnLCAnZmluZCcsICdmaXhlZCcsICdsZWZ0JywgJ2xlbicsICdsb3dlcicsICdqb2luJywgJ21pZCcsICdudW1iZXJ2YWx1ZScsICdwcm9uZXRpYycsICdwcm9wZXInLCAncmVwbGFjZScsICdyZXB0JywgJ3JpZ2h0JywgJ3NlYXJjaCcsICdzcGxpdCcsICdzdWJzdGl0dXRlJywgJ3QnLCAndGV4dCcsICd0cmltJywgJ3VwcGVyJywgJ3ZhbHVlJ107XG5cbnZhciBlbmdpbmVlcmluZ0Z1bmN0aW9ucyA9IGV4cG9ydHMuZW5naW5lZXJpbmdGdW5jdGlvbnMgPSBbJ2Jlc3NlbGknLCAnYmVzc2VsaicsICdiZXNzZWxrJywgJ2Jlc3NlbHknLCAnYmluMmRlYycsICdiaW4yaGV4JywgJ2JpbjJvY3QnLCAnYml0YW5kJywgJ2JpdGxzaGlmdCcsICdiaXRvcicsICdiaXRyc2hpZnQnLCAnYml0eG9yJywgJ2NvbXBsZXgnLCAnY29udmVydCcsICdkZWMyYmluJywgJ2RlYzJoZXgnLCAnZGVjMm9jdCcsICdkZWx0YScsICdlcmYnLCAnZXJmYycsICdnZXN0ZXAnLCAnaGV4MmJpbicsICdoZXgyZGVjJywgJ2hleDJvY3QnLCAnaW1hYnMnLCAnaW1hZ2luYXJ5JywgJ2ltYXJndW1lbnQnLCAnaW1jb25qdWdhdGUnLCAnaW1jb3MnLCAnaW1jb3NoJywgJ2ltY290JywgJ2ltZGl2JywgJ2ltZXhwJywgJ2ltbG4nLCAnaW1sb2cxOScsICdpbWxvZzInLCAnaW1wb3dlcicsICdpbXByb2R1Y3QnLCAnaW1yZWFsJywgJ2ltc2VjJywgJ2ltc2VjaCcsICdpbXNpbicsICdpbXNpbmgnLCAnaW1zcXJ0JywgJ2ltY3NjJywgJ2ltY3NjaCcsICdpbXN1YicsICdpbXRhbicsICdvY3QyYmluJywgJ29jdDJkZWMnLCAnb2N0MmhleCddO1xuXG52YXIgZnVuY3Rpb25zID0gZXhwb3J0cy5mdW5jdGlvbnMgPSAoMCwgX0ZMQVRURU4uRkxBVFRFTikoW2xvZ2ljYWxGdW5jdGlvbnMsIGluZm9ybWF0aW9uRnVuY3Rpb25zLCByZWZlcmVuY2VGdW5jdGlvbnMsIGRhdGFGdW5jdGlvbnMsIG1hdGhGdW5jdGlvbnMsIGRhdGVUaW1lRnVuY3Rpb25zLCBmaW5hbmNpYWxGdW5jdGlvbnMsIHN0YXRpc3RpY0Z1bmN0aW9ucywgdGV4dEZ1bmN0aW9ucywgZW5naW5lZXJpbmdGdW5jdGlvbnNdKS5zb3J0KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgQUJTOiBfQUJTLkFCUyxcbiAgQUNPUzogX0FDT1MuQUNPUyxcbiAgQUREOiBfQURELkFERCxcbiAgQU5EOiBfQU5ELkFORCxcbiAgQklOMkRFQzogX0JJTjJERUMuQklOMkRFQyxcbiAgQ0VMTDogX0NFTEwuQ0VMTCxcbiAgQ0VMTElOREVYOiBfQ0VMTElOREVYLkNFTExJTkRFWCxcbiAgQ0hPT1NFOiBfQ0hPT1NFLkNIT09TRSxcbiAgQ0xFQU46IF9DTEVBTi5DTEVBTixcbiAgQ09OQ0FURU5BVEU6IF9DT05DQVRFTkFURS5DT05DQVRFTkFURSxcbiAgQ09ORDogX0NPTkQuQ09ORCxcbiAgQ09TOiBfQ09TLkNPUyxcbiAgREFURTogX0RBVEUuREFURSxcbiAgREFURURJRjogX0RBVEVESUYuREFURURJRixcbiAgREVDMkJJTjogX0RFQzJCSU4uREVDMkJJTixcbiAgRElWSURFOiBfRElWSURFLkRJVklERSxcbiAgRVE6IF9FUS5FUSxcbiAgRklMVEVSOiBfRklMVEVSLkZJTFRFUixcbiAgRklORDogX0ZJTkQuRklORCxcbiAgRkxBVFRFTjogX0ZMQVRURU4uRkxBVFRFTixcbiAgR1Q6IF9HVC5HVCxcbiAgR1RFOiBfR1RFLkdURSxcbiAgR1VJRDogX0dVSUQuR1VJRCxcbiAgSExPT0tVUDogX0hMT09LVVAuSExPT0tVUCxcbiAgSUZOQTogX0lGTkEuSUZOQSxcbiAgSU46IF9JTi5JTixcbiAgSU5ERVgyQ09MOiBfSU5ERVgyQ09MLklOREVYMkNPTCxcbiAgSU5ERVgyUk9XOiBfSU5ERVgyUk9XLklOREVYMlJPVyxcbiAgSU5ESVJFQ1Q6IF9JTkRJUkVDVC5JTkRJUkVDVCxcbiAgSVNBUlJBWTogX0lTQVJSQVkuSVNBUlJBWSxcbiAgSVNCTEFOSzogX0lTQkxBTksuSVNCTEFOSyxcbiAgSVNFTUFJTDogX0lTRU1BSUwuSVNFTUFJTCxcbiAgSVNFUlJPUjogX0lTRVJST1IuSVNFUlJPUixcbiAgSVNFVkVOOiBfSVNFVkVOLklTRVZFTixcbiAgSVNOQTogX0lTTkEuSVNOQSxcbiAgSVNOVU1CRVI6IF9JU05VTUJFUi5JU05VTUJFUixcbiAgSVNPREQ6IF9JU09ERC5JU09ERCxcbiAgSVNSQU5HRTogX0lTUkFOR0UuSVNSQU5HRSxcbiAgSVNSRUY6IF9JU1JFRi5JU1JFRixcbiAgSVNURVhUOiBfSVNURVhULklTVEVYVCxcbiAgSVNVUkw6IF9JU1VSTC5JU1VSTCxcbiAgTE9PS1VQOiBfTE9PS1VQLkxPT0tVUCxcbiAgTE9XRVI6IF9MT1dFUi5MT1dFUixcbiAgTFQ6IF9MVC5MVCxcbiAgTFRFOiBfTFRFLkxURSxcbiAgTUFYOiBfTUFYLk1BWCxcbiAgTVVMVElQTFk6IF9NVUxUSVBMWS5NVUxUSVBMWSxcbiAgTjogX04uTixcbiAgTkU6IF9ORS5ORSxcbiAgTk9UOiBfTk9ULk5PVCxcbiAgT0NUMkRFQzogX09DVDJERUMuT0NUMkRFQyxcbiAgT1I6IF9PUi5PUixcbiAgUEk6IF9QSS5QSSxcbiAgUE1UOiBfUE1ULlBNVCxcbiAgUE9XRVI6IF9QT1dFUi5QT1dFUixcbiAgUkFOR0U6IF9SQU5HRS5SQU5HRSxcbiAgUkVQVDogX1JFUFQuUkVQVCxcbiAgU0VBUkNIOiBfU0VBUkNILlNFQVJDSCxcbiAgU0lOOiBfU0lOLlNJTixcbiAgU09SVDogX1NPUlQuU09SVCxcbiAgU1VNOiBfU1VNLlNVTSxcbiAgU1dJVENIOiBfU1dJVENILlNXSVRDSCxcbiAgVEFOOiBfVEFOLlRBTixcbiAgVEFVOiBfVEFVLlRBVSxcbiAgVEVYVDogX1RFWFQuVEVYVCxcbiAgVU5JUVVFOiBfVU5JUVVFLlVOSVFVRSxcbiAgVVBQRVI6IF9VUFBFUi5VUFBFUixcbiAgVkxPT0tVUDogX1ZMT09LVVAuVkxPT0tVUFxufTsiXX0=
