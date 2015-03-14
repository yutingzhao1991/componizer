#!/usr/bin/env node

'use strict';

var program = require('commander')
var pkg = require('../package.json')
var componizer = require('../')
var path = require('path')
var fs = require('fs')

program
    .version(pkg.version)
    .option('init', 'init a component base files')
    .option('build', 'build source code')
    .option('-t --tmplExt [value]', 'appoint your template file ext', String)
    .parse(process.argv)


function createFile(source, target) {
    if (!fs.existsSync(target)) {
        fs.createReadStream(source).pipe(fs.createWriteStream(target))
    } else {
        console.error(target + ' already exist')
        process.exit(1)
    }
}

if (program.init) {
    // crate html
    var tmplExt = program.tmplExt || 'html'
    var tmpPath = './tmpl/index.' + tmplExt
    if (!fs.existsSync('./tmpl')) {
        fs.mkdirSync('./tmpl')
    }
    if (!fs.existsSync('./css')) {
        fs.mkdirSync('./css')
    }
    createFile(__dirname + '/source/init.html', tmpPath)
    createFile(__dirname + '/source/init.css', './css/index.css')
    createFile(__dirname + '/source/init.js', './index.js')
    console.log('init success!')
}

if (program.build) {
    var tmplExt = program.tmplExt || 'html'
    if (tmplExt == 'js') {
        console.error('tmplExt can not be js')
        rocess.exit(1)
    }
    if (!fs.existsSync('./tmpl')) {
        console.error('not find tmplate directory ./tmpl')
        process.exit(1)
    } else {
        var fileList = fs.readdirSync('./tmpl')
        fileList.forEach(function (item) {
            var stats = fs.lstatSync('./tmpl/' + item)
            if (stats.isFile()) {
                if (item.indexOf('.' + tmplExt) != -1) {
                    var output = componizer.buildTmpl('' + fs.readFileSync('./tmpl/' + item))
                    var target = './tmpl/' + item.replace('.' + tmplExt, '.js')
                    fs.writeFileSync(target, output)
                    console.log('success to build ' + target)
                }
            } else {
                console.warn('./tmpl/' + item + ' is a directory, not support now')
            }
        })
    }
    if (!fs.existsSync('./css')) {
        console.error('not find tmplate directory ./css')
        process.exit(1)
    } else {
        var fileList = fs.readdirSync('./css')
        fileList.forEach(function (item) {
            var stats = fs.lstatSync('./css/' + item)
            if (stats.isFile()) {
                if (item.indexOf('.css') != -1) {
                    var output = componizer.buildCSS('' + fs.readFileSync('./css/' + item))
                    var target = './css/' + item.replace('.css', '.js')
                    fs.writeFileSync(target , output)
                    console.log('success to build ' + target)
                }
            } else {
                console.warn('./css/' + item + ' is a directory, not support now')
            }
        })
    }
}
