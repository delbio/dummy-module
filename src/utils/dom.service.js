(function(window, document) {
    'use strict';

    /**
     * Create new dom elment
     * @ref http://eloquentjavascript.net/code/chapter/19_paint.js
     * @param {string} name - tagName
     * @param {object} attributes - dom element attributes
     * @return {HtmlElement} The element created
     */
    function elt(name, attributes)
    {
        var node = document.createElement(name);
        if (attributes) {
            for (var attr in attributes)
                if (attributes.hasOwnProperty(attr))
                    node.setAttribute(attr, attributes[attr]);
        }
        for (var i = 2; i < arguments.length; i++) {
            var child = arguments[i];
            if (typeof child === "string")
                child = document.createTextNode(child);
            node.appendChild(child);
        }
        return node;
    }

    window.elt = elt;

})(window, document);