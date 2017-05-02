(function(window, document) {
    'use strict';

    /**
     * Component to test module loader
     * 
     * @param {AppShellModule} appShell 
     * @param {any} args 
     */
    function ModuleIdComponent(appShell, args)
    {
        var self = this;

        self.getStyles = getStyles;
        self.getTemplate = getTemplate;
        self.getLocalizedTranslationDictionary = getLocalizedTranslationDictionary;
        self.init = init;
        self.customAction = customAction;
        
        function getStyles()
        {
            return [
                'https://fonts.googleapis.com/css?family=Roboto',
                'test-module/test-module.component.css'
            ];
        }
        function getTemplate()
        {
            return './test-module/test-module.component.html';
        }
        function getLocalizedTranslationDictionary()
        {
            return {
                'test-module.loaded': 'Loaded ;)',
                'test-module.translation-handled-by-js': 'test-module - Translation'
            };
        }
        /**
         * @param {HtmlDivElement} moduleEl 
         */
        function init(moduleEl)
        {
            console.log(args.consoleMessage);
            var element = moduleEl.querySelector("[data-id='translation-handled-by-js']");
            var translater = appShell.getModule(appShell.systemModulesNames.translater);
            element.innerText = translater.translate("test-module.translation-handled-by-js");

        }

        function customAction()
        {
            alert('hello world');
        }
    }

    window.ModuleIdComponent = ModuleIdComponent;

})(window, document);