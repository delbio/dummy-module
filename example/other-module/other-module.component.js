(function(window, document) {
    'use strict';

    /**
     * Component to test module loader
     * 
     * @param {AppShellModule} appShell 
     * @param {any} args 
     */
    function OtherModuleComponent(appShell, args)
    {
        var self = this;

        self.getStyles = getStyles;
        self.getTemplate = getTemplate;
        self.getRemoteTranslationDictionary = getRemoteTranslationDictionary;
        self.init = init;
        
        function getStyles()
        {
            return [
                'https://fonts.googleapis.com/css?family=Roboto',
                'other-module/other-module.component.css'
            ];
        }
        function getTemplate()
        {
            return './other-module/other-module.component.html';
        }
        function getRemoteTranslationDictionary(lang)
        {
            switch (lang) {
                case "it":
                    return 'other-module/locales/other-module.locales.it.json'
                    break;
                case "en":
                default:
                    return 'other-module/locales/other-module.locales.en.json'
                    break;
            }
        }
        /**
         * @param {HtmlDivElement} moduleEl 
         */
        function init(moduleEl)
        {
            console.log(args.consoleMessage);
            var element = moduleEl.querySelector("[data-id='translation-handled-by-js']");
            var translater = appShell.getModule(appShell.systemModulesNames.translater);
            element.innerText = translater.translate("other-module.translation-handled-by-js");

        }
    }

    window.OtherModuleComponent = OtherModuleComponent;

})(window, document);