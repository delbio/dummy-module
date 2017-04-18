(function (window, document) {
    'use strict';
     
    /**
     * @param {GlobalShellConfig} configs - global configs
     * @constructor
     * @returns {AppShellModuleConfig} appShellConfig - 
     */
    function AppShellModuleConfig(configs) {
        var self = this;
        self.debug = configs.debug;
        self.modules = configs.modules;
    }

    /**
     * @param {AppShellModuleConfig} appConfig - global config
     */
    function AppShellModule(appConfig)
    {
        var self = this;
        var _appConfig = appConfig;
        var modulesRegister = {};
        self.getAppShellConfig = getAppShellConfig;
        self.addModule = addModule;
        self.start = start;

        init();

        function init()
        {
            _appConfig.modules.forEach(function (module) {
                if ('args' in module){
                    addModuleWithArgs(module.name, module.constructor, module.args);
                } else {
                    addModule(module.name, module.constructor);
                }
            });
        }

        function getAppShellConfig() { return _appConfig; }
        /**
         * @param {String} name - name of module
         * @param {function} classConstructor - function to construct module
         */
        function addModule(name, classConstructor) { modulesRegister[name] = new classConstructor(self); }
        /**
         * @param {String} name - name of module
         * @param {function} classConstructor - function to construct module
         * @param {object} args - args for module
         */
        function addModuleWithArgs(name, classConstructor, args)
        {
            modulesRegister[name] = new classConstructor(self, args);
        }

        function start()
        {
            var head = document.getElementsByTagName('head');

            head = head[0];

            for (var moduleName in modulesRegister){
                var module = modulesRegister[moduleName];

                if (!('init' in module)) { continue; }
                

                if ('getStyles' in module)
                {
                    //<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
                    var styles = module.getStyles();
                    styles.forEach(function(cssElSpec){
                        var cssEl = window.elt('link', {
                            href:cssElSpec,
                            rel:"stylesheet"
                        });
                        head.appendChild(cssEl);
                    });
                    
                }
                
                if ('getLocalizedTranslationDictionary' in module)
                {
                    var dictionary = module.getLocalizedTranslationDictionary();
                    $.i18n.load(dictionary);
                }

                if ('getTemplate' in module)
                {
                    $('#'+moduleName).load(module.getTemplate(), function(){
                        module.init();
                        
                        var moduleEl = document.getElementById(moduleName);
                        var resources = moduleEl.querySelectorAll('[data-i18n-text]');
                        for (var i=0; i < resources.length; i++){
                            var element = resources[i];
                            element.appendChild(document.createTextNode($.i18n._(element.dataset.i18nText)));
                        }
                        
                    });
                } else {
                    module.init();
                }
            }
        }
    }
    
    window.AppShellModule = AppShellModule;
    window.AppShellModuleConfig = AppShellModuleConfig;

})(window, document);