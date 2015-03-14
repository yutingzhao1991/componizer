'use strict';

var fs = require('fs')

exports.buildCSS = function (cssText) {
    var output = '' + fs.readFileSync(__dirname + '/css-loader.js')
    output = output.replace('{{cssText}}', cssText.replace(/\n/g, '\\n').replace(/\"/g, '\\"'))
    return output
}

exports.buildTmpl = function (tmplText) {
    var output = 'exports.str = "'
        + tmplText.replace(/\n/g, '\\n')
                .replace(/\"/g, '\\"')
        + '"'
    return output
}