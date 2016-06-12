import * as functions from 'functionfoundry';
//import {compiler} from 'formulafoundry';
//console.log(compiler);

let expressions = [
    'ABS(-1.1)',
    'LOWER("TEXT ") + ABS(-2)',
    'SUM(2, 5)'
];

(function() {
    // Create set of functions
    let functionList = '',
        i = 1;
    for (let key in functions) {
        window[key] = functions[key];
        functionList += '<code>[' + i++ + '] ' + key + '</code></br>';
    }

    let output = '';
    for (let e of expressions) {
        output += '<code>' + e + ' = ' + eval(e) + '</code></br>';
    }

    document.getElementById('debug').innerHTML = output + 
        '<h3>Functions</h3>' + functionList;
})();