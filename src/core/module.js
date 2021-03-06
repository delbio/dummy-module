(function (window, document) {
    'use strict';
     
    /**
     * @param {GlobalShellConfig} configs - global configs
     * @constructor
     * @returns {AppShellModuleConfig} appShellConfig - 
     */
    function AppShellModuleConfig(configs) {
        var self = this;
        self.lang = configs.lang;
        self.debug = configs.debug;
        self.modules = configs.modules;
        self.loaders = {
            'template': ('loaders' in configs && 'template' in configs.loaders) ? configs.loaders.template : new window.RemoteTemplateLoader()
        };
    }

    /**
     * @param {AppShellModuleConfig} appConfig - global config
     */
    function AppShellModule(appConfig)
    {
        var self = this;
        var _appConfig = appConfig;
        var modulesRegister = {};

        self.systemModulesNames = {
            'translater': 'translater'
        };

        self.getAppShellConfig = getAppShellConfig;
        self.addModule = addModule;
        self.getModule = getModule;
        self.start = start;

        init();

        function init()
        {
            addModuleWithArgs(self.systemModulesNames.translater, window.AppShellModuleTranslater, _appConfig.debug);
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
        /**
         * @param {String} name - name of module
         * @returns {any}
         */
        function getModule(name) { return modulesRegister[name]; }

        function start()
        {
            var head = document.getElementsByTagName('head');
            head = head[0];
            for (var moduleName in modulesRegister){
                startModule(head, moduleName, modulesRegister[moduleName]);
            }
        }
        /**
         * start single module
         * 
         * @param {any} head document head tag
         * @param {String} moduleName module name
         * @param {any} module module spec
         */
        function startModule(head, moduleName, module)
        {
            if (!('init' in module)) { return; }   

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

            if ('getTemplate' in module)
            {
                var templateLoader = _appConfig.loaders['template'];

                templateLoader.loadTemplate(module.getTemplate(), moduleName, function()
                {
                    var moduleEl = document.getElementById(moduleName);
                    if (moduleEl === null){
                        console.error('Module '+domElementSelector+' registered with template, but template not connected into root html. Skip init module');
                        return;
                    }
                    module.init(moduleEl);
                    var moduleTranslater = self.getModule(self.systemModulesNames.translater);
                    moduleTranslater.loadDictionary(module, moduleName, moduleEl, _appConfig.lang, moduleTranslater.applyTranslationIntoModuleTemplate);
                    
                });
            } else {
                module.init();
            }
        }
    }
    
    window.AppShellModule = AppShellModule;
    window.AppShellModuleConfig = AppShellModuleConfig;

})(window, document);