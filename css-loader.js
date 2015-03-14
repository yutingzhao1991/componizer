var cssText = "{{cssText}}"

exports.apply = function () {
    var cssEle = document.createElement('style')
    cssEle.innerHTML = cssText
    document.head.appendChild(cssEle)
}