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
        self.getLocalizedTranslationDictionary = getLocalizedTranslationDictionary;
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
        function getLocalizedTranslationDictionary()
        {
            return {
                'other-module.loaded': 'Loaded ;)'
            };
        }
        function init()
        {
            console.log(args.consoleMessage);
        }
    }

    window.OtherModuleComponent = OtherModuleComponent;

})(window, document);