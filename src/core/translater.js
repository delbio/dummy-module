(function (window, document) {
    'use strict';

    function AppShellModuleTranslater(appShell,debug)
    {
        var self = this;

        self.loadDictionary = loadDictionary;
        self.applyTranslationIntoModuleTemplate = applyTranslationIntoModuleTemplate;
        self.translate = translate;

        function isDebugMode()
        {
            return (debug && debug === true);
        }

        /**
         * 
         * @param {any} module 
         * @param {String} moduleName 
         * @param {HtmlElement} domElement
         * @param {String} lang
         * @param {function} onLoadFn
         */
        function loadDictionary(module, moduleName, domElement, lang, onLoadFn)
        {
            if ('getLocalizedTranslationDictionary' in module)
            {
                var dictionary = module.getLocalizedTranslationDictionary(lang);
                $.i18n.load(dictionary);
                onLoadFn(module, moduleName, domElement);
            }

            if ('getRemoteTranslationDictionary' in module)
            {
                var jsonDictionaryPath = module.getRemoteTranslationDictionary(lang);
                $.getJSON(jsonDictionaryPath, function(dictionary) {
                    if (isDebugMode()) { console.log(dictionary); }
                    $.i18n.load(dictionary);
                    onLoadFn(module, moduleName, domElement);
                });
            }
        }

        /**
         * 
         * @param {any} module 
         * @param {String} moduleName 
         * @param {HtmlElement} domElement 
         */
        function applyTranslationIntoModuleTemplate(module, moduleName, domElement)
        {
            var resources = domElement.querySelectorAll('[data-i18n-text]');
            for (var i=0; i < resources.length; i++){
                var element = resources[i];
                element.appendChild(document.createTextNode($.i18n._(element.dataset.i18nText)));
            }
        }
        /**
         * @param {String} message 
         * @returns {String} translatedMessage
         */
        function translate(message)
        {
           return $.i18n._(message);
        }
    }
    window.AppShellModuleTranslater = AppShellModuleTranslater;
})(window, document);