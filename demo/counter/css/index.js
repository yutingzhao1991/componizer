var cssText = "\n.counter {\n    color: red;\n    font-size: 128px;\n}"

exports.apply = function () {
    var cssEle = document.createElement('style')
    cssEle.innerHTML = cssText
    document.head.appendChild(cssEle)
}