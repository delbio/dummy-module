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
                'test-module.loaded': 'Loaded ;)'
            };
        }
        function init()
        {
            console.log(args.consoleMessage);
        }
    }

    window.ModuleIdComponent = ModuleIdComponent;

})(window, document);