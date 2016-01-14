import {default as functions} from 'functionfoundry';

let expressions = [
    'ABS(-1.1)',
    'LOWER("TEXT ") + ABS(-2)',
    'SUM(2, 5)',
    'LEFT("MARK", 2)'
];

(function() {
    // Create set of functions
    for (let key in functions) {
        window[key] = functions[key];
    }

    let e,
        output = '';

    for (e of expressions) {
        output += '<code>' + e + ' = ' + eval(e) + '</code></br>';
    }

    document.getElementById('debug').innerHTML = output;
})();